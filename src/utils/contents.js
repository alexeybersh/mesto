// api
export const apiUrl = 'https://mesto.nomoreparties.co/v1/cohort-74';
export const apiToken = "2d8f0eb6-386b-4584-9f34-de03cb37fac0";

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  popupSet: '.popup__set',
  buttonSubmitSelector: '.popup__save-button',
  buttonInactiveClass: 'popup__save-button_inactive',
  errorInputClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
};

// шаблон
export const newTemplate = "#element-template"
// место для вставки карточек
export const elementsList = ".elements__list";

// попап редактирование профиля
export const popupEditProfile = ".popup_type_edit-profile";
// попап для удаления картинки
export const popupDeleteImage = ".popup_type_delete-image";
// попап большой картинки
export const buttonZoomPopupImage = ".popup_type_big-image";
// попап для добавления картинок
export const popupAddImage = ".popup_type_add-image";
// попап для аватара
export const popupChangeAvatar = ".popup_type_avatar";


// данные пользователя
export const selectorNameInput = ".profile__title";
export const selectorjobInput = ".profile__subtitle";
// кнопка открытия попапа для редактирования профеля
export const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
//кнопка открытия попапа для добавления карточек  
export const buttonAddPopupImage = document.querySelector(".profile__add-button");
// кнопка открытия попапа для изменения картинки аватара
export const buttonOpenPopupAvatar = document.querySelector(".profile__avater-button");

export const popupForm = ".popup__form";
// импуты попапов
export const popupInput = ".popup__input";
// импуты картинок
export const inputImage = ".popup__image";
export const inputImageTitle = ".popup__image-title";


export const formPopupProfile = document.querySelector(".popup__form_edit_profile");

export const formPopupImage = document.querySelector(".popup__form_add_image");

export const formPopupAvatar = document.querySelector(".popup__form_avatar");

// кнопка для сохранения профиля
export const buttonSubmitPopupProfile = document.querySelector(".popup__save-button_edit_profile");
// кнопка для сохранения картинки
export const buttonSubmitPopupImage = document.querySelector(".popup__save-button_add_image");
// кнопка для сохранения аватара
export const buttonSubmitPopupAvatar = document.querySelector(".popup__save-button_avatar");
// кнопка для удаления картинки
export const buttonConrirmDeletePopupImage = document.querySelector(".popup__save-button_delete_image");

// для увелечения карточек
export const popupImage = document.querySelector(".popup__image");
export const popupImageTitle = document.querySelector(".popup__image-title");

export const inputNameImage = document.querySelector(".popup__input_input-name-image_text");
export const inputLinkImage = document.querySelector(".popup__input_link_text");

// аватар
export const avatarImage = document.querySelector(".profile__avatar"); 
export const avatarName = document.querySelector(".profile__title");
export const avatarJob = document.querySelector(".profile__subtitle");

export const countLike = ".elements__count-like";

export const selectorButtonLike = ".elements__group-button"