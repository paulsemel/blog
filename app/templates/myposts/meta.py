# Status :
#   - 0 : disabled
#   - 1 : enabled

# Be careful, comments are linked with posts with the id field. If those are
# changed, comments will be losts or even worst exchanged.

import datetime

DISABLED = 0
ENABLED = 1
TESTING = 2
POSTS_META = [
        {
            'id': 0,
            'filename': 'test.md',
            'title': 'Post test',
            'author': 'Paul Semel',
            'date': datetime.datetime.strptime('02-10-2017', "%d-%m-%Y"),
            'short': 'This post is a test post dealing with a lot of different tests, read it, you wont be disappointed',
            'status': DISABLED
        },
        {
            'id': 1,
            'filename': 'valgrind.md',
            'title': 'Detecting bad stack usages using Valgrind Core API',
            'author': 'Paul Semel',
            'date': datetime.datetime.strptime('02-10-2017', "%d-%m-%Y"),
            'short': 'In this post, we will see what strategies we must employ to \
                      be able to detect bad stack usages such as buffer overflows.',
            'status': ENABLED
        },
        {
            'id': 3,
            'filename': 'dynamorio.md',
            'title': 'Forbidding libc calls with DynamoRIO',
            'author': 'Paul Semel',
            'date': datetime.datetime.strptime('29-04-2018', "%d-%m-%Y"),
            'short': 'In my school, there are projects that involves forbidding a few \
                      libc functions. Let\'s see how we can detect cheaters !',
            'status': ENABLED
        },
        {
            'id': 2,
            'filename': 'xtf-ipc-1.md',
            'title': 'Implementating an IPC mechanism in a really basic Xen domU microkernel (XTF)',
            'author': 'Paul Semel',
            'date': datetime.datetime.strptime('05-10-2017', "%d-%m-%Y"),
            'short': 'In this post, we will see how much troubles I had trying to write an IPC mechanism in the Xen Testing Framework microkernel',
            'status': TESTING
        },
        {
            'id': 4,
            'filename': 'llvm-gsoc-2018.md',
            'title': 'Command line replacements in LLVM Binutils',
            'author': 'Paul Semel',
            'date': datetime.datetime.strptime('13-08-2018', "%d-%m-%Y"),
            'short': 'In this post, I will present the work I\'ve done during my GSoC 2018 for LLVM',
            'status': ENABLED
        },
]
