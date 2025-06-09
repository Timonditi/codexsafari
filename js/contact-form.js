document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Create formMessage element if it doesn't exist
            let messageElement = document.getElementById('formMessage');
            if (!messageElement) {
                messageElement = document.createElement('div');
                messageElement.id = 'formMessage';
                contactForm.insertBefore(messageElement, contactForm.firstChild);
            }

            // Clear any existing messages
            messageElement.textContent = '';
            messageElement.className = 'form-message';

            // Disable submit button to prevent double submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Create FormData object
            const formData = new FormData(contactForm);

            // Send form data using fetch
            fetch('php/process_contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Show success message
                    messageElement.textContent = data.message;
                    messageElement.className = 'form-message success';
                    // Reset the form
                    contactForm.reset();
                } else {
                    // Show error message
                    messageElement.textContent = data.message || 'An error occurred. Please try again.';
                    messageElement.className = 'form-message error';
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                messageElement.textContent = 'An error occurred. Please try again later.';
                messageElement.className = 'form-message error';
            })
            .finally(() => {
                // Re-enable submit button and reset text
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
        });

        // Clear error message when user starts typing
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                const messageElement = document.getElementById('formMessage');
                if (messageElement && messageElement.classList.contains('error')) {
                    messageElement.textContent = '';
                    messageElement.className = 'form-message';
                }
            });
        });
    }
}); 