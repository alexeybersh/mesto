import { initialeElements, 
  validationConfig, 
  newTemplate, 
  elementsList,
  popupEditProfile,
  selectorNameInput,
  selectorjobInput,
  buttonOpenPopupProfile,
  buttonZoomPopupImage,
  formPopupProfile,
  buttonAddPopupImage,
  popupAddImage,
  formPopupImage,
  inputNameImage,
  inputLinkImage
 } from "../utils/contents.js";

import Card from "../script/Card.js";
import FormValidator from "../script/FormValidator.js"
import Section from '../script/Section.js';
import PopupWithForm from "../script/PopupWithForm.js";
import PopupWithImage from "../script/PopupWithImage.js"
import UserInfo from "../script/UserInfo.js"

// валидирование формы
const formValidationEditProfile= new FormValidator(validationConfig, formPopupProfile);
formValidationEditProfile.enableValidation();

const formValidationAddImage= new FormValidator(validationConfig, formPopupImage);
formValidationAddImage.enableValidation();

// закрытие попапа по overlay -->>
function popupClosed(popupClosed) {
  popupClosed.classList.remove("popup_opened");
}


function popupCloseOverlay(evt) { 
  if (evt.target.classList.contains('popup_opened')) { 
      popupClosed(evt.target);
    };
 };

 const arryaPopup = Array.from(document.querySelectorAll(".popup"))
  arryaPopup.forEach((item) => {
    item.addEventListener('click', (evt) => {popupCloseOverlay(evt)});
  })
// <<--

// данные пользователя при открытии попап
const userInfo = new UserInfo(
  selectorNameInput, 
  selectorjobInput
);

// Экземпляры для попапов
const popupProfile = new PopupWithForm(popupEditProfile, handleFormSubmitEditProfile);

const popupImage = new PopupWithForm(popupAddImage, handleSubmitAddImage);

const popupViewImage = new PopupWithImage(buttonZoomPopupImage);

// Открытие попапов
function popupOpenProfile() {
  formValidationEditProfile.resetErrorForm();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
}

function popupOpenAddImige() {
  formValidationAddImage.resetErrorForm();
  formPopupImage.reset();  
  popupImage.open();
}

function handleCardClick(name, link) {
  popupViewImage.open(name, link);
}

// Закрытие попапа 
function handleFormSubmitEditProfile(inputValues) {
  userInfo.setUserInfo(inputValues)
  popupProfile.close();
}

function handleSubmitAddImage() {
  
  function createCard(data) {
    const card = new Card(data, newTemplate,handleCardClick);
 
    return card.generateCard();
  }
  
  const veiwCard = (data) => {
    const card = createCard(data)
    document.querySelector(elementsList).prepend(card);
  }

  const data =  {name: inputNameImage.value, link: inputLinkImage.value};
  
  veiwCard(data);
  popupImage.close();
}

const defaultCard = new Section({
  data: initialeElements,
  renderer: (item) => {
    const card = new Card(item, newTemplate, handleCardClick);
    const cardElement = card.generateCard();
    defaultCard.addItem(cardElement);
  }
}, elementsList);

defaultCard.renderItems()   

// слушатели 
buttonOpenPopupProfile.addEventListener("click", popupOpenProfile);
buttonAddPopupImage.addEventListener("click", popupOpenAddImige);
popupProfile.setEventListeners();
popupViewImage.setEventListeners();
popupImage.setEventListeners();