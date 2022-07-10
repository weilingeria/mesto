export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    openPopup() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener("keydown", this._handleEscClose); 
    }

    closePopup() {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener("keydown", this._handleEscClose); 
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        };
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
                this.closePopup();
            };
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => {
            this.closePopup();
        });

        this._popup.addEventListener('mousedown', (evt) => {
            this._handleOverlayClose(evt);
        });
    }
}