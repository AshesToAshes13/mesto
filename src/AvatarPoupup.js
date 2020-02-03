export class AvatarPoupup {

    constructor(apiClass, userAvatar, avatarForm) {

        this.apiClass = apiClass;
        this.userAvatar = userAvatar;
        this.avatarForm = avatarForm;
    }

    open() {

        this.avatarForm.classList.toggle('popup_is-opened');
        this.avatarForm.setAttribute('style', "display: flex");

    }

    close() {

        this.avatarForm.classList.toggle('popup_is-opened');
        this.avatarForm.removeAttribute('style')
        avatar.reset();
        const formButton = avatar.elements.btn;
        formButton.classList.remove('popup__button-enabled')
        formButton.setAttribute('disabled', true)

    }
    inputHandler() {

        const link = avatar.elements.link;
        const formButton = avatar.elements.btn;
        const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        const linkAllert = document.getElementById('linkError');

         if (!regex.test(link.value)) {

            linkAllert.removeAttribute('style');
            linkAllert.textContent = 'Введена не ссылка';
            this.disableBtn()
            return false

          } else {

            linkAllert.setAttribute('style', "display: none")
            formButton.removeAttribute('disabled');
            formButton.classList.add('popup__button-enabled');

      }
    }
    disableBtn(){

        const formButton = avatar.elements.btn;
        formButton.setAttribute('disabled', true);
        formButton.classList.remove('popup__button-enabled');
        const enterBtn = 13;

        if (event.keyCode == enterBtn) {

            event.preventDefault();
            return false;

        }

    }
    changeAvatar(event) {

        event.preventDefault();
        const avatarLink = avatar.elements.link.value;
        this.apiClass.changeUserAvatar(avatarLink)
        .then((result) => {

            const userAvatarLink = `url(${result.avatar})`;
            document.querySelector('.user-info__photo').style.backgroundImage = userAvatarLink;

        })
        .catch((err) => {

            console.log(err);

        })
        .finally(() => {

            this.renderLoading(false);

        });

    }

    renderLoading(isLoading) {

        const formButton = cardForm.elements.btn;

        if (isLoading) {

            formButton.textContent = 'Загрузка...';

        } else { 

            formButton.textContent = 'Сохранить';
            this.close();

        }

    }
    
}