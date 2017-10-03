import os
import markdown
from MarkdownBlankLine import blankline
from django.shortcuts import render
from django.views.generic import TemplateView

class AboutView(TemplateView):
    template_name = "about/index.html"
    def get(self, request):
        f = open("templates/about/about.md", "r")
        content = f.read()
        html = markdown.markdown(content, ['codehilite', 'markdown.extensions.extra', 'markdown.extensions.nl2br', blankline.BlankLineExtension()])
        f.close()
        del content, f
        return render(request, self.template_name, locals())

# Create your views here.
