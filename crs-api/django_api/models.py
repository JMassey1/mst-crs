# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    num_people = models.IntegerField()
    name = models.CharField(max_length=50, blank=True, null=True)
    room = models.ForeignKey("Room", models.DO_NOTHING, db_column="room")
    created_by = models.CharField(max_length=40)

    class Meta:
        managed = False
        db_table = "Booking"


class Building(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=False)
    longitude = models.FloatField(blank=True, null=False)
    floors = models.IntegerField()
    open_time = models.TimeField()
    close_time = models.TimeField()

    class Meta:
        managed = False
        db_table = "Building"


class Room(models.Model):
    id = models.AutoField(primary_key=True)
    identifier = models.CharField(max_length=50)
    capacity = models.IntegerField()
    size = models.IntegerField(blank=True, null=True)
    tv = models.BooleanField()
    projector = models.BooleanField()
    whiteboard = models.BooleanField()
    computers = models.IntegerField()
    building = models.ForeignKey(Building, models.DO_NOTHING, db_column="building")
    floor = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = "Room"
