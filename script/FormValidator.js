class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._popupSet = config.popupSet;
    this._buttonSubmitSelector = config.buttonSubmitSelector;
    this._buttonInactiveClass = config.buttonInactiveClass;
    this._errorInputClass = config.errorInputClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  enableValidation() {
      this._form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      this._setEventListeners(this._form);
  }; 

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._buttonSubmitSelector);

    this._toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {  
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._buttonDisableSubmit(buttonElement);
    } else {
    this._buttonEnableSubmit(buttonElement);
    } 
  }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
   });
 }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._errorInputClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };  

  hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove(this._errorInputClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  }; 


 _buttonDisableSubmit(buttonElement) { 
  buttonElement.classList.add(this._buttonInactiveClass); 
  buttonElement.disabled = true;
 } 

 _buttonEnableSubmit(buttonElement) {
  buttonElement.classList.remove(this._buttonInactiveClass);
  buttonElement.disabled = false;
 } 

}

export default FormValidator