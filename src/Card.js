export class Card {
    constructor(api, placesList, imageDetail) {
        this.apiClass = api;
        this.placesList = placesList;
        this.imageDetail = imageDetail;
    }

    createCard(cardName, imageUrl, likeCount, cardId, ownerId, btnDisplayMode, likeId) {

        const placesCard = document.createElement('div');
        const placesCardImage = document.createElement('div');
        const placesCardDeleteButton = document.createElement('button');
        const placesCardDescription = document.createElement('div');
        const placesCardName = document.createElement('h3');
        const placesCardLikeBlock = document.createElement('div');
        const placesCardLikeButton = document.createElement('button');
        const placesCardLikeCounter = document.createElement('p');

        placesCard.classList.add('place-card');
        placesCardImage.classList.add('place-card__image');
        placesCardDeleteButton.classList.add('place-card__delete-icon');
        placesCardDeleteButton.id = 'deleteBtn';
        placesCardImage.id = 'image';
        placesCardLikeButton.id = 'likeBtn'
        placesCardDescription.classList.add('place-card__description');
        placesCardName.classList.add('place-card__name');
        placesCardLikeButton.classList.add('place-card__like-icon');
        placesCardLikeCounter.classList.add('place-card__like-counter');
        placesCardLikeCounter.id = 'likesCounter';
        placesCard.id = cardId;
        placesCardLikeButton.setAttribute('name', likeId)
        placesCardDeleteButton.setAttribute('name', ownerId);
        placesCardDeleteButton.setAttribute('style', btnDisplayMode);

        this.placesList.appendChild(placesCard);
        placesCard.appendChild(placesCardImage);
        placesCard.appendChild(placesCardDescription);
        placesCardImage.appendChild(placesCardDeleteButton);
        placesCardDescription.appendChild(placesCardName);
        placesCardDescription.appendChild(placesCardLikeBlock);
        placesCardLikeBlock.appendChild(placesCardLikeButton);
        placesCardLikeBlock.appendChild(placesCardLikeCounter);

        placesCardName.textContent = cardName;
        placesCardImage.style.backgroundImage = imageUrl;
        placesCardLikeCounter.textContent = likeCount;

        return placesCard;

    }

    cardRemove(event) {

        event.stopPropagation();

        if (event.target.id == 'deleteBtn') {

            const result = window.confirm('Вы действительно хотите удалить эту карточку?');

            if (result == true) {

                const cardIdToRemove = event.target.parentNode.parentNode.id;
                const domElementToRemove = event.target.parentNode.parentNode;
                this.apiClass.removeCard(cardIdToRemove)
                .then((res) => {

                    domElementToRemove.remove();
                    alert(res.message);

                })
                .catch((err)=> {

                    console.log(err);

                });

            }

        }

    }

    likeOrDislikeCard(event) {

        event.stopPropagation() 

        if (event.target.id === 'likeBtn') {

            const cardIdToLike = event.target.parentNode.parentNode.parentNode.id;
            const likesCounter = event.target.parentNode.querySelector('.place-card__like-counter');
            const domElementToChange = event.target;
            this.apiClass.likeCard(cardIdToLike)
            .then((card) => {

                const AmountOfLikes = card.likes.length;
                likesCounter.textContent = AmountOfLikes;
                domElementToChange.classList.add('place-card__like-icon_liked');
                domElementToChange.id = 'likedBtn';

            })
            .catch((err)=> {

                console.log(err)

            });
            
        } else if (event.target.id === 'likedBtn') {

            const cardIdToDislike = event.target.parentNode.parentNode.parentNode.id;;
            const domElementToChange = event.target;
            const likesCounter = event.target.parentNode.querySelector('.place-card__like-counter');
            this.apiClass.dislikeCard(cardIdToDislike)
            .then((card) => {

                const AmountOfLikes = card.likes.length;
                likesCounter.textContent = AmountOfLikes;
                domElementToChange.id = 'likeBtn';
                domElementToChange.classList.remove('place-card__like-icon_liked');

            })
    
            .catch((err) => {

                console.log(err);

            });

        }

    }

    bigPic(event) {

        event.stopPropagation();

        if (event.target.id === 'image') {

            const pic = event.target.closest('.place-card__image').style.backgroundImage.match(/url\((?:'|")(.+)(?:'|")\)/)[1];
            const popupImage = document.querySelector('.image');
            popupImage.src = pic;
            this.imageDetail.setAttribute('style', "display: flex");

        }
    }

    closeBigPic() {

        this.imageDetail.removeAttribute('style');

    }

}
