from django import forms
from posts.models import Comment

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('author', 'email', 'content')
        labels = {
                "author": "Your name",
                "email": "Your email",
                "content": "Your comment",
        }
