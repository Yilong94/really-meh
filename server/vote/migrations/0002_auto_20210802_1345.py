# Generated by Django 3.2.5 on 2021-08-02 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='commentvote',
            name='direction',
            field=models.CharField(choices=[('UP', 'Up'), ('DWN', 'Down')], max_length=6, null=True),
        ),
        migrations.AddField(
            model_name='pollvote',
            name='direction',
            field=models.CharField(choices=[('UP', 'Up'), ('DWN', 'Down')], max_length=6, null=True),
        ),
    ]