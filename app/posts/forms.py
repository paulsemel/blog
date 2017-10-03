from django import forms
from posts.models import Comment

class CommentForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea(attrs={'class':'form-control', 'placeholder': 'Your comment'}))
    author = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control', 'placeholder': 'Your nickname'}))
    email = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control', 'placeholder': 'Your email (won\'t appear)'}))
    class Meta:
        model = Comment
        fields = ('author', 'email', 'content')
        labels = {
                "author": "Your name",
                "email": "Your email",
                "content": "Your comment",
        }
