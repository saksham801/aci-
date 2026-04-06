from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
import json

# Mock data for demonstration
def get_mock_data():
    return {
        'total_students': 1247,
        'active_courses': 89,
        'todays_classes': 23,
        'recent_activities': [
            {
                'icon': 'user-plus',
                'title': 'New student enrolled',
                'description': 'John Doe registered for Introduction to Python',
                'time': '2 min ago'
            },
            {
                'icon': 'bell',
                'title': 'System maintenance',
                'description': 'Scheduled maintenance completed successfully',
                'time': '15 min ago'
            },
            {
                'icon': 'chart-line',
                'title': 'Monthly report generated',
                'description': 'Student performance analytics updated',
                'time': '1 hour ago'
            }
        ],
        'upcoming_events': [
            {
                'title': 'Faculty Meeting',
                'date': 'Apr 10',
                'time': '2:00 PM',
                'description': 'Monthly faculty coordination meeting'
            },
            {
                'title': 'Parent-Teacher Conference',
                'date': 'Apr 15',
                'time': '4:00 PM',
                'description': 'Quarterly progress discussions'
            }
        ],
        'users': [
            {
                'id': 1,
                'username': 'admin',
                'first_name': 'System',
                'last_name': 'Administrator',
                'email': 'admin@eduproject.com',
                'role': 'admin',
                'status': 'active',
                'last_login': 'Today, 10:30 AM',
                'profile_picture': None
            },
            {
                'id': 2,
                'username': 'john_doe',
                'first_name': 'John',
                'last_name': 'Doe',
                'email': 'john.doe@eduproject.com',
                'role': 'teacher',
                'status': 'active',
                'last_login': 'Today, 09:15 AM',
                'profile_picture': None
            },
            {
                'id': 3,
                'username': 'jane_smith',
                'first_name': 'Jane',
                'last_name': 'Smith',
                'email': 'jane.smith@eduproject.com',
                'role': 'student',
                'status': 'active',
                'last_login': 'Yesterday, 04:20 PM',
                'profile_picture': None
            }
        ],
        'student': {
            'id': 3,
            'username': 'jane_smith',
            'first_name': 'Jane',
            'last_name': 'Smith',
            'email': 'jane.smith@eduproject.com',
            'role': 'student',
            'status': 'active',
            'student_id': 'STU-2024-003',
            'date_joined': '2024-01-15',
            'profile_picture': None
        },
        'enrolled_courses_count': 5,
        'pending_assignments_count': 3,
        'average_grade': 87,
        'recent_activities': [
            {
                'icon': 'book-open',
                'title': 'Assignment submitted',
                'description': 'Completed Python Fundamentals Quiz',
                'time': '10 min ago'
            },
            {
                'icon': 'calendar-check',
                'title': 'Class attended',
                'description': 'Web Development Fundamentals',
                'time': '2 hours ago'
            }
        ],
        'upcoming_deadlines': [
            {
                'title': 'Final Project Proposal',
                'description': 'Submit your project proposal for approval',
                'due_date': '2024-04-20T14:00:00'
            },
            {
                'title': 'Midterm Exam',
                'description': 'Complete the midterm examination',
                'due_date': '2024-04-25T09:00:00'
            }
        ]
    }

def dashboard(request):
    context = get_mock_data()
    return render(request, 'dashboard.html', context)

def admin_users(request):
    context = {
        'users': get_mock_data()['users']
    }
    return render(request, 'admin/users.html', context)

def admin_create_user(request):
    if request.method == 'POST':
        # Handle user creation
        messages.success(request, 'User created successfully!')
        return redirect('admin_users')
    return render(request, 'admin/create_user.html')

def admin_edit_user(request, user_id):
    if request.method == 'POST':
        # Handle user update
        messages.success(request, 'User updated successfully!')
        return redirect('admin_users')
    context = {
        'user_id': user_id
    }
    return render(request, 'admin/edit_user.html', context)

def admin_delete_user(request, user_id):
    if request.method == 'POST':
        # Handle user deletion
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'success': True, 'message': 'User deleted successfully'})
        messages.success(request, 'User deleted successfully!')
        return redirect('admin_users')
    return render(request, 'admin/delete_user.html', {'user_id': user_id})

def student_profile(request):
    context = get_mock_data()
    return render(request, 'student/profile.html', context)

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'registration/login.html')

def logout_view(request):
    logout(request)
    return redirect('login')