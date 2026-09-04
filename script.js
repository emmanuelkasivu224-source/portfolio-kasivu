/* =================================
   PORTFOLIO JAVASCRIPT
================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeDarkMode();
    initializeMobileMenu();
    initializeCounters();
    initializeSkillBars();
    initializeNavigationHighlight();
    initializeBackToTop();
    initializeScrollReveal();
    initializeContactForm();
    initializeTypingEffect();
    initializeMoreProjectsModal();
    initializeHrPowerBiModal();
    initializeSalesExcelModal();

});

/* =================================
   DARK MODE
================================= */

function initializeDarkMode() {

    const darkBtn = document.getElementById("darkBtn");

    if (!darkBtn) return;

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("dark");
        document.documentElement.classList.toggle("dark");

        const icon = darkBtn.querySelector("i");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

            if (icon) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }

        } else {

            localStorage.setItem("theme", "light");

            if (icon) {
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }

        }

    });

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");
        document.body.classList.add("dark");
        document.documentElement.classList.add("dark");

        const icon = darkBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }

    }

}

/* =================================
   MOBILE MENU
================================= */

function initializeMobileMenu() {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuBtn || !mobileMenu) return;

    const icon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");

        if (icon) {
            if (mobileMenu.classList.contains("hidden")) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            } else {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add("hidden");
            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });

}

/* =================================
   ANIMATED COUNTERS
================================= */

function initializeCounters() {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");

        let count = 0;

        const updateCounter = () => {

            const increment = target / 100;

            if (count < target) {

                count += increment;

                counter.innerText = Math.floor(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

    });

}

/* =================================
   SKILL BAR ANIMATION
================================= */

function initializeSkillBars() {

    const bars = document.querySelectorAll(".progress span");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const width = entry.target.dataset.width;

                entry.target.style.width = width;

            }

        });

    });

    bars.forEach(bar => {

        if (!bar.dataset.width && bar.style.width) {
            bar.dataset.width = bar.style.width;
        }

        bar.style.width = "0";

        observer.observe(bar);

    });

}

/* =================================
   ACTIVE NAVIGATION
================================= */

function initializeNavigationHighlight() {

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("text-cyan-400");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("text-cyan-400");

            }

        });

    });

}

/* =================================
   BACK TO TOP BUTTON
================================= */

function initializeBackToTop() {

    const button = document.createElement("button");

    button.innerHTML = "↑";

    button.id = "backToTop";

    document.body.appendChild(button);

    Object.assign(button.style, {

        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "50px",
        height: "50px",
        border: "none",
        borderRadius: "50%",
        background: "#06b6d4",
        color: "#fff",
        fontSize: "20px",
        cursor: "pointer",
        display: "none",
        zIndex: "999"

    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            button.style.display = "block";

        } else {

            button.style.display = "none";

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* =================================
   SCROLL REVEAL ANIMATION
================================= */

function initializeScrollReveal() {

    const elements = document.querySelectorAll(
        ".service-card, .project-card, .review-card, .cert-card"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    });

    elements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition = "all 0.8s ease";

        observer.observe(el);

    });

}

/* =================================
   CONTACT FORM INTEGRATION (GOOGLE FORM & SHEET)
================================= */

// Replace this URL with your Google Apps Script Web App URL after deploying (see GOOGLE_SHEETS_SETUP.md)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxdURtKnfUBfdXevu1tFvyWlWT1cMwyJ4jN8MD5u6APnL_RK6IShJSDYK7PtcGeg7l92g/exec";

