import { 
  validationConfig, 
  newTemplate, 
  elementsList,
  popupEditProfile,
  selectorNameInput,
  selectorjobInput,
  buttonOpenPopupProfile,
  buttonZoomPopupImage,
  buttonAddPopupImage,
  buttonOpenPopupAvatar,
  buttonSubmitPopupProfile,
  buttonSubmitPopupImage,
  buttonSubmitPopupAvatar,
  buttonConrirmDeletePopupImage,
  popupAddImage,
  formPopupImage,
  formPopupAvatar,
  formPopupProfile,
  popupForm,
  popupInput,
  inputImage,
  inputImageTitle,
  apiUrl,
  apiToken,
  avatarImage,
  avatarName,
  avatarJob,
  popupDeleteImage,
  popupChangeAvatar,
  countLike,
  selectorButtonLike
 } from "../utils/contents.js";

import '../pages/index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
import Section from '../components/Section.js';
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js"
import UserInfo from "../components/UserInfo.js"
import Api from "../components/Api.js"

const apiConfig = {
  url: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "authorization": apiToken
  }}

const api = new Api(apiConfig)

let userId; 

api.getUserInfo()
  .then((data) => {
    userId = data._id
    avatarImage.src = data.avatar;
    avatarImage.alt = data.name;
    avatarName.textContent = data.name;
    avatarJob.textContent = data.about;
  })
  .catch((err) => {console.log(err)})

api.getAllCards()
 .then((data) => cardSelection.renderItems(data))  
 .catch((err) => console.log(err))

 function setLike(card, domCard){
  api.isLike(card.id)
  .then((data) => {
    domCard.querySelector(countLike).textContent = (data.likes).length
  })

  .catch((err) => console.log(err))
 }

 function unsetLike(card, domCard){
  api.isLikeDelete(card.id)
  .then((data) => {
    domCard.querySelector(countLike).textContent = (data.likes).length
  })

  .catch((err) => console.log(err))
 }

// валидирование формы
const formValidationEditProfile= new FormValidator(validationConfig, formPopupProfile);
formValidationEditProfile.enableValidation();

const formValidationAddImage= new FormValidator(validationConfig, formPopupImage);
formValidationAddImage.enableValidation();

const formValidationAvatar = new FormValidator(validationConfig, formPopupAvatar);
formValidationAvatar.enableValidation();

// данные пользователя при открытии попап
const userInfo = new UserInfo(
  selectorNameInput, 
  selectorjobInput
);

// Экземпляры для попапов
const popupProfile = new PopupWithForm(popupEditProfile, handleFormSubmitEditProfile, popupForm, popupInput);

const popupImage = new PopupWithForm(popupAddImage, handleSubmitAddImage, popupForm, popupInput);

const popupViewImage = new PopupWithImage(buttonZoomPopupImage, inputImage, inputImageTitle);

const popupDelete = new PopupConfirmDelete(popupDeleteImage, popupForm, handleCardDelete);

const popupAvatar = new PopupWithForm(popupChangeAvatar, handleAvatarChange, popupForm, popupInput);

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

function popupOpenDelete(evt) {
  popupDelete.open(evt);
}

function popupOpenAvatar(){
  formValidationAvatar.resetErrorForm();
  popupAvatar.open()
}

// Закрытие попапа 
function handleFormSubmitEditProfile(inputValues) {
  buttonSubmitPopupProfile.textContent = "Сохранение...";
  api.setUserInfo(inputValues)
  .then((data) => {
    userInfo.setUserInfo(data);
    popupProfile.close();
  })  

  .catch((err) => {console.log(err)})
  
  .finally(() => {
    popupProfile.close();
    buttonSubmitPopupProfile.textContent = "Сохранить";
  })  
}

function handleSubmitAddImage(inputValues) {
  buttonSubmitPopupImage.textContent = "Сохранение...";
  api.createCard(inputValues).then((data) => {
    cardSelection.renderItems([data]);
    popupImage.close();
  }) 
  
  .catch((err) => {console.log(err)})

  .finally(() => {
    popupImage.close();
    buttonSubmitPopupImage.textContent = "Сохранить";
  })  
}

function handleCardDelete (card) {
  buttonConrirmDeletePopupImage.textContent = "Удаление...";
  api.deleteCard(card.id)
  .then(() => {
    card.deleteCard();
    popupDelete.close();
  })
  .catch((err) => {console.log(err)})

  .finally(() => {
    popupDelete.close();
    buttonConrirmDeletePopupImage.textContent = "Да";
  }) 
}

function handleAvatarChange(inputValues){
  buttonSubmitPopupAvatar.textContent = "Сохранение...";
  api.setAvaatar(inputValues).then((data) => {
    avatarImage.src = data.avatar;
    popupAvatar.close();
  })
  .catch((err) => {console.log(err)})

  .finally(() => {
    popupAvatar.close();
    buttonSubmitPopupAvatar.textContent = "Сохранить";
  }) 
}

function createCard(data) {
  const card = new Card(data, newTemplate, handleCardClick, popupOpenDelete, userId, setLike, unsetLike, selectorButtonLike);
  return card.generateCard();
}

const cardSelection = new Section({
  renderer: (item) => {
    const cardElement= createCard(item)

    cardSelection.addItem(cardElement);
  }
}, elementsList);

// слушатели 
buttonOpenPopupProfile.addEventListener("click", popupOpenProfile);
buttonAddPopupImage.addEventListener("click", popupOpenAddImige);
buttonOpenPopupAvatar.addEventListener("click", popupOpenAvatar);
popupProfile.setEventListeners();
popupViewImage.setEventListeners();
popupImage.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();