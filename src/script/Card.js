//класс Card, возвращающий одну карточку. Каждая карточка — это экземпляр класса Card;
//Это класс, создающий карточку. Добавьте ему методы constructor, like и remove.
// И ещё один — create. Он будет создавать DOM-элемент карточки.

export  default class Card {
  // Можно лучше
  // Кстати, совсем круто когда все селекторы карточки как объект передаются в конструктор и
  // при создании уже не используются хардкодные классы. Это вообще огонь тогда!
  constructor(data, formPopup, template, api) {
    this.link = data.link;
    this.name = data.name;
    this.likes = data.likes;
    this.formPopup = formPopup;
    this.template = template;
    this.authorId = data.authorId;
    this.id = data.id;
    this.currentUserId = data.myCurrentId;
    this.api = api;
    this.warningText = data.warningText;
  }


  create = () => {
    this.card = this.template.cloneNode(true).querySelector(".place-card");
    this.card.querySelector(".place-card__image").setAttribute("src", this.link);
    this.card.querySelector(".place-card__name").textContent = this.name;
    this.likeIcon = this.card.querySelector(".place-card__like-icon");
    this.deleteIcon = this.card.querySelector(".place-card__delete-icon");
    this.counter = this.card.querySelector(".place-card__like-counter");
    if (this.authorId === this.currentUserId) {
      this.deleteIcon.classList.add("place-card__delete-icon_active");
    }

    if (this._isLikedByCurrentUser()) {
      this.likeIcon.classList.add("place-card__like-icon_liked");
    }
    this.image = this.card.querySelector(".place-card__image");
    this.counter.textContent = this.likes.length;
    this._setEventListeners();
    return this.card;
  };


  _isLikedByCurrentUser = () => {
    const statusLikes = this.likes.find((like) => {
      return like._id === this.currentUserId;
    });
    return statusLikes;

  };
  _renderLikes = (res) => {
    this.likes = res.likes;
    this.counter.textContent = res.likes.length;

  };


  _like = (event) => {

    if (!this._isLikedByCurrentUser()) {
      this.api.setLikeCard(this.id)
        .then((res) => {
          this._renderLikes(res);
          event.target.classList.add("place-card__like-icon_liked");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      this.api.unsetLikeCard(this.id)
        .then((res) => {
          this._renderLikes(res);
          event.target.classList.remove("place-card__like-icon_liked");
        })

        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }

  };


  _setEventListeners = () => {
    this.likeIcon.addEventListener("click", this._like);
    this.deleteIcon.addEventListener("click", this._remove);
    this.image.addEventListener("click", this._showFormPopup);

  };

  _remove = () => {
    this.api.deleteCard(this.id)
      .then(() => {
        if (confirm(this.warningText)) {
          this._removeEventListeners();
          this.card.remove();
        }
      })
      .catch((err) => {
        console.log(err)
      })

  };

  _removeEventListeners = () => {
    this.deleteIcon.removeEventListener("click", this._remove);
    this.likeIcon.removeEventListener("click", this._like);
    this.image.removeEventListener("click", this._showFormPopup)
  };

  _showFormPopup = () => {
    // Можно лучше -- передать не весь объект в класс, а именно метод открытия
    this.formPopup.open(this.link);
  };
}


