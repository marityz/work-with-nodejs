//класс Popup отвечает за работу модальных окон;
//Это класс для всплывающего окна. Добавьте ему методы open и close, чтобы показывать и скрывать попап.
// Есть два подхода, как можно реализовать всплывающие окна:
// сделать единый контейнер для всех попапов и менять его содержимое при открытии;
// сделать независимые попапы в разных контейнерах.
//
//     Первый способ одновременно лучше и сложнее. Но вы сами можете выбрать, как реализовать попап.

//onOpenCallback

 export default class Popup {
    constructor(modalWindow, closePopupButton, openPopupButton = null, onOpenCallback) {
        this.modalWindow = modalWindow;
        this.openPopupButton = openPopupButton;
        this.closePopupButton = closePopupButton;
        this.onOpenCallback = onOpenCallback;
    }


    setEventListeners = () => {
        if (this.openPopupButton != null) {
            this.openPopupButton.addEventListener("click", this.open);
        }
        this.closePopupButton.addEventListener("click", this.close);
    };

    open = () => {
        this.onOpenCallback();
        this.modalWindow.classList.add("popup_is-opened");
    };

    close = () => {
        this.modalWindow.classList.remove("popup_is-opened");
    };


}
