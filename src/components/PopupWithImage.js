import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._imageTitle = this._popup.querySelector('.popup__image-title')
    }

    openPopup(name, link) {
        this._imageTitle.textContent = name;
        this._image.src = link;
        this._image.alt = name;

        super.openPopup();
    }
}