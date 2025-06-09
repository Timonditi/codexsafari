document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation
        function validateForm() {
            let isValid = true;
            const errorMessages = [];

            // Required field validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const projectType = document.getElementById('projectType').value.trim();

            if (!name) {
                isValid = false;
                errorMessages.push('Name is required');
            }

            if (!email) {
                isValid = false;
                errorMessages.push('Email is required');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessages.push('Please enter a valid email address');
            }

            if (!phone) {
                isValid = false;
                errorMessages.push('Phone number is required');
            } else if (!isValidPhone(phone)) {
                isValid = false;
                errorMessages.push('Please enter a valid phone number');
            }

            if (!projectType) {
                isValid = false;
                errorMessages.push('Please select a project type');
            }

            return { isValid, errorMessages };
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function isValidPhone(phone) {
            // Allow various phone formats including international
            return /^[0-9+\-\(\)\s]{10,}$/.test(phone);
        }

        function showFormMessage(message, type = 'error') {
            const formMessage = document.createElement('div');
            formMessage.className = `form-message ${type}`;
            formMessage.textContent = Array.isArray(message) ? message.join('. ') : message;
            
            // Remove any existing message
            const existingMessage = contactForm.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Insert before the form footer
            const formFooter = contactForm.querySelector('.form-footer');
            contactForm.insertBefore(formMessage, formFooter);

            // Auto-remove success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => formMessage.remove(), 5000);
            }
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const { isValid, errorMessages } = validateForm();
            if (!isValid) {
                showFormMessage(errorMessages);
                return;
            }

            // Disable submit button to prevent double submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Get form data and format for Zoho CRM
            const fullName = document.getElementById('name').value.trim();
            const nameParts = fullName.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            const formData = {
                data: [{
                    First_Name: firstName,
                    Last_Name: lastName,
                    Email: document.getElementById('email').value.trim(),
                    Phone: document.getElementById('phone').value.trim(),
                    Company: document.getElementById('company').value.trim(),
                    Description: document.getElementById('message').value.trim(),
                    Lead_Source: 'Website Contact Form',
                    Service_Interest: document.getElementById('projectType').value,
                    Lead_Status: 'New'
                }]
            };

            // Send to Zoho CRM API
            fetch('https://www.zohoapis.com/crm/v3/Leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your Zoho access token
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(formData)
            })
            .then(async response => {
                const jsonResponse = await response.json();

                if (response.ok) {
                    showFormMessage('Thank you for your message. Our team will contact you shortly!', 'success');
                    contactForm.reset();
                } else {
                    console.error('Zoho CRM Error:', jsonResponse);
                    showFormMessage('An error occurred. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Network error:', error);
                showFormMessage('An error occurred. Please try again later.');
            })
            .finally(() => {
                // Re-enable submit button and reset text
                submitButton.disabled = false;
                submitButton.textContent = 'Get Started';
            });
        });

        // Real-time validation on input
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorMessage = contactForm.querySelector('.form-message.error');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
}); 