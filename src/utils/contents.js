export const initialeElements = [
    {
      name: "Пальмы на пляже",
      link: "https://w.forfun.com/fetch/4c/4c730760279faf92fd9e0bb260a0a2d9.jpeg",
    },
    {
      name: "Закат на море",
      link: "https://beautifoto.ru/wp-content/uploads/2019/06/9-11.jpg",
    },
    {
      name: "Качели на пляжу",
      link: "https://s1.1zoom.ru/b6343/302/Sea_Tropics_Palms_Beach_Swing_531524_3840x2160.jpg",
    },
    {
      name: "Пляж и море",
      link: "https://img.freepik.com/free-photo/beautiful_1203-2633.jpg?w=1800&t=st=1690886999~exp=1690887599~hmac=d65d81b4bb83bf6492e1ccb8cc5cfb30c9e058b16cb0ca2adc1badfb2e573733",
    },
    {
      name: "Мальдивы",
      link: "https://w.forfun.com/fetch/39/39be93396e708deb97bdb8b0d538a13e.jpeg",
    },
    {
      name: "Сейшелы",
      link: "https://wp-s.ru/wallpapers/2/91/379101226417646/fotografiya-palmy-plyazha-okeana-i-solnca.jpg",
    },
  ];

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
// данные пользователя
export const selectorNameInput = ".profile__title";
export const selectorjobInput = ".profile__subtitle";
// кнопка открытия попапа для редактирования профеля
export const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
// попап формы
export const popupForm = ".popup__form";
// импуты попапов
export const popupInput = ".popup__input";
// импуты картинок
export const inputImage = ".popup__image";
export const inputImageTitle = ".popup__image-title";
// попап большой картинки
export const buttonZoomPopupImage = ".popup_type_big-image";

export const formPopupProfile = document.querySelector(".popup__form_edit_profile");

// для добавления карточек
export const buttonAddPopupImage = document.querySelector(".profile__add-button");

export const popupAddImage = ".popup_type_add-image";
export const formPopupImage = document.querySelector(".popup__form_add_image");

// для увелечения карточек
export const popupImage = document.querySelector(".popup__image");
export const popupImageTitle = document.querySelector(".popup__image-title");

export const inputNameImage = document.querySelector(  ".popup__input_input-name-image_text");
export const inputLinkImage = document.querySelector(".popup__input_link_text");