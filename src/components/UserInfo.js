export default class UserInfo {
  constructor(selectorAvatar, selectorName, selectorJob) {
    this._avatar = document.querySelector(selectorAvatar);
    this._profileName = document.querySelector(selectorName);
    this._profileJob = document.querySelector(selectorJob);
    }

    getUserInfo() {
      const data = {
        name: this._profileName.textContent,
        job: this._profileJob.textContent
      };

      return data;  
    }

    setUserInfo({avatar, name, about}) {
      this._avatar.src = avatar;
      this._avatar.alt = name;
      this._profileName.textContent = name;
      this._profileJob.textContent = about;
    }
  }