from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

from api.models import Listing
from api.serializers import ListingSerializer

from django.core.exceptions import ValidationError
from django.core.validators import validate_email

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect

from decimal import Decimal

# Create your views here.
class TestView(APIView):
    def get(self, request, format=None):
        return Response({"test": "This is a test"}, status=200)

class Authentication(APIView):
    @method_decorator(csrf_protect)
    def post(self, request, format=None):
        is_logout = request.POST.get("is_logout", False)
        if is_logout is not False:
            request.session.flush()
            return Response({}, status=200)

        is_signup = request.POST.get("is_signup", False)
        name = None
        email = None
        password = None
        if is_signup is not False:
            #Sign Up
            name = request.POST.get("name", None)
        email = request.POST.get("email", None)
        password = request.POST.get("password", None)
        if is_signup is not False:
            try:
                validate_email(email)
            except ValidationError as e:
                return Repsonse({"error": "Invalid Email Format"}, status=400)
            
        if is_signup is not False:
            #Sign Up
            try:
                user_obj = User.objects.get(username=email)
            except User.DoesNotExist:
                user_obj = User.objects.create(username=email, first_name=name)
                user_obj.set_password(password)
                user_obj.save()
            else:
                return Response({"error": "Account with this email exists"}, status=400)
            return Response({"success": "Account created successfully"}, status=200)
        else:
            user_obj = authenticate(request, username=email, password=password)
            if user_obj is not None:
                login(request, user_obj)
                return Response({}, status=200)
            else:
                return Response({"error": "Invalid crendentials"}, status=400)

class Listings(APIView):
    @method_decorator(csrf_protect)
    def post(self, request, format=None):
        if request.user.is_authenticated:
            is_create = request.POST.get("is_create", False)
            if is_create is not False:
                vehicle_type = int(request.POST["vehicle_type"])
                sale_type = int(request.POST["sale_type"])
                amount = request.POST["amount"]
                pickup_location = request.POST["pickup_location"]
                extra_notes = request.POST["extra_notes"]

                amount = Decimal(amount)

                listing_obj = Listing.objects.create(ll_user_id=request.user.id, ll_vehicle_type=vehicle_type,
                    ll_sale_type=sale_type, ll_sale_amount=amount, ll_pickup_location=pickup_location, 
                    ll_extra_notes=extra_notes)
                return Response({"data": ListingSerializer(listing_obj, context={"self_id": request.user.id}).data}, status=200)
            is_reserve = request.POST.get("is_reserve", False)
            if is_reserve is not False:
                listing_id = int(request.POST["listing_id"])
                try:
                    listing_obj = Listing.objects.get(id=listing_id)
                except Listing.DoesNotExist:
                    return Response({"error": "Invalid object"}, status=400)
                if listing_obj.ll_user_id == request.user.id:
                    return Response({"error": "Cannot reserve your own bike"}, status=400)
                listing_obj.ll_sale_status = 1
                listing_obj.ll_reserved_id = request.user.id
                listing_obj.save()
                return Response({"data": ListingSerializer(listing_obj, context={"self_id": request.user.id}).data}, status=200)
        else:
            return Response({}, status=401)

    def get(self, request, format=None):
        if request.user.is_authenticated:
            is_public_reservation = request.query_params.get("is_public_reservations", False)
            is_self_reservation = request.query_params.get("is_self_reservations", False)
            is_self_reserved = request.query_params.get("is_self_reserved", False)
            if is_public_reservation is not False:
                q_listing_obj = Listing.objects.all().exclude(ll_user_id=request.user.id).filter(ll_sale_status=0).order_by('ll_sale_status')
            elif is_self_reservation is not False:
                q_listing_obj = Listing.objects.all().filter(ll_user_id=request.user.id).order_by('ll_sale_status')
            elif is_self_reserved is not False:
                q_listing_obj = Listing.objects.all().filter(ll_reserved_id=request.user.id).order_by('ll_sale_status')
            else:
                return Response({}, status=500)
                #Outside Reservations
            return Response({"data": ListingSerializer(q_listing_obj, many=True, context={"self_id": request.user.id}).data}, status=200)