export default class FormValidator {
  constructor(config, formProfileElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formProfileElement = formProfileElement;
    this._buttonElement = this._formProfileElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formProfileElement.querySelectorAll(this._inputSelector))
  }
 
    //Функция: показывает ошибку
  _showInputError (formInput, errorMessage) {
    // Найдем элемент ошибки
    const formError = this._formProfileElement.querySelector(`.${formInput.id}-error`);
    
    formInput.classList.add(this._inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
  };

    //Функция: скрывает ошибку
  _hideInputError (formInput) {
    // Найдем элемент ошибки
    const formError = this._formProfileElement.querySelector(`.${formInput.id}-error`);

    formInput.classList.remove(this._inputErrorClass);
    formError.textContent = '';
    formError.classList.remove(this._errorClass);
  };

    //Функция: проверяет валидность поля
  _isValid (formInput) {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, показываем ошибку
      const errorMessage = formInput.validationMessage;
      this._showInputError(formInput, errorMessage);
    } else {
      // Если проходит, скрываем ошибку
      this._hideInputError(formInput);
    }
  };

  //Функция: проверяет, есть ли среди полей хотя бы одно невалидное для дальнейшей настройки статуса кнопки
  _hasInvalidInput() {
    return this._inputList.some((formInput) => {
      //Если хоть одно поле не валидно, колбэк вернет true

      return !formInput.validity.valid;
    })
  };

  submitButtonInactive() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };
  
  _submitButtonActive() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };
  
  //Функция: отключает кнопку, если есть хоть один невалидный инпут, включает ее, если всё в порядке
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.submitButtonInactive();
    } else {
      this._submitButtonActive();
    }
  };

  //Функция: принимает форму и добавляет всем ее полям обработчики
  _setEventListeners() {
    
    this._toggleButtonState();

    //Обойдем все элементы и каждому добавим обработчик события input, внутри колбэка вызовем isValid
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._isValid(formInput)

        //Вызовем переключатель кнопки
        this._toggleButtonState();
      });
    });
  };

  resetErrors() {
    this._inputList.forEach((formInput) => {
      this._hideInputError(formInput);
    });
  };

    //Функция: принимает форму и вызывает для нее setEventListeners
  enableValidation() {
    this._formProfileElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  };
};