const submitBox = document.querySelector(".submit");
const submitBtn = document.querySelector(".submit-btn");
const submitDuration = 2000;
const RED = "#8c0505";

const invalidateField = (input, message) => {
    const errorEl = document.createElement('small');
    errorEl.style.color = RED;
    errorEl.classList.add('error');
    errorEl.innerHTML = message;
    input.insertAdjacentElement('afterend', errorEl);
}

const insertUserInDB = () => {
    const form = document.querySelector(".acc-form");
    const inputs = Array.from(form.querySelectorAll(".acc-input input"));
    const obs = form.querySelector(".acc-input textarea");
    const user = {
        last_name: inputs[0].value,
        first_name: inputs[1].value,
        password: inputs[3].value,
        phone: inputs[8].value,
        birthday: inputs[9].value,
        address: inputs[10].value,
        obs: obs.value
    };
    const gender = form.querySelector('.acc-input .radio-container input[type="radio"]:checked')
    user.gender = gender.value;
    localStorage.setItem(inputs[2].value, JSON.stringify(user));
    localStorage.setItem('logged', JSON.stringify(true));
}

const validateForm = () => {
    const formType = document.querySelector(".acc-form").getAttribute('thing');
    const form = document.querySelector(".acc-form");
    const inputs = Array.from(form.querySelectorAll(".acc-input input"));
    let valid = true;

    inputs.forEach(input => {
        if (input.parentNode.querySelector('.error')) {
            input.parentNode.querySelector('.error').remove();
        }
        if (input.value === "" && input.hasAttribute("required")) {
            invalidateField(input, "This field is required.");
            valid = false;
        } else {
            switch (input.name) {
                case 'email': {
                    const email_regex = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';
                    if (!input.value.match(email_regex)) {
                        invalidateField(input, "Please enter a valid email address!");
                        valid = false;
                    } else if (formType === 'signup' && localStorage.getItem(input.value)) {
                        invalidateField(input, "This email is already registered!");
                        valid = false;
                    }
                    break;
                }
                case 'cr-password': {
                    const password_regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                    if (!input.value.match(password_regex)) {
                        invalidateField(input, "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!");
                        valid = false;
                    }
                    break;
                }
                case 're-password': {
                    const password = document.querySelector('input[name="cr-password"]');
                    if (input.value !== password.value) {
                        invalidateField(input, "Passwords do not match!");
                        valid = false;
                    }
                    break;
                }
                case 'phone': {
                    // optional (plus with country prefix between 1 and 4 characters), optional (space), 3 or 4 digits, optional (space or dash), 3 digits, optional (space or dash), 3 digits
                    const phone_regex = "^(\\+?(\\s)?\\d*)?\\s*\\d{3,4}(\\s|-)?\\d{3}(\\s|-)?\\d{3}$";
                    if (!input.value.match(phone_regex)) {
                        invalidateField(input, "Please enter a valid phone number!");
                        valid = false;
                    }
                }
                case 'birthday': {
                    // check that user is older than 18 years old
                    const birthday = new Date(input.value);
                    const yearsOld = new Date().getFullYear() - birthday.getFullYear();
                    if (yearsOld < 18) {
                        invalidateField(input, "You must be at least 18 years old!");
                        valid = false;
                    }
                }
            }
        }
    });
    return valid;
}

const submit = () => {
    let ans = validateForm();
    if (!ans) {
        return;
    }
    const inputs = Array.from(document.querySelectorAll(".acc-input input"));
    let formType = document.querySelector(".acc-form").getAttribute('thing');
    switch (formType) {
        case 'signup': {
            insertUserInDB();
            localStorage.setItem('loggedUser', inputs[2].value);
            localStorage.setItem('logged', JSON.stringify(true));
            break;
        }
        case 'login': {
            const form = document.querySelector(".acc-form");
            const inputs = Array.from(form.querySelectorAll(".acc-input input"));
            const user = JSON.parse(localStorage.getItem(inputs[0].value));
            if (user) {
                if (user.password === inputs[1].value) {
                    localStorage.setItem('logged', JSON.stringify(true));
                    localStorage.setItem('loggedUser', inputs[0].value);
                } else {
                    invalidateField(inputs[1], "Incorrect password!");
                    ans = false;
                    return;
                }
            } else {
                invalidateField(inputs[1], "User does not exist!");
                ans = false;
                return;
            }
        }
    }
    if (ans) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0";
        submitBox.classList.add("btn--running");
        setTimeout(() => {
            submitBox.classList.remove("btn--running");
            submitBox.classList.add("btn--done");
            setTimeout (() => {
                window.location.href="index.html";
            }, 2000);

        }, submitDuration);
    }
}
submitBtn.addEventListener("click", function() {
    submit();
});

window.addEventListener("keydown", function(e) {
    if (e.key === 'Enter') {
        submit();
    }
});

