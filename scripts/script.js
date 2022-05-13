const openPopupButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close');
const saveInfoButton = popup.querySelector('.popup__save');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_description');

//Функция: открывает и закрывает окно "Редактировать профиль", при открытии сразу вносит в инпуты инфу из граф имя и описание
function popupOpenToggle() {
    popup.classList.toggle('popup_is-opened');

    if (popup.classList.contains('popup_is-opened')) {
      nameInput.value = profileName.textContent;
      jobInput.value = profileDescription.textContent;
    }
  }

//Функция: отправляет новые введенные данные в графы имени и описания и закрывает форму
function formSubmitHandler(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupOpenToggle()
}

//Открыть окно, нажав на кнопку "Редактировать профиль"
openPopupButton.addEventListener('click', popupOpenToggle);

//Закрыть окно "Редактрировать профиль", нажав на крестик
closePopupButton.addEventListener('click', popupOpenToggle);

//Отправить новые данные в форму
formElement.addEventListener('submit', formSubmitHandler);