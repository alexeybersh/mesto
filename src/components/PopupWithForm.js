import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm, popupForm, popupInput) {
    super(popupSelector);
    this._form = this._popup.querySelector(popupForm);
    this._inputsList = Array.from(
    this._popup.querySelectorAll(popupInput));
    this._handlerSubmitForm = submitForm;
    this._formItem = {};
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

  close() {
    super.close();
    this._form.reset();
  }
};  