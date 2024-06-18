const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const repeatPasswordInput = document.getElementById('repeatPassword');
const ageInput = document.getElementById('age');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const postalCodeInput = document.getElementById('postalCode');
const dniInput = document.getElementById('dni');
const greeting = document.getElementById('greeting');
const modal = document.getElementById('modal');
const modalInfo = document.getElementById('modalInfo');
const closeModal = document.getElementsByClassName('close')[0];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  showModal();
  
});


nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('focus', clearError);
nameInput.addEventListener('keydown', updateGreeting);

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('focus', clearError);

passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('focus', clearError);

repeatPasswordInput.addEventListener('blur', validateRepeatPassword);
repeatPasswordInput.addEventListener('focus', clearError);

ageInput.addEventListener('blur', validateAge);
ageInput.addEventListener('focus', clearError);

phoneInput.addEventListener('blur', validatePhone);
phoneInput.addEventListener('focus', clearError);

addressInput.addEventListener('blur', validateAddress);
addressInput.addEventListener('focus', clearError);

cityInput.addEventListener('blur', validateCity);
cityInput.addEventListener('focus', clearError);

postalCodeInput.addEventListener('blur', validatePostalCode);
postalCodeInput.addEventListener('focus', clearError);

dniInput.addEventListener('blur', validateDNI);
dniInput.addEventListener('focus', clearError);

closeModal.addEventListener('click', closeModalWindow);
window.addEventListener('click', function(e) {
  if (e.target == modal) {
    closeModalWindow();
  }
});

function validateName() {
  const name = nameInput.value.trim();
  if (name.length <= 6 || !name.includes(' ')) {
    showError(nameInput, 'El nombre debe tener más de 6 letras y al menos un espacio');
    return false;
  }
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError(emailInput, 'Ingrese un email válido');
    return false;
  }
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres, con letras y números');
    return false;
  }
  return true;
}

function validateRepeatPassword() {
  const password = passwordInput.value;
  const repeatPassword = repeatPasswordInput.value;
  if (password !== repeatPassword) {
    showError(repeatPasswordInput, 'Las contraseñas no coinciden');
    return false;
  }
  return true;
}

function validateAge() {
  const age = parseInt(ageInput.value);
  if (isNaN(age) || age < 18) {
    showError(ageInput, 'Debe ser mayor de 18 años');
    return false;
  }
  return true;
}

function validatePhone() {
  const phone = phoneInput.value;
  const phoneRegex = /^\d{7,}$/;
  if (!phoneRegex.test(phone)) {
    showError(phoneInput, 'El teléfono debe tener al menos 7 dígitos, sin espacios, guiones ni paréntesis');
    return false;
  }
  return true;
}

function validateAddress() {
  const address = addressInput.value.trim();
  if (address.length < 5 || !/^(?=.*[A-Za-z])(?=.*\d)(?=.*\s)/.test(address)) {
    showError(addressInput, 'La dirección debe tener al menos 5 caracteres, con letras, números y un espacio');
    return false;
  }
  return true;
}

function validateCity() {
  const city = cityInput.value.trim();
  if (city.length < 3) {
    showError(cityInput, 'La ciudad debe tener al menos 3 caracteres');
    return false;
  }
  return true;
}

function validatePostalCode() {
  const postalCode = postalCodeInput.value.trim();
  if (postalCode.length < 3) {
    showError(postalCodeInput, 'El código postal debe tener al menos 3 caracteres');
    return false;
  }
  return true;
}

function validateDNI() {
  const dni = dniInput.value;
  const dniRegex = /^\d{7,8}$/;
  if (!dniRegex.test(dni)) {
    showError(dniInput, 'El DNI debe tener 7 u 8 dígitos');
    return false;
  }
  return true;
}

function showError(input, message) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
}

function clearError(e) {
  const errorElement = e.target.nextElementSibling;
  errorElement.textContent = '';
}

function updateGreeting() {
  const name = nameInput.value.trim();
  greeting.textContent = name ? `HOLA ${name.toUpperCase()}` : 'HOLA';
}

function validateForm() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isRepeatPasswordValid = validateRepeatPassword();
  const isAgeValid = validateAge();
  const isPhoneValid = validatePhone();
  const isAddressValid = validateAddress();
  const isCityValid = validateCity();
  const isPostalCodeValid = validatePostalCode();
  const isDNIValid = validateDNI();

  return isNameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid &&
         isAgeValid && isPhoneValid && isAddressValid && isCityValid &&
         isPostalCodeValid && isDNIValid;
}

function showModal() {
  const name = nameInput.value;
  const email = emailInput.value;
  const age = ageInput.value;
  const phone = phoneInput.value;
  const address = addressInput.value;
  const city = cityInput.value;
  const postalCode = postalCodeInput.value;
  const dni = dniInput.value;

  modal.style.display = 'block';

  if (validateForm()) {
    return modalInfo.innerHTML = `
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Edad:</strong> ${age}</p>
    <p><strong>Teléfono:</strong> ${phone}</p>
    <p><strong>Dirección:</strong> ${address}</p>
    <p><strong>Ciudad:</strong> ${city}</p>
    <p><strong>Código Postal:</strong> ${postalCode}</p>
    <p><strong>DNI:</strong> ${dni}</p>
  `;
  }

  modalInfo.innerHTML = 'Debe corregir los errores del formulario'
}

function closeModalWindow() {
  modal.style.display = 'none';
}