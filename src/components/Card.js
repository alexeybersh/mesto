export default class Card {
    constructor({data, newTemplate, userId, handleCardClick, handleOpenDelete, handleSetLike, handleUnsetLike}) {
        this._name = data.name;
        this._link = data.link;
        this.id = data._id;
        this.owner = userId;
        this.ownerImage = data.owner._id;
        this.likes = data.likes;
        this._newTemplate = newTemplate;
        this._handleCardClick = handleCardClick;
        this._handleOpenDelete = handleOpenDelete;
        this._setLike = handleSetLike;
        this._unsetLike = handleUnsetLike;
    }

    _getTemplate() {
        return document.querySelector(this._newTemplate).content.querySelector(".elements__element").cloneNode(true);
    }
    
    _setData() {
        this._originalImage.src = this._link;
        this._originalImage.alt = this._name;
        this._title.textContent = this._name;
        this._countLike.textContent = (this.likes).length
        this.likes.forEach(element => {
        if( element._id === this.owner)  this._isLikeActive();
        });
        if (this.owner !== this.ownerImage) this._trash.classList.toggle("elements__trash_inactive")
    }

    deleteCard(){
      this._newCard.remove();  
    }

    _isLikeActive(){
        this._button.classList.toggle("elements__group-button_active");
    }
  
    _handleCliklLike() {
        if(this._button.classList.contains("elements__group-button_active")) {
            this._unsetLike(this.id);
        } else{
            this._setLike(this.id);            
        }
    }

    updateLike(data){
        this._like = data.likes;
        this._countLike.textContent = (this._like).length
        this._isLikeActive(); 
    }

    _setListeners() {
        this._trash.addEventListener("click", () => this._handleOpenDelete(this));
        
        this._button.addEventListener("click", () => this._handleCliklLike())
        
        this._originalImage.addEventListener("click", () =>  {
            this._handleCardClick(this._name, this._link)
        })
    }
    
    generateCard() {
        this._newCard = this._getTemplate();
        this._originalImage = this._newCard.querySelector(".elements__masc-group");     
        this._title = this._newCard.querySelector(".elements__title");
        this._countLike = this._newCard.querySelector(".elements__count-like");
        this._trash = this._newCard.querySelector(".elements__trash")
        this._button = this._newCard.querySelector(".elements__group-button")
        this._setData();
        this._setListeners();

        return this._newCard;
    }
}