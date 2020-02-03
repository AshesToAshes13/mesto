export class Cardlist {

    constructor(apiClass, card, placesList) {

      this.apiClass = apiClass
      this.card = card;
      this.placesList = placesList;
    }
    
    render(name, imgLink, likeCount, cardId, ownerId,btnDisplayMode, likeOwnerId ) {

      const cardName = name;
      const imageUrl = 'url(' + imgLink + ')';
      const placesCard = this.card.createCard(cardName , imageUrl, likeCount, cardId, ownerId, btnDisplayMode, likeOwnerId );
      this.placesList.appendChild(placesCard);

    }

    setUpCards() {
      
      this.apiClass.setUpCards()
      .then((cards)=> {
        
      cards.forEach(post => {

          const userId = document.querySelector('.user-info__name').id;
          this.fetchLikes(post, userId);

      })

      this.setUpDeleteBtns();
      this.setUpLikes()

      })
      .catch((err) => {

        console.log(err);

      })

  }

  setUpDeleteBtns() {

    const userId = document.querySelector('.user-info__name').id;
    const cardOwnerId = document.getElementsByName(userId);
    for (var i=0; i<cardOwnerId.length; i++) {

        cardOwnerId[i].removeAttribute('style');

    }

  }

  setUpLikes() {

    const userID = document.querySelector('.user-info__name').id;
    const likeBtnsArr = document.querySelectorAll('.place-card__like-icon');
    for (var num=0; num<likeBtnsArr.length; num++) {

        likeBtnsArr[num].name
        if (likeBtnsArr[num].name == userID) {

            likeBtnsArr[num].classList.add('place-card__like-icon_liked');
            likeBtnsArr[num].id = 'likedBtn';

        }

    }

  }

  fetchLikes(post , userId) {
     
    const currentUserSetLike = post.likes.some(like => like._id == userId);

      if (currentUserSetLike) {

        this.render(post.name, post.link, post.likes.length, post._id, post.owner._id, "display: none" ,userId);

      }

    const currentUserDontSetLike = post.likes.every(like => like._id != userId);

      if (currentUserDontSetLike) {

        this.render(post.name, post.link, post.likes.length, post._id, post.owner._id, "display: none" ,'none');

      } 
  }
}