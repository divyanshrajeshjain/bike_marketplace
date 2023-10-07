from django.db import models

# Create your models here.
class Listing(models.Model):
    ll_user_id = models.IntegerField()
    ll_vehicle_type = models.IntegerField()
    ll_sale_type = models.IntegerField()
    ll_sale_amount = models.DecimalField(decimal_places=2, max_digits=100)
    ll_pickup_location = models.CharField(max_length=1000)
    ll_extra_notes = models.CharField(max_length=1000)

    ll_sale_status = models.IntegerField(default=0)
    ll_reserved_id = models.IntegerField(default=-1)