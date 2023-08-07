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

      this._setEventListeners();
  }; 

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._buttonSubmitSelector);

    this._toggleButtonState();
    
    this._inputList.forEach((inputElement) => {  
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonDisableSubmit(this._buttonElement);
    } else {
    this._buttonEnableSubmit(this._buttonElement);
    } 
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
   });
 }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._errorInputClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };  

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); 
      errorElement.classList.remove(this._errorInputClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  }; 


 _buttonDisableSubmit() { 
  this._buttonElement.classList.add(this._buttonInactiveClass); 
  this._buttonElement.disabled = true;
 } 

 _buttonEnableSubmit() {
  this._buttonElement.classList.remove(this._buttonInactiveClass);
  this._buttonElement.disabled = false;
 }


resetErrorForm() {
  this._buttonDisableSubmit(this._buttonSubmitSelector)

  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
    })
  }
}

export default FormValidator