from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta


class Task(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=500)
    deadline_date = models.DateField(
        default=datetime.now().date()+timedelta(days=7))
    isCompleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        User, related_name="tasks", on_delete=models.CASCADE, null=True)
