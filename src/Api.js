export class Api {

    constructor(baseUrl, headers) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }    

    async setUpCards() {
        const res = await fetch(`${this.baseUrl}/cards`, {
            headers: {
                authorization: this.headers
            }
        });
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }    

    async fetchUser() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            headers: {
                authorization: this.headers
            }
        });
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async changeUserData(name, about) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async changeUserAvatar(avatarLink) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        });
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async addCard(name, link) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        });
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async likeCard(cardIdToLike) {
        const res = await fetch(`${this.baseUrl}/cards/like/${cardIdToLike}`, {
            method: 'PUT',
            headers: {
                authorization: this.headers
            }
        });
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        
    }

    async removeCard(cardIdToRemove) {
        const res = await fetch(`${this.baseUrl}/cards/${cardIdToRemove}`, {
            method: 'DELETE',
            headers: {
                authorization: this.headers
            }
        });
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async dislikeCard(cardIdToDislike) {
        const res = await fetch(`${this.baseUrl}/cards/like/${cardIdToDislike}`, {
            method: 'DELETE',
            headers: {
                authorization: this.headers
            }
        });
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

}
