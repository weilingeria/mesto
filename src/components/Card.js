export default class Card {
  constructor({ name, link, likes = [], _id, owner = {}, userId, openImage, deleteCard, likeCardHandler }, templateSelector) {
    this._name = name;
    this._link = link;
    this._likesList = likes;
    this._cardId = _id;
    this._ownerId = owner._id;
    this._currentUserId = userId;

    this._openImage = openImage;
    this._deleteCard = deleteCard;
    this._likeCardHandler = likeCardHandler;

    this._templateSelector = templateSelector;
  }


  _checkCardOwner() {
    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.remove();
    }
  }

  _isCardLiked() {
    return this._likesList
    .find(owner => owner._id === this._currentUserId);
  }

  _showLikesAmount(likes) {
    this._likesAmount.textContent = likes.length;
  }

  renderLikes(likes) {
    this.setLikes(likes);
    this._showLikesAmount(this._likesList);
    if (this._isCardLiked()) {
      this._likeButton.classList.add('element__like_active');
    } else {
      this._likeButton.classList.remove('element__like_active');
    }
  }
  
  getId() {
    return this._cardId;
  }

  getLikes() {
    return this._likesList;
  }

  setLikes(likes) {
    this._likesList = likes;
  }
    
  _getTemplate() {
    const newCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    
      return newCard;
  }

  _setEvent() {
    this._likeButton.addEventListener('click', () => {
      this._likeCardHandler();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard(this._cardId);
    })

    this._cardLink.addEventListener('click', () => {
      this._openImage(this._name, this._link);
    })
  }

  cardDelete() {
    this._newCard.remove();
    this._newCard = null;
  }

  generateCard() {
    this._newCard = this._getTemplate();
    this._deleteButton = this._newCard.querySelector('.element__delete');
    this._likeButton = this._newCard.querySelector('.element__like');
    this._cardLink = this._newCard.querySelector('.element__image');
    this._cardTitle = this._newCard.querySelector('.element__title');
    this._likesAmount = this._newCard.querySelector('.element__like-counter');
    
    this._cardTitle.textContent = this._name;
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;
    
    this._checkCardOwner();
    this.renderLikes(this._likesList);
    this._setEvent();

    return this._newCard;
  }
}
