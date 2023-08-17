class Card {
    constructor(data, newTemplate, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._newTemplate = newTemplate;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return document.querySelector(this._newTemplate).content.querySelector(".elements__element").cloneNode(true);
    }
    
    _setData() {
        const originalImage = this._newCard.querySelector(".elements__masc-group");     
        originalImage.src = this._link;
        originalImage.alt = this._name;
        this._newCard.querySelector(".elements__title").textContent = this._name;
    }

    _handelClikDelete() {
        this._newCard.remove();
        this._newCard = null;
    }
  
    _handelClilLike(buttonSetLike) {
        buttonSetLike.classList.toggle("elements__group-button_active");
    }

    _setListeners() {
        const buttonDeleteElement = this._newCard.querySelector(".elements__trash");

        buttonDeleteElement.addEventListener("click", () => this._handelClikDelete());
        
        const buttonSetLike = this._newCard.querySelector(".elements__group-button");
        
        buttonSetLike.addEventListener("click", () => this._handelClilLike(buttonSetLike)) 

        const clikImage =  this._newCard.querySelector(".elements__masc-group")
        
        clikImage.addEventListener("click", () =>  {
            this._handleCardClick(this._name, this._link)
        })
    }
    
    generateCard() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setListeners();

        return this._newCard;
    }
}

export default Card;
