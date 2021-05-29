//* Main - Toggle Menu
//#region
const body = document.querySelector("body");
//menu elements
const toggleMenu = document.querySelector(".header__toggle-menu");
const menuIcon = document.getElementById("menuIcon");
const menuClose = document.getElementById("menuClose");
//nav elements
const headerNav = document.querySelector(".header__nav");
const navAbout = document.getElementById("navAbout");
const navStudies = document.getElementById("navStudies");
const navSkills = document.getElementById("navSkills");
const navContact = document.getElementById("navContact");

toggleMenu.addEventListener("click", () => {
  if (window.innerWidth < 1000) {
    headerNav.classList.toggle("show");
    body.classList.toggle("fixed");
    changeMenuIcon();
  }
});

navAbout.addEventListener("click", () => {
  if (window.innerWidth < 1000) {
    headerNav.classList.toggle("show");
    body.classList.toggle("fixed");
    changeMenuIcon();
  }
});

navStudies.addEventListener("click", () => {
  if (window.innerWidth < 1000) {
    headerNav.classList.toggle("show");
    body.classList.toggle("fixed");
    changeMenuIcon();
  }
});

navSkills.addEventListener("click", () => {
  if (window.innerWidth < 1000) {
    headerNav.classList.toggle("show");
    body.classList.toggle("fixed");
    changeMenuIcon();
  }
});

navContact.addEventListener("click", () => {
  if (window.innerWidth < 1000) {
    headerNav.classList.toggle("show");
    body.classList.toggle("fixed");
    changeMenuIcon();
  }
});

function changeMenuIcon() {
  if (headerNav.classList.contains("show")) {
    menuIcon.style.display = "none";
    menuClose.style.display = "inline-block";
  } else {
    menuIcon.style.display = "inline-block";
    menuClose.style.display = "none";
  }
}
//#endregion

//* Skills - Buttons
//#region
for (let i = 1; i <= 11; i++) {
  let item = document.getElementById(`item${i}`);
  let icon = document.getElementById(`item${i}__icon`);
  let text = document.getElementById(`item${i}__txt`);

  item.addEventListener("mouseenter", () => {
    item.classList.toggle("item--hover");
    icon.classList.toggle("hidden");
    text.classList.toggle("hidden");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("item--hover");
    icon.classList.remove("hidden");
    text.classList.add("hidden");
  });
}
//#endregion

//* Skills - Squares
//#region
//Añadir un delay aleatorio a cada uno de los cuadrados
//de la animación
for (let i = 1; i <= 28; i++) {
  let sqr = document.querySelector(
    `.skills__squares .colorful > div.colorful__sqr${i}`
  );
  let delay = (Math.random() * 40 + 1).toFixed(2);

  sqr.style.animationDelay = `${delay}s`;
}
//#endregion

//* Contact - Form Validations
//#region

//Elementos
//form
const form = document.getElementById("form");
const formErrorDiv = document.querySelector(".form__error");
const formErrorMsg = document.getElementById("form__error__msg");
const formSubmit = document.getElementById("form__submit");
//modal
const modalContact = document.querySelector(".contact__modal");
const modal = document.querySelector(".modal");
const modalLoadingContainer = document.querySelector(
  ".modal__loading-container"
);
const modalSubmit = document.querySelector(".modal__submit");
const modalClose = document.querySelector(".modal__close");
//turing
const turingResult = document.getElementById("turing__result");
const turingError = document.querySelector(".turing__error");
const emailData = {
  user_name: "",
  user_email: "",
  subject: "",
  message: "",
};

//? EVENTOS //
//Mostrar Modal
modalSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  validateTuring()
    .then(() => {
      modal.style.display = "none";
      modalLoadingContainer.style.display = "grid";
      sendEmail();
    })
    .catch((resp) => {
      turingError.style.display = "block";
      turingError.innerHTML = resp;
    });
});

//Cerrar Modal con la "x"
modalClose.addEventListener("click", () => {
  modalContact.style.display = "none";
});

//Cerrar Modal cuando se hace clic fuera de él
window.addEventListener("click", (e) => {
  if (e.target == modalContact) {
    modalContact.style.display = "none";
  }
});
//? FIN EVENTOS //

//Validar Nombre Formulario
function validateName() {
  let userName = document.getElementById("user_name").value;
  const r =
    /^([a-záéíóúäëïöü]{2,25})\s?([a-záéíóúäëïöü]{2,25})\s?([a-záéíóúäëïöü]{2,25})\s?([a-záéíóúäëïöü]{2,25})$/gi;

  return new Promise((res, rej) => {
    if (userName.length == 0) {
      rej("Completa el campo Nombre.");
    } else if (!r.test(userName) && userName.length > 64) {
      rej("Ingresa un nombre válido. Máximo 64 caracteres.");
    } else {
      res(userName);
    }
  });
}

