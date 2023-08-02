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

    _popupFill() {
        const popupImage = document.querySelector(".popup__image");
        const popupImageTitle = document.querySelector(".popup__image-title");
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupImageTitle.textContent = this._name;     
            
        this._popupOpen();
    }

    _popupOpen() {
        const buttonZoomPopupImage = document.querySelector(".popup_type_big-image");
        buttonZoomPopupImage.classList.add("popup_opened");
    }

    _setListeners() {
        const buttonDeleteElement = this._newCard.querySelector(".elements__trash");

        buttonDeleteElement.addEventListener("click", () => this._handelClikDelete());
        
        const buttonSetLike = this._newCard.querySelector(".elements__group-button");
        
        buttonSetLike.addEventListener("click", () => this._handelClilLike(buttonSetLike)) 

        const originalImage = this._newCard.querySelector(".elements__masc-group"); 

        originalImage.addEventListener("click", () => this._popupFill())  
    }
    
    getView() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setListeners();

        return this._newCard;
    }
}

export default Card;
