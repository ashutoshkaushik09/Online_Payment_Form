// Selecting DOM Elements
const debitBtn = document.getElementById('debit-card-btn');
const creditBtn = document.getElementById('credit-card-btn');
const upiBtn = document.getElementById('upi-btn');
const cardInfo = document.getElementById('card-info');
const upiInfo = document.getElementById('upi-info');
const cardContainer = document.querySelector('.card-container');
const card = document.querySelector('.card');
const form = document.getElementById('payment-form');
const loadingSpinner = document.createElement('div');
loadingSpinner.classList.add('loading');
loadingSpinner.innerHTML = '<div class="spinner"></div>'; // Add spinner HTML here

// Card Input Fields
const cardNumberInput = document.getElementById('card-number');
const cardHolderInput = document.getElementById('card-holder');
const expiryDateInput = document.getElementById('expiry-date');
const cvvInput = document.getElementById('cvv');

// Card Display Elements
const cardNumberDisplay = document.getElementById('card-number-display');
const cardHolderDisplay = document.getElementById('card-holder-display');
const expiryDateDisplay = document.getElementById('expiry-date-display');
const cvvDisplay = document.getElementById('cvv-display');

// Flip the card to show the back
cvvInput.addEventListener('focus', () => {
    card.style.transform = 'rotateY(180deg)';
});

// Flip the card back to the front
cvvInput.addEventListener('blur', () => {
    card.style.transform = 'rotateY(0deg)';
});

// Update card display while typing
cardNumberInput.addEventListener('input', () => {
    cardNumberDisplay.textContent = cardNumberInput.value || '#### #### #### ####';
});

cardHolderInput.addEventListener('input', () => {
    cardHolderDisplay.textContent = cardHolderInput.value || 'Your Name';
});

expiryDateInput.addEventListener('input', () => {
    expiryDateDisplay.textContent = expiryDateInput.value || 'MM/YY';
});

// Update CVV display while typing
cvvInput.addEventListener('input', () => {
    cvvDisplay.textContent = cvvInput.value || '###';
});

// Show or hide input fields based on payment method
debitBtn.addEventListener('click', () => switchPaymentMethod(debitBtn, cardInfo));
creditBtn.addEventListener('click', () => switchPaymentMethod(creditBtn, cardInfo));
upiBtn.addEventListener('click', () => switchPaymentMethod(upiBtn, upiInfo));

// Initialize visible input groups
const inputGroups = document.querySelectorAll('.input-group');
inputGroups.forEach(inputGroup => {
    inputGroup.classList.add('visible'); // Make all input groups visible on load
});

function switchPaymentMethod(activeBtn, showElement) {
    // Reset buttons and hide all sections
    [debitBtn, creditBtn, upiBtn].forEach(btn => btn.classList.remove('active'));
    [cardInfo, upiInfo].forEach(section => section.classList.add('hidden'));

    // Activate the selected button and show relevant input section
    activeBtn.classList.add('active');
    showElement.classList.remove('hidden');

    // Animate input fields
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(inputGroup => {
        inputGroup.classList.remove('visible'); // Reset visibility for animation
        setTimeout(() => {
            inputGroup.classList.add('visible'); // Add visible class after a delay
        }, 100); // Delay for staggered effect
    });
}

// Handle form submission with loading animation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateInput()) {
        // Show loading spinner
        form.appendChild(loadingSpinner);
        loadingSpinner.style.display = 'block'; // Show spinner

        // Simulate a network request
        setTimeout(() => {
            alert('Payment Submitted Successfully!');
            form.reset(); // Clear the form fields
            loadingSpinner.style.display = 'none'; // Hide spinner
        }, 2000); // Simulated delay for loading (2 seconds)
    }
});
