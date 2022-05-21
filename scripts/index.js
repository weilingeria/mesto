//ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

  const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  const editProfilePopup = document.querySelector('.popup_edit-profile');
  const closeEditProfilePopupButton = document.querySelector('.popup__close');
  const formElement = document.querySelector('.popup__form');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  //Функции открытия и закрытия для всех попапов
  function openPopup(element) {
      element.classList.add('popup_is-opened')
  }

  function closePopup(element) {
    element.classList.remove('popup_is-opened')
  }


  //Функция: открывает попап редактирования профиля и заполняет поля
  function openEditProfilePopup() {
      nameInput.value = profileName.textContent;
      jobInput.value = profileDescription.textContent;
      
      openPopup(editProfilePopup)
    }

  //Функция: отправляет новые введенные данные в графы имени и описания и закрывает форму
  function handleFormSubmit(evt) {
      evt.preventDefault(); 
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;

      closePopup(editProfilePopup)
  }

  //Открыть попап редактирования профиля, нажав на кнопку "Редактировать профиль"
  openEditProfilePopupButton.addEventListener('click', openEditProfilePopup);

  //Закрыть окно "Редактировать профиль", нажав на крестик
  closeEditProfilePopupButton.addEventListener('click', () => closePopup(editProfilePopup));

  //Отправить новые данные в форму
  formElement.addEventListener('submit', handleFormSubmit);



//ПОПАП ОТКРЫТИЯ КАРТОЧКИ

const openImagePopup = document.querySelector('.popup_open-image');
const openedImage = document.querySelector('.popup__image');
const imageTitle = document.querySelector('.popup__image-title');
const closeImagePopupButton = document.querySelector('.popup__close_open-image');

  //Функция: открывает картинку при нажатии на неё
  function openImage(cardData) {
    imageTitle.textContent = cardData.name;
    openedImage.src = cardData.link;
    openImage.alt = cardData.name;

    openPopup(openImagePopup)
  }

  //Закрыть картинку, нажав на крестик
  closeImagePopupButton.addEventListener('click', () => closePopup(openImagePopup));  



//ПОПАП ДОБАВЛЕНИЯ КАРТОЧЕК

  const addCardPopup = document.querySelector('.popup_add-cards');
  const addCardForm = document.querySelector('.popup__form_add-cards');
  const addCardButton = document.querySelector('.profile__add-button');
  const addCardFormCloseButton = document.querySelector('.popup__close_add-cards');
  const titleInput = document.querySelector('.popup__input_type_title');
  const linkInput = document.querySelector('.popup__input_type_link');

  //Открыть попап для добавления карточек
  addCardButton.addEventListener('click', () => openPopup(addCardPopup));

  //Закрыть попап добавления карточек, нажав на крестик
  addCardFormCloseButton.addEventListener('click', () => closePopup(addCardPopup));

  //Шаблон добавления карточки
  const elementTemplate = document.querySelector('#elements-template').content.querySelector('.element');

  //DOM элементы
  const elementsListContainer = document.querySelector('.elements__list');

  //Функция: принимает данные и добавляет в массив
  function submitAddCardForm (evt) {
    evt.preventDefault();
    renderCard({ name: titleInput.value, link: linkInput.value });
  
    addCardForm.reset();
  
    closePopup(addCardPopup);
  };
  
  addCardForm.addEventListener('submit', submitAddCardForm);

  //Обработчики событий
  const cardLike = (evt) => {
    evt.target.classList.toggle('element__like_active');
  };

  const cardDelete = (evt) => {
    evt.target.closest('.element').remove();
  };

  //Генерация карточки
  const generateCard = (cardData) => {

    const newCard = elementTemplate.cloneNode(true);
  
    const cardTitle = newCard.querySelector('.element__title');
    const cardLink = newCard.querySelector('.element__image');
  
    cardTitle.textContent = cardData.name;
    cardLink.src = cardData.link;
    cardLink.alt = cardData.name;
  
      //Удалить карточку, нажав на корзину
      const deleteButton = newCard.querySelector('.element__delete');
      deleteButton.addEventListener('click', cardDelete);
  
      //Поставить лайк
      const likeButton = newCard.querySelector('.element__like');
      likeButton.addEventListener('click', cardLike);
  
      //Открыть картинку, кликнув на нее
      cardLink.addEventListener('click', () => openImage(cardData));
  
    return newCard;
  };

  //Отрисовка карточек из массива
  const renderCard = (cardData) => {
    elementsListContainer.prepend(generateCard(cardData));
  };
  
  initialCards.forEach((cardData) => {
    renderCard(cardData);
  });
