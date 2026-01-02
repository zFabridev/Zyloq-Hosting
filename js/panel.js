// Panel-specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Demo login functionality
    const loginForm = document.getElementById('panelLoginForm');
    const demoLoginBtn = document.getElementById('demoLogin');
    const loginScreen = document.getElementById('loginScreen');
    const panelDashboard = document.getElementById('panelDashboard');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showDashboard();
        });
    }
    
    if (demoLoginBtn) {
        demoLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showDashboard();
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLogin();
        });
    }
    
    function showDashboard() {
        loginScreen.style.display = 'none';
        panelDashboard.style.display = 'grid';
        
        // Initialize tab switching
        initPanelTabs();
    }
    
    function showLogin() {
        panelDashboard.style.display = 'none';
        loginScreen.style.display = 'block';
    }
    
    // Panel tab switching
    function initPanelTabs() {
        const navLinks = document.querySelectorAll('.panel-nav a[data-tab]');
        const tabs = document.querySelectorAll('.panel-tab');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const tabId = this.getAttribute('data-tab');
                
                // Update active nav link
                navLinks.forEach(nav => {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
                
                // Show selected tab
                tabs.forEach(tab => {
                    tab.style.display = 'none';
                });
                
                const activeTab = document.getElementById(tabId + 'Tab');
                if (activeTab) {
                    activeTab.style.display = 'block';
                }
            });
        });
    }
    
    // Server action buttons
    const serverButtons = document.querySelectorAll('.server-btn');
    serverButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.querySelector('i').className;
            const serverName = this.closest('.server-card').querySelector('.server-name').textContent;
            
            // Show notification based on action
            let message = '';
            
            if (action.includes('fa-play')) {
                message = `Starting ${serverName}...`;
            } else if (action.includes('fa-stop')) {
                message = `Stopping ${serverName}...`;
            } else if (action.includes('fa-terminal')) {
                message = `Opening console for ${serverName}...`;
            } else if (action.includes('fa-cog')) {
                message = `Opening management for ${serverName}...`;
            }
            
            showNotification(message);
        });
    });
    
    // Notification system
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.panel-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'panel-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--dark);
                color: var(--text);
                padding: 15px 25px;
                border-radius: var(--radius-md);
                border-left: 4px solid var(--secondary);
                box-shadow: var(--shadow);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease;
            ">
                <i class="fas fa-info-circle" style="color: var(--secondary);"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Add CSS for notification animation
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    // Form submissions in settings
    const settingsForm = document.querySelector('#settingsTab .panel-btn-primary');
    if (settingsForm) {
        settingsForm.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Settings saved successfully!');
        });
    }
    
    // Initialize with dashboard tab active
    if (panelDashboard.style.display === 'grid') {
        initPanelTabs();
    }
});