function initializeContactForm() {

    const form = document.getElementById("contactForm");
    if (!form) return;

    const alertBox = document.getElementById("contactFormAlert");
    const alertIcon = document.getElementById("contactFormAlertIcon");
    const alertMsg = document.getElementById("contactFormAlertMessage");
    const submitBtn = document.getElementById("submitBtn");
    const btnText = document.getElementById("btnText");
    const btnIcon = document.getElementById("btnIcon");
    const btnSpinner = document.getElementById("btnSpinner");

    function showAlert(type, message) {
        if (!alertBox || !alertMsg || !alertIcon) return;

        alertBox.className = "mb-6 p-4 rounded-xl text-sm flex items-start gap-3 transition-all duration-300 ";

        if (type === "success") {
            alertBox.classList.add("alert-success");
            alertIcon.className = "fas fa-check-circle text-lg mt-0.5 text-emerald-400";
        } else if (type === "error") {
            alertBox.classList.add("alert-error");
            alertIcon.className = "fas fa-exclamation-triangle text-lg mt-0.5 text-rose-400";
        } else {
            alertBox.classList.add("alert-info");
            alertIcon.className = "fas fa-info-circle text-lg mt-0.5 text-cyan-400";
        }

        alertMsg.innerHTML = message;
        alertBox.classList.remove("hidden");

        // Scroll alert into view if needed
        alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function hideAlert() {
        if (alertBox) alertBox.classList.add("hidden");
    }

    function setSubmittingState(isSubmitting) {
        if (!submitBtn) return;

        submitBtn.disabled = isSubmitting;
        if (isSubmitting) {
            submitBtn.classList.add("opacity-80", "cursor-not-allowed");
            if (btnText) btnText.textContent = "Sending Message...";
            if (btnIcon) btnIcon.classList.add("hidden");
            if (btnSpinner) btnSpinner.classList.remove("hidden");
        } else {
            submitBtn.classList.remove("opacity-80", "cursor-not-allowed");
            if (btnText) btnText.textContent = "Send Message";
            if (btnIcon) btnIcon.classList.remove("hidden");
            if (btnSpinner) btnSpinner.classList.add("hidden");
        }
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        hideAlert();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const subject = subjectInput ? subjectInput.value.trim() : "Portfolio Contact Form Inquiry";
        const message = messageInput ? messageInput.value.trim() : "";

        // Client-side validation
        if (!name || !email || !message) {
            showAlert("error", "<strong>Missing Fields:</strong> Please fill in your name, email, and message before sending.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showAlert("error", "<strong>Invalid Email:</strong> Please enter a valid email address (e.g. john@example.com).");
            return;
        }

        setSubmittingState(true);

        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        };

        // Check if user has set their deployed Google Apps Script URL
        const isUrlConfigured = GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("GOOGLE_SHEETS_SETUP.md");

        if (isUrlConfigured) {
            try {
                // Post form data to Google Apps Script Web App
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                showAlert(
                    "success",
                    "<strong>Message Sent Successfully! 🎉</strong><br>Thank you, " + name + "! Your message has been received."
                );

                form.reset();

            } catch (err) {
                console.error("Submission Error:", err);
                showAlert(
                    "error",
                    "<strong>Submission Error:</strong> Unable to send message. Please try again or reach out directly via <a href='mailto:emmanuelkasivu224@gmail.com' class='underline font-bold'>emmanuelkasivu224@gmail.com</a> or <a href='https://wa.me/254116089094' target='_blank' class='underline font-bold'>WhatsApp</a>."
                );
            } finally {
                setSubmittingState(false);
            }
        } else {
            // Demonstration / Fallback Mode when Script URL is not yet connected by user
            setTimeout(() => {
                showAlert(
                    "success",
                    "<strong>Form Ready & Validated! 🎉</strong><br>Thank you <strong>" + name + "</strong>! To enable direct Google Sheet saving and instant Google email notifications, follow the quick 2-minute setup guide in <code class='bg-slate-800 px-2 py-1 rounded text-cyan-300'>GOOGLE_SHEETS_SETUP.md</code>."
                );
                form.reset();
                setSubmittingState(false);
            }, 800);
        }
    });

}

/* =================================
   SMOOTH SCROLLING
================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

/* =================================
   TYPING EFFECT FOR HERO SECTION
================================= */

function initializeTypingEffect() {
    const typingTextSpan = document.getElementById("typing-text");
    if (!typingTextSpan) return;

    const roles = [
        "a Data Analyst",
        "a Power BI Developer",
        "a Web Developer",
        "an IT Support Specialist",
        "a Software Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Delete text
            typingTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // speed up deletion
        } else {
            // Write text
            typingTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // standard typing speed
        }

        // Handle typing state transitions
        if (!isDeleting && charIndex === currentRole.length) {
            // Wait before starting to delete
            typingSpeed = 2000; // Pause at the end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start the typing effect
    type();
}

/* =================================
   MORE PROJECTS MODAL
================================= */

function initializeMoreProjectsModal() {
    const openBtn = document.getElementById("openMoreProjectsBtn");
    const closeBtn = document.getElementById("closeMoreProjectsBtn");
    const modal = document.getElementById("moreProjectsModal");
    const modalContainer = document.getElementById("modalContainer");

    if (!openBtn || !modal || !modalContainer) return;

    function openModal() {
        modal.classList.remove("hidden");
        // Trigger reflow for smooth animation
        void modal.offsetWidth;
        modalContainer.classList.remove("scale-95", "opacity-0");
        modalContainer.classList.add("scale-100", "opacity-100");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modalContainer.classList.remove("scale-100", "opacity-100");
        modalContainer.classList.add("scale-95", "opacity-0");
        setTimeout(() => {
            modal.classList.add("hidden");
            document.body.style.overflow = "";
        }, 200);
    }

    openBtn.addEventListener("click", openModal);

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });
}

