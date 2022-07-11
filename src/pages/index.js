import './index.css';
import { initialCards, config, profilePopup, nameInput, jobInput, newCardPopup, newCardForm, newCardButton, profilePopupOpenButton } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";


  const profilePopupValidation = new FormValidator(config, profilePopup);
  const newCardValidation = new FormValidator(config, newCardPopup);

  const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description'
  });
  
  const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_edit-profile',
    submitFormHandler: (formData) => {
      userInfo.setUserInfo(formData);
      popupEditProfile.closePopup();
    }
  });

  const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_add-cards',
    submitFormHandler: ({elementTitle, elementLink}) => {
      cardsList.addItem(createCard({name: elementTitle, link: elementLink}));
      popupAddCard.closePopup();
    }
  });

  const openedImagePopup = new PopupWithImage('.popup_open-image');

  //Отрисовка карточек
  const createCard = (cardData) => {
    const card = new Card({
      cardData: cardData,
      openImage: (name, link) => {
        openedImagePopup.openPopup(name, link);
      }}, '#elements-template');
      
      return card.generateCard();
  };

  const cardsList = new Section({
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    }}, '.elements__list');
  
  cardsList.renderedItems(initialCards);

  //Открыть попап редактирования профиля
  profilePopupOpenButton.addEventListener('click', () => {
    const currentUserInfo = userInfo.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.description;
    popupEditProfile.openPopup();
    profilePopupValidation.resetErrors();
    profilePopupValidation.submitButtonInactive();
  });

  //Открыть попап для добавления карточек
  newCardButton.addEventListener('click', () => {
    popupAddCard.openPopup();
    newCardForm.reset();
    newCardValidation.resetErrors();
    newCardValidation.submitButtonInactive();
  });

  popupEditProfile.setEventListeners();
  popupAddCard.setEventListeners();
  openedImagePopup.setEventListeners();

  //Валидация попапов
  profilePopupValidation.enableValidation();  
  newCardValidation.enableValidation();
