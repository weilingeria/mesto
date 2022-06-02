//ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

  const profilePopupOpenButton = document.querySelector('.profile__edit-button');
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  const profilePopup = document.querySelector('.popup_edit-profile');
  const profilePopupCloseButton = document.querySelector('.popup__close');
  const formProfileElement = document.querySelector('.popup__form');
  const formInput = formProfileElement.querySelector('.popup__input');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  //Функции открытия и закрытия для всех попапов
  function openPopup(element) {
      element.classList.add('popup_is-opened');
      document.addEventListener("keydown", closePopupEsc);   
  }

  function closePopup(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener("keydown", closePopupEsc);
  }

  //Функция: открывает попап редактирования профиля и заполняет поля
  function openprofilePopup() {
      nameInput.value = profileName.textContent;
      jobInput.value = profileDescription.textContent;
      
      openPopup(profilePopup)
    }

  //Функция: отправляет новые введенные данные в графы имени и описания и закрывает форму
  function submitProfileForm(evt) {
      evt.preventDefault(); 
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;

      closePopup(profilePopup)
  }

  //Открыть попап редактирования профиля, нажав на кнопку "Редактировать профиль"
  profilePopupOpenButton.addEventListener('click', openprofilePopup);

  //Закрыть окно "Редактировать профиль", нажав на крестик
  profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));

  //Отправить новые данные в форму
  formProfileElement.addEventListener('submit', submitProfileForm);



//ПОПАП ОТКРЫТИЯ КАРТОЧКИ

const openedImagePopup = document.querySelector('.popup_open-image');
const openedImage = document.querySelector('.popup__image');
const imageTitle = document.querySelector('.popup__image-title');
const openedImagePopupCloseButton = document.querySelector('.popup__close_open-image');

  //Функция: открывает картинку при нажатии на неё
  function openImage(cardData) {
    imageTitle.textContent = cardData.name;
    openedImage.src = cardData.link;
    openedImage.alt = cardData.name;

    openPopup(openedImagePopup)
  }

  //Закрыть картинку, нажав на крестик
  openedImagePopupCloseButton.addEventListener('click', () => closePopup(openedImagePopup));  



//ПОПАП ДОБАВЛЕНИЯ КАРТОЧЕК

  const newCardPopup = document.querySelector('.popup_add-cards');
  const newCardForm = document.querySelector('.popup__form_add-cards');
  const newCardButton = document.querySelector('.profile__add-button');
  const newCardFormCloseButton = document.querySelector('.popup__close_add-cards');
  const titleInput = document.querySelector('.popup__input_type_title');
  const linkInput = document.querySelector('.popup__input_type_link');
  const submitButton = document.getElementById('popup__save_add-form');

  //Открыть попап для добавления карточек
  newCardButton.addEventListener('click', () => openPopup(newCardPopup));

  //Закрыть попап добавления карточек, нажав на крестик
  newCardFormCloseButton.addEventListener('click', () => closePopup(newCardPopup));

  //Шаблон добавления карточки
  const elementTemplate = document.querySelector('#elements-template').content.querySelector('.element');

  //DOM элементы
  const elementsListContainer = document.querySelector('.elements__list');

  //Функция: принимает данные и добавляет в массив
  function submitAddCardForm (evt) {
    evt.preventDefault();
    renderCard({ name: titleInput.value, link: linkInput.value });

    newCardForm.reset();

    submitButtonInactive(submitButton);
  
    closePopup(newCardPopup);
  };
  
  newCardForm.addEventListener('submit', submitAddCardForm);

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


  //Функция: закрывает попапы при нажатии на оверлэй
  function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      const openedPopupForOverlay = document.querySelector(".popup_is-opened");
      closePopup(openedPopupForOverlay);
    }
  }

  profilePopup.addEventListener('mousedown', closePopupOverlay);
  openedImagePopup.addEventListener('mousedown', closePopupOverlay);
  newCardPopup.addEventListener('mousedown', closePopupOverlay);

  //Функция: закрывает попапы при нажатии на Esc
  function closePopupEsc(evt) {
    if (evt.key === "Escape") {
     const openedPopupForEsc = document.querySelector(".popup_is-opened");
     closePopup(openedPopupForEsc);
    }
  } 