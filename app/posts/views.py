import os
import markdown
from templates.myposts import meta
from django.shortcuts import render
from django.views.generic import TemplateView
from django.utils.text import slugify

def get_posts():
    p = meta.POSTS_META
    posts = []
    for elt in p:
        if elt['status'] == meta.ENABLED:
            posts.append(elt)
    return posts

class PostList(TemplateView):
    template_name = "posts/index.html"
    def get(self, request):
        posts = get_posts()
        for post in posts:
            post['slug'] = slugify(post['title'])
        title = "Posts"
        return render(request, self.template_name, locals())

# Create your views here.

class PostDetail(TemplateView):
    template_name = "posts/detail.html"
    def get(self, request, slug):
        posts = get_posts()
        post = None
        for p in posts:
            if (slugify(p['title']) == slug):
                post = p
        if post is None:
            return render(request, "404.html")
        title = post['title']
        f = open(os.path.join(os.path.dirname(meta.__file__), post['filename']), 'r')
        content = f.read()
        post['html'] = markdown.markdown(content, ['codehilite', 'markdown.extensions.extra'])
        del posts, f, content
        return render(request, self.template_name, locals())
    def post(self, request, slug):
        posts = get_posts()
        post = None
        for p in posts:
            if (slugify(p['title']) == slug):
                post = p
        if post is None:
            return render(request, "404.html")
        return render(request, self.template_name, locals())
