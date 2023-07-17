const VALIDATION_CONFIG = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    setPopup: '.popup__set'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config);
        
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      const fieldsetList = Array.from(formElement.querySelectorAll(config.setPopup));

      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet, config);
        }); 
    });
  };
  
  enableValidation(VALIDATION_CONFIG); 
  
  function hasInvalidInput(inputList) {
     return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
    
  function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      buttonDisableSubmit(buttonElement, config);

  } else {
    buttonEnableSubmit(buttonElement, config);

  } 
  }

  function buttonDisableSubmit(buttonElement, config) { 
    buttonElement.classList.add(config.inactiveButtonClass); 
    buttonElement.disabled = true;

  }

  function buttonEnableSubmit(buttonElement, config) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
} 