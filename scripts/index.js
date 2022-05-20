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
      name: '美美的海底🌊',
      link: 'https://images.unsplash.com/photo-1603798125698-a35feca4ed6d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387'
    },
    {
      name: '抓水母',
      link: 'https://images.unsplash.com/photo-1519747180378-d55bc9a23efd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387'
    },
    {
      name: '⭐派大星⭐ My homie',
      link: 'https://images.unsplash.com/photo-1588518008356-bbd53d98e410?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170'
    },
    {
      name: '菠萝房',
      link: 'https://images.unsplash.com/photo-1458791087439-278afc90b1d5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387'
    },
    {
      name: '美味汉堡',
      link: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699'
    },
    {
      name: 'Gary 小蜗🐌',
      link: 'https://images.unsplash.com/photo-1596708635238-aab8d249a455?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464'
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
