let nameInput = document.querySelector(".profile__title");
let jobInput = document.querySelector(".profile__subtitle");

const editButtonElement = document.querySelector(".profile__edit-button");
const closeButtonElement = document.querySelector(".popup__close-button");
const saveButtonElement = document.querySelector(".popup__save-button");
const popupElement = document.querySelector(".popup");
const formElement = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__profile_input-name_text");
const inputjob = document.querySelector(".popup__profile_input-job_text");

editButtonElement.addEventListener("click", () => {
  popupOpened();

  inputName.value = nameInput.textContent;
  inputjob.value = jobInput.textContent;
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = inputName.value;
  jobInput.textContent = inputjob.value;

  popupOpened();
}

formElement.addEventListener("submit", handleFormSubmit);

closeButtonElement.addEventListener("click", () => {
  popupOpened();
});

function popupOpened() {
  popupElement.classList.toggle("popup_opened");
}
