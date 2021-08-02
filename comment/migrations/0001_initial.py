# Generated by Django 3.2.5 on 2021-07-30 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('editedAt', models.DateTimeField(default=None)),
                ('publishedAt', models.DateTimeField(default=None)),
            ],
        ),
    ]