Results of my **GSoC** 2018
%%
The goal of this blog post is to show the work I have done during my **Google Summer of Code**. First, I would like to thank the **LLVM community** for being so nice to me, but also **Eric Christopher**, my mentor during this past three months, for being of an awesome help, technically but also socially speaking!

First, [here](https://summerofcode.withgoogle.com/dashboard/project/6578123496226816/details/) is the high-level description of my GSoC:

> A lot of GNU binutils have their equivalent in the LLVM project. As the majority of people are already accustomed to the GNU ones, it would be great to make the LLVM binutils command lines compliant. The goal of this project is that people would be able to integrate LLVM tools in their existing toolchains without any efforts, and thus increase the number of projects using LLVM binutils.

While a full set of GNU binutils is quite a bit of work, what follows has already been committed upstream and is available today. If you want to have an overview of all the patches I made during this period, please find the list of the patches at the bottom of this post.

The first problem of this project is that a full set of utilities is an extraordinarily large project and suitable for multiple **GSoC**. I was able to speak with [Jake Ehrlich](https://reviews.llvm.org/p/jakehehrlich/) before **GSoC** started, and he told me that **llvm-objcopy** was lacking a lot of features/functionality.

In this post, I will mostly talk about the ELF file format/binary. There was actually a lot of work to do just for this support. However, thanks to **libObject** I had the opportunity to implement functionality for multiple binary formats at the same time.
%%
## LLVM-OBJCOPY / LLVM-STRIP
%%
This is the tool on which I focused the most during this **GSoC**. The only implemented functionality was the "strip" options (understand "--strip-all", "--strip-debug" etc..). Everything was to do, and a few developers were already actively reviewing/developing for this tool, as some teams at **Google and elsewhere** were needing this tool to be improved.

Fortunately, there was already a solid base that was able to convert the binary file to a r/w c++ object, and then convert it back to a binary file. The hardest part of this tool for supporting a file format, being able to have this two-way conversion (binary file to r/w and then r/w to binary file).

My original goal was to implement every major option **GNU objcopy** had for the ELF format; understand here that I'm talking about the options an average user might want to use with **llvm-objcopy**. For this part, thanks to all the developers that were working on it during those three months, a normal user won't lack any options using **llvm-objcopy**.

While I was working on this task, someone introduced the tool **llvm-strip**. As well as it is in the **GNU binutils**, **llvm-strip** shares the same code base as **llvm-objcopy** (and it makes sense, as a lot of options of both those tools are doing the exact same thing). This was really cool for me, as I was contributing to two different tools at the same time. I also think that **llvm-strip** is not lacking basic options now that this GSoC is over (I'm not saying that it's entirely because of me, as I wasn't the only one working on those tools obviously).

Originally my second goal on this tool was to implement the support of the COFF file format. At the time, I hadn't realizing how hard this task was, and I wanted (and still want) to unify every file format to have a generic r/w c++ object to file format translation. However, given this scope, this is an area of future work. This led me to work on the ELF part of other **llvm binutils** tools.
%%
## The other tools
%%
Almost all those tools only need "read-only" support of the format they are handling, which means that they can use the same library for doing those operations (and thus share the helper functions between the tools). That's where I discovered **libObject**. This is the coolest part of the **llvm-binutils** (and that's also why I want to implement writable wrappers over it for **llvm-objcopy**).
%%
### The libObject
%%
This library is composed of multiple classes organized with well-thought inheritance, so that every binary files, independently of their formats, are inheriting from the same base class, with some base attributes and helpers. Then, whenever a file format has something specific to itself, the helpers are implemented in the child class.

This is actually very powerful, as it permits developers to:

- Be able to implement generic options for all the formats at the same time.
- Implement more easily other options.

At the moment I'm writing those lines, the library handles the following principle formats:

- ELF
- COFF/PE
- MachO
- WAsm

While contributing to these other tools, I implemented some new features in both the generic and the ELF part. Unfortunately, as this is usually done by other developers, those features are often coming with the implementation of a feature in a tool, and thus the patches are not separated between the **libobject** feature and the tool feature.

A large feature I implemented in this area concerns the dynamic part of the ELF. Indeed, there was nothing about the dynamic segment in the **libObject** and I had to implement some helpers to deal with it.
%%
### LLVM-OBJDUMP/LLVM-READOBJ
%%
**llvm-readobj** and **llvm-objdump** are the two other tools I focused on during this period. These two utilities were much more feature complete than **llvm-objcopy**. Furthermore, as they both use **libobject**, they are capable of handling multiple file formats. This makes them really powerful.

I was able to implement generic options for most file formats at the same time, sometimes by adding features in **libobject**. After this effort the two tools are not lacking basic options, and given their file format independence they are quite powerful.
%%
## CONCLUSION
%%
This **GSoC** was a really awesome opportunity for me. In addition to the fact that it allowed me to work on a really cool project, it also permitted me to meet great people, made me learn a lot of new things both technically and socially.

The **LLVM** community was really kind with me, which helped me learn a lot more than I had ever expected.

Most of the remaining work consists of implementing a new architecture for **llvm-objcopy** so that multiple file format handling could be much easier than it is right now. One of the reasons I didn't develop it during this **GSoC** is that the current architecture would force us to reimplement a whole new backend/frontend pair for the new format, which is probably more effort than it's worth. Another solution would be to make **libObject** writable, which would make everything easier. After having a talk with **Jake Ehrlich**, this would be a really tough, but likely be worth it.

There are a few options missing in many of the other tools, however, the ELF support in **llvm binutils** is now pretty good, and the tools are quite usable for an average user. In addition, FreeBSD folk [have recently decided](https://lists.freebsd.org/pipermail/freebsd-toolchain/2018-June/003809.html) to switch from **GNU objdump** to **llvm-objdump**.

---
%%
[1] [[llvm-objcopy] Add --localize-symbol option](https://reviews.llvm.org/D46064)
[2] [[llvm-objcopy] Add --globalize-symbol option](https://reviews.llvm.org/D46177)
[3] [[llvm-objcopy] Add --weaken-symbol (-W) option](https://reviews.llvm.org/D46195)
[4] [[llvm-objcopy] Add --weaken option](https://reviews.llvm.org/D46217)
[5] [[llvm-objcopy] Add --discard-all (-x) option](https://reviews.llvm.org/D46341)
[6] [[llvm-objcopy] Add --strip-symbol (-N) option](https://reviews.llvm.org/D46369)
[7] [[llvm-objcopy] Add --keep-symbol (-K) option](https://reviews.llvm.org/D46819)
[8] [[llvm-objcopy] Add --keep-file-symbols option](https://reviews.llvm.org/D46830)
[9] [[llvm-objcopy] Add --strip-unneeded option](https://reviews.llvm.org/D46896)
[10] [[llvm-objcopy] Fix null symbol handling](https://reviews.llvm.org/D47414)
[11] [[llvm-objdump] Add -R option](https://reviews.llvm.org/D47493)
[12] [[llvm-strip] Add -o option](https://reviews.llvm.org/D47505)
[13] [[llvm-strip] Expose --strip-unneeded option](https://reviews.llvm.org/D47818)
[14] [[llvm-readobj] Add -string-dump (-p) option](https://reviews.llvm.org/D47989)
[15] [[llvm-readobj] Fix printing format](https://reviews.llvm.org/D48271)
[16] [[llvm-readobj] Add -hex-dump (-x) option](https://reviews.llvm.org/D48281)
[17] [[llvm-objdump] Add --file-headers (-f) option](https://reviews.llvm.org/D48810)
[18] [[llvm-objdump] Add --archive-headers (-a) option](https://reviews.llvm.org/D48904)
[19] [[llvm-objdump] Add dynamic section printing to private-headers option](https://reviews.llvm.org/D49016)
[20] [[llvm-objdump] Add -demangle (-C) option](https://reviews.llvm.org/D49043)
[21] [[llvm-readobj] Generic -string-dump option](https://reviews.llvm.org/D49470)
[22] [[llvm-readobj] Generic hex-dump option](https://reviews.llvm.org/D49545)
[23] [[yaml2obj] Add default sh\_entsize for dynamic sections](https://reviews.llvm.org/D49619)
[24] [[llvm-objcopy] Add --dump-section](https://reviews.llvm.org/D49979)
[25] [[llvm-objcopy] Add --prefix-symbols option](https://reviews.llvm.org/D50381)
[26] [[llvm-objcopy] Add --prefix-sections option](https://reviews.llvm.org/D50463)
