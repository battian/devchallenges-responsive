const fields = document.querySelectorAll('[required]');

function ValidateField(field) {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: 'Please fill out this field',
      },
      email: {
        valueMissing: 'Please fill out this field',
        typeMismatch: 'Please enter a valid email address',
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const parentDiv = field.parentNode;
    const spanError = parentDiv.parentNode.querySelector('span.error');

    if (message) {
      parentDiv.classList.add('input__container-error');
      spanError.classList.add('active');
      spanError.innerHTML = message;
    } else {
      parentDiv.classList.remove('input__container-error');
      spanError.classList.remove('active');
      spanError.innerHTML = '';
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);
      setCustomMessage(message);
    } else {
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = ValidateField(field);

  validation();
}

for (field of fields) {
  field.addEventListener('invalid', event => {
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener('blur', customValidation);
}

document.querySelector('form').addEventListener('submit', () => {
  alert('Success!');
});
