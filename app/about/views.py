import os
from django.shortcuts import render
from django.views.generic import TemplateView

class AboutView(TemplateView):
    template_name = "about/index.html"
    def get(self, request):
        return render(request, self.template_name, locals())

# Create your views here.