/* =================================
   HR POWER BI INTERACTIVE DASHBOARD
================================= */

function initializeHrPowerBiModal() {
    const openBtn = document.getElementById("openHrPowerBiBtn");
    const closeBtn = document.getElementById("closeHrPowerBiBtn");
    const modal = document.getElementById("hrPowerBiModal");
    const deptSlicerBox = document.getElementById("hrDeptSlicerBox");
    const genderSlicerBox = document.getElementById("hrGenderSlicerBox");

    if (!openBtn || !modal) return;

    let hrCharts = {};
    let selectedDept = "All";
    let selectedGender = "All";

    function openModal() {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        if (typeof Chart !== "undefined" && !hrCharts.deptChart) {
            renderHrCharts();
        }
    }

    function closeModal() {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    }

    openBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    // Slicer button event listeners
    if (deptSlicerBox) {
        deptSlicerBox.querySelectorAll(".slicer-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                deptSlicerBox.querySelectorAll(".slicer-btn").forEach(b => {
                    b.classList.remove("active", "bg-amber-500", "text-slate-950", "font-bold");
                    b.classList.add("bg-slate-900", "text-slate-300");
                    const check = b.querySelector(".fa-check");
                    if (check) check.remove();
                });
                btn.classList.remove("bg-slate-900", "text-slate-300");
                btn.classList.add("active", "bg-amber-500", "text-slate-950", "font-bold");
                btn.insertAdjacentHTML("beforeend", ' <i class="fas fa-check text-xs"></i>');
                selectedDept = btn.getAttribute("data-value");
                updateHrDashboard();
            });
        });
    }

    if (genderSlicerBox) {
        genderSlicerBox.querySelectorAll(".slicer-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                genderSlicerBox.querySelectorAll(".slicer-btn").forEach(b => {
                    b.classList.remove("active", "bg-amber-500", "text-slate-950", "font-bold");
                    b.classList.add("bg-slate-900", "text-slate-300");
                    const check = b.querySelector(".fa-check");
                    if (check) check.remove();
                });
                btn.classList.remove("bg-slate-900", "text-slate-300");
                btn.classList.add("active", "bg-amber-500", "text-slate-950", "font-bold");
                btn.insertAdjacentHTML("beforeend", ' <i class="fas fa-check text-xs"></i>');
                selectedGender = btn.getAttribute("data-value");
                updateHrDashboard();
            });
        });
    }

    function getHrData() {
        const baseDepts = {
            "R&D": { emp: 120, att: 12.5, salary: 6800, sat: 3.3 },
            "Sales": { emp: 110, att: 19.8, salary: 6100, sat: 2.9 },
            "Human Resources": { emp: 45, att: 8.9, salary: 5900, sat: 3.4 },
            "Software Engineering": { emp: 140, att: 16.4, salary: 7200, sat: 3.2 },
            "Marketing": { emp: 45, att: 13.3, salary: 5400, sat: 3.1 },
            "Finance": { emp: 40, att: 10.0, salary: 6500, sat: 3.2 }
        };

        const deptVal = selectedDept;
        const genderVal = selectedGender;

        let totalEmp = 0;
        let totalAtt = 0;
        let totalSalSum = 0;
        let totalSatSum = 0;

        let filteredDepts = [];

        Object.keys(baseDepts).forEach(d => {
            if (deptVal === "All" || deptVal === d) {
                let multiplier = genderVal === "Female" ? 0.48 : (genderVal === "Male" ? 0.48 : 1);
                let emp = Math.round(baseDepts[d].emp * multiplier);
                let att = baseDepts[d].att;
                let salary = baseDepts[d].salary;
                let sat = baseDepts[d].sat;

                totalEmp += emp;
                totalAtt += Math.round(emp * (att / 100));
                totalSalSum += salary * emp;
                totalSatSum += sat * emp;

                filteredDepts.push({ name: d, emp, att, salary });
            }
        });

        const overallAttRate = totalEmp > 0 ? ((totalAtt / totalEmp) * 100).toFixed(1) : "0.0";
        const avgSalary = totalEmp > 0 ? Math.round(totalSalSum / totalEmp) : 0;
        const avgSat = totalEmp > 0 ? (totalSatSum / totalEmp).toFixed(2) : "0.00";

        return { totalEmp, overallAttRate, avgSalary, avgSat, filteredDepts };
    }

    function updateHrKpis() {
        const data = getHrData();
        const totalEmpEl = document.getElementById("hrTotalEmp");
        const attRateEl = document.getElementById("hrAttritionRate");
        const avgSalaryEl = document.getElementById("hrAvgSalary");
        const satPctEl = document.getElementById("hrSatPct");

        if (totalEmpEl) totalEmpEl.innerText = data.totalEmp;
        if (attRateEl) attRateEl.innerText = data.overallAttRate + "%";
        if (avgSalaryEl) avgSalaryEl.innerText = "$" + data.avgSalary.toLocaleString();
        if (satPctEl) satPctEl.innerText = data.avgSat + " / 4.0";
    }

    function updateHrDashboard() {
        updateHrKpis();
        if (hrCharts.deptChart) {
            const d = getHrData();
            hrCharts.deptChart.data.labels = d.filteredDepts.map(x=>x.name);
            hrCharts.deptChart.data.datasets[0].data = d.filteredDepts.map(x=>x.att);
            hrCharts.deptChart.update();
            
            hrCharts.salaryChart.data.labels = d.filteredDepts.map(x=>x.name);
            hrCharts.salaryChart.data.datasets[0].data = d.filteredDepts.map(x=>x.salary);
            hrCharts.salaryChart.update();
        }
    }

    function renderHrCharts() {
        updateHrKpis();
        const data = getHrData();

        const labels = data.filteredDepts.map(d => d.name);
        const attRates = data.filteredDepts.map(d => d.att);
        const salaries = data.filteredDepts.map(d => d.salary);

        // Chart 1: Department Attrition Rate
        const ctxDept = document.getElementById("hrDeptChart");
        if (ctxDept) {
            hrCharts.deptChart = new Chart(ctxDept, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Attrition Rate (%)",
                        data: attRates,
                        backgroundColor: "rgba(245, 158, 11, 0.8)",
                        borderColor: "#f59e0b",
                        borderWidth: 1.5,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { ticks: { color: "#94a3b8" }, grid: { color: "#334155" } },
                        x: { ticks: { color: "#94a3b8" }, grid: { display: false } }
                    }
                }
            });
        }

        // Chart 2: Department Salary
        const ctxSal = document.getElementById("hrSalaryChart");
        if (ctxSal) {
            hrCharts.salaryChart = new Chart(ctxSal, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Avg Monthly Salary ($)",
                        data: salaries,
                        backgroundColor: "rgba(16, 185, 129, 0.8)",
                        borderColor: "#10b981",
                        borderWidth: 1.5,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { ticks: { color: "#94a3b8" }, grid: { color: "#334155" } },
                        x: { ticks: { color: "#94a3b8" }, grid: { display: false } }
                    }
                }
            });
        }

        // Chart 3: Overtime Attrition
        const ctxOt = document.getElementById("hrOvertimeChart");
        if (ctxOt) {
            hrCharts.otChart = new Chart(ctxOt, {
                type: "doughnut",
                data: {
                    labels: ["Overtime Yes (High Risk)", "Overtime No (Low Risk)"],
                    datasets: [{
                        data: [31.2, 9.1],
                        backgroundColor: ["#f43f5e", "#10b981"],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: "#cbd5e1" } } }
                }
            });
        }

        // Chart 4: Education Field
        const ctxEdu = document.getElementById("hrEduChart");
        if (ctxEdu) {
            hrCharts.eduChart = new Chart(ctxEdu, {
                type: "pie",
                data: {
                    labels: ["Life Sciences", "Technical Degree", "Medical", "Marketing", "HR", "Other"],
                    datasets: [{
                        data: [38, 26, 18, 10, 5, 3],
                        backgroundColor: ["#38bdf8", "#818cf8", "#34d399", "#fbbf24", "#f472b6", "#a78bfa"],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: "#cbd5e1" } } }
                }
            });
        }
    }
}


