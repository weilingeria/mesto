import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupButton = this._popup.querySelector('.popup__save');
    }

    setConfirmAction(callback) {
        this._confirmDeleteCallback = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupButton.addEventListener('click', () => {
            this._confirmDeleteCallback();
        });
    }

    loadingState(isLoading) {
        if (isLoading) {
            this._popupButton.textContent = 'Удаляю...';
        } 
        else {
            this._popupButton.textContent = 'Да';
        }
    }
}