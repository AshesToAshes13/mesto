export class UserPopup {

    constructor(apiClass,userName, userJob, userForm) {

      this.apiClass = apiClass;
      this.userName = userName;
      this.userJob = userJob;
      this.userForm = userForm;
    }

    open() {

      this.userForm.classList.toggle('popup_is-opened');
      this.userForm.setAttribute('style', "display: flex")
      const userNameSet = this.userName.textContent;
      const userJobSet = this.userJob.textContent
      user.elements.nickname.value = userNameSet;
      user.elements.about.value = userJobSet;
      user.elements.btn.classList.add('popup__button-enabled');

    } 

    close() {

      this.userForm.classList.toggle('popup_is-opened');
      this.userForm.removeAttribute('style')
      user.reset();

    }

    inputHandler() {

      const nickname = event.currentTarget.elements.nickname;
      const about = event.currentTarget.elements.about;
      const formButton = user.elements.btn;
      const nicknameAllert = document.querySelector('.popup__allert-nickname__error');
      const aboutAllert = document.querySelector('.popup__allert-about__error');

           if (nickname.value.length === 0) {

              nicknameAllert.removeAttribute('style');
              nicknameAllert.textContent = 'Обязательное поле';
              this.disableBtn()
              return false

          } else if (nickname.value.length === 1 || nickname.value.length > 30) {

              nicknameAllert.removeAttribute('style');
              nicknameAllert.textContent = 'Должно быть от 2 до 30 символов';
              this.disableBtn()
              return false

          } if (about.value.length === 0) {

              aboutAllert.removeAttribute('style');
              aboutAllert.textContent = 'Обязательное поле';
              this.disableBtn()
              return false

          } else if (about.value.length === 1 || about.value.length > 30) {

              aboutAllert.removeAttribute('style');
              aboutAllert.textContent = 'Должно быть от 2 до 30 символов';
              this.disableBtn()
              return false

          } else {

            nicknameAllert.setAttribute('style', "display: none");
            aboutAllert.setAttribute('style', "display: none");
            formButton.removeAttribute('disabled');
            formButton.classList.add('popup__button-enabled');

          }
    }

    disableBtn() {

      const formButton = user.elements.btn;
      formButton.setAttribute('disabled', true);
      formButton.classList.remove('popup__button-enabled');
      const enterBtn = 13;

      if (event.keyCode == enterBtn) {

          event.preventDefault();
          return false;

        }

    }

    changeUser() {

      const nickname = user.elements.nickname.value;
      const about = user.elements.about.value;
      this.apiClass.changeUserData(nickname, about)
      .then((result) => {

        const username = document.querySelector('.user-info__name');
        const userAboutInfo = document.querySelector('.user-info__job');
        username.textContent = result.name; 
        userAboutInfo.textContent = result.about
        ;
    })
    .catch((err) => {

        console.log(err);

    })
    .finally(() => {

        this.renderLoading(false);

    });

      this.inputHandler();

    }

    renderLoading(isLoading) {

      const formButton = user.elements.btn;

      if(isLoading) {

          formButton.textContent = 'Загрузка...';

      } else {

          formButton.textContent = 'Сохранить';
          this.close();

      }

    }
    
  }