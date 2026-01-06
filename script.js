// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const navigationMenu = document.getElementById('navigationMenu');

mobileMenuButton.addEventListener('click', () => {
    navigationMenu.classList.toggle('active');
    mobileMenuButton.innerHTML = navigationMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navigationMenu.classList.remove('active');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
const successNotification = document.getElementById('successNotification');
const urgencyBanner = document.querySelector('.urgency-banner');

// Create countdown timer for urgency
function updateUrgencyBanner() {
    const now = new Date();
    const deadline = new Date();
    deadline.setDate(now.getDate() + 5); // 5 days from now
    
    const timeDiff = deadline - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    let slotsLeft = 8; // This could be dynamic from server
    
    // Update banner text
    if (daysLeft <= 5) {
        urgencyBanner.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span><strong>Final Deadline Approaching:</strong> Only ${slotsLeft} project slots remain. Applications close in ${daysLeft} days.</span>
        `;
        urgencyBanner.style.backgroundColor = '#f8d7da';
        urgencyBanner.style.color = '#721c24';
        urgencyBanner.style.borderLeftColor = '#f5c6cb';
    }
}

// Update banner every hour
updateUrgencyBanner();
setInterval(updateUrgencyBanner, 3600000); // Update every hour

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const university = document.getElementById('university').value;
    const departmentSelect = document.getElementById('departmentSelect').value;
    const message = document.getElementById('message').value;
    const newsletter = document.getElementById('newsletter').checked;
    
    // In a real implementation, you would send this data to a server
    console.log('Application submitted:', { 
        name, 
        email, 
        university, 
        department: departmentSelect, 
        message, 
        newsletter 
    });
    
    // Show success message with animation
    successNotification.classList.add('active');
    
    // Update remaining slots (simulated)
    const currentText = urgencyBanner.textContent;
    const slotsMatch = currentText.match(/Only (\d+) project slots/);
    if (slotsMatch) {
        let slotsLeft = parseInt(slotsMatch[1]) - 1;
        if (slotsLeft < 0) slotsLeft = 0;
        
        urgencyBanner.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span><strong>Application Received!</strong> Now only ${slotsLeft} project slots remain. Thank you for applying!</span>
        `;
    }
    
    // Reset form
    contactForm.reset();
    document.getElementById('newsletter').checked = true; // Keep newsletter checked by default
    
    // Scroll to success message
    successNotification.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide success message after 10 seconds
    setTimeout(() => {
        successNotification.classList.remove('active');
    }, 10000);
});

// WhatsApp link with pre-filled message
function updateWhatsAppLink() {
    const name = document.getElementById('name').value || 'Potential Student';
    const university = document.getElementById('university').value || 'My University';
    const departmentSelect = document.getElementById('departmentSelect').value || 'general inquiry';
    const message = document.getElementById('message').value || 'I have a question about project slots';
    
    const whatsappText = `Hello Cognition Incorporated, I am ${name} from ${university}. I'm interested in the ${departmentSelect}. ${message.substring(0, 100)}...`;
    const encodedText = encodeURIComponent(whatsappText);
    
    // Update WhatsApp link
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    whatsappBtn.href = `https://wa.me/1234567890?text=${encodedText}`;
}

// Update WhatsApp link when form changes
document.getElementById('name').addEventListener('input', updateWhatsAppLink);
document.getElementById('university').addEventListener('input', updateWhatsAppLink);
document.getElementById('departmentSelect').addEventListener('change', updateWhatsAppLink);
document.getElementById('message').addEventListener('input', updateWhatsAppLink);

// Email link with pre-filled content
function updateEmailLink() {
    const name = document.getElementById('name').value || 'Potential Student';
    const university = document.getElementById('university').value || 'My University';
    const departmentSelect = document.getElementById('departmentSelect').value || 'general inquiry';
    const message = document.getElementById('message').value || 'I have a question about project slots';
    
    const subject = `Project Slot Application from ${name} (${university})`;
    const body = `Hello Cognition Incorporated,%0A%0AMy name is ${name}.%0AI am from ${university}.%0AI'm interested in the ${departmentSelect}.%0A%0AMy project idea/research interest:%0A${message}%0A%0AI would appreciate the opportunity to discuss this further.%0A%0ABest regards,%0A${name}`;
    
    // Update email link
    const emailBtn = document.querySelector('.email-btn');
    emailBtn.href = `mailto:apply@cognitioninc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Update email link when form changes
document.getElementById('name').addEventListener('input', updateEmailLink);
document.getElementById('university').addEventListener('input', updateEmailLink);
document.getElementById('departmentSelect').addEventListener('change', updateEmailLink);
document.getElementById('message').addEventListener('input', updateEmailLink);

// Animate process steps on scroll
function animateOnScroll() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        const stepPosition = step.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (stepPosition < screenPosition) {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }
    });
}

// Set initial state for animation
document.querySelectorAll('.process-step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-20px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Initial check
animateOnScroll();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});