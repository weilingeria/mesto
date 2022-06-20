import { initialCards, config } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
  const profilePopupOpenButton = document.querySelector('.profile__edit-button');
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  const profilePopup = document.querySelector('.popup_edit-profile');
  const profilePopupCloseButton = document.querySelector('.popup__close');
  const formProfileElement = document.querySelector('.popup__form');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

//ПОПАП ОТКРЫТИЯ КАРТОЧКИ
  const openedImagePopup = document.querySelector('.popup_open-image');
  const openedImage = document.querySelector('.popup__image');
  const imageTitle = document.querySelector('.popup__image-title');
  const openedImagePopupCloseButton = document.querySelector('.popup__close_open-image');

//ПОПАП ДОБАВЛЕНИЯ КАРТОЧЕК
  const newCardPopup = document.querySelector('.popup_add-cards');
  const newCardForm = document.querySelector('.popup__form_add-cards');
  const newCardButton = document.querySelector('.profile__add-button');
  const newCardFormCloseButton = document.querySelector('.popup__close_add-cards');
  const titleInput = document.querySelector('.popup__input_type_title');
  const linkInput = document.querySelector('.popup__input_type_link');

  const profilePopupValidation = new FormValidator(config, profilePopup);
  const newCardValidation = new FormValidator(config, newCardPopup);

  //Функции открытия и закрытия для всех попапов
  function openPopup(element) {
      element.classList.add('popup_is-opened');
      document.addEventListener("keydown", closePopupEsc);   
  }

  function closePopup(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener("keydown", closePopupEsc);
  }

  //Функция: закрывает попапы при нажатии на оверлэй
  function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      const openedPopupForOverlay = document.querySelector(".popup_is-opened");
      closePopup(openedPopupForOverlay);
    }
  }

  //Функция: закрывает попапы при нажатии на Esc
  function closePopupEsc(evt) {
    if (evt.key === "Escape") {
     const openedPopupForEsc = document.querySelector(".popup_is-opened");
     closePopup(openedPopupForEsc);
    }
  } 

  //Функция: открывает попап редактирования профиля и заполняет поля
  function openprofilePopup() {
      profilePopupValidation.resetErrors();

      nameInput.value = profileName.textContent;
      jobInput.value = profileDescription.textContent;

      profilePopupValidation.submitButtonInactive();
      
      openPopup(profilePopup)
    }

  //Функция: отправляет новые введенные данные в графы имени и описания и закрывает форму
  function submitProfileForm(evt) {
      evt.preventDefault(); 
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(profilePopup)
  }

  //Функция: открывает картинку в полном размере
  function openImage(name, link) {
    imageTitle.textContent = name;
    openedImage.src = link;
    openedImage.alt = name;
    
    openPopup(openedImagePopup)
  }

  //Отрисовка карточек
  function createCard(cardData) {
    const card = new Card(cardData, '#elements-template', openImage);
    const cardCreated = card.generateCard();
    return cardCreated;
  }

  function renderCard(cardData, elementsListContainer) {
    elementsListContainer = document.querySelector('.elements__list');

    elementsListContainer.prepend(createCard(cardData));
  }

  //Функция: принимает данные и добавляет в массив
  function submitAddCardForm (evt) {
    evt.preventDefault();
    renderCard({ name: titleInput.value, link: linkInput.value });
  
    closePopup(newCardPopup);
  }

  //Отрисовать карточки
  initialCards.forEach((cardData) => {
    renderCard(cardData)
  });

  //Открыть попап редактирования профиля, нажав на кнопку "Редактировать профиль"
  profilePopupOpenButton.addEventListener('click', openprofilePopup);

  //Закрыть окно "Редактировать профиль", нажав на крестик
  profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));

  //Отправить новые данные в форму
  formProfileElement.addEventListener('submit', submitProfileForm);

  //Закрыть картинку, нажав на крестик
  openedImagePopupCloseButton.addEventListener('click', () => closePopup(openedImagePopup));  

  //Открыть попап для добавления карточек
  newCardButton.addEventListener('click', () => {
    newCardForm.reset();
    newCardValidation.resetErrors();
    openPopup(newCardPopup);
    newCardValidation.submitButtonInactive();
  });

  //Закрыть попап добавления карточек, нажав на крестик
  newCardFormCloseButton.addEventListener('click', () => closePopup(newCardPopup));
  
  //Отправить данные добавления новой карточки
  newCardForm.addEventListener('submit', submitAddCardForm);

  //Закрытие попапов на оверлэй
  profilePopup.addEventListener('mousedown', closePopupOverlay);
  openedImagePopup.addEventListener('mousedown', closePopupOverlay);
  newCardPopup.addEventListener('mousedown', closePopupOverlay);

  //Валидация попапов
  profilePopupValidation.enableValidation();  
  newCardValidation.enableValidation();