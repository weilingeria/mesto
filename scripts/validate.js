const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//Функция: показывает ошибку
const showInputError = (formProfileElement, formInput, config, errorMessage) => {
  // Найдем элемент ошибки
  const formError = formProfileElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(config.errorClass);
};

//Функция: скрывает ошибку
const hideInputError = (formProfileElement, formInput, config) => {
  // Найдем элемент ошибки
  const formError = formProfileElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = '';
};

//Функция: проверяет валидность поля
const isValid = (formProfileElement, formInput, config) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, показываем ошибку
    showInputError(formProfileElement, formInput, config, formInput.validationMessage);
  } else {
    // Если проходит, скрываем ошибку
    hideInputError(formProfileElement, formInput, config);
  }
};

//Функция: проверяет, есть ли среди полей хотя бы одно невалидное для дальнейшей настройки статуса кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    //Если хоть одно поле не валидно, колбэк вернет true

    return !formInput.validity.valid;
  })
};

//Функция: принимает форму и добавляет всем ее полям обработчики
const setEventListeners = (formProfileElement, config) => {
  //Находим все поля внутри формы и делаем из них массив
  const inputList = Array.from(formProfileElement.querySelectorAll(config.inputSelector));
  //Находим в текущей форме кнопку "Сохранить"
  const buttonElement = formProfileElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);

  //Обойдем все элементы и каждому добавим обработчик события input, внутри колбэка вызовем isValid
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formProfileElement, formInput, config)

      //Вызовем переключатель кнопки
      toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    });
  });
};

function submitButtonInactive(buttonElement) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

function submitButtonActive(buttonElement) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

//Функция: отключает кнопку, если есть хоть один невалидный инпут, включает ее, если всё в порядке
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    submitButtonInactive(buttonElement, config);
  } else {
    submitButtonActive(buttonElement, config);
  }
};

//Функция: находит все формы и делает из них массив, перебирает его и для каждой формы вызывает setEventListeners
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formProfileElement) => {
    formProfileElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formProfileElement, config);
  });
};

enableValidation(config);


   