
import "./../pages/index.css";
import Api from  "./Api.js";
import Card from "./Card";
import CardList from "./CardList";
import FormUserInfo from "./FormUserInfo";
import FormPopup from "./FormPopup";
import FormValidator from "./FormValidator";
import Popup from "./Popup";
import PopupImage from "./PopupImage";
import UserInfo from "./UserInfo";


(function () {


  const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
  };
  const originalText = "Вы уверены, что хотите безвозвратно удалить карту?";
  const textLoading = "Загрузка...";

  const placeList = document.querySelector('.places-list');
  const templateCard = document.querySelector('#card').content;

  const popupBlockImage = document.querySelector('.popup-image');
  const closedPopupBlockImageButton = popupBlockImage.querySelector('.popup__close');

  const popupPlaceCard = document.querySelector('.popup-placecard');
  const openPopupPlaceCardButton = document.querySelector('.user-info__button');
  const closedPopupPlaceCardButton = popupPlaceCard.querySelector('.popup__close');
  const formPlaceCard = document.forms.new;

  const popupProfile = document.querySelector('.popup-profile');
  const openPopupProfileButton = document.querySelector('.user-info__button-edit');
  const closedPopupProfileButton = popupProfile.querySelector('.popup__close');
  const formProfile = document.forms.profile;

  const popupAvatar = document.querySelector('.popup-avatar');
  const openPopupAvatar = document.querySelector('.user-info__photo');
  const closePopupAvatar = popupAvatar.querySelector('.popup__close');
  const formAvatar = document.forms.avatar;

  const formAvatarValidator = new FormValidator(formAvatar, errorMessages);
  const formProfileValidator = new FormValidator(formProfile, errorMessages);
  const formPlaceCardValidator = new FormValidator(formPlaceCard, errorMessages);


  const formPopupImage = new PopupImage(popupBlockImage, closedPopupBlockImageButton);
  formPopupImage.setEventListeners();


  const userInfoName = document.querySelector('.user-info__name');
  const userInfoJob = document.querySelector('.user-info__job');
  const changeInfo = new UserInfo(userInfoName, userInfoJob);

  const changeProfileInfo = new FormUserInfo(formProfile, textLoading);

  const addCard = new CardList(placeList);
  const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk/cohort11/' : 'http://praktikum.tk/cohort11/';

  const defaultDataApi = {
    url: API_URL,
    headers: {
      authorization: 'f78f8d75-bb2d-4052-ab1f-ca652509c73f',
      "Content-Type": "application/json; charset=UTF-8"
    }
  };

  const api = new Api(defaultDataApi);

  function drawCard(obj) {
    const myId = changeInfo.getUserInfo().myId;
    const card = {
      name: obj.name,
      link: obj.link,
      id: obj._id,
      likes: obj.likes,
      authorId: obj.owner._id,
      myCurrentId: myId,
      warningText: originalText

    };
    return new Card(card, formPopupImage, templateCard, api).create();

  }

  function getCards() {
    api.getCards() // отрисовка всех карт
      .then((res) => {
        // Вот тут бы можно было собрать карты в массив и массив сбросить в render
        // но render вы зачем-то вывели из игры))
        // Можно лучше/Надо исправить //сделала
        // я просто подумала, что дважды проходить по массиву  нецелесообразно, поэтому убила метод render
        // и просто отрисовывала каждую карту

        // В этом есть рациональное зерно, соглашусь, но есть метод render который ничего не знает за пределами себя и только умеет пакетно принимать элементы
        // в конце концов ведь массив элементов может откуда угодно приходить, это сейчас вы его формируете.
        // Тем более что мы с вами сотрудничаем в рамках условий брифа и должны их более-менее придерживаться, это часть образовательной программы.
        const cards = res.map((obj) => {
          return drawCard(obj);
        });

        addCard.render(cards);
      })

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  api.getInfo()
    .then((res) => {
      openPopupAvatar.style.backgroundImage = "url(" + res.avatar + ")";
      changeInfo.setUserInfo(res.name, res.about, res._id);
      changeInfo.updateUserInfo();
    })

    .then(() => getCards())


    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    });


  function setSubmitButtonUnactive(form, formValid) {
    formValid.resetErrorForm();
    form.reset();
    formValid.setSubmitButtonState(false);
  }


  const popupAddCard = new Popup(popupPlaceCard, closedPopupPlaceCardButton, openPopupPlaceCardButton,
    () => {
      setSubmitButtonUnactive(formPlaceCard, formPlaceCardValidator)
    });
  popupAddCard.setEventListeners();


  const formPopupAddCard = new FormPopup(formPlaceCard, textLoading);


  formPopupAddCard.setEventListener((event) => {
    event.preventDefault();
    formPopupAddCard.renderLoading(true);
    const linkCard = event.target.elements.link.value;
    const nameCard = event.target.elements.name.value;

    api.setCard(nameCard, linkCard)
      .then((res) => {
        const card = drawCard(res);
        addCard.addCard(card);
        popupAddCard.close();
      })

      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        formPopupAddCard.renderLoading(false);
      })

  });


  function setSubmitButtonActive() {
    formProfileValidator.resetErrorForm();
    formProfileValidator.setSubmitButtonState(true);
    changeInfo.updateUserInfo();
    changeProfileInfo.setUserInfoForm(changeInfo.getUserInfo().name, changeInfo.getUserInfo().about);
  }


  const popupChangeInfo = new Popup(popupProfile, closedPopupProfileButton, openPopupProfileButton, setSubmitButtonActive);

  popupChangeInfo.setEventListeners();

  changeProfileInfo.setEventListener((event) => {
    event.preventDefault();
    changeProfileInfo.renderLoading(true);
    const job = event.target.elements.info.value;
    const name = event.target.elements.name.value;
    api.setInfo(name, job)
      .then((res) => {
        changeInfo.setUserInfo(res.name, res.about);
        changeInfo.updateUserInfo();
        popupChangeInfo.close();
      })

      .catch((err) => console.log(`Ошибка: ${err}`))

      .finally(() => {
        changeProfileInfo.renderLoading(false);
      })


  });


  const popupChangeAvatar = new Popup(popupAvatar, closePopupAvatar, openPopupAvatar,
    () => {
      setSubmitButtonUnactive(formAvatar, formAvatarValidator)
    });
  popupChangeAvatar.setEventListeners();

  const formPopupAvatar = new FormPopup(formAvatar, textLoading);


  formPopupAvatar.setEventListener((event) => {
    event.preventDefault();
    formPopupAvatar.renderLoading(true);
    const avatarLink = event.target.elements.link.value;
    api.updateAvatar(avatarLink)
      .then(() => {
        openPopupAvatar.style.backgroundImage = "url(" + avatarLink + ")";
        popupChangeAvatar.close();
      })

      .catch((err) => console.log(`Ошибка: ${err}`))

      .finally(() => {
        formPopupAvatar.renderLoading(false);
      })
  })


})();
