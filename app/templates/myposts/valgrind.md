Today, if you want to check bad stack usage, you have two possibilities :

* Add code at compile time that helps you detect memory leak at runtime
* Analyse the code at runtime with the help of debug symbols

Alright.. so why would I need something new, you might say ? Well, what if I do not
have debug flags ? What if I want to detect those leaks on production softwares ?

Thus, this is what we will try to do.

## What kind of leak do we want to detect ?
%%
Basically, we can differenciate two kinds of leaks:

* Non-allocated memory usage
* Overflows (triggered by memory access or syscalls)

To better understand this, let's take a look at an example.

%%
####Non allocated memory use :
%%
```c
int *bar(int *var)
{
	*var += 3;
	return var;
}

int *foo(void)
{
	int a = 3;
	return bar(&a);
}

int main(void)
{
	int *a = foo();
	*a = 12;
	return 0;
}
```

So, what's going on over here ?

Basically, what's going on here is that the main function is accessing memory that it's not supposed to because it didn't ask for allocating enough memory. The result is that if we call another function that allocates stack memory, there is a chance that it overrides the value pointed by `int *a`.

Of course, in this example, this is very basic. But in way bigger projects, with multiple contributors, this can definitely happen.

I won't give an example of bufferoverflows here, as there is a lot of them on the Internet. The purpose of the first example was just to prove the possibility of this to happen.

## How do we detect non allocated memory usages ?
%%
Actually, this part is really easy. Here, we are going to differenciate two type of function :

* Leaf functions
* Internal functions

Leaf function
:	>According to the [arm developper website](http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.faqs/ka13785.html), a leaf function is the classification given to a function at the end of a call tree. That means that this said function won't issue any call.

Fine. So what ?

Well, this changes a lot at the assembly level. Indeed, because it's not issuing any call, a leaf function in most of the cases won't allocate memory on the stack, and will use it as it good will (of course, limited by the red zone, the amount of memory a function a allowed to allocate). So for those functions, the only thing we need to do is to check if the ***red zone*** is not crossed.

For the internal functions, this is almost as easy as for the leaf functions. Indeed, at low level programming, to allocate memory on the stack, there is two options, issue a `sub $X, %rsp`, or use a compiler macro like `alloca(3)`, which will eventually result by issuing a `sub $X, %rsp`.

So, what we are going to do is basically what we need to do when writing a compiler: create a stackframe for every functions. This stackframe will be updated each time the stack pointer register is decremented, so that this way, for every memory access, we will be able to say if the function is using non allocated memory.

To do so, we will use a few functions from the API :

```c
void VG_(track_new_mem_stack) (void (*f)(Addr a, SizeT len));

void VG_(track_pre_mem_read) (void (*f)(CorePart, ThreadId, Char*, Addr, SizeT));

void VG_(track_pre_mem_write) (void (*f)(CorePart, ThreadId, Char*, Addr, SizeT));
```

Now that we are able to detect those leaks, let's see how to detect overflow leaks.

## How do we detect overflows ?
%%
This part is way harder than the previous one. Indeed, let's recall that variables, types etc.. are just some abstractions that allow the developper to focus on more high-level stuff, and obviously to code really faster. But at the moment you have your binary, you have lost all those abstractions.

And that's the problem we're facing. Without knowing anything about the types (and more precisely the sizes) of the chunks, we can't be sure a hundred pourcent that there is an overflow. Let's take a look at this example :

```c
int main(void)
{
	char b[14];
	for (int i = 0; i < 15; i++)
		b[i] = 12;
	return 0;
}
```

For the moment, we only have our stackframe for each functions of our program, but we do not have enough information to detect this.

But in most of the common compilers, we know that rsp is often changed two times : the first one with the instruction `push %rsp`, and the second one when we allocate stack memory. So we are able to know the exact amount of memory the function has allocated, and are now able to detect this kind of leaks.

But now, let's take a look at an other example :

```c
int main(void)
{
	int a;
	char b[14];
	for (int i = 0; i < 15; i++)
		b[i] = 12;
	return 0;
}
```

This is becoming more difficult. Because there is an `int a` allocated on the top of the stack, we have not enough information to detect this leak. If the array would have been declared before the `int a`, we would have detect it.

Let's think about this case. Before the said leak, we are accessing other consecutive cells of the array, which is often the case. So what we are going to do is to add some informations in the stackframe, and make a guess for the sizes of each chunks that composed this one.

So we would have something like this :

![Chunk supposed size after array access](/static/images/valgrind-memory.png)

As we can see, we've made a bad guess for the about the size of the chunk `int a`, and in the precise case of this code, we won't be able to detect the leak. But now, let's imagine that there is somehow an access to this variable - which will almost always be the case for two reasons : first, most of the known compilers are not allocating memory if there is no access to it, and second, why would I declare a variable not to use it ?. So if the variable `int a` is being accessed, we would be facing a problem : a part of the chunk is already marked (but with a different size).

Two options here : either the leak has been issued the first time we accessed the chunk, either right now. In both of the case, we can say with a high pourcentage level that there is a leak.

_Note : I didn't talk about syscall memory leak, but the fact is that there is an API function that permits to register a call each time a syscall is issued, taking in parameter the address and the size accessed. So with the information we have, this is basically the same strategy as described above : if the chunk is already marked with a different size, there is a leak, otherwise we mark it and continue the execution of the program_

## Results
%%
First, let's be honnest. I didn't make tons of tests, but rather with few tricky homemade binaries, to see how many false positive and undetected leaks. And there is a lot.

Indeed, the first problem I faced was that chunks could be the same size but in fact not the same type, which just lead our program not detect potential leaks. Secondly, I had to blacklist some libc functions, as those one were doing way too weird things on the stack (like using non allocated memory on purpose).

To conclude, I think that this project would have better results with machine learning skills and a lot of time, but unfortunately, I have neither of those.

_Github link of this project will soon be available_
