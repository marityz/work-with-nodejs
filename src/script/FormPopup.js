


 export  default  class FormPopup{

    constructor(form, textLoading) {
        this.form = form;
        this.textLoading = textLoading;
        this.button = this.form.elements.button;
        this.buttonLabel = this.button.textContent
    }

    setEventListener = (listener) => {
        this.form.addEventListener("submit", listener);

    };

    renderLoading = (isLoading) => {
        if (isLoading) {
            this.button.textContent = this.textLoading;
        } else {
            this.button.textContent = this.buttonLabel;
        }
    }
}
