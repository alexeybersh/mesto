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
  inputLinkImage,
  popupForm,
  popupInput,
  inputImage,
  inputImageTitle
 } from "../utils/contents.js";

import '../pages/index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js"
import UserInfo from "../components/UserInfo.js"

// валидирование формы
const formValidationEditProfile= new FormValidator(validationConfig, formPopupProfile);
formValidationEditProfile.enableValidation();

const formValidationAddImage= new FormValidator(validationConfig, formPopupImage);
formValidationAddImage.enableValidation();

// данные пользователя при открытии попап
const userInfo = new UserInfo(
  selectorNameInput, 
  selectorjobInput
);

// Экземпляры для попапов
const popupProfile = new PopupWithForm(popupEditProfile, handleFormSubmitEditProfile, popupForm, popupInput);

const popupImage = new PopupWithForm(popupAddImage, handleSubmitAddImage, popupForm, popupInput);

const popupViewImage = new PopupWithImage(buttonZoomPopupImage, inputImage, inputImageTitle);

// Открытие попапов
function popupOpenProfile() {
  formValidationEditProfile.resetErrorForm();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
}

function popupOpenAddImige() {
  formValidationAddImage.resetErrorForm();
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

function createCard(data) {
  const card = new Card(data, newTemplate, handleCardClick);

  return card.generateCard();
}

function veiwCard(data) {
  const veiwCard = new Section({
      data: [data],
      renderer: (item) => {
        const cardElement= createCard(item)
    
        veiwCard.addItem(cardElement);
      }
    }, elementsList)

    veiwCard.renderItems() 
};

function handleSubmitAddImage() {
  
  const data =  {name: inputNameImage.value, link: inputLinkImage.value};
  
  veiwCard(data)

  popupImage.close();
}

const defaultCard = new Section({
  data: initialeElements,
  renderer: (item) => {
    const cardElement= createCard(item)

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