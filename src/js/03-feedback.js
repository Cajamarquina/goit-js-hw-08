import throttle from 'lodash.throttle';

// Get the form and form fields
const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('[name="email"]');
const messageInput = feedbackForm.querySelector('[name="message"]');

// Define the local storage key
const storageKey = 'feedback-form-state';

// Function to save form field values to local storage
function saveFormState() {
    const state = {
        email: emailInput.value,
        message: messageInput.value,
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
}

// Function to load form field values from local storage
function loadFormState() {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
        const state = JSON.parse(savedState);
        emailInput.value = state.email || '';
        messageInput.value = state.message || '';
    }
}

// Function to clear local storage and form fields
function clearFormState() {
    localStorage.removeItem(storageKey);
    emailInput.value = '';
    messageInput.value = '';
}

// Add event listener for input events on the form fields (throttled for once every 500 milliseconds)
feedbackForm.addEventListener('input', throttle(() => {
    saveFormState();
}, 500));

// Event listener for form submission
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const submittedData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    clearFormState();
    console.log('Submitted data:');
    console.log(submittedData);
});

// Load the stored data on page load
loadFormState();