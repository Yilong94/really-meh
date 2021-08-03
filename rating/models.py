from django.db import models
# from django.utils.translation import gettext_lazy as _

from rating.choices import RATING_CHOICES


class Rating(models.Model):
    user = models.ForeignKey('extended_user.ExtendedUser', on_delete=models.CASCADE)
    poll = models.ForeignKey('poll.Poll', on_delete=models.CASCADE)
    rating = models.CharField(null=True, choices=RATING_CHOICES, max_length=6)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['poll', 'user'], name="unique_user_rating")
        ]
