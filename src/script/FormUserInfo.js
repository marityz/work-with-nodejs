 import FormPopup from "./FormPopup";

 export default class FormUserInfo extends FormPopup{


    setUserInfoForm = (name, job) => {
        this.name = this.form.elements.name;
        this.info = this.form.elements.info;
        this.name.value = name;
        this.info.value = job;
    };


}




