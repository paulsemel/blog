# Generated by Django 2.1.2 on 2018-10-27 23:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_id', models.IntegerField()),
                ('content', models.CharField(max_length=500)),
                ('author', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
