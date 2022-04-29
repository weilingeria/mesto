const openPopupButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close');
const saveInfoButton = popup.querySelector('.popup__save');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_description');

//Функция: открывает окно "Редактировать профиль" и вносит туда сразу инфу из граф имя и описание
function popupOpen() {
    popup.classList.add('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  }

//Функция: открывает и закрывает окно
function popupOpenToggle() {
    popup.classList.toggle('popup_is-opened');
  }

//Функция: отправляет новые введенные данные в графы имени и описания
function formSubmitHandler(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

//Функция: закрывает окно при нажатии на overlay
function popupOverlayClickHadler(evt) {
  if (evt.target === evt.currentTarget) {
    popupOpenToggle();
  }
}

//Открыть окно, нажав на кнопку "Редактировать профиль"
openPopupButton.addEventListener('click', popupOpen);

//Закрыть окно "Редактрировать профиль", нажав на крестик
closePopupButton.addEventListener('click', popupOpenToggle);

//Закрыть окно, нажав на overlay
popup.addEventListener('click', popupOverlayClickHadler);

//Отправить новые данные в форму
formElement.addEventListener('submit', formSubmitHandler); 

//Закрыть окно, нажав на кнопку "Сохранить"
saveInfoButton.addEventListener('click', popupOpenToggle);