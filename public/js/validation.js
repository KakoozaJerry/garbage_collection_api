const usernameEl = document.querySelector('#username');
const firstnameEl = document.querySelector('#firstname');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const lastnameEl = document.querySelector('#lastname');
const birthdayEl = document.querySelector('#birthday');
const ninEl = document.querySelector('#nin');
const imageuploadEl = document.querySelector('#imageupload');

const form1 = document.querySelector('#createemployee');

const form = document.querySelector('#signup');

const min = 2;
const max = 50;

const checkUsername = () => {

    let valid = false;

    

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkNames = () => {
    let valid = false;
    const firstname = firstnameEl.value.trim();
    if (!isRequired(firstname)) {
        showError(firstnameEl, 'First name cannot be blank.');
    } else if (!isNameCapital(firstname)) {
        showError(firstnameEl, 'Please, start your name with a capital letter.')
    } else if (!isBetween(firstname.length, min, max)) {
        showError(firstnameEl, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstnameEl);
        valid = true;
    }
    return valid;
};

const checkLastNames = () => {
    let valid = false;
    const lastname = lastnameEl.value.trim();
    if (!isRequired(lastname)) {
        showError(lastnameEl, 'Last name cannot be blank.');
    } else if (!isNameCapital(lastname)) {
        showError(lastnameEl, 'Please, start your last name with a capital letter.')
    } else if (!isBetween(lastname.length, min, max)) {
        showError(lastnameEl, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastnameEl);
        valid = true;
    }
    return valid;
};

const checkNIN = () => {
    let valid = false;
    const nin = ninEl.value.trim();
    if (!isRequired(nin)) {
        showError(ninEl, 'NIN cannot be blank.');
    } else if (!isNINValid(nin)) {
        showError(ninEl, 'NIN format not valid, only includes capital letters and numbers e.t.c')
    } else if (nin.length!==14) {
        showError(ninEl, `NIN must be 14 characters.`)
    } else {
        showSuccess(ninEl);
        valid = true;
    }
    return valid;
};

const checkImage = () => {
    let valid = false;
    const imageupload = imageuploadEl.value.trim();
    if (!isRequired(imageupload)) {
        showError(imageuploadEl, 'You are required to select an image.');
    } else {
        showSuccess(imageuploadEl);
        valid = true;
    }
    return valid;
};

const checkAge = () => {
    let valid = false;
    const birthday = birthdayEl.value.trim();
    if (!isRequired(birthday)) {
        showError(birthdayEl, 'Birthday cannot be blank.');
    } else if (!calcAge(birthday)) {
        showError(birthdayEl, 'You are below 18 years and ineligible')
    } else {
        showSuccess(birthdayEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isNameCapital = (firstname) => {
    let regs = /^[A-Z]\D*$/
    return regs.test(firstname);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isNINValid = (nin) => {
    let regs = /^[A-Z]{2}[0-9]{9}[A-Z]{3}$/
    return regs.test(nin);
};

const calcAge = (birthday) => {
    let dob = new Date(birthday);
    let today = new Date();
    let mili_dif = Math.abs(today.getTime() - dob.getTime());
    let age = Math.floor(mili_dif / (1000 * 3600 * 24 * 365.25));
    if(age>=18){
        return true;
    }else {
        return false;
    }
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

if(form){
    form.addEventListener('submit', function (e) {
        // prevent the form from submitting
        
    
        // validate fields
        let isUsernameValid = checkUsername(),
            isEmailValid = checkEmail(),
            isPasswordValid = checkPassword(),
            isConfirmPasswordValid = checkConfirmPassword(),
            isNameCapital = checkNames();
    
        let isFormValid = isUsernameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            isNameCapital;
    
        // submit to the server if the form is valid
        if (!isFormValid) {
            e.preventDefault();
        }
    });
    
}


if(form1){
    form1.addEventListener('submit', function (e) {
        // prevent the form from submitting
        
    
        // validate fields
        let isEmailValid = checkEmail(),
            isNameCapital = checkNames(),
            isLastNameCapital = checkLastNames(),
            isNINValid = checkNIN(),
            isImageAttached = checkImage(),
            calcAge = checkAge();
    
        let isFormValid = isEmailValid &&
            isNameCapital &&
            isLastNameCapital &&
            isNINValid && 
            isImageAttached &&
            calcAge;
    
        // submit to the server if the form is valid
        if (!isFormValid) {
            e.preventDefault();
        }
    });
}



const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};


if(form){
    form.addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'firstname':
                checkNames();
                break;
            case 'username':
                checkUsername();
                break;
            case 'email':
                checkEmail();
                break;
            case 'password':
                checkPassword();
                break;
            case 'confirm-password':
                checkConfirmPassword();
                break;
            
        }
    }));
}


if(form1){
    form1.addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'email':
                checkEmail();
                break;
            case 'firstname':
                checkNames();
                break;
            case 'lastname':
                checkLastNames();
                break;
            case 'nin':
                checkNIN();
                break;
            case 'imageupload':
                checkImage();
                break;
            case 'birthday':
                checkAge();
                break;
            
        }
    }));
}
