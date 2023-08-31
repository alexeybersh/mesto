import { 
  validationConfig, 
  apiConfig,  
  newTemplate, 
  elementsList,
  popupEditProfile,
  selectorAvatar,
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
  avatarImage,
  popupDeleteImage,
  popupChangeAvatar
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

const api = new Api(apiConfig)

let userId; 

Promise.all([api.getUserInfo(), api.getAllCards()])
 .then(([userData, allCards]) => {
    userId = userData._id
    userInfo.setUserInfo(userData);
    cardSelection.renderItems(allCards); 
 })

 .catch((err) => {console.log(err)})

// валидирование формы
const formValidationEditProfile= new FormValidator(validationConfig, formPopupProfile);
formValidationEditProfile.enableValidation();

const formValidationAddImage= new FormValidator(validationConfig, formPopupImage);
formValidationAddImage.enableValidation();

const formValidationAvatar = new FormValidator(validationConfig, formPopupAvatar);
formValidationAvatar.enableValidation();

// данные пользователя при открытии попап
const userInfo = new UserInfo(
  selectorAvatar,
  selectorNameInput, 
  selectorjobInput
);

// Экземпляры для попапов
const popupProfile = new PopupWithForm({
  popupSelector: popupEditProfile,
  popupForm,
  popupInput,
  submitForm: (inputValues) => {
    popupProfile.renderLoading(true);
    api.setUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupProfile.close();
    })  
  
    .catch((err) => {console.log(err)})
    
    .finally(() => {
      popupProfile.renderLoading(false);
    })  
  },
  });

const popupImage = new PopupWithForm({
  popupSelector: popupAddImage,
  popupForm,
  popupInput,
  submitForm: (inputValues) => {
    popupImage.renderLoading(true);
    api.createCard(inputValues).then((data) => {
      cardSelection.renderItems([data]);
      popupImage.close();
    }) 
    
    .catch((err) => {console.log(err)})
  
    .finally(() => {
      popupImage.renderLoading(false);
    })  
  }});

const popupDelete = new PopupConfirmDelete({
  popupSelector: popupDeleteImage,
  popupForm,
  submitForm: (card) => {
      console.log(buttonConrirmDeletePopupImage);
      buttonConrirmDeletePopupImage.textContent = "Удаление...";
      api.deleteCard(card.id)
      .then(() => {
        card.deleteCard();
        popupDelete.close();
      })
      .catch((err) => {console.log(err)})
    
      .finally(() => {
        buttonConrirmDeletePopupImage.textContent = "Да";
      }) 
    }});

const popupAvatar = new PopupWithForm({
  popupSelector: popupChangeAvatar,
  popupForm,
  popupInput,
  submitForm: (inputValues) => {
    popupAvatar.renderLoading(true);
    api.setAvaatar(inputValues).then((data) => {
      avatarImage.src = data.avatar;
      popupAvatar.close();
    })
    .catch((err) => {console.log(err)})
  
    .finally(() => {
      popupAvatar.renderLoading(false);
    }) 
  }});

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

function popupOpenAvatar(){
  formValidationAvatar.resetErrorForm();
  popupAvatar.open()
}

function createCard(data) {
  const card = new Card({
    data,
    newTemplate,
    userId,
    handleCardClick: (name, link) => {
      popupViewImage.open(name, link);
    },
    handleOpenDelete: (card) => {
      popupDelete.open(card);
    }, 
    handleSetLike: (cardId) => {
      api.isLikeAdd(cardId)
      .then((data) => {
        console.log(data);
        card.updateLike(data)
      })
    
      .catch((err) => console.log(err))
     }, 
     handleUnsetLike: (cardId) => {
      api.isLikeRemove(cardId)
      .then((data) => {
        card.updateLike(data)
      })
    
      .catch((err) => console.log(err))
     }
   });
   
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