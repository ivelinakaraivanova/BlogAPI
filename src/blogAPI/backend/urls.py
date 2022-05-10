from django.urls import path

from backend.views import ArticlesList, ArticleDetails

urlpatterns = [
    # path('articles/', articles_list, name='articles_list'),
    # path('articles/<slug:slug>/', article_details, name='article_details')
    path('articles/', ArticlesList.as_view()),
    path('articles/<slug:slug>/', ArticleDetails.as_view())
]