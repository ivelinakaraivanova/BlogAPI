from django.urls import path, include
# from .views import articles_list, article_details
# from .views import ArticlesList, ArticleDetails
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')

urlpatterns = [
    # path('articles/', articles_list, name='articles_list'),
    # path('articles/<slug:slug>/', article_details, name='article_details')
    # path('articles/', ArticlesList.as_view()),
    # path('articles/<slug:slug>/', ArticleDetails.as_view())
    path('', include(router.urls))
]