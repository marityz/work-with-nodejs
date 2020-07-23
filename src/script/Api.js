export default class Api {


  constructor(data) {
    this.url = data.url;
    this.headers = data.headers;
  }


  getInfo = () => {
    return fetch(`${this.url}users/me`, {
      headers: this.headers
    })
      .then((res) => this._returnJson(res))
  };

  getCards = () => {
    return fetch(`${this.url}cards`, {
      headers: this.headers
    })


      .then((res) => this._returnJson(res))

  };

  setInfo = (name, about) => {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
      .then((res) => this._returnJson(res))
  };

  setCard = (name, link) => {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      }),
    })
      .then((res) => this._returnJson(res))
  };

  deleteCard = (id) => {
    return fetch(`${this.url}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,

    })
      .then((res) => this._returnJson(res))

  };

  setLikeCard = (id) => {
    return fetch(`${this.url}cards/like/${id}`, {
      method: 'PUT',
      headers: this.headers,


    })
      .then((res) => this._returnJson(res))

  };

  unsetLikeCard = (id) => {
    return fetch(`${this.url}cards/like/${id}`, {
      method: 'DELETE',
      headers: this.headers,


    })
      .then((res) => this._returnJson(res))
  };
  updateAvatar = (link) => {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      }),
    })
      .then((res) => this._returnJson(res))

  };

  // Супер!
  // Отдельный метод для работы с ответом сервера
  _returnJson = (res) => {
    if (res.ok) {
      return res.json()
    }
    // Можно лучше
    // return Promise.reject(new Error(`Ошибка: ${res.status}`));
    return Promise.reject(`Ошибка: ${res.status}`);
  }


}

