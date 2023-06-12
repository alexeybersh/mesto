let nameInput = document.querySelector(".profile__title");

let jobInput = document.querySelector(".profile__subtitle");

$(document).ready(function ($) {
  $(".profile__edit-button").click(function () {
    const inputName = document.querySelector(".popup__profile-title");
    const inputjob = document.querySelector(".popup__profile-subtitle");

    inputName.value = nameInput.textContent;
    inputjob.value = jobInput.textContent;

    $(".popup-fade").fadeIn();
    return false;
  });

  $(".popup__close-button").click(function () {
    $(this).parents(".popup-fade").fadeOut();
    return false;
  });
});

let formElement = document.querySelector(".popup");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const inputName = document.querySelector(".popup__profile-title");
  const inputjob = document.querySelector(".popup__profile-subtitle");

  inputName.value = inputName.value;
  inputjob.value = inputjob.value;

  nameInput.textContent = inputName.value;
  jobInput.textContent = inputjob.value;

  $(".popup-fade").fadeOut();
  return false;
}

formElement.addEventListener("submit", handleFormSubmit);
