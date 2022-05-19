//ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

  const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  const popup = document.querySelector('.popup');
  const editProfilePopup = document.querySelector('.popup_edit-profile');
  const closeEditProfilePopupButton = document.querySelector('.popup__close');
  const saveInfoButton = document.querySelector('.popup__save');
  const formElement = document.querySelector('.popup__form');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  //Функции открытия и закрытия для всех попапов
  function openPopup(e) {
      e.classList.add('popup_is-opened')
  }

  function closePopup(e) {
    e.classList.remove('popup_is-opened')
  }


  //Функция: открывает попап редактирования профиля и заполняет поля
  function openEditProfilePopup() {
      nameInput.value = profileName.textContent;
      jobInput.value = profileDescription.textContent;
      
      openPopup(editProfilePopup)
    }

  //Функция: отправляет новые введенные данные в графы имени и описания и закрывает форму
  function formSubmitHandler(evt) {
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
  formElement.addEventListener('submit', formSubmitHandler);



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

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  //Шаблон добавления карточки
  const elementsTemplate = document.querySelector('#elements-template').content.querySelector('.element');

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
  const generateCard = (cardsData) => {

    const newCard = elementsTemplate.cloneNode(true);
  
    const cardTitle = newCard.querySelector('.element__title');
    const cardLink = newCard.querySelector('.element__image');
  
    cardTitle.textContent = cardsData.name;
    cardLink.src = cardsData.link;
    cardLink.alt = cardsData.name;
  
      //Удалить карточку, нажав на корзину
  
    const deleteButton = newCard.querySelector('.element__delete');
    deleteButton.addEventListener('click', cardDelete);
  
      //Поставить лайк
  
    const likeButton = newCard.querySelector('.element__like');
    likeButton.addEventListener('click', cardLike);
  
      
  
    return newCard;
  };

  //Отрисовка карточек из массива
  const renderCard = (cardsData) => {
    elementsListContainer.prepend(generateCard(cardsData));
  };
  
  initialCards.forEach((cardsData) => {
    renderCard(cardsData);
  });
