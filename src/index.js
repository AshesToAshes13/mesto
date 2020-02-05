import './pages/index.css';
import {Api} from './Api.js';
import {AvatarPoupup} from './AvatarPoupup.js';
import {Card} from './Card.js';
import {CardPopup} from './CardPopup.js';
import {User} from './User.js';
import {UserPopup} from './UserPopup.js';
import {Cardlist} from './Cardlist.js'
import * as UIElements from './UiElements.js'
import * as UrlData from './UrlData.js';

const apiClass = new Api(UrlData.baseUrl, UrlData.headers);
const userClass = new User(apiClass, UIElements.userName, UIElements.userJob, UIElements.userAvatarOpenBtn);
const card = new Card(apiClass, UIElements.placesList,UIElements.imageDetail);
const cardslist = new Cardlist(apiClass, card, UIElements.placesList);
const cardPopup = new CardPopup(cardslist, apiClass, card, UIElements.addForm);
const userPopup = new UserPopup(apiClass, UIElements.userName, UIElements.userJob, UIElements.userForm);
const avatarPoupup = new AvatarPoupup(apiClass, UIElements.userAvatarOpenBtn, UIElements.avatarForm);

UIElements.addFormOpenButton.addEventListener('click', () => {

    cardPopup.open();

});

UIElements.userFormOpenBtn.addEventListener('click', () => {

    userPopup.open();

});

UIElements.closeAddFormBtn.addEventListener('click', () => {

    cardPopup.close();

});

UIElements.closeUserFormBtn.addEventListener('click', () => {

    userPopup.close();

});

UIElements.placesList.addEventListener('click',(event)=> {

    card.cardRemove(event)
    card.bigPic(event);
    card.likeOrDislikeCard(event);

})

UIElements.closeImage.addEventListener('click', () => {

    card.closeBigPic()

});
UIElements.cardForm.addEventListener('input', () => {

    cardPopup.inputHandler();

});
UIElements.user.addEventListener('input', () => {

    userPopup.inputHandler();

});
UIElements.cardForm.addEventListener('submit', (event) => {

    event.preventDefault();
    cardPopup.cardAdd(UIElements.cardForm.elements.name.value ,UIElements.cardForm.elements.link.value);
    cardslist.setUpDeleteBtns();

});

UIElements.user.addEventListener('submit',  (event) => {

    event.preventDefault();
    userPopup.changeUser();

});

UIElements.userAvatarOpenBtn.addEventListener('click', () => {

    avatarPoupup.open();

});

UIElements.closeAvatarFormBtn.addEventListener('click', () => {

    avatarPoupup.close();

});

UIElements.avatar.addEventListener('input', () => {

    avatarPoupup.inputHandler();

});

UIElements.avatar.addEventListener('submit', (event)=> {

    avatarPoupup.changeAvatar(event);

});

userClass.fetchUserData();
cardslist.setUpCards();

