from django.urls import path

from backend.views import articles_list, article_details

urlpatterns = [
    path('articles/', articles_list, name='articles_list'),
    path('articles/<slug:slug>/', article_details, name='article_details')
]