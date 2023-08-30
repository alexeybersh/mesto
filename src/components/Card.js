export default class Card {
    constructor(data, newTemplate, handleCardClick, hendelCardDelete, userId, setLike, unsetLike, selectorButtonLike) {
        this._name = data.name;
        this._link = data.link;
        this.id = data._id;
        this.owner = userId;
        this.ownerImage = data.owner._id;
        this.likes = data.likes;
        this._newTemplate = newTemplate;
        this._handleCardClick = handleCardClick;
        this._hendelCardDelete = hendelCardDelete;
        this._setLike = setLike;
        this._unsetLike = unsetLike;
        this._selectorButtonLike = selectorButtonLike;
    }

    _getTemplate() {
        return document.querySelector(this._newTemplate).content.querySelector(".elements__element").cloneNode(true);
    }
    
    _setData() {
        const originalImage = this._newCard.querySelector(".elements__masc-group");     
        originalImage.src = this._link;
        originalImage.alt = this._name;
        this._newCard.querySelector(".elements__title").textContent = this._name;
        this._newCard.querySelector(".elements__count-like").textContent = (this.likes).length
        this.likes.forEach(element => {
            if( element._id === this.owner)  this._isLikeActive(this._newCard.querySelector(this._selectorButtonLike));
        });
        if (this.owner !== this.ownerImage) this._newCard.querySelector(".elements__trash").classList.toggle("elements__trash_inactive")

    }

    deleteCard(){
      this._newCard.remove();  
    }

    _isLikeActive(){
        this._newCard.querySelector(this._selectorButtonLike).classList.toggle("elements__group-button_active");
    }
  
    _handleCliklLike(card) {
        this._isLikeActive();
        if(this._newCard.querySelector(".elements__group-button_active")) {
            this._setLike(card, this._newCard);
        } else{
            this._unsetLike(card, this._newCard);
        }
    }

    _setListeners() {
        const buttonDeleteElement = this._newCard.querySelector(".elements__trash");

        buttonDeleteElement.addEventListener("click", () => this._hendelCardDelete(this));
        
        this._newCard.querySelector(this._selectorButtonLike).addEventListener("click", () => this._handleCliklLike(this)) 

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