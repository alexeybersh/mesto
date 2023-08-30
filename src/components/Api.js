export default class Api {
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res){
    if(res.ok) {
      return res.json()}

      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
     }).then(this._getResponse)
  }

  setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,  
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.job
    })
      }).then(this._getResponse)
  }

  getAllCards(){
    return fetch(`${this._url}/cards`, {
     headers: this._headers,
    }).then(this._getResponse)
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,  
      method: 'POST',
      body: JSON.stringify(data)
      }).then(this._getResponse)
  }

  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
     headers: this._headers,  
     method: 'DELETE',}).then(this._getResponse)
  }

  isLike(id){
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,  
      method: 'PUT',
      }).then(this._getResponse)
  }

  isLikeDelete(id){
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,  
      method: 'DELETE',
      }).then(this._getResponse)
  }

  setAvaatar(data){
    console.log(data.link);
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,  
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.link
    })
      }).then(this._getResponse)
  }

}