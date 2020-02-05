

export class User {
    
    constructor(apiClass, userName, userJob, userAvatarOpenBtn) {
        this.apiClass = apiClass;
        this.userName = userName;
        this.userJob = userJob;
        this.userAvatarOpenBtn = userAvatarOpenBtn;
    }

    fetchUserData() {

        this.apiClass.fetchUser()
        .then((result)=> {

            this.setUpUser(result.name, result.about, result.avatar, result._id);

        })
        .catch((err) => {

            alert(`Ошибка № ${err}`)

        })

    }

    setUpUser(name , about, avatarLink, userId) {
        this.userName.textContent = name;
        this.userJob.textContent = about;
        const imageUrl = 'url(' + avatarLink + ')';
        this.userAvatarOpenBtn.style.backgroundImage = imageUrl;
        this.userName.id = userId;
    }
}