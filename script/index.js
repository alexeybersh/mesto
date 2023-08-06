import initialeElements from "./content.js";
import Card from "./Card.js";
import validationConfig from "./validate.js"
import FormValidator from "./FormValidator.js"

// для профиля
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonClosePopupProfile = document.querySelector(
  ".popup__close-button_edit_profile"
);

const popupProfile = document.querySelector(".popup_type_edit-profile");
const formPopupProfile = document.querySelector(".popup__form_edit_profile");
const inputName = document.querySelector(".popup__input_input-name_text");
const inputjob = document.querySelector(".popup__input_input-job_text");

// пдля добавления карточек
const newTemplate = document.querySelector("#element-template")
const buttonAddPopupImage = document.querySelector(".profile__add-button");
const buttonClosePopupImage = document.querySelector(
  ".popup__close-button_add_image"
);
const saveButtonElementImage = document.querySelector(
  ".popup__save-button_add_image"
);
const popupAddImage = document.querySelector(".popup_type_add-image");
const formPopupImage = document.querySelector(".popup__form_add_image");
const inputNameImage = document.querySelector(
  ".popup__input_input-name-image_text"
);
const inputLinkImage = document.querySelector(".popup__input_link_text");

// для увелечения карточек
export const buttonZoomPopupImage = document.querySelector(".popup_type_big-image")
export const popupImage = document.querySelector(".popup__image");
export const popupImageTitle = document.querySelector(".popup__image-title");

// шаблон
const elementsList = document.querySelector(".elements__list");

// валидирование формы
const formValidationEditProfile= new FormValidator(validationConfig, formPopupProfile);
formValidationEditProfile.enableValidation();

const formValidationAddImage= new FormValidator(validationConfig, formPopupImage);
formValidationAddImage.enableValidation();


// открытие попапа
export function popupOpened(popupOpened) {
  popupOpened.classList.add("popup_opened");
  document.addEventListener('keydown', escClosePopup)

  formValidationEditProfile.resetErrorForm();
  formValidationAddImage.resetErrorForm();
};

// закрытие попапа
function popupClosed(popupClosed) {
  popupClosed.classList.remove("popup_opened");
  document.removeEventListener('keydown', escClosePopup)
}

// закрытие картинки
document
  .querySelector(".popup__close-button_image_close-button")
  .addEventListener("click", () => {
    popupClosed(buttonZoomPopupImage);
  });

// закрытие попапа по overlay
function popupCloseOverlay(evt) { 
  if (evt.target.classList.contains('popup_opened')) { 
      popupClosed(evt.target);
    };
 };

 const arryaPopup = Array.from(document.querySelectorAll(".popup"))
  arryaPopup.forEach((item) => {
    item.addEventListener('click', (evt) => {popupCloseOverlay(evt)});
  })

// закрытие по ESC
function escClosePopup(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector(".popup_opened");
    if (popup)
    popupClosed(popup);
  }
}

// редактирование профиля
buttonOpenPopupProfile.addEventListener("click", () => {

  popupOpened(popupProfile);
  popupFillEditProfile();  
});

function popupFillEditProfile() {
  inputName.value = nameInput.textContent;
  inputjob.value = jobInput.textContent;
}

function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();

  nameInput.textContent = inputName.value;
  jobInput.textContent = inputjob.value;

  popupClosed(popupProfile);
}

formPopupProfile.addEventListener("submit", handleFormSubmitEditProfile);

buttonClosePopupProfile.addEventListener("click", () => {
  popupClosed(popupProfile);
});

// добавление карточек
buttonAddPopupImage.addEventListener("click", () => {

  formPopupImage.reset();
  
  popupOpened(popupAddImage);
});

buttonClosePopupImage.addEventListener("click", () => {
  popupClosed(popupAddImage);
});

// загрузка предустановенных карточек
initialeElements.forEach((data) => {
  const card = new Card(data, newTemplate);  
  
  elementsList.append(card.getView());  
});

// добавление новой карточки
function handleAddSubmitAddImage(evt) {
  evt.preventDefault();
  
  const data =  {name: inputNameImage.value, link: inputLinkImage.value};
  const newCard = new Card(data, newTemplate);

  elementsList.prepend(newCard.getView());

  popupClosed(popupAddImage);
}

formPopupImage.addEventListener("submit", handleAddSubmitAddImage);
