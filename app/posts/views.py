import os
import markdown
from templates.myposts import meta
from django.shortcuts import render
from django.views.generic import TemplateView
from django.conf import settings
from django.utils.text import slugify
from posts.forms import CommentForm
from posts.models import Comment

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
        title = "Home"
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
        comments = Comment.objects.all().filter(post_id=post['id'])
        title = post['title']
        f = open(os.path.join(os.path.dirname(meta.__file__), post['filename']), 'r')
        content = f.read()
        post['html'] = markdown.markdown(content, ['codehilite', 'markdown.extensions.extra'])
        f.close()
        del posts, f, content
        form = CommentForm()
        return render(request, self.template_name, locals())
    def post(self, request, slug):
        posts = get_posts()
        post = None
        for p in posts:
            if (slugify(p['title']) == slug):
                post = p
        if post is None:
            return render(request, "404.html")
        comments = Comment.objects.all().filter(post_id=post['id'])
        form = CommentForm(request.POST)
        title = post['title']
        if form.is_valid():
            inst = form.save(commit=False)
            inst.post_id = post['id']
            inst.save()
        return render(request, self.template_name, locals())
