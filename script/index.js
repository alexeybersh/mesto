// для профиля
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonClosePopupProfile = document.querySelector(
  ".popup__close-button_edit_profile"
);
// const saveButtonElement = document.querySelector(
//   ".popup__save-button_edit_profile"
// );
const popupProfile = document.querySelector(".popup_type_edit-profile");
const formPopupProfile = document.querySelector(".popup__form_edit_profile");
const inputName = document.querySelector(".popup__input_input-name_text");
const inputjob = document.querySelector(".popup__input_input-job_text");

// пдля добавления карточек
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
const buttonZoomPopupImage = document.querySelector(".popup_type_big-image");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title");

// шаблон
const elementTemplate = document.querySelector("#element-template").content;
const elementsList = document.querySelector(".elements__list");

// открытие попапа
function popupOpened(popupOpened) {
  popupOpened.classList.add("popup_opened");
  if (popupOpened.querySelector(".popup__set")) {
  popupOpened.querySelector(".popup__set").classList.add("popup__set_active");
  }
  document.addEventListener('keydown', escClosePopup);
  popupOpened.addEventListener('click', popupCloseOverlay);
}

// закрытие попапа
function popupClosed(popupClosed) {
  popupClosed.classList.remove("popup_opened");
  if (popupClosed.querySelector(".popup__set")) {
    popupClosed.querySelector(".popup__set").classList.remove("popup__set_active");
    }
    document.removeEventListener('keydown', escClosePopup);
    popupClosed.removeEventListener('click', popupCloseOverlay);
}

// закрытие попапа по overlay
 function popupCloseOverlay(evt) { 
  const popup = document.querySelector(".popup_opened");
  if (popup && popup === evt.target) { 
      popupClosed(popup);
    };
 };

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
  errorMessageRevove();

  popupOpened(popupProfile);

  inputName.value = nameInput.textContent;
  inputjob.value = jobInput.textContent;
});

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


// очистка полей 
const errorMessageRevove = () => {
  inputElements = Array.from(document.querySelectorAll('.popup__input'));
  inputElements.forEach((popupInput) => {
  popupInput.classList.remove('popup__input_type_error');

  const errorMessageInput = document.querySelectorAll('.popup__input-error');
  errorMessageInput.forEach((item) => {
    item.textContent = '';
    })
  })
}

// добавление карточек
buttonAddPopupImage.addEventListener("click", () => {
  errorMessageRevove()

  buttonDisableSubmit(saveButtonElementImage, VALIDATION_CONFIG)

  formPopupImage.reset();
 
  popupOpened(popupAddImage);
});

buttonClosePopupImage.addEventListener("click", () => {
  popupClosed(popupAddImage);
});

function handleAddSubmitAddImage(evt) {
  evt.preventDefault();

  const elementHtml = createElements({
    name: inputNameImage.value,
    link: inputLinkImage.value,
  });

  elementsList.prepend(elementHtml);

  formPopupImage.reset();

  popupClosed(popupAddImage);
}

formPopupImage.addEventListener("submit", handleAddSubmitAddImage);

const createElements = ({ name, link }) => {
  const copyElement = elementTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const originalImage = copyElement.querySelector(".elements__masc-group");

  originalImage.src = link;
  originalImage.alt = name;
  copyElement.querySelector(".elements__title").textContent = name;

  // удаление картинки
  const deleteElementButton = copyElement.querySelector(".elements__trash");

  deleteElementButton.addEventListener("click", () => {
    copyElement.remove();
  });

  // увелечение картинки
    originalImage.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageTitle.textContent = name;

    popupOpened(buttonZoomPopupImage);
  });

  // клик по лайку в карточеке
  copyElement.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("elements__group-button")) {
      evt.target.classList.toggle("elements__group-button_active");
    }
  });

  return copyElement;
};

initialeElements.forEach((item) => {
  const htmlElement = createElements(item);
  elementsList.append(htmlElement);
});

// Закрытие картинки
document
  .querySelector(".popup__close-button_image_close-button")
  .addEventListener("click", () => {
    popupClosed(buttonZoomPopupImage);
  });