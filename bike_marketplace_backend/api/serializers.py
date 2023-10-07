from rest_framework import serializers
from api.models import Listing

class ListingSerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        data = super().to_representation(obj)
        if obj.ll_user_id == self.context["self_id"]:
            data["is_self"] = True
        else:
            data["is_self"] = False
        return data

    class Meta:
        model = Listing
        fields = ('id', 'll_user_id', 'll_vehicle_type', 'll_sale_type', 'll_sale_status', 
            'll_sale_amount', 'll_pickup_location', 'll_extra_notes')
