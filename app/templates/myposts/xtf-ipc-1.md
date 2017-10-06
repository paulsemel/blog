First, before beggining this (not very funny) story, let met tell you that there is obviously better way of doing it, but my point here was also to introduce the Xen Testing Framework.

# So, what is XTF ?

%%

According to there [webpage](http://xenbits.xen.org/docs/xtf/)
:	>This is both a framework for creating microkernel-based tests, and a suite of tests built using the framework.

Ok, so basically, XTF is just a really basic microkernel which, after all the initialization stuffs, calls your test function. So, for each test, you compile the microkernel.
The cool thing with XTF is that you can compile it as a PV guest or a HVM guest, and all the implemented features are available for both architectures (for the last Xen version, you will have many troubles with older ones..).

But those features are really limited (which is also the point of XTF actually), and I wanted to be able to communicate over my guests domains.

To do this, the commons things are either to use Xen shared memory or a virtual device. But :

* I didn't want to add lot of LoC in XTF
* This is often to send a large amount of data, and that's not what I want (just a very few amount of data in my particular case)
* I spotted that the Xenbus was already initialized, with a function called `xenstore_read`. That's it.

### Ok, and what is XenStore ?
%%
According to the [xen wiki page](https://wiki.xen.org/wiki/XenStore)
: >XenStore is an information storage space shared between domains maintained by the Xenstored. It is meant for configuration and status information rather than for large data transfers.

No need for me to add something else to this definition, I think it's pretty well understandable.

Problem : I have never used Xenstore before (I'm a really begginer to Xen actually).
But anyway, it sounds perfect for me ! Let's take a look at the commands I can send through XenStore.

The following enum is the list of message types we have :

```c
enum xsd_sockmsg_type
{
	XS_DEBUG,
	XS_DIRECTORY,
	XS_READ,
	XS_GET_PERMS,
	XS_WATCH,
	XS_UNWATCH,
	XS_TRANSACTION_START,
	XS_TRANSACTION_END,
	XS_INTRODUCE,
	XS_RELEASE,
	XS_GET_DOMAIN_PATH,
	XS_WRITE,
	XS_MKDIR,
	XS_RM,
	XS_SET_PERMS,
	XS_WATCH_EVENT,
	XS_ERROR,
	XS_IS_DOMAIN_INTRODUCED,
	XS_RESUME,
	XS_SET_TARGET,
	XS_RESTRICT,
	XS_RESET_WATCHES
};
```

Alright, so what do we need ?

First, we might want to use the `xenstore_ls` command so that it can gives us some informations about the storage space.
Then, we also want to write to some key to dialog with other domains, so `xenstore_write`.

After implementing those basic functions, I was like : "Ok, so now, I need to know about the current connected domains, at least their domain id"

Well.. No. That's not possible. A domU guest can't know directly about the other domains (except dom0 of course), even if we just want the othe domU ids. So we must send some informations from dom0.

## From dom0 to domU
%%

The fact is that the XTF microkernels are launched from the `xtf-runner` script, so we need to change it to send informations to the created domains.

Disclaimer for the rest of this post
:	> To run my tests in parallel, I've implemented an options to do that. I can write a post about it (but it's really simple acutally). Just let me know if you want/need it.

As long as we just need to give the domain IDs of launched guest domains, we will just create a path at the root of of the shared space - let's say `/ipc` to be original - and write the different IDs separated by commas (CSV format).

And the cool thing with how xtf launch the microkernel is that it uses the command `xl create -p domain.cfg`, which pause the domain right after creating it.
What I'm saying could sound just stupid, but in fact it's pretty cool, because all we need to do is collecting the paused kernel IDs, write them to the `/ipc` path, and unpause the domains.

And that's it ?

Actually no.. As you have probably noticed in the Xenstore commands list, there is a command named `xenstore_chmod`. And for the moment, our guests don't have the rights to read at the `/ipc` path.

According to the [xenstore_chmod man page](https://xenbits.xen.org/docs/4.5-testing/man/xenstore-chmod.1.html), we need to provide the permission type followed by the ID of the domain that will receive this permission.
Good to know, without ID, it will set this permission to all the guest domains.

Alright, now, we can read the list of the different connected domains from domU. You have to know that these first step is more or less (in a better way of course) what's done when using an other IPC mechanism, as there is no other way to know about other connected domU.
Now, let's find a way to exchange informations from domU to domU.

## From domU to domU

That's where the IPC thing really beggins.

If you went through the links I gave, you probably read that the domains local path formate is `/local/domain/$id/'. So here, we will probably need to read/read to our or other domain local paths.

You first need to know that for this first shot, I will develop a mechanism to help `Producer` and `Consumer` to coordinate themselves, so this won't be neither optimized nor totaly safe in every cases.

### First shot
%%

The first thing I was thinking about was to find a way to somehow lock the key we are using to pass some informations.. And I came up with a simple idea. Let's call guests domains A and B. If A gives access to one of its local path and B gives access to one of its to A, they can block the other domain from writing by setting off the said permission. I know, that doesn't make everything, but that's a beggining.

Well, after one hour of "why the fuck is `xenstore_chmod` returning an error while setting permissions to the other domain", I [figured out](https://wiki.xen.org/wiki/XenBus#Permissions) that :
> [...]permissions are set up by the tools in domain 0, or by Xenstored when it first starts up.

Right... except the fact that we just want to kill ourself, we've learnt something : if we want to read/write to an other domain path, the permission must be set by dom0 - in our case in the `xtf-runner` python script.

And then, I came up with this simple idea (again, this is not the best one, there is problems blabla..): to send something to domain B, domain A will write in the domain B path only if this path is empty. And if domain B want to receive a message, it reads what's in its own path, and then it flushes it (and inversed for domain A of course).

And... tada..
%%
```text
--- Xen Test Framework ---
Environment: PV 64bit (Long mode 4 levels)
Test xenstore
test-pv64-xenstore
ipc_send: message sent(Hey !)
Got: Hey dude !
Test result: SUCCESS

--- Xen Test Framework ---
Environment: HVM 64bit (Long mode 4 levels)
Test xenstore
test-hvm64-xenstore
Got: Hey !
ipc_send: message sent (Hey dude !)
Test result: SUCCESS
```

Well, ok, that's not really what happened.

It works, but only sometimes, and depending on if I add or remove code, the frequency gets higher or lower.. hmmm that sounds like a concurrent access that is not handled or something.
After at least half an hour looking my code to check if I wasn't just a jerk (yeah, it often happens), I tried to type in google "xenstore concurrent access".
First, you have to know that the fact that concurent accesses was not handled by xenstored backend was just not a possiblity.. well I got [this](https://patchwork.kernel.org/patch/9501273/).

So the funny thing is that while I was typing my Google request, I was considering the possibility that access the same path at the same time could possibly not be handled by xenstored. But that's actually worst than just this.
According to this patch
:	> xenbus is capable to have one access active only at one point of time

So as far as I understand well this sentence, this means that whatever the path is, if two domains (or even one multithreaded domain) are making a request to xenstore at the same time, it is just not handled.

_For the moment, this code won't be available, as it's not the final version, and as it's part of my internship. But it might normally become a PR, and if it turns to be upstream, I will update this post._
