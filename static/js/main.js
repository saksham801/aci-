/* Main Application Logic */
class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
        this.loadInitialData();
        this.setupResponsiveHandlers();
    }

    setupEventListeners() {
        // Handle form submissions with AJAX
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('ajax-form')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });

        // Handle button clicks with AJAX
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('ajax-btn')) {
                e.preventDefault();
                this.handleButtonClick(e.target);
            }
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+/ for search focus
            if (e.ctrlKey && e.key === '/' && !e.target.matches('input, textarea, select')) {
                e.preventDefault();
                const searchInput = document.querySelector('.app-header input[type="text"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Escape key to close modals/dropdowns
            if (e.key === 'Escape') {
                document.querySelectorAll('.user-dropdown, .notification-dropdown, .message-dropdown').forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });
            }
        });
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const url = form.action || window.location.href;
        const method = form.method.toUpperCase() || 'GET';

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner small-spinner mr-2"></span>Processing...';

        fetch(url, {
            method: method,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': this.getCookie('csrftoken')
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast({
                    title: 'Success',
                    message: data.message || 'Operation completed successfully',
                    type: 'success'
                });

                // Redirect if specified
                if data.redirect:
                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 1500);
                }

                // Reset form if specified
                if data.reset_form !== false:
                    form.reset();
            } else {
                showToast({
                    title: 'Error',
                    message: data.message || 'An error occurred',
                    type: 'error'
                });
            }
        })
        .catch(error => {
            showToast({
                title: 'Error',
                message: 'Network error. Please try again.',
                type: 'error'
            });
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    }

    handleButtonClick(button) {
        const url = button.dataset.url || button.href;
        const method = button.dataset.method || 'GET';
        const confirmMessage = button.dataset.confirm;

        if (confirmMessage && !window.confirm(confirmMessage)) {
            return;
        }

        // Show loading state
        const originalHtml = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<span class="spinner small-spinner mr-2"></span>Processing...';

        fetch(url, {
            method: method,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': this.getCookie('csrftoken')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast({
                    title: 'Success',
                    message: data.message || 'Operation completed successfully',
                    type: 'success'
                });

                // Handle redirect
                if (data.redirect) {
                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 1500);
                }

                // Handle reload
                if (data.reload) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }

                // Handle element updates
                if (data.update_element) {
                    const element = document.getElementById(data.update_element.id);
                    if (element) {
                        element.innerHTML = data.update_element.content;
                    }
                }
            } else {
                showToast({
                    title: 'Error',
                    message: data.message || 'An error occurred',
                    type: 'error'
                });
            }
        })
        .catch(error => {
            showToast({
                title: 'Error',
                message: 'Network error. Please try again.',
                type: 'error'
            });
            console.error('Error:', error);
        })
        .finally(() => {
            button.disabled = false;
            button.innerHTML = originalHtml;
        });
    }

    checkAuthStatus() {
        // This would typically check with an API endpoint
        // For now, we'll rely on template context
    }

    loadInitialData() {
        // Load any initial data needed for the dashboard
        // This could include notifications, messages, etc.
    }

    setupResponsiveHandlers() {
        const handleResize = () => {
            // Adjust layout based on screen size
            if (window.innerWidth <= 768) {
                // Mobile adjustments
            } else {
                // Desktop adjustments
            }
        };

        window.addEventListener('resize', Utils.throttle(handleResize, 250));
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
}

// Initialize app on DOM load
domReady(() => {
    App.getInstance();
});

// Export globally for debugging
window.App = App;