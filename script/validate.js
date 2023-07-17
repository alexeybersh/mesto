const VALIDATION_CONFIG = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    popupSet: '.popup__set',
    buttonSubmitSelector: '.popup__save-button',
    buttonInactiveClass: 'popup__save-button_inactive',
    errorInputClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.errorInputClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.errorInputClass);
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
    const buttonElement = formElement.querySelector(config.buttonSubmitSelector);

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
  
      const fieldsetList = Array.from(formElement.querySelectorAll(config.popupSet));

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
    buttonElement.classList.add(config.buttonInactiveClass); 
    buttonElement.disabled = true;

  }

  function buttonEnableSubmit(buttonElement, config) {
    buttonElement.classList.remove(config.buttonInactiveClass);
    buttonElement.disabled = false;
} 