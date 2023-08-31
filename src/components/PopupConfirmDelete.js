import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup{
  constructor({popupSelector, popupForm, submitForm}) {
    super(popupSelector);
    this._form = this._popup.querySelector(popupForm);
    this._handlerSubmitForm = submitForm;
  }

  
  _handlerSubmitForm(card){
    this._handlerSubmitForm(card)
  }

  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSubmitForm(this._card);
    });
  } 
  
  open(card) {
    this._card = card;
    super.open();
  }
}