import {buttonZoomPopupImage, popupImage, popupImageTitle, popupOpened} from "./index.js"

class Card {
    constructor(data,newTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._newTemplate = newTemplate;
    }

    _getTemplate() {
        return this._newTemplate.content.querySelector(".elements__element").cloneNode(true);
    }
    
    _setData() {
        const originalImage = this._newCard.querySelector(".elements__masc-group");     
        originalImage.src = this._link;
        originalImage.alt = this._name;
        this._newCard.querySelector(".elements__title").textContent = this._name;
    }

    _handelClikDelete() {
        this._newCard.remove();

    }
  
    _handelClilLike(buttonSetLike) {
        buttonSetLike.classList.toggle("elements__group-button_active");
    }

    _popupOponed() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupImageTitle.textContent = this._name;     
            
        popupOpened(buttonZoomPopupImage);
    }

    _setListeners() {
        const buttonDeleteElement = this._newCard.querySelector(".elements__trash");

        buttonDeleteElement.addEventListener("click", () => this._handelClikDelete());
        
        const buttonSetLike = this._newCard.querySelector(".elements__group-button");
        
        buttonSetLike.addEventListener("click", () => this._handelClilLike(buttonSetLike)) 

        const originalImage = this._newCard.querySelector(".elements__masc-group"); 

        originalImage.addEventListener("click", () => this._popupOponed())  
    }
    
    getView() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setListeners();

        return this._newCard;
    }
}

export default Card;
