from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.translation import ugettext_lazy as _


class ExtendedUserManager(UserManager):
    pass


# Create your models here.
class ExtendedUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    name = models.TextField(_('name'))
    userLevel = models.IntegerField(default=0)

    objects = ExtendedUserManager()

    def __str__(self):
        return self.email

