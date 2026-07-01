// ============================================
// INSIGHTIQ - Main Application JavaScript
// ============================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // SIDEBAR TOGGLE
    // ============================================
    
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar on outside click (mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                const isClickInside = sidebar.contains(e.target) || menuToggle.contains(e.target);
                if (!isClickInside && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    // ============================================
    // DARK MODE
    // ============================================
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    const navRight = document.querySelector('.nav-right');
    if (navRight) {
        navRight.insertBefore(themeToggle, navRight.querySelector('.notifications'));
    }
    
    // Check saved theme
    const savedTheme = localStorage.getItem('insightiq-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('insightiq-theme', 'light');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('insightiq-theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // ============================================
    // NAVIGATION ACTIVE STATE
    // ============================================
    
    const navLinks = document.querySelectorAll('.sidebar-nav ul li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Remove active from all
            document.querySelectorAll('.sidebar-nav ul li').forEach(function(li) {
                li.classList.remove('active');
            });
            // Add active to parent
            this.parentElement.classList.add('active');
            
            // Update header title
            const headerTitle = document.querySelector('.nav-left h1');
            if (headerTitle) {
                headerTitle.textContent = this.textContent.trim();
            }
            
            // Close sidebar on mobile
            if (window.innerWidth <= 992 && sidebar) {
                sidebar.classList.remove('open');
            }
        });
    });

    // ============================================
    // CHART.JS - Revenue Chart (Line)
    // ============================================
    
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue 2024',
                    data: [42000, 48000, 52000, 58000, 63000, 71000, 78000, 82000, 79000, 85000, 92000, 98000],
                    borderColor: '#2563EB',
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: '#2563EB',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }, {
                    label: 'Revenue 2023',
                    data: [35000, 38000, 41000, 45000, 49000, 54000, 58000, 62000, 59000, 64000, 70000, 76000],
                    borderColor: '#06B6D4',
                    backgroundColor: 'rgba(6, 182, 212, 0.08)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    borderDash: [6, 4],
                    pointBackgroundColor: '#06B6D4',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleFont: { size: 13, weight: '600' },
                        bodyFont: { size: 12 },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { size: 11 }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: { size: 11 },
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // ============================================
    // CHART.JS - Sales Distribution (Doughnut)
    // ============================================
    
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        const salesChart = new Chart(salesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Software', 'Services', 'Hardware', 'Consulting'],
                datasets: [{
                    data: [42000, 28000, 15000, 9000],
                    backgroundColor: ['#2563EB', '#06B6D4', '#22C55E', '#F59E0B'],
                    borderWidth: 2,
                    borderColor: '#FFFFFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 16,
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleFont: { size: 13, weight: '600' },
                        bodyFont: { size: 12 },
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return context.label + ': $' + context.parsed.toLocaleString() + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }

    // ============================================
    // CHART FILTER BUTTONS
    // ============================================
    
    document.querySelectorAll('.btn-filter').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const parent = this.closest('.chart-controls');
            if (parent) {
                parent.querySelectorAll('.btn-filter').forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // ============================================
    // NOTIFICATION BELL
    // ============================================
    
    const notificationBell = document.querySelector('.notifications');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            // Simulate notification click
            const badge = this.querySelector('.badge');
            if (badge) {
                badge.textContent = '0';
                badge.style.display = 'none';
            }
            
            // Show toast
            showToast('No new notifications', 'info');
        });
    }

    // ============================================
    // TOAST NOTIFICATION SYSTEM
    // ============================================
    
    function showToast(message, type) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast-container');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            animation: slideInUp 0.4s ease;
        `;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = `
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: 16px 24px;
            box-shadow: var(--shadow-xl);
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 280px;
            max-width: 400px;
        `;
        
        const iconMap = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const colorMap = {
            success: '#22C55E',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#2563EB'
        };
        
        const icon = iconMap[type] || iconMap.info;
        const color = colorMap[type] || colorMap.info;
        
        toast.innerHTML = `
            <i class="fas ${icon}" style="color: ${color}; font-size: 20px;"></i>
            <span style="font-size: 14px; color: var(--text-primary);">${message}</span>
            <button onclick="this.closest('.toast-container').remove()" style="
                background: none;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                font-size: 16px;
                margin-left: auto;
            ">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        document.body.appendChild(toastContainer);
        
        // Auto dismiss after 5 seconds
        setTimeout(function() {
            if (toastContainer.parentNode) {
                toastContainer.style.animation = 'slideOutDown 0.3s ease';
                setTimeout(function() {
                    toastContainer.remove();
                }, 300);
            }
        }, 5000);
    }

    // ============================================
    // PAGINATION
    // ============================================
    
    document.querySelectorAll('.pagination button').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const parent = this.closest('.pagination');
            if (parent) {
                parent.querySelectorAll('button').forEach(function(b) {
                    b.classList.remove('active');
                });
                if (!this.querySelector('i')) {
                    this.classList.add('active');
                }
            }
        });
    });

    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            // Search in tables
            document.querySelectorAll('.data-table tbody tr').forEach(function(row) {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // ============================================
    // TABLE SEARCH
    // ============================================
    
    document.querySelectorAll('.table-search').forEach(function(input) {
        input.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            const table = this.closest('.table-card').querySelector('.data-table tbody');
            if (table) {
                table.querySelectorAll('tr').forEach(function(row) {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(query) ? '' : 'none';
                });
            }
        });
    });

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        // Ctrl + K for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const search = document.getElementById('globalSearch');
            if (search) {
                search.focus();
                search.select();
            }
        }
        
        // Escape to close search
        if (e.key === 'Escape') {
            const search = document.getElementById('globalSearch');
            if (search && document.activeElement === search) {
                search.blur();
            }
        }
    });

    // ============================================
    // ADD THEME TOGGLE TO FOOTER
    // ============================================
    
    // Add a small theme indicator in the sidebar footer
    const sidebarFooter = document.querySelector('.sidebar-footer');
    if (sidebarFooter) {
        const themeIndicator = document.createElement('div');
        themeIndicator.style.cssText = `
            padding: 8px 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: var(--text-muted);
            border-top: 1px solid var(--border-color);
            margin-top: 8px;
        `;
        themeIndicator.innerHTML = `
            <span>v2.0.0</span>
            <span style="margin-left: auto;">InsightIQ &copy; 2024</span>
        `;
        sidebarFooter.appendChild(themeIndicator);
    }

    // ============================================
    // CONSOLE WELCOME
    // ============================================
    
    console.log('%c InsightIQ ', 'background: #2563EB; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
    console.log('%c Transforming Business Data into Actionable Insights ', 'color: #6B7280; font-size: 14px;');

    // ============================================
    // EXPOSE TOAST FOR GLOBAL USE
    // ============================================
    
    window.showToast = showToast;

    console.log('✅ InsightIQ initialized successfully');
});
