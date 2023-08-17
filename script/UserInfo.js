export default class UserInfo {
  constructor(selectorName, selectorJob) {
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

    setUserInfo({name, job}) {
      this._profileName.textContent = name;
      this._profileJob.textContent = job;
    }
  }