/* Interactive Components */
class ComponentManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupDropdowns();
        this.setupTooltips();
        this.setupModals();
        this.setupToasts();
        this.setupAccordions();
        this.setupTabs();
    }

    setupDropdowns() {
        // User dropdown
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.querySelector('.user-dropdown');

        if (userMenuBtn && userDropdown) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('hidden');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                    userDropdown.classList.add('hidden');
                }
            });
        }

        // Notification dropdown
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationDropdown = document.querySelector('.notification-dropdown');

        if (notificationBtn && notificationDropdown) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationDropdown.classList.toggle('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
                    notificationDropdown.classList.add('hidden');
                }
            });
        }

        // Message dropdown
        const messageBtn = document.getElementById('messageBtn');
        const messageDropdown = document.querySelector('.message-dropdown');

        if (messageBtn && messageDropdown) {
            messageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                messageDropdown.classList.toggle('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!messageBtn.contains(e.target) && !messageDropdown.contains(e.target)) {
                    messageDropdown.classList.add('hidden');
                }
            });
        }
    }

    setupTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltipText = element.getAttribute('data-tooltip');
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip-text';
                tooltip.textContent = tooltipText;
                element.appendChild(tooltip);

                // Position tooltip
                const rect = element.getBoundingClientRect();
                tooltip.style.top = `${rect.top + window.scrollY - 10}px`;
                tooltip.style.left = `${rect.left + window.scrollX + element.offsetWidth / 2 - tooltip.offsetWidth / 2}px`;
            });

            element.addEventListener('mouseleave', (e) => {
                const tooltip = element.querySelector('.tooltip-text');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }

    setupModals() {
        // Open modal
        document.querySelectorAll('[data-modal-target]').forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal-target');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        document.querySelectorAll('[data-modal-close]').forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    const modal = overlay.querySelector('.modal');
                    if (modal) {
                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                    document.body.style.overflow = '';
                });
            }
        });
    }

    setupToasts() {
        // Toast container
        if (!document.getElementById('toastContainer')) {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'fixed top-4 right-4 z-50 space-y-3';
            document.body.appendChild(container);
        }
    }

    showToast({ title, message, type = 'info', duration = 3000 } = {}) {
        const toast = document.createElement('div');
        toast.className = `flex items-start space-x-4 bg-white rounded-lg shadow-lg p-4 border-l-4 transform transition-transform duration-300 toast-${
            type === 'success' ? 'border-success-500' :
            type === 'error' ? 'border-error-500' :
            type === 'warning' ? 'border-warning-500' :
            'border-info-500'
        }`;

        toast.innerHTML = `
            <div class="flex-shrink-0">
                <i class="fas fa-${
                    type === 'success' ? 'check-circle' :
                    type === 'error' ? 'exclamation-triangle' :
                    type === 'warning' ? 'exclamation-circle' :
                    'info-circle'
                } text-${
                    type === 'success' ? 'success-500' :
                    type === 'error' ? 'error-500' :
                    type === 'warning' ? 'warning-500' :
                    'info-500'
                } text-2xl"></i>
            </div>
            <div>
                ${title ? `<h4 class="font-medium text-gray-900 mb-1">${title}</h4>` : ''}
                <p class="text-sm text-gray-700">${message}</p>
            </div>
            <button class="ml-auto text-gray-400 hover:text-gray-500" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        const container = document.getElementById('toastContainer');
        container.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.remove('-translate-x-full');
            toast.classList.add('translate-x-0');
        });

        // Auto remove after duration
        setTimeout(() => {
            toast.classList.add('-translate-x-full');
            toast.classList.remove('translate-x-0');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    setupAccordions() {
        document.querySelectorAll('[data-accordion-target]').forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-accordion-target');
                const target = document.getElementById(targetId);
                const isOpen = button.getAttribute('aria-expanded') === 'true';

                button.setAttribute('aria-expanded', String(!isOpen));
                target.classList.toggle('hidden');
            });
        });
    }

    setupTabs() {
        document.querySelectorAll('[data-tab-target]').forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-tab-target');
                tab.classList.add('active');
                document.getElementById(targetId).classList.add('active');

                // Deactivate other tabs
                document.querySelectorAll(`[data-tab-target]`).forEach(otherTab => {
                    if (otherTab !== tab) {
                        otherTab.classList.remove('active');
                        const otherTargetId = otherTab.getAttribute('data-tab-target');
                        document.getElementById(otherTargetId).classList.remove('active');
                    }
                });
            });
        });
    }

    static getInstance() {
        if (!ComponentManager.instance) {
            ComponentManager.instance = new ComponentManager();
        }
        return ComponentManager.instance;
    }
}

// Initialize component manager on DOM load
domReady(() => {
    ComponentManager.getInstance();
});

// Expose toast function globally
window.showToast = function(options) {
    ComponentManager.getInstance().showToast(options);
};