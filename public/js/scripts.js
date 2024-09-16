document.addEventListener('DOMContentLoaded', function () {
    // Dynamic welcome message
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const welcomeMessage = document.getElementById('welcome-message');

    if (hours < 12) {
        welcomeMessage.textContent = 'Good Morning! Check out today\'s sports news.';
    } else if (hours < 18) {
        welcomeMessage.textContent = 'Good Afternoon! Don\'t miss the latest updates.';
    } else {
        welcomeMessage.textContent = 'Good Evening! Catch up on today\'s highlights.';
    }

    // Form validation and submission
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            try {
                const formData = {
                    name: form.name.value,
                    email: form.email.value,
                    message: form.message.value
                };
                const response = await fetch('/contact/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    feedback.textContent = 'Thank you for reaching out!';
                    feedback.style.color = 'green';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                feedback.textContent = 'An error occurred while sending your message. Please try again.';
                feedback.style.color = 'red';
            }
        });
    }

    // Fetch the latest news and show a popup
    const latestNewsLink = document.getElementById('latest-news-link');
    if (latestNewsLink) {
        latestNewsLink.addEventListener('click', async function () {
            try {
                const response = await fetch('/news/latest-news');
                const newsData = await response.json();
                if (newsData && newsData.news) {
                    const popup = document.getElementById('news-popup');
                    popup.querySelector('p').textContent = newsData.news;
                    popup.style.display = 'block';
                } else {
                    alert('No news available at the moment.');
                }
            } catch (error) {
                console.error('Error fetching news:', error);
                alert('Failed to fetch news.');
            }
        });
    }

    // Close popup functionality
    const closePopup = document.getElementById('close-popup');
    if (closePopup) {
        closePopup.addEventListener('click', function () {
            document.getElementById('news-popup').style.display = 'none';
        });
    }
});
