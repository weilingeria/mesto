export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }

export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-45",
  headers: {
    authorization: "675842c7-f8a7-44a2-a829-135412eb6f2b",
    "Content-Type": "application/json",
  }
}

export const profilePopup = document.querySelector('.popup_edit-profile');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const profilePopupOpenButton = document.querySelector('.profile__edit-button');
export const newCardPopup = document.querySelector('.popup_add-cards');
export const newCardForm = document.querySelector('.popup__form_add-cards');
export const newCardButton = document.querySelector('.profile__add-button');
export const avatarPopup = document.querySelector('.popup_edit-avatar');
export const avatarButton = document.querySelector('.profile__avatar-button');