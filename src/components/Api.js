import { token } from '../utils/consts';

class Api {
  constructor() {
    this.groupId = 'web_es_09';
    this._token = token;
    this._url = `https://around.nomoreparties.co/v1/${this.groupId}/`;
  }
  async fetchData(url, method, data) {
    try {
      const result = await fetch(`${url}`, {
        method,
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (result.ok) {
        return await result.json();
      }

      return await Promise.reject(`Error: ${result.status}`);
    } catch (error) {
      throw error;
    }
  }

  async getInitialCards(resouce) {
    return await this.fetchData(`${this._url}${resouce}`, 'GET');
  }

  async getUserInfo(resouce) {
    return await this.fetchData(`${this._url}${resouce}`, 'GET');
  }
  async getUserAvatar(resouce) {
    return await this.fetchData(`${this._url}${resouce}`);
  }

  async patchUserInfo(resouce, data) {
    return await this.fetchData(`${this._url}${resouce}`, 'PATCH', data);
  }
  async addCard(resouce, data) {
    return await this.fetchData(`${this._url}${resouce}`, 'POST', data);
  }

  async deleteCard(resouce, card_Id) {
    return await this.fetchData(`${this._url}${resouce}`, 'DELETE');
  }

  async likeCard(resouce, card_Id) {
    return await this.fetchData(`${this._url}${resouce}/${card_Id}`, 'PUT');
  }

  async dislikeCard(resouce, card_Id) {
    return await this.fetchData(`${this._url}${resouce}/${card_Id}`, 'DELETE');
  }
}

export default Api;
