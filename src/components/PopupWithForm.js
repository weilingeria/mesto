import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submitFormHandler}) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__save');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitFormHandler(this._getInputValues());
        });
    }

    loadingState(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохраняю...';
        } 
        else {
            this._submitButton.textContent = 'Сохранить';
        }
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}