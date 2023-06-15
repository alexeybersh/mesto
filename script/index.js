let nameInput = document.querySelector(".profile__title");
let jobInput = document.querySelector(".profile__subtitle");

const editButtonElement = document.querySelector(".profile__edit-button");
const closeButtonElement = document.querySelector(".popup__close-button");
const saveButtonElement = document.querySelector(".popup__save-button");
const popupElement = document.querySelector(".popup");

editButtonElement.addEventListener("click", () => {
  popupElement.classList.toggle("popup_opened");
  const inputName = document.querySelector(".popup__profile-title");
  const inputjob = document.querySelector(".popup__profile-subtitle");

  inputName.value = nameInput.textContent;
  inputjob.value = jobInput.textContent;
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const inputName = document.querySelector(".popup__profile-title");
  const inputjob = document.querySelector(".popup__profile-subtitle");

  inputName.value = inputName.value;
  inputjob.value = inputjob.value;

  nameInput.textContent = inputName.value;
  jobInput.textContent = inputjob.value;

  popupElement.classList.toggle("popup_opened");
}

saveButtonElement.addEventListener("click", handleFormSubmit);

closeButtonElement.addEventListener("click", () => {
  popupElement.classList.toggle("popup_opened");
});
