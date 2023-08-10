import throttle from 'lodash.throttle';

// Get the form and form fields
const feedbackForm = document.querySelector('.feedback-form');
const emailField = feedbackForm.querySelector('[name="email"]');
const messageField = feedbackForm.querySelector('[name="message"]');

// Define the local storage key
const storageKey = 'feedback-form-state';

// Function to save form field values to local storage
function saveFormState() {
    const state = {
        email: emailField.value,
        message: messageField.value,
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
}

// Function to load form field values from local storage
function loadFormState() {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
        const state = JSON.parse(savedState);
        emailField.value = state.email || '';
        messageField.value = state.message || '';
    }
}

// Function to clear local storage and form fields
function clearForm() {
    localStorage.removeItem(storageKey);
    emailField.value = '';
    messageField.value = '';
}

// Add event listener for input events on the form fields (throttled for once every 500 milliseconds)
feedbackForm.addEventListener('input', throttle(() => {
    saveFormState();
}, 500));

// Add event listener for form submission
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const state = JSON.parse(localStorage.getItem(storageKey));
    console.log('Form submission data:', state);
    clearForm();
});

