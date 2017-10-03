from django.conf.urls import url, include
from about import views

urlpatterns = [
    url(r'^$', views.AboutView.as_view())
]
