//Форму мы уже находили, найдем в ней инпут
const formInput = formProfileElement.querySelector('.popup__input');

//Функция: показывает ошибку
const showInputError = (formProfileElement, formInput, errorMessage) => {
  // Найдем элемент ошибки
  const formError = formProfileElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};

//Функция: скрывает ошибку
const hideInputError = (formProfileElement, formInput) => {
  // Найдем элемент ошибки
  const formError = formProfileElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

//Функция: проверяет валидность поля
const isValid = (formProfileElement, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, показываем ошибку
    showInputError(formProfileElement, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скрываем ошибку
    hideInputError(formProfileElement, formInput);
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
const setEventListeners = (formProfileElement) => {
  //Находим все поля внутри формы и делаем из них массив
  const inputList = Array.from(formProfileElement.querySelectorAll('.popup__input'));
  //Находим в текущей форме кнопку "Сохранить"
  const buttonElement = formProfileElement.querySelector('.popup__save');

  toggleButtonState(inputList, buttonElement);

  //Обойдем все элементы и каждому добавим обработчик события input, внутри колбэка вызовем isValid
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formProfileElement, formInput)

      //Вызовем переключатель кнопки
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Функция: отключает кнопку, если есть хоть один невалидный инпут, включает ее, если всё в порядке
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__save_disabled');
    buttonElement.disabled = false;
  }
};

//Функция: находит все формы и делает из них массив, перебирает его и для каждой формы вызывает setEventListeners
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formProfileElement) => {
    formProfileElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formProfileElement);
  });
};

enableValidation();


   