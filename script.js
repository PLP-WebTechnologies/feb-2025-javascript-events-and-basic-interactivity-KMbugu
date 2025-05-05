// Interactive Button
const magicButton = document.getElementById('magicButton');
let clickCount = 0;

magicButton.addEventListener('click', () => {
    clickCount++;
    magicButton.textContent = `Clicked ${clickCount} times!`;
    magicButton.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
});

magicButton.addEventListener('mouseover', () => {
    magicButton.style.transform = 'scale(1.1)';
});

magicButton.addEventListener('mouseout', () => {
    magicButton.style.transform = 'scale(1)';
});

// Bonus: Double-click secret action
magicButton.addEventListener('dblclick', () => {
    alert('🎉 Secret Action Unlocked! Check the console!');
    console.log('Double-click detected! You found the secret!');
});

// Keypress Detection
document.addEventListener('keypress', (e) => {
    console.log(`Key pressed: ${e.key}`);
    magicButton.textContent = `Pressed: ${e.key}`;
});

// Image Gallery
const galleryImages = document.querySelectorAll('.gallery-img');
const prevButton = document.querySelector('.gallery-prev');
const nextButton = document.querySelector('.gallery-next');
let currentImageIndex = 0;

function showImage(index) {
    galleryImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
});

nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
});

// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active classes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active classes to clicked tab and its content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Form Validation
const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function validateInput(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.style.borderColor = message ? 'red' : '#ccc';
    return !message;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

[nameInput, emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', () => {
        if (input === nameInput) {
            validateInput(nameInput, input.value.trim() ? '' : 'Name is required');
        } else if (input === emailInput) {
            validateInput(emailInput, validateEmail(input.value) ? '' : 'Invalid email format');
        } else if (input === passwordInput) {
            validateInput(passwordInput, input.value.length >= 8 ? '' : 'Password must be at least 8 characters');
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    isValid &= validateInput(nameInput, nameInput.value.trim() ? '' : 'Name is required');
    isValid &= validateInput(emailInput, validateEmail(emailInput.value) ? '' : 'Invalid email format');
    isValid &= validateInput(passwordInput, passwordInput.value.length >= 8 ? '' : 'Password must be at least 8 characters');

    if (isValid) {
        alert('Form submitted successfully! 🎉');
        form.reset();
        document.querySelectorAll('.error').forEach(error => error.textContent = '');
        document.querySelectorAll('input').forEach(input => input.style.borderColor = '#ccc');
    }
});