//Validar Email Formulario
function validateEmail() {
  let userEmail = document.getElementById("user_email").value;
  const r = /^[\w-\.]+@([\w-]+\.)+[\a-z-]{2,4}$/gi;

  return new Promise((res, rej) => {
    if (userEmail.length == 0) {
      rej("Completa el campo Email.");
    } else if (!r.test(userEmail) || userEmail.length > 128) {
      rej("Ingresa un email válido. Máximo 128 caracteres.");
    } else {
      res(userEmail);
    }
  });
}

//Validar Asunto Formulario
function validateSubject() {
  let subject = document.getElementById("subject").value;

  return new Promise((res, rej) => {
    if (subject.length == 0) {
      rej("Completa el campo Asunto.");
    } else if (subject.length > 64) {
      rej("El asunto debe tener como máximo 64 caracteres.");
    } else {
      res(subject);
    }
  });
}

//Validar Mensaje Formulario
function validateMessage() {
  let message = document.getElementById("message").value;

  return new Promise((res, rej) => {
    if (message.length == 0) {
      rej("Completa el campo Mensaje.");
    } else if (message.length > 1024) {
      rej("El mensaje debe tener como máximo 1024 caracteres.");
    } else {
      res(message);
    }
  });
}

//Validar Formulario
function validateForm() {
  validateName()
    .then((name) => {
      emailData.user_name = name;
      formErrorDiv.style.display = "none";
      return validateEmail();
    })
    .then((email) => {
      emailData.user_email = email;
      formErrorDiv.style.display = "none";
      return validateSubject();
    })
    .then((subject) => {
      emailData.subject = subject;
      formErrorDiv.style.display = "none";
      return validateMessage();
    })
    .then((message) => {
      emailData.message = message;
      formErrorDiv.style.display = "none";
      openModal();
    })
    .catch((e) => {
      formErrorMsg.innerHTML = `${e}`;
      formErrorDiv.style.display = "inline-flex";
    });
}

//Abrir Modal luego de validar formulario para evitar
//mensajes de robots
function openModal() {
  modalContact.style.display = "grid";
  modal.style.display = "flex";
  document.getElementById("turing__num1").textContent = Math.round(
    Math.random() * 10 + 1
  );
  document.getElementById("turing__num2").textContent = Math.round(
    Math.random() * 10 + 1
  );
}

//Validar respuesta del Modal
function validateTuring() {
  const a = document.getElementById("turing__num1").textContent;
  const b = document.getElementById("turing__num2").textContent;
  const c = turingResult.value;
  const r = /^([0-9]{1,2})$/g;

  return new Promise((res, rej) => {
    if (parseInt(a) + parseInt(b) == parseInt(c)) {
      turingResult.value = null;
      res();
    } else if (!r.test(c)) {
      rej("Por favor ingresa un número válido.");
    } else if (parseInt(a) + parseInt(b) !== parseInt(c)) {
      rej("Error, el resultado es incorrecto.");
    }
  });
}

//Abrir Modal con la respuesta obtenida al enviar o no
//el email
function openModalResponse(status) {
  const modalResponse = document.querySelector(".modal__response");
  const okIcon = document.getElementById("ok-icon");
  const errorIcon = document.getElementById("error-icon");
  const msg1 = document.getElementById("modal__response__msg1");
  const msg2 = document.getElementById("modal__response__msg2");

  modalResponse.style.display = "flex";

  if (status == 200) {
    okIcon.style.display = "block";
    errorIcon.style.display = "none";
    msg1.innerHTML = "¡Felicitaciones!";
    msg2.innerHTML = `
      Su mensaje ha sido<br>
      enviado con éxito.
      `;
    form.reset();
  } else {
    okIcon.style.display = "none";
    errorIcon.style.display = "block";
    msg1.innerHTML = "¡Ups!";
    msg2.innerHTML = `
      Parece que hubo un error<br>
      al procesar la solicitud.
      `;
  }

  setTimeout(() => {
    okIcon.style.display = "none";
    errorIcon.style.display = "none";
    modalContact.style.display = "none";
    modalResponse.style.display = "none";
    turingError.style.display = "none";
    turingError.innerHTML = "";
  }, 4000);
}
//#endregion

//* EmailJS
//#region
formSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  turingResult.value = null;
  turingError.innerHTML = "";
  validateForm();
});

function sendEmail() {
  emailjs
    .send("service_aqzt7ic", "template_oy19z1c", emailData)
    .then(function (response) {
      modalLoadingContainer.style.display = "none";
      openModalResponse(response.status);
      form.reset();
    })
    .catch(function (response) {
      modalLoadingContainer.style.display = "none";
      openModalResponse(response.status);
      form.reset();
    });
}
//#endregion

//* Smooth Scrolling
//#region
$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});
//#endregion
