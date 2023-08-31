import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, popupForm, popupInput, submitForm}) {
    super(popupSelector);
    this._form = this._popup.querySelector(popupForm);
    this._handlerSubmitForm = submitForm;
    this._inputsList = Array.from(
    this._popup.querySelectorAll(popupInput));    
    this._formItem = {};
    this._buttonSubmit = this._popup.querySelector(".popup__save-button");
    this._buttonSubmitText = this._buttonSubmit.textContent
  }

  _getInputValues() {
    this._inputsList.forEach((input) => {
      this._formItem[input.name] = input.value;
      });
    return this._formItem;
  }

  setInputValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();    
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._getInputValues());
    });
  }

  renderLoading(isloading, buttonText='Сохранить...') {
    if(isloading) {
      this._buttonSubmit.textContent = buttonText;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText
    }
    
  }

  close() {
    super.close();
    this._form.reset();
  }
};