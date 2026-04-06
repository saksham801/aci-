# EduPlatform - Professional Education Website Template

A comprehensive, reusable HTML/CSS/JavaScript foundation for building education websites with admin panels, student portals, teacher dashboards, and parent portals.

## Features

### 🎨 Professional Design System
- **Modern CSS Architecture**: Built with CSS variables, modular organization, and utility-first principles
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Theme Support**: Light/Dark mode with high contrast accessibility options
- **Component Library**: Reusable UI components (cards, buttons, forms, modals, tooltips, etc.)

### 🏗️ Modular Structure
- **Base Templates**: Shared layout components (sidebar, header, footer)
- **Role-Based Sections**: Admin, Student, Teacher, Parent portals with consistent UX
- **Reusable Components**: Modals, dropdowns, tooltips, notifications, and more
- **Utility Classes**: Spacing, typography, flexbox, grid, and responsive helpers

### ⚡ Interactive Features
- **AJAX Form Handling**: Seamless form submissions with loading states
- **Theme Persistence**: User preferences saved in localStorage
- **Responsive Sidebar**: Collapsible navigation with mobile optimization
- **Interactive Elements**: Tooltips, modals, dropdowns, accordions, tabs
- **Notification System**: Toast messages and dropdown notifications

### 📱 Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## File Structure

```
├── static/
│   ├── css/
│   │   ├── reset.css           # CSS Reset
│   │   ├── variables.css       # Design tokens (colors, spacing, radii)
│   │   ├── typography.css      # Font styles and hierarchy
│   │   ├── layout.css          # Grid, flex, containers
│   │   ├── components.css      # Reusable UI components
│   │   ├── utilities.css       # Helper classes
│   │   ├── theme.css           # Dark/light theme support
│   │   ├── responsive.css      # Media queries
│   │   └── main.css            # Main stylesheet (imports all)
│   ├── js/
│   │   ├── utils.js            # Utility functions
│   │   ├── theme.js            # Theme management
│   │   ├── sidebar.js          # Sidebar functionality
│   │   ├── components.js       # Interactive components
│   │   └── main.js             # Application logic
│   └── images/
│       └── ...                 # Image assets
├── templates/
│   ├── base/
│   │   ├── base.html           # Main layout template
│   │   ├── sidebar.html        # Navigation sidebar
│   │   └── header.html         # App header with user controls
│   ├── dashboard.html          # Main dashboard
│   ├── admin/                  # Admin portal templates
│   ├── student/                # Student portal templates
│   ├── teacher/                # Teacher portal templates
│   ├── parent/                 # Parent portal templates
│   └── registration/           # Authentication templates
├── myapp/
│   ├── urls.py                 # URL routing
│   └── views.py                # View logic
└── aci/
    ├── settings.py             # Django settings
    └── urls.py                 # Project URLs
```

## Usage Instructions

### 1. Installation
```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### 2. Customizing the Design System
All design tokens are defined in `static/css/variables.css`:
- **Colors**: Primary, secondary, semantic colors with shades
- **Spacing**: 8px-based scale (0.5rem increments)
- **Radii**: Corner rounding from 2px to full circle
- **Typography**: Font sizes, weights, and line heights
- **Shadows**: Elevation levels for depth
- **Transitions**: Duration and easing functions

### 3. Adding New Pages
1. Create a new template in the appropriate section folder
2. Extend the base template: `{% extends "base/base.html" %}`
3. Add content in the `{% block content %}` section
4. Add page-specific CSS/JS in `{% block extra_css %}` and `{% block extra_js %}`

### 4. Using Components
#### Buttons
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn btn-icon">
    <i class="fas fa-icon"></i>
</button>
```

#### Cards
```html
<div class="card hover-lift">
    <div class="card-header">
        <h3 class="font-semibold">Card Title</h3>
    </div>
    <div class="card-body">
        <!-- Card content -->
    </div>
</div>
```

#### Modals
```html
<!-- Trigger -->
<button data-modal-target="myModal" class="btn btn-primary">
    Open Modal
</button>

<!-- Modal -->
<div id="myModal" class="modal-overlay hidden">
    <div class="modal">
        <div class="modal-header">
            <h3 class="modal-title">Modal Title</h3>
            <button data-modal-close class="modal-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-body">
            <!-- Modal content -->
        </div>
    </div>
</div>
```

#### Tooltips
```html
<span data-tooltip="This is a tooltip">
    Hover over me
</span>
```

### 5. Theme Customization
To customize colors, modify the variables in `static/css/variables.css`:
```css
:root {
    --primary-500: #0ea5e9;   /* Change primary color */
    --success-500: #10b981;   /* Change success color */
    --radius-md: 6px;         /* Change border radius */
}
```

To enable dark mode:
```html
<html data-theme="dark">
```
Or let users toggle it via the theme switcher in the header.

### 6. AJAX Handling
Forms and buttons with special classes get automatic AJAX handling:

```html
<!-- AJAX Form -->
<form class="ajax-form" method="POST" action="/submit/">
    {% csrf_token %}
    <!-- form fields -->
    <button type="submit">Submit</button>
</form>

<!-- AJAX Button -->
<button class="ajax-btn" data-url="/api/delete/" data-method="POST" data-confirm="Are you sure?">
    Delete Item
</button>
```

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Opera 68+

## Accessibility
- WCAG 2.1 AA compliant color contrast
- Keyboard navigable components
- ARIA labels where appropriate
- Focus visible indicators
- Responsive text scaling

## Extending the System

### Adding New Sections
1. Create a new folder in `templates/` (e.g., `instructor/`)
2. Create base template extending `base/base.html`
3. Add section-specific templates
4. Update sidebar navigation in `templates/base/sidebar.html`
5. Add corresponding URLs and views

### Adding New Components
1. Add HTML structure to relevant template
2. Add styles to `static/css/components.css`
3. Add JavaScript functionality to `static/js/components.js`
4. Export initialization in component manager if needed

## Performance Optimization
- CSS is modular and scoped
- JavaScript is lazily loaded where possible
- Images should be optimized and served in next-gen formats
- Consider implementing caching strategies for production
- Use Django's built-in caching for expensive operations

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure responsive design works across breakpoints
5. Test theme switching functionality
6. Submit a pull request

## License
This template is provided for educational and commercial use. Feel free to adapt and extend it for your specific needs.

---

Built with ❤️ for modern education platforms.