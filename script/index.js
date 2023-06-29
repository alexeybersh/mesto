// попап для профиля
let nameInput = document.querySelector(".profile__title");
let jobInput = document.querySelector(".profile__subtitle");

const editButtonElement = document.querySelector(".profile__edit-button");
const closeButtonElement = document.querySelector(
  ".popup__close-button_edit_profile"
);
const saveButtonElement = document.querySelector(
  ".popup__save-button_edit_profile"
);
const popupElement = document.querySelector(".popup_edit_profile");
const formElement = document.querySelector(".popup__form_edit_profile");
const inputName = document.querySelector(".popup__profile_input-name_text");
const inputjob = document.querySelector(".popup__profile_input-job_text");

editButtonElement.addEventListener("click", () => {
  popupOpened(popupElement);

  inputName.value = nameInput.textContent;
  inputjob.value = jobInput.textContent;
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = inputName.value;
  jobInput.textContent = inputjob.value;

  popupOpened(popupElement);
}

formElement.addEventListener("submit", handleFormSubmit);

closeButtonElement.addEventListener("click", () => {
  popupOpened(popupElement);
});

function popupOpened(popupOponed) {
  popupOponed.classList.toggle("popup_opened");
}

// попап для добавления карточек
const addButtonImage = document.querySelector(".profile__add-button");
const closeButtonElementImage = document.querySelector(
  ".popup__close-button_add_image"
);
const saveButtonElementImage = document.querySelector(
  ".popup__save-button_add_image"
);
const popupElementImage = document.querySelector(".popup_add_image");
const formElementImage = document.querySelector(".popup__form_add_image");
const inputNameImage = document.querySelector(
  ".popup__profile_input-name-image_text"
);
const inputLinkImage = document.querySelector(".popup__profile_link_text");

// добавление карточек
addButtonImage.addEventListener("click", () => {
  popupOpened(popupElementImage);
});

closeButtonElementImage.addEventListener("click", () => {
  popupOpened(popupElementImage);
});

function handleAddSubmit(evt) {
  evt.preventDefault();

  const elementHtml = createElements({
    name: inputNameImage.value,
    link: inputLinkImage.value,
  });

  elementsList.prepend(elementHtml);

  inputNameImage.value = "";
  inputLinkImage.value = "";

  popupOpened(popupElementImage);
}

formElementImage.addEventListener("submit", handleAddSubmit);

// создание карточек
const initialeElements = [
  {
    name: "Самарканд",
    link: "./images/axp-photography-BILdD7_E270-unsplash.jpg",
  },
  {
    name: "Челябинская область",
    link: "./images/sagar-kulkarni-pIuWVh-XQUI-unsplash.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const elementTemplate = document.querySelector("#element-template").content;
const elementsList = document.querySelector(".elements__list");
const popupImage = document.querySelector(".popup_bigimage");

const createElements = ({ name, link }) => {
  const copyElement = elementTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  copyElement.querySelector(".elements__masc-group").src = link;
  copyElement.querySelector(".elements__masc-group").alt = name;
  copyElement.querySelector(".elements__title").textContent = name;

  // удаление картинки
  const deleteElementButton = copyElement.querySelector(".elements__trash");

  deleteElementButton.addEventListener("click", () => {
    copyElement.remove();
  });

  // увелечение картинки
  const bigsizeImage = copyElement.querySelector(".elements__masc-group");

  bigsizeImage.addEventListener("click", () => {
    document.querySelector(".popup__image").src = link;
    document.querySelector(".popup__image").alt = name;
    document.querySelector(".popup__image-title").textContent = name;
    popupOpened(popupImage);
  });

  return copyElement;
};

initialeElements.forEach((item) => {
  const htmlElement = createElements(item);
  elementsList.append(htmlElement);
});

// клик по лайку в карточеке
document
  .querySelector(".elements__list")
  .addEventListener("click", function (evt) {
    if (evt.target.classList.contains("elements__group-button")) {
      evt.target.classList.toggle("elements__group-button_active");
    }
  });

document
  .querySelector(".popup__close-button_image_close-button")
  .addEventListener("click", () => {
    popupOpened(popupImage);
  });
