document.addEventListener('DOMContentLoaded', function () {
    // Create form structure
    const mainDiv = document.getElementById('mainContent');
    const formContainer = document.createElement('div');
    formContainer.className = 'feedback-container';
    mainDiv.appendChild(formContainer);

    // Create logo
    const logo = document.createElement('img');
    logo.src = 'images/logo.png';
    logo.alt = 'Triple Bites Logo';
    logo.style.width = '120px';
    logo.style.display = 'block';
    logo.style.margin = '0 auto 10px';
    formContainer.appendChild(logo);

    // Create title
    const title = document.createElement('h2');
    title.textContent = 'Feedback Form';
    formContainer.appendChild(title);

    // Create email info
    const email = document.createElement('p');
    email.innerHTML = 'Email : <b>contactus@triplebitesmalaysia.com</b>';
    formContainer.appendChild(email);

    // Create form element
    const form = document.createElement('form');
    form.className = 'feedback-form';
    form.setAttribute('novalidate', 'true');
    formContainer.appendChild(form);

    // Helper functions
    function createSectionTitle(text) {
        const label = document.createElement('h3');
        label.textContent = text;
        label.style.margin = '20px 0 10px';
        label.style.color = '#3b3030';
        label.style.fontSize = '18px';
        form.appendChild(label);
    }

    function createInput(placeholder, name, type = 'text') {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;
        input.className = 'form-input';
        input.setAttribute('aria-label', placeholder);
        form.appendChild(input);
    }

    function createTextarea(placeholder, name) {
        const textarea = document.createElement('textarea');
        textarea.placeholder = placeholder;
        textarea.name = name;
        textarea.className = 'form-textarea';
        textarea.setAttribute('aria-label', placeholder);
        form.appendChild(textarea);
    }

    // Helper function to create labeled input
    function createLabeledInput(labelText, placeholder, name, type = 'text') {
        const container = document.createElement('div');
        container.className = 'labeled-input-container';
        form.appendChild(container);

        // Create label
        const label = document.createElement('label');
        label.textContent = labelText;
        label.className = 'input-label';
        container.appendChild(label);

        // Create input
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;
        input.className = 'form-input';
        input.setAttribute('aria-label', placeholder);
        container.appendChild(input);
        
        return input;
    }

    // Form fields creation
    // Basic information fields
    createLabeledInput('Name', 'First Name', 'firstName');
    createInput('Last Name', 'lastName');
    
    // Email field with label
    const emailInput = createLabeledInput('Email', 'e.g. user@gmail.com', 'gmail', 'email');
    
    // Contact field with label
    const contactContainer = document.createElement('div');
    contactContainer.className = 'labeled-input-container';
    form.appendChild(contactContainer);
    
    // Contact label
    const contactLabel = document.createElement('label');
    contactLabel.textContent = 'Contact Number';
    contactLabel.className = 'input-label';
    contactContainer.appendChild(contactLabel);
    
    // Contact input with prefix
    const contactInputContainer = document.createElement('div');
    contactInputContainer.className = 'contact-container';
    contactContainer.appendChild(contactInputContainer);

    // Create prefix element
    const prefixSpan = document.createElement('span');
    prefixSpan.textContent = '+60';
    prefixSpan.className = 'contact-prefix';
    contactInputContainer.appendChild(prefixSpan);

    // Create contact input
    const contactInput = document.createElement('input');
    contactInput.type = 'tel';
    contactInput.name = 'contactNumber';
    contactInput.placeholder = 'e.g. 123456789';
    contactInput.className = 'form-input contact-input';
    contactInput.setAttribute('aria-label', 'Contact Number');
    contactInput.setAttribute('inputmode', 'numeric');
    contactInput.setAttribute('pattern', '[0-9]*');
    contactInputContainer.appendChild(contactInput);

    // Create container for grouped fields
    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';
    form.appendChild(infoContainer);

    // Function to create grouped form elements
    function createInfoGroup(labelText, elementType, elementId, options = null) {
        const group = document.createElement('div');
        group.className = 'info-group';
        infoContainer.appendChild(group);

        // Create label
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = elementId;
        group.appendChild(label);

        // Create input element based on type
        let element;
        if (elementType === 'select') {
            element = document.createElement('select');
            element.className = 'form-input';
            element.id = elementId;
            if (options) element.innerHTML = options;
        } 
        else if (elementType === 'date') {
            element = document.createElement('input');
            element.type = 'date';
            element.className = 'form-input';
            element.id = elementId;
        }

        group.appendChild(element);
        return element;
    }

    // Category selection
    const categorySelect = createInfoGroup('Category', 'select', 'categorySelect', `
        <option value="" disabled selected>Select a category</option>
        <option value="cleanliness">Cleanliness</option>
        <option value="food_quality">Food Quality</option>
        <option value="speed_of_service">Speed of Service</option>
        <option value="ordering_experience">Ordering Experience</option>
        <option value="others">Others</option>
    `);
    categorySelect.name = 'category';

    // Date input
    const dateInput = createInfoGroup('Date of visit', 'date', 'dateInput');
    dateInput.name = 'visitDate';

    // Time selection (initially disabled)
    const timeSelect = createInfoGroup('Time of visit', 'select', 'timeSelect');
    timeSelect.name = 'visitTime';
    timeSelect.disabled = true;
    timeSelect.innerHTML = '<option value="">Select date first</option>';

    // Order method selection
    const visitTypeSelect = createInfoGroup('Order Method', 'select', 'orderTypeSelect', `
        <option value="" disabled selected>Select Order Method</option>
        <option value="dine_in">Dine In</option>
        <option value="take_away">Take Away</option>
        <option value="delivery">Delivery</option>
    `);
    visitTypeSelect.name = 'orderType';

    // Message section
    createSectionTitle('Message Details');
    createInput('Subject', 'subject');
    createTextarea('Feedback', 'feedback');

    // File upload section
    createSectionTitle('Upload File(s)');
    
    const fileContainer = document.createElement('div');
    fileContainer.className = 'file-upload-container';
    form.appendChild(fileContainer);

    // File input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'uploadFile';
    fileInput.className = 'file-upload';
    fileInput.id = 'fileInput';
    fileInput.setAttribute('aria-label', 'Upload File');
    fileInput.style.width = '70%';
    fileContainer.appendChild(fileInput);

    // Remove file button
    const removeFileBtn = document.createElement('button');
    removeFileBtn.textContent = 'Remove File';
    removeFileBtn.className = 'remove-btn';
    removeFileBtn.type = 'button';
    removeFileBtn.style.width = '30%';
    removeFileBtn.style.padding = '10px 5px';
    removeFileBtn.onclick = function (e) {
        e.preventDefault();
        fileInput.value = '';
    };
    fileContainer.appendChild(removeFileBtn);

    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.className = 'submit-btn';
    submitBtn.type = 'submit';
    submitBtn.style.width = '50%';
    submitBtn.style.margin = '20px auto 0';
    form.appendChild(submitBtn);

    // Event handlers
    // Update time dropdown when date changes
    dateInput.addEventListener('change', function() {
        updateTimeDropdown(this.value);
    });

    // Handle form submission
    // Prevent future date selection
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', todayStr);

    // Form validations
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Check all required inputs are filled
        const inputs = form.querySelectorAll('input, textarea, select');
        let valid = true;
        let firstInvalid = null;

        inputs.forEach(input => {
            if (input.type !== 'file' && !input.value.trim()) {
                valid = false;
                if (!firstInvalid) firstInvalid = input;
                input.style.boxShadow = '0 0 0 1px red';
            } else {
                input.style.boxShadow = 'none';
            }
        });

        if (!valid) {
            alert('Please fill in all required fields.');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // 2. Validate email
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            alert('Please enter a valid email address.');
            emailInput.style.boxShadow = '0 0 0 1px red';
            emailInput.focus();
            return;
        } else {
            emailInput.style.boxShadow = 'none';
        }

        // 3. Validate Malaysian phone number
        const phoneValue = contactInput.value.trim();
        const phonePattern = /^\d{9,10}$/;
        if (!phonePattern.test(phoneValue)) {
            alert('Please enter a valid phone number.');
            contactInput.style.boxShadow = '0 0 0 1px red';
            contactInput.focus();
            return;
        } else {
            contactInput.style.boxShadow = 'none';
        }

        // If all validations pass
        alert('Form submitted successfully!');
        form.reset();
    });

    // Time dropdown function
    function updateTimeDropdown(dateString) {
        if (!dateString) {
            timeSelect.disabled = true;
            timeSelect.innerHTML = '<option value="">Select date first</option>';
            return;
        }
        
        const date = new Date(dateString);
        const day = date.getDay();
        
        // Enable and populate time dropdown
        timeSelect.disabled = false;
        timeSelect.innerHTML = '<option value="" disabled selected>Select time of visit</option>';
        
        // Define time slots
        const weekdaySlots = [
            {text: 'Brunch Hours (10:00 AM to 12:00 PM)', value: 'brunch'},
            {text: 'Lunch Hours (12:00 PM to 2:00 PM)', value: 'lunch'},
            {text: 'Afternoon Hours (2:00 PM to 5:00 PM)', value: 'afternoon'},
            {text: 'Dinner Hours (5:00 PM to 7:00 PM)', value: 'dinner'},
            {text: 'Night Hours (7:00 PM to 10:00 PM)', value: 'night'}
        ];
        
        const weekendSlots = [
            {text: 'Brunch Hours (11:00 AM to 1:00 PM)', value: 'brunch'},
            {text: 'Lunch Hours (1:00 PM to 3:00 PM)', value: 'lunch'},
            {text: 'Afternoon Hours (3:00 PM to 6:00 PM)', value: 'afternoon'},
            {text: 'Dinner Hours (6:00 PM to 8:00 PM)', value: 'dinner'},
            {text: 'Night Hours (8:00 PM to 11:00 PM)', value: 'night'}
        ];
        
        // Select appropriate slots based on day
        const slots = (day === 0 || day === 6) ? weekendSlots : weekdaySlots;
        
        // Add options to dropdown
        slots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot.value;
            option.textContent = slot.text;
            timeSelect.appendChild(option);
        });
    }
});
