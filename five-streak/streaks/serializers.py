from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Streak


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class StreakSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Streak
        fields = '__all__'

    def create(self, validated_data):
        new_streak = None
        try:
            request = self.context.get('request')
            if request and hasattr(request, 'user'):
                user = request.user
            assert len(user.streak_set.filter(active=True)) == 0

            new_streak = Streak.objects.create(user=user)
            new_streak.save()
        except (User.DoesNotExist, AssertionError):
            raise serializers.ValidationError('Error creating streak: current user already has an active streak')

        return new_streak
