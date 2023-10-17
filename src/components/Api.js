
class Api {
  constructor() {
    // this.url = 'https://mesto.nomoreparties.co./v1/${this.groupId}/';
    this.url = 'https://652d53bdf9afa8ef4b2744ce.mockapi.io';
    this.token = '8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8';
    this.groupId = 'group-1';
  }

  getInitialCards() {
    // return fetch(`${this.url}cards`, {
    //   headers: {
    //     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    //   },
    // })
    return fetch(`${this.url}/cards`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      const errorElement = document.createElement('p');
      errorElement.textContent = `Error: ${err}`;
      document.querySelector('.popup__formPerfil').appendChild(errorElement);
    });
  }
  getUserInfo() {
    return fetch(`${this.url}/users`, {
      method: 'GET',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  getAll() {
    return fetch(this.url);
  }

  post(data) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  put(id, data) {
    return fetch(this.url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  delete(id) {
    return fetch(this.url + id, {
      method: 'DELETE',
    });
  }
}
export default Api;
