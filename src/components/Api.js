export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._checkRes)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._checkRes)
    }

    editProfileInfo(info) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.description
            })
        })
        .then(this._checkRes)
    }

    addNewElementCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.elementTitle,
                link: cardData.elementLink
            })
        })
        .then(this._checkRes)
    }

    deleteElementCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkRes)
    }

    setLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._checkRes)
    }

    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._checkRes)
    }

    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar,
            })
        })
        .then(this._checkRes)
    }
}