/* =================================
   EXCEL SALES ANALYTICS INTERACTIVE DASHBOARD
================================= */

function initializeSalesExcelModal() {
    const openBtn = document.getElementById("openSalesExcelBtn");
    const closeBtn = document.getElementById("closeSalesExcelBtn");
    const modal = document.getElementById("salesExcelModal");

    const tabExecBtn = document.getElementById("tabExecutiveBtn");
    const tabPivBtn = document.getElementById("tabPivotBtn");
    const tabRawBtn = document.getElementById("tabRawDataBtn");
    const tabInsBtn = document.getElementById("tabInsightsBtn");

    const tabExecContent = document.getElementById("tabExecutiveContent");
    const tabPivContent = document.getElementById("tabPivotContent");
    const tabRawContent = document.getElementById("tabRawDataContent");
    const tabInsContent = document.getElementById("tabInsightsContent");

    const regionSlicerBox = document.getElementById("salesRegionSlicerBox");
    const categorySlicerBox = document.getElementById("salesCategorySlicerBox");

    if (!openBtn || !modal) return;

    let salesCharts = {};
    let selectedRegion = "All";
    let selectedCategory = "All";

    function openModal() {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        if (typeof Chart !== "undefined" && !salesCharts.regionChart) {
            renderSalesCharts();
        }
    }

    function closeModal() {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    }

    openBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    // Slicer button event listeners
    if (regionSlicerBox) {
        regionSlicerBox.querySelectorAll(".slicer-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                regionSlicerBox.querySelectorAll(".slicer-btn").forEach(b => {
                    b.classList.remove("active", "bg-emerald-600", "text-white", "font-bold");
                    b.classList.add("bg-slate-900", "text-slate-300");
                    const check = b.querySelector(".fa-check");
                    if (check) check.remove();
                });
                btn.classList.remove("bg-slate-900", "text-slate-300");
                btn.classList.add("active", "bg-emerald-600", "text-white", "font-bold");
                btn.insertAdjacentHTML("beforeend", ' <i class="fas fa-check text-xs"></i>');
                selectedRegion = btn.getAttribute("data-value");
                updateSalesDashboard();
            });
        });
    }

    if (categorySlicerBox) {
        categorySlicerBox.querySelectorAll(".slicer-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                categorySlicerBox.querySelectorAll(".slicer-btn").forEach(b => {
                    b.classList.remove("active", "bg-emerald-600", "text-white", "font-bold");
                    b.classList.add("bg-slate-900", "text-slate-300");
                    const check = b.querySelector(".fa-check");
                    if (check) check.remove();
                });
                btn.classList.remove("bg-slate-900", "text-slate-300");
                btn.classList.add("active", "bg-emerald-600", "text-white", "font-bold");
                btn.insertAdjacentHTML("beforeend", ' <i class="fas fa-check text-xs"></i>');
                selectedCategory = btn.getAttribute("data-value");
                updateSalesDashboard();
            });
        });
    }

    // Tab Navigation
    function switchTab(activeBtn, activeContent) {
        [tabExecBtn, tabPivBtn, tabRawBtn, tabInsBtn].forEach(b => {
            if (b) {
                b.classList.remove("bg-emerald-600", "text-white", "border-t-2", "border-emerald-400");
                b.classList.add("bg-slate-800", "text-slate-400");
            }
        });
        [tabExecContent, tabPivContent, tabRawContent, tabInsContent].forEach(c => {
            if (c) c.classList.add("hidden");
        });

        if (activeBtn) {
            activeBtn.classList.remove("bg-slate-800", "text-slate-400");
            activeBtn.classList.add("bg-emerald-600", "text-white", "border-t-2", "border-emerald-400");
        }
        if (activeContent) activeContent.classList.remove("hidden");
    }

    if (tabExecBtn) tabExecBtn.addEventListener("click", () => switchTab(tabExecBtn, tabExecContent));
    if (tabPivBtn) tabPivBtn.addEventListener("click", () => switchTab(tabPivBtn, tabPivContent));
    if (tabRawBtn) tabRawBtn.addEventListener("click", () => switchTab(tabRawBtn, tabRawContent));
    if (tabInsBtn) tabInsBtn.addEventListener("click", () => switchTab(tabInsBtn, tabInsContent));

    function getSalesData() {
        const baseRegions = {
            "North America": { rev: 620000, profit: 275000, orders: 210 },
            "Europe": { rev: 510000, profit: 224000, orders: 180 },
            "Asia Pacific": { rev: 380000, profit: 168000, orders: 140 },
            "Latin America": { rev: 185000, profit: 79000, orders: 70 },
            "Middle East": { rev: 147500, profit: 66300, orders: 50 }
        };

        const regVal = selectedRegion;
        const catVal = selectedCategory;

        let totalRev = 0;
        let totalProfit = 0;
        let totalOrders = 0;

        let filteredRegions = [];

        Object.keys(baseRegions).forEach(r => {
            if (regVal === "All" || regVal === r) {
                let catMult = catVal === "Hardware" ? 0.35 : (catVal === "Software" ? 0.25 : (catVal === "Cloud Services" ? 0.25 : 0.15));
                if (catVal === "All") catMult = 1.0;

                let rev = Math.round(baseRegions[r].rev * catMult);
                let profit = Math.round(baseRegions[r].profit * catMult);
                let orders = Math.round(baseRegions[r].orders * catMult);

                totalRev += rev;
                totalProfit += profit;
                totalOrders += orders;

                filteredRegions.push({ name: r, rev, profit });
            }
        });

        const marginPct = totalRev > 0 ? ((totalProfit / totalRev) * 100).toFixed(1) : "0.0";

        return { totalRev, totalProfit, marginPct, totalOrders, filteredRegions };
    }

    function updateSalesKpis() {
        const data = getSalesData();
        const totalRevEl = document.getElementById("salesTotalRev");
        const netProfitEl = document.getElementById("salesNetProfit");
        const marginPctEl = document.getElementById("salesMarginPct");
        const totalOrdersEl = document.getElementById("salesTotalOrders");

        if (totalRevEl) totalRevEl.innerText = "$" + data.totalRev.toLocaleString();
        if (netProfitEl) netProfitEl.innerText = "$" + data.totalProfit.toLocaleString();
        if (marginPctEl) marginPctEl.innerText = data.marginPct + "%";
        if (totalOrdersEl) totalOrdersEl.innerText = data.totalOrders;
    }

    function updateSalesDashboard() {
        updateSalesKpis();
        if (salesCharts.regionChart) {
            const d = getSalesData();
            salesCharts.regionChart.data.labels = d.filteredRegions.map(x=>x.name);
            salesCharts.regionChart.data.datasets[0].data = d.filteredRegions.map(x=>x.rev);
            salesCharts.regionChart.data.datasets[1].data = d.filteredRegions.map(x=>x.profit);
            salesCharts.regionChart.update();
        }
    }

    function renderSalesCharts() {
        updateSalesKpis();
        const data = getSalesData();

        const labels = data.filteredRegions.map(r => r.name);
        const revs = data.filteredRegions.map(r => r.rev);
        const profits = data.filteredRegions.map(r => r.profit);

        const ctxReg = document.getElementById("salesRegionChart");
        if (ctxReg) {
            salesCharts.regionChart = new Chart(ctxReg, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Gross Revenue ($)",
                            data: revs,
                            backgroundColor: "rgba(16, 185, 129, 0.8)",
                            borderColor: "#10b981",
                            borderWidth: 1.5,
                            borderRadius: 6
                        },
                        {
                            label: "Net Profit ($)",
                            data: profits,
                            backgroundColor: "rgba(56, 189, 248, 0.8)",
                            borderColor: "#38bdf8",
                            borderWidth: 1.5,
                            borderRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: "#cbd5e1" } } },
                    scales: {
                        y: { ticks: { color: "#94a3b8" }, grid: { color: "#334155" } },
                        x: { ticks: { color: "#94a3b8" }, grid: { display: false } }
                    }
                }
            });
        }

        const ctxCat = document.getElementById("salesCategoryChart");
        if (ctxCat) {
            salesCharts.catChart = new Chart(ctxCat, {
                type: "doughnut",
                data: {
                    labels: ["Hardware", "Cloud Services", "Software", "Services"],
                    datasets: [{
                        data: [35, 28, 22, 15],
                        backgroundColor: ["#10b981", "#38bdf8", "#f59e0b", "#a78bfa"],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: "#cbd5e1" } } }
                }
            });
        }
    }
}

/* =================================
   PORTFOLIO LOADED MESSAGE
================================= */

console.log(
    "Emmanuel Kasivu Portfolio Loaded Successfully"
);