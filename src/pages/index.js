import './index.css';
import { 
  config,
  apiConfig,
  profilePopup, 
  nameInput, 
  jobInput, 
  newCardPopup, 
  newCardForm, 
  newCardButton,
  profilePopupOpenButton, 
  avatarPopup,
  avatarButton} from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';


  const api = new Api(apiConfig);

  let currentUserId = null;


  const profilePopupValidation = new FormValidator(config, profilePopup);
  const newCardValidation = new FormValidator(config, newCardPopup);
  const avatarPopupValidation = new FormValidator(config, avatarPopup);

  const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
  });
  
  const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_edit-profile',
    submitFormHandler: ({ name, description }) => {
      popupEditProfile.loadingState(true);
      api.editProfileInfo({ name, description })
        .then((res) => {
          userInfo.setUserInfo(res);
          popupEditProfile.closePopup();
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
        .finally(() => {
          popupEditProfile.loadingState(false);
        });
    }
  });

  const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_add-cards',
    submitFormHandler: ({ elementTitle, elementLink }) => {
      popupAddCard.loadingState(true);
      api.addNewElementCard({ elementTitle, elementLink })
        .then((res) => {
          cardsList.addItem(createCard(res));
          popupAddCard.closePopup();
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
        .finally(() => {
          popupAddCard.loadingState(false);
        })
    }
  });

  const popupAvatarEdit = new PopupWithForm({
    popupSelector: '.popup_edit-avatar',
    submitFormHandler: ({ avatar }) => {
      popupAvatarEdit.loadingState(true);
      api.editAvatar(avatar)
        .then((res) => {
          userInfo.setUserInfo(res);
          popupAvatarEdit.closePopup();
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
        .finally(() => {
          popupAvatarEdit.loadingState(false);
        })
    }
  });

  const openedImagePopup = new PopupWithImage('.popup_open-image');

  const cardDeletionConfirmationPopup = new PopupWithConfirmation('.popup_confirm-delete');

  //Отрисовка карточек
  const createCard = ({ name, link, likes, _id, owner }) => {
    const card = new Card({
      name,
      link,
      likes,
      _id,
      owner,
      userId: userInfo.getuserId(),
      openImage: (name, link) => {
        openedImagePopup.openPopup(name, link);
      },

      deleteCard: (cardId) => {
        cardDeletionConfirmationPopup.openPopup();
        cardDeletionConfirmationPopup.setConfirmAction(() => {
          cardDeletionConfirmationPopup.loadingState(true);
          api.deleteElementCard(cardId)
          .then(() => {
            card.cardDelete();
            cardDeletionConfirmationPopup.closePopup();
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`);
          })
          .finally(() => {
            cardDeletionConfirmationPopup.loadingState(false);
          })
        });
      },

      likeCardHandler: () => {
        const stateLike = card.getLikes()
        .find(owner => owner._id === userInfo._id);

        if(!stateLike) {
          api.setLike(card.getId())
          .then((res) => {
            card.renderLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`);
          });
        } else {
          api.removeLike(card.getId())
          .then((res) => {
            card.renderLikes(res.likes);
          })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
        }        
      },
    }, '#elements-template');
      
      return card.generateCard();
  };

  const cardsList = new Section({
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    }}, '.elements__list');

  //Получить данные с сервера, отрисовать карточки и заполнить информацию о пользователе
  Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    currentUserId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderedItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`)
  });

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

  //Открыть попап редактирования аватара
  avatarButton.addEventListener('click', () => {
    popupAvatarEdit.openPopup();
    avatarPopupValidation.resetErrors();
    avatarPopupValidation.submitButtonInactive();
  })

  popupEditProfile.setEventListeners();
  popupAddCard.setEventListeners();
  openedImagePopup.setEventListeners();
  popupAvatarEdit.setEventListeners();
  cardDeletionConfirmationPopup.setEventListeners();

  //Валидация попапов
  profilePopupValidation.enableValidation();  
  newCardValidation.enableValidation();
  avatarPopupValidation.enableValidation();
