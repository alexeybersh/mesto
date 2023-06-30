// для профиля
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");

const editButtonElement = document.querySelector(".profile__edit-button");
const closeButtonElement = document.querySelector(
  ".popup__close-button_edit_profile"
);
const saveButtonElement = document.querySelector(
  ".popup__save-button_edit_profile"
);
const popupElement = document.querySelector(".popup_type_edit-profile");
const formElement = document.querySelector(".popup__form_edit_profile");
const inputName = document.querySelector(".popup__profile_input-name_text");
const inputjob = document.querySelector(".popup__profile_input-job_text");

// пдля добавления карточек
const addButtonImage = document.querySelector(".profile__add-button");
const closeButtonElementImage = document.querySelector(
  ".popup__close-button_add_image"
);
const saveButtonElementImage = document.querySelector(
  ".popup__save-button_add_image"
);
const popupElementImage = document.querySelector(".popup_type_add-image");
const formElementImage = document.querySelector(".popup__form_add_image");
const inputNameImage = document.querySelector(
  ".popup__profile_input-name-image_text"
);
const inputLinkImage = document.querySelector(".popup__profile_link_text");

// для увелечения карточек
const openPopupImage = document.querySelector(".popup_type_big-image");
const popupImege = document.querySelector(".popup__image");
const popupImegeTitle = document.querySelector(".popup__image-title");

// шаблон
const elementTemplate = document.querySelector("#element-template").content;
const elementsList = document.querySelector(".elements__list");

function popupOpened(popupOpened) {
  popupOpened.classList.add("popup_opened");
}

function popupClosed(popupClosed) {
  popupClosed.classList.remove("popup_opened");
}

// редактирование профиля
editButtonElement.addEventListener("click", () => {
  popupOpened(popupElement);

  inputName.value = nameInput.textContent;
  inputjob.value = jobInput.textContent;
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = inputName.value;
  jobInput.textContent = inputjob.value;

  popupClosed(popupElement);
}

formElement.addEventListener("submit", handleFormSubmit);

closeButtonElement.addEventListener("click", () => {
  popupClosed(popupElement);
});

// добавление карточек
addButtonImage.addEventListener("click", () => {
  popupOpened(popupElementImage);
});

closeButtonElementImage.addEventListener("click", () => {
  popupClosed(popupElementImage);
});

function handleAddSubmit(evt) {
  evt.preventDefault();

  const elementHtml = createElements({
    name: inputNameImage.value,
    link: inputLinkImage.value,
  });

  elementsList.prepend(elementHtml);

  formElementImage.reset();

  popupClosed(popupElementImage);
}

formElementImage.addEventListener("submit", handleAddSubmit);

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
  const originalImage = copyElement.querySelector(".elements__masc-group");

  originalImage.addEventListener("click", () => {
    popupImege.src = link;
    popupImege.alt = name;
    popupImegeTitle.textContent = name;

    popupOpened(openPopupImage);
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
    popupClosed(openPopupImage);
  });
