//Форму мы уже находили, найдем в ней инпут
const formInput = formElement.querySelector('.popup__input');

//Функция: показывает ошибку
const showInputError = (formElement, formInput, errorMessage) => {
  // Найдем элемент ошибки
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};

//Функция: скрывает ошибку
const hideInputError = (formElement, formInput) => {
  // Найдем элемент ошибки
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

//Функция: проверяет валидность поля
const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, показываем ошибку
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скрываем ошибку
    hideInputError(formElement, formInput);
  }
};

//Функция: принимает форму и добавляет всем ее полям обработчики
const setEventListeners = (formElement) => {
  //Находим все поля внутри формы и делаем из них массив
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  //Обойдем все элементы и каждому добавим обработчик события input, внутри колбэка вызовем isValid
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput)
    });
  });
};

//Функция: находит все формы и делает из них массив, перебирает их и для каждой вызывает setEventListeners
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();


   