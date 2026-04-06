/* Sidebar Management */
class SidebarManager {
    constructor() {
        this.isCollapsed = false;
        this.init();
    }

    init() {
        this.setupToggle();
        this.setupSubmenu();
        this.setupResponsiveBehavior();
    }

    setupToggle() {
        const toggleBtn = document.getElementById('sidebarToggle');
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');

        if (toggleBtn && sidebar && mainContent) {
            toggleBtn.addEventListener('click', () => {
                this.isCollapsed = !this.isCollapsed;
                sidebar.classList.toggle('collapsed');
                mainContent.classList.toggle('collapsed');

                // Store preference
                localStorage.setItem('sidebarCollapsed', this.isCollapsed);
            });
        }

        // Restore state on load
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState === 'true') {
            this.isCollapsed = true;
            document.querySelector('.sidebar')?.classList.add('collapsed');
            document.querySelector('.main-content')?.classList.add('collapsed');
        }
    }

    setupSubmenu() {
        document.querySelectorAll('.has-children > .nav-link').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = item.parentElement;
                parent.classList.toggle('open');

                // Close other submenus
                document.querySelectorAll('.has-children').forEach(other => {
                    if (other !== parent) {
                        other.classList.remove('open');
                    }
                });
            });
        });
    }

    setupResponsiveBehavior() {
        // Handle resize events
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                // Mobile view - sidebar starts collapsed
                document.querySelector('.sidebar')?.classList.add('collapsed');
                document.querySelector('.main-content')?.classList.remove('collapsed');
                this.isCollapsed = true;
            } else {
                // Desktop view - restore from saved state
                const savedState = localStorage.getItem('sidebarCollapsed');
                const shouldBeCollapsed = savedState === 'true';
                document.querySelector('.sidebar')?.classList.toggle('collapsed', shouldBeCollapsed);
                document.querySelector('.main-content')?.classList.toggle('collapsed', shouldBeCollapsed);
                this.isCollapsed = shouldBeCollapsed;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
    }

    static getInstance() {
        if (!SidebarManager.instance) {
            SidebarManager.instance = new SidebarManager();
        }
        return SidebarManager.instance;
    }
}

// Initialize sidebar manager on DOM load
domReady(() => {
    SidebarManager.getInstance();
});