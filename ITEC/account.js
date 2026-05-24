
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    const toRegister = document.getElementById('toRegister');
    const toLogin1 = document.getElementById('toLogin1');
    const toLogin2 = document.getElementById('toLogin2');
    
    const jsLoginForm = document.getElementById('jsLoginForm');
    const jsRegisterForm = document.getElementById('jsRegisterForm');
    const termsAndAgreementFormbtn=document.getElementById('termsAndAgreementFormbtn')
    const termsAndAgreementForm=document.getElementById('termsAndAgreementForm')
    const logoAndbtn=document.getElementById('logoAndbtn')

    // --- FORM INTERFACE SWITCHING ---
    termsAndAgreementFormbtn.addEventListener('click', (e) => {
        e.preventDefault();
        logoAndbtn.classList.remove('active');
        termsAndAgreementForm.classList.add('active');
        jsLoginForm.reset(); // Clear login fields
    });

    toRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        jsLoginForm.reset(); // Clear login fields
    });

    toLogin1.addEventListener('click', (e) => {
        e.preventDefault();
        termsAndAgreementForm.classList.remove('active');
        loginForm.classList.add('active');
        jsRegisterForm.reset(); // Clear registration fields
    });    
    toLogin2.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
        jsRegisterForm.reset(); // Clear registration fields
    });

    // --- FUNCTIONAL AUTHENTICATION SYSTEM ---

    // Helper: Retrieve all registered accounts from local storage
    const getStoredUsers = () => {
        const users = localStorage.getItem('auth_users');
        return users ? JSON.parse(users) : {};
    };

    // Helper: Save accounts back to local storage
    const saveUsers = (users) => {
        localStorage.setItem('auth_users', JSON.stringify(users));
    };

    // Handle Registration__________________________________________________________________________________________________
    jsRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById('reg-username').value.trim();
        const passwordInput = document.getElementById('reg-password').value;
        const confirmInput = document.getElementById('reg-confirm').value;

        // Validation: Password match check
        if (passwordInput !== confirmInput) {
            alert('Registration Failed: Passwords do not match.');
            return;
        }

        const users = getStoredUsers();

        // Validation: Duplicate user check
        if (users[usernameInput.toLowerCase()]) {
            alert('Registration Failed: This username is already taken.');
            return;
        }

        // Action: Save new user record
        users[usernameInput.toLowerCase()] = {
            displayName: usernameInput, // Keeps original capitalization for display
            password: passwordInput
        };
        
        saveUsers(users);
        alert('Registration Successful! You can now sign in.');
        
        // Auto-switch to login interface
        jsRegisterForm.reset();
        toLogin.click();
    });

    // Handle Login__________________________________________________________________________________________________
    jsLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById('login-username').value.trim();
        const passwordInput = document.getElementById('login-password').value;

        const users = getStoredUsers();
        const foundUser = users[usernameInput.toLowerCase()];

        // Validation: Check if user exists and password is correct
        if (!foundUser || foundUser.password !== passwordInput) {
            alert('Login Failed: Invalid username or password.');
            return;
        }

        // Action: Successful Authentication
        alert(`Welcome, ${foundUser.displayName}! Login successful.`);        
        
        // Note: In a live app, you would redirect the user here using:
        // window.location.href = 'dashboard.html';
    });
});