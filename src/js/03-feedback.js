import throttle from 'lodash';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

const updateLocalStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formData));
}, 500);

form.addEventListener('input', () => {
  updateLocalStorage();
});

window.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem(storageKey);
  if (storedData) {
    const formData = JSON.parse(storedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  // Clear form fields
  emailInput.value = '';
  messageTextarea.value = '';

  // Display form data in console
  console.log('Form Data:', formData);
});
