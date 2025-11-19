// Educational Data Management System - Complete Application JavaScript

class EducationalDashboard {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.generatedOTP = null;
        this.charts = {};
        this.data = this.initializeData();
        this.init();
    }

    initializeData() {
        return {
            loginCredentials: {
                username: "student123",
                password: "password",
                demoMobile: "+91-9876543210"
            },
            studentProfile: {
                name: "Rahul Sharma",
                studentId: "ST2024001",
                class: "First Year Engineering",
                department: "Electronics Engineering",
                email: "rahul.sharma@sppu.edu.in",
                profileImage: "https://via.placeholder.com/80x80/4F46E5/ffffff?text=RS"
            },
            attendanceData: {
                totalClasses: 240,
                attendedClasses: 216,
                absentClasses: 24,
                attendancePercentage: 90,
                monthlyTrend: [85, 88, 92, 90, 87, 90],
                monthlyLabels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
                weeklyTrend: [95, 88, 92, 85, 90, 87, 93],
                weeklyLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
                dailyTrend: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
                dailyLabels: ["1 Oct", "2 Oct", "3 Oct", "4 Oct", "5 Oct", "6 Oct", "7 Oct", "8 Oct", "9 Oct", "10 Oct", "11 Oct", "12 Oct", "13 Oct", "14 Oct"]
            },
            feesData: {
                totalFees: 75000,
                paidAmount: 50000,
                pendingAmount: 25000,
                paymentPercentage: 67
            },
            gradesData: {
                currentSemester: {
                    semesterName: "Semester 1 (2024-25)",
                    gpa: 8.7,
                    totalCredits: 18,
                    courses: [
                        {name: "Engineering Mathematics", grade: "A", credits: 4, marks: 85, maxMarks: 100},
                        {name: "Physics", grade: "A+", credits: 4, marks: 92, maxMarks: 100},
                        {name: "Chemistry", grade: "B+", credits: 3, marks: 78, maxMarks: 100},
                        {name: "Programming in C", grade: "A", credits: 4, marks: 88, maxMarks: 100},
                        {name: "Engineering Graphics", grade: "A+", credits: 3, marks: 95, maxMarks: 100}
                    ]
                },
                classAverage: 8.2,
                departmentAverage: 7.9,
                gradeDistribution: {
                    "A+": 2,
                    "A": 2, 
                    "B+": 1,
                    "B": 0,
                    "C": 0,
                    "F": 0
                }
            }
        };
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApplication());
        } else {
            this.setupApplication();
        }
    }

    setupApplication() {
        this.setupMainDashboard();
        this.setupModals();
        this.setupStudentDashboard();
        this.setupEventListeners();
        this.addAnimations();
    }

    setupMainDashboard() {
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        dashboardCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleRoleSelection(e, card));
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleRoleSelection(e, card);
                }
            });
        });
    }

    handleRoleSelection(event, card) {
        const role = card.getAttribute('data-role');
        
        if (role === 'student') {
            this.showLoginModal();
        } else {
            this.showComingSoonModal();
        }
    }

    setupModals() {
        // Login Modal
        const loginModal = document.getElementById('loginModal');
        const closeLoginModal = document.getElementById('closeLoginModal');
        const loginForm = document.getElementById('loginForm');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');

        closeLoginModal.addEventListener('click', () => this.hideModal('loginModal'));
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showForgotPasswordModal();
        });

        // Forgot Password Modal
        const forgotPasswordModal = document.getElementById('forgotPasswordModal');
        const closeForgotPasswordModal = document.getElementById('closeForgotPasswordModal');
        const sendOtpBtn = document.getElementById('sendOtpBtn');
        const verifyOtpBtn = document.getElementById('verifyOtpBtn');

        closeForgotPasswordModal.addEventListener('click', () => this.hideModal('forgotPasswordModal'));
        sendOtpBtn.addEventListener('click', () => this.sendOTP());
        verifyOtpBtn.addEventListener('click', () => this.verifyOTP());

        // Coming Soon Modal
        const comingSoonModal = document.getElementById('comingSoonModal');
        const closeComingSoonModal = document.getElementById('closeComingSoonModal');
        const closeComingSoonBtn = document.getElementById('closeComingSoonBtn');

        closeComingSoonModal.addEventListener('click', () => this.hideModal('comingSoonModal'));
        closeComingSoonBtn.addEventListener('click', () => this.hideModal('comingSoonModal'));

        // Modal backdrop clicks
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    const modal = backdrop.closest('.modal');
                    this.hideModal(modal.id);
                }
            });
        });

        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.visible').forEach(modal => {
                    this.hideModal(modal.id);
                });
            }
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.add('visible');
            }, 10);
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('visible');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
    }

    showLoginModal() {
        this.showModal('loginModal');
        setTimeout(() => {
            document.getElementById('username').focus();
        }, 350);
    }

    showForgotPasswordModal() {
        this.hideModal('loginModal');
        setTimeout(() => {
            this.showModal('forgotPasswordModal');
            document.getElementById('mobileNumber').focus();
        }, 350);
    }

    showComingSoonModal() {
        this.showModal('comingSoonModal');
    }

    handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === this.data.loginCredentials.username && 
            password === this.data.loginCredentials.password) {
            this.loginSuccess();
        } else {
            this.showLoginError();
        }
    }

    showLoginError() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'status status--error';
        errorDiv.textContent = 'Invalid username or password';
        errorDiv.style.marginTop = 'var(--space-8)';
        
        const existingError = document.querySelector('.login-form .status--error');
        if (existingError) {
            existingError.remove();
        }
        
        document.querySelector('.login-form').appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    sendOTP() {
        const mobileNumber = document.getElementById('mobileNumber').value;
        
        if (mobileNumber.trim() === '') {
            alert('Please enter your mobile number');
            return;
        }

        // Generate random 6-digit OTP
        this.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Show OTP in demo
        document.getElementById('generatedOtp').textContent = this.generatedOTP;
        
        // Switch to OTP step
        document.getElementById('mobileStep').classList.add('hidden');
        document.getElementById('otpStep').classList.remove('hidden');
        
        setTimeout(() => {
            document.getElementById('otpInput').focus();
        }, 100);
    }

    verifyOTP() {
        const enteredOTP = document.getElementById('otpInput').value;
        
        if (enteredOTP === this.generatedOTP) {
            this.hideModal('forgotPasswordModal');
            this.showSuccessMessage('Password reset successful! You can now login with the default credentials.');
            
            // Reset forgot password form
            document.getElementById('mobileStep').classList.remove('hidden');
            document.getElementById('otpStep').classList.add('hidden');
            document.getElementById('mobileNumber').value = '';
            document.getElementById('otpInput').value = '';
        } else {
            alert('Invalid OTP. Please try again.');
        }
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'status status--success';
        successDiv.textContent = message;
        successDiv.style.position = 'fixed';
        successDiv.style.top = '20px';
        successDiv.style.right = '20px';
        successDiv.style.zIndex = '2000';
        successDiv.style.padding = 'var(--space-12) var(--space-16)';
        successDiv.style.maxWidth = '300px';
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    loginSuccess() {
        this.isLoggedIn = true;
        this.currentUser = this.data.studentProfile;
        
        this.hideModal('loginModal');
        
        setTimeout(() => {
            this.showStudentDashboard();
        }, 300);
    }

    showStudentDashboard() {
        const mainContainer = document.getElementById('mainContainer');
        const studentDashboard = document.getElementById('studentDashboard');
        
        mainContainer.classList.add('hidden');
        studentDashboard.classList.remove('hidden');
        
        setTimeout(() => {
            studentDashboard.classList.add('visible');
            this.initializeCharts();
        }, 100);
    }

    setupStudentDashboard() {
        // Sidebar navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
                
                // Update active nav link
                navLinks.forEach(nl => nl.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Logout functionality
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', () => this.logout());

        // Tab switching for fees and study materials
        this.setupTabs();
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 50);
        }

        // Initialize section-specific content
        if (sectionId === 'attendance') {
            this.initializeAttendanceCharts();
        } else if (sectionId === 'fees') {
            this.initializeFeesCharts();
        } else if (sectionId === 'grades') {
            this.initializeGradesCharts();
        }
    }

    setupTabs() {
        // Scholarship tabs
        const scholarshipTabs = document.querySelectorAll('.scholarship-tabs .tab-btn');
        scholarshipTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                
                // Update active tab
                scholarshipTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding content
                document.querySelectorAll('.scholarship-content .tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(tabName).classList.add('active');
            });
        });

        // Materials tabs
        const materialTabs = document.querySelectorAll('.materials-tabs .tab-btn');
        materialTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                
                // Update active tab
                materialTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding content
                document.querySelectorAll('.materials-content .tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(tabName).classList.add('active');
            });
        });
    }

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        
        const mainContainer = document.getElementById('mainContainer');
        const studentDashboard = document.getElementById('studentDashboard');
        
        studentDashboard.classList.remove('visible');
        
        setTimeout(() => {
            studentDashboard.classList.add('hidden');
            mainContainer.classList.remove('hidden');
            
            // Reset forms
            document.getElementById('loginForm').reset();
            
            // Reset navigation to first section
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            document.querySelector('.nav-link[data-section="attendance"]').classList.add('active');
            
            this.showSection('attendance');
        }, 300);
    }

    initializeCharts() {
        this.initializeAttendanceCharts();
    }

    initializeAttendanceCharts() {
        // Attendance Pie Chart
        const pieCtx = document.getElementById('attendancePieChart');
        if (pieCtx && !this.charts.attendancePie) {
            this.charts.attendancePie = new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['Present', 'Absent'],
                    datasets: [{
                        data: [this.data.attendanceData.attendedClasses, this.data.attendanceData.absentClasses],
                        backgroundColor: ['#1FB8CD', '#B4413C'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }

        // Monthly Trend Chart
        const monthlyCtx = document.getElementById('monthlyTrendChart');
        if (monthlyCtx && !this.charts.monthlyTrend) {
            this.charts.monthlyTrend = new Chart(monthlyCtx, {
                type: 'line',
                data: {
                    labels: this.data.attendanceData.monthlyLabels,
                    datasets: [{
                        label: 'Attendance %',
                        data: this.data.attendanceData.monthlyTrend,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#1FB8CD',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    initializeFeesCharts() {
        const feesCtx = document.getElementById('feesChart');
        if (feesCtx && !this.charts.fees) {
            this.charts.fees = new Chart(feesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Paid', 'Pending'],
                    datasets: [{
                        data: [this.data.feesData.paidAmount, this.data.feesData.pendingAmount],
                        backgroundColor: ['#1FB8CD', '#FFC185'],
                        borderWidth: 3,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }
    }

    initializeGradesCharts() {
        const gradeCtx = document.getElementById('gradeDistributionChart');
        if (gradeCtx && !this.charts.grades) {
            const gradeData = this.data.gradesData.gradeDistribution;
            this.charts.grades = new Chart(gradeCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(gradeData),
                    datasets: [{
                        label: 'Number of Courses',
                        data: Object.values(gradeData),
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }
    }

    setupEventListeners() {
        // Responsive handling
        window.addEventListener('resize', () => this.handleResize());
        
        // Performance optimization
        this.setupIntersectionObserver();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
    }

    handleResize() {
        // Update charts on resize
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.resize();
            }
        });
        
        // Handle responsive navigation
        const isMobile = window.innerWidth <= 768;
        const sidebar = document.querySelector('.dashboard-sidebar');
        const main = document.querySelector('.dashboard-main');
        
        if (isMobile) {
            sidebar?.classList.add('mobile');
            main?.classList.add('mobile');
        } else {
            sidebar?.classList.remove('mobile');
            main?.classList.remove('mobile');
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        });

        // Observe dashboard cards and sections
        document.querySelectorAll('.dashboard-card, .overview-card, .chart-container').forEach(el => {
            observer.observe(el);
        });
    }

    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    addAnimations() {
        // Animate main dashboard cards with stagger
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        });

        // Animate header elements
        this.animateHeader();
    }

    animateHeader() {
        const title = document.querySelector('.system-title');
        const subtitle = document.querySelector('.system-subtitle');
        const versionBadge = document.querySelector('.version-badge');
        
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                title.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 100);
        }
        
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(-15px)';
            setTimeout(() => {
                subtitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (versionBadge) {
            versionBadge.style.opacity = '0';
            versionBadge.style.transform = 'scale(0.8)';
            setTimeout(() => {
                versionBadge.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                versionBadge.style.opacity = '1';
                versionBadge.style.transform = 'scale(1)';
            }, 500);
        }
    }

    // Utility methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Accessibility enhancements
    setupAccessibility() {
        // Add ARIA labels
        document.querySelectorAll('.dashboard-card').forEach(card => {
            const title = card.querySelector('.card-title')?.textContent;
            const description = card.querySelector('.card-description')?.textContent;
            
            if (title && description) {
                card.setAttribute('aria-label', `${title}. ${description}`);
                card.setAttribute('role', 'button');
            }
        });

        // Skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            z-index: 1000;
            padding: 8px;
            background: var(--color-primary);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Initialize the application when DOM is ready
const educationalDashboard = new EducationalDashboard();

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('.chart-container canvas').forEach(canvas => {
            const chart = Chart.getChart(canvas);
            if (chart) {
                chart.stop();
            }
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('.chart-container canvas').forEach(canvas => {
            const chart = Chart.getChart(canvas);
            if (chart) {
                chart.render();
            }
        });
    }
});

// Service Worker registration for PWA features (if needed in future)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added here for offline functionality
    });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducationalDashboard;
}