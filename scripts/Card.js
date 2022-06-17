export default class Card {
  constructor(cardData, templateSelector, openImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._openImage = openImage;
    this._templateSelector = templateSelector;
  }
    
  _getTemplate() {
    const newCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    
      return newCard;
  }

  _cardLike() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _cardDelete() {
    this._newCard.remove();
    this._newCard = null;
  };

  _setEvent() {
    this._likeButton.addEventListener('click', () => {
      this._cardLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._cardDelete();
    })

    this._cardLink.addEventListener('click', () => {
      this._openImage(this._name, this._link);
    })
  }

  generateCard() {
    this._newCard = this._getTemplate();
    this._deleteButton = this._newCard.querySelector('.element__delete');
    this._likeButton = this._newCard.querySelector('.element__like');
    this._cardLink = this._newCard.querySelector('.element__image');
    this._cardTitle = this._newCard.querySelector('.element__title');
    this._setEvent();
    
    this._cardTitle.textContent = this._name;
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;

    return this._newCard;
  }
}
