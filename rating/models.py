from django.db import models
# from django.utils.translation import gettext_lazy as _

from thread.models import Thread
from extended_user.models import ExtendedUser


class Rating(models.Model):
    TRUE = 'TR'
    SOMEWHAT_TRUE = 'SW_TR'
    SOMEWHAT_FALSE = 'SW_FSE'
    FALSE = 'FSE'
    RATING_CHOICES = [
        (TRUE, 'True'),
        (SOMEWHAT_TRUE, 'Somewhat true'),
        (SOMEWHAT_FALSE, 'Somewhat false'),
        (FALSE, 'False'),
    ]

    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    rating = models.CharField(null=True, choices=RATING_CHOICES, max_length=6)

