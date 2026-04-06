from django.urls import path
from . import views

app_name = 'myapp'

urlpatterns = [
    # Dashboard
    path('', views.dashboard, name='dashboard'),

    # Admin URLs
    path('admin/users/', views.admin_users, name='admin_users'),
    path('admin/users/create/', views.admin_create_user, name='admin_create_user'),
    path('admin/users/<int:user_id>/edit/', views.admin_edit_user, name='admin_edit_user'),
    path('admin/users/<int:user_id>/delete/', views.admin_delete_user, name='admin_delete_user'),

    # Student URLs
    path('student/profile/', views.student_profile, name='student_profile'),

    # Auth URLs (simplified)
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]