# Status :
#   - 0 : disabled
#   - 1 : enabled

# Be careful, comments are linked with posts with the id field. If those are
# changed, comments will be losts or even worst exchanged.
DISABLED = 0
ENABLED = 1
TESTING = 2
POSTS_META = [
        {
            'id': 0,
            'filename': 'test.md',
            'title': 'Post test',
            'author': 'Paul Semel',
            'date': '02-10-2017',
            'short': 'This post is a test post dealing with a lot of different tests, read it, you wont be disappointed',
            'status': DISABLED
        },
        {
            'id': 1,
            'filename': 'valgrind.md',
            'title': 'Detecting bad stack usages using Valgrind Core API',
            'author': 'Paul Semel',
            'date': '02-10-2017',
            'short': 'In this post, we will see what strategies we must employ to \
                      be able to detect bad stack usage such as buffer overflows.',
            'status': ENABLED
        },
]
