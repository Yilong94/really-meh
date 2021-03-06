# Generated by Django 3.2.5 on 2021-08-02 10:16

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('vote', '0001_initial'),
        ('poll', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rating', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='poll',
            name='ratings',
            field=models.ManyToManyField(related_name='user_rating', through='rating.Rating', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='poll',
            name='votes',
            field=models.ManyToManyField(related_name='user_votes', through='vote.PollVote', to=settings.AUTH_USER_MODEL),
        ),
    ]
