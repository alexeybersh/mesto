import Popup from "./Popup.js";
import { inputImage,
  inputImageTitle
 } from "../utils/contents.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(inputImage);
    this._popupImageTitle = this._popup.querySelector(inputImageTitle);
    
  }

  open(name, link) {
    console.log();
    this._popupImage.alt = name;
    this._popupImage.src = link;
    this._popupImageTitle.textContent = name;
    super.open();
  }
}