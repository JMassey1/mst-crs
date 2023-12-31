# Generated by Django 4.0.10 on 2023-10-04 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('num_people', models.IntegerField()),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'Booking',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Building',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
                ('floors', models.IntegerField()),
                ('open_time', models.TimeField()),
                ('close_time', models.TimeField()),
            ],
            options={
                'db_table': 'Building',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('identifier', models.CharField(max_length=50)),
                ('capacity', models.IntegerField()),
                ('size', models.IntegerField(blank=True, null=True)),
                ('tv', models.BooleanField()),
                ('projector', models.BooleanField()),
                ('whiteboard', models.BooleanField()),
                ('computers', models.IntegerField()),
            ],
            options={
                'db_table': 'Room',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'User',
                'managed': False,
            },
        ),
    ]
