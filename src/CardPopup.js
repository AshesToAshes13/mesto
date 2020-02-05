export class CardPopup {

    constructor(list, apiClass, card, cardAddForm) {

      this.cardList = list;
      this.apiClass = apiClass;
      this.cardClass = card;
      this.cardAddForm = cardAddForm;
    }

    open() {

      this.cardAddForm.classList.toggle('popup_is-opened');
      this.cardAddForm.setAttribute('style', "display: flex");
        
    }

    close() {

      this.cardAddForm.classList.toggle('popup_is-opened');
      this.cardAddForm.removeAttribute('style')
      card.reset();
      const formButton = card.elements.btn;
      formButton.classList.remove('popup__button-enabled')
      formButton.setAttribute('disabled', true);
    }

    inputHandler() {

      const name = event.currentTarget.elements.name;
      const link = event.currentTarget.elements.link;
      const formButton = card.elements.btn;
      const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      const nameAllert = document.querySelector('.popup__allert-name__error');
      const linkAllert = document.querySelector('.popup__allert-link__error');
  
          if (name.value.length === 0) {

              nameAllert.removeAttribute('style');
              nameAllert.textContent = 'Обязательное поле';
              this.disableBtn()
              return false

          } else if (name.value.length === 1 || name.value.length > 30) {

              nameAllert.removeAttribute('style');
              nameAllert.textContent = 'Должно быть от 2 до 30 символов';
              this.disableBtn()
              return false

          } if (link.value.length === 0) {

              linkAllert.removeAttribute('style');
              linkAllert.textContent = 'Обязательное поле';
              this.disableBtn()
              return false

          } else if (!regex.test(link.value)) {

              linkAllert.removeAttribute('style');
              linkAllert.textContent = 'Введена не ссылка';
              this.disableBtn()
              return false

          } else {

            nameAllert.setAttribute('style', "display: none")
            linkAllert.setAttribute('style', "display: none")
            formButton.removeAttribute('disabled');
            formButton.classList.add('popup__button-enabled');

      }
    }

    disableBtn() {

      const formButton = card.elements.btn;
      formButton.setAttribute('disabled', true);
      formButton.classList.remove('popup__button-enabled');
      const enterBtn = 13;

      if (event.keyCode == enterBtn) {

          event.preventDefault();
          return false;

        }

    }

    cardAdd(name, link) {

      this.apiClass.addCard(name ,link)
      .then((result) => {

          const imgUrl = `url(${result.link})`;
          this.cardClass.createCard(result.name, imgUrl, result.likes.length, result._id, result.owner._id, "display: block");

      })
      .catch((err) => {

          console.log(err);

      })
      .finally(() => {

          this.renderLoading(false);

      });

    }

    renderLoading(isLoading) {

      const formButton = card.elements.btn;

      if(isLoading) {

          formButton.textContent = 'Загрузка...';

      } else {

          formButton.textContent = 'Сохранить';
          this.close();

      }

    }
    
}