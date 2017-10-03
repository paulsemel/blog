from django.db import models

class Comment(models.Model):
    post_id = models.IntegerField()
    content = models.CharField(max_length=500)
    author = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)

# Create your models here.
