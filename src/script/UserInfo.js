//класс UserInfo для вывода на страницу данных о пользователе;
//Класс для работы с данными пользователя. Экземпляр этого класса должен хранить в себе данные пользователя:
// имя и информацию о себе, а также отображать эту информацию на странице. Для этого класса нужно определить методы:
//
//     setUserInfo, чтобы обновлять данные внутри экземпляра класса;
//     updateUserInfo, чтобы отображать эти данные на странице.

export default class UserInfo {
    constructor(userInfoName, userInfoJob) {
        this.userInfoName = userInfoName; //поле имя в html
        this.userInfoJob = userInfoJob; // поле инфо в html
    }

    setUserInfo = (name, about, myId) => {

        this.name = name;
        this.about = about;
        this.myId = myId;
    };

    updateUserInfo = () => {
        this.userInfoName.textContent = this.name;
        this.userInfoJob.textContent = this.about;
    };

    // Шикарно! Шикарно!!!
    // Можно еще из этого метода геттер сделать (если хотите)
    // https://learn.javascript.ru/private-protected-properties-methods
    getUserInfo = () => {
        return {
            name: this.name,
            about: this.about,
            myId: this.myId
        }
    };


}
