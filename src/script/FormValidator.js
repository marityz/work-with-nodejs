//класс FormValidator для валидации форм.
//Класс для валидации полей формы. Его конструктор должен принимать один из двух аргументов:
//
//     элемент формы,
//     или элемент попапа, внутри которого находится эта форма.
//
// Также у класса должны быть определены методы:
//
//     checkInputValidity, чтобы валидировать поля. Метод показывает ошибку, если инпуты не проходят
//     валидацию. Если проходят — скрывает ошибку.
//     setSubmitButtonState, чтобы делать кнопку сабмита активной и неактивной. Состояние кнопки сабмита
//     зависит от того, прошли все поля валидацию или нет. Этот метод должен вызываться при любом
//     изменении данных формы. Если поля в порядке, кнопка становится активной. Если одно из полей
//     не прошло валидацию, или пользователь его не заполнил, — кнопка неактивна.
//     setEventListeners, чтобы добавлять обработчики. Добавляет необходимые для валидации обработчики всем полям формы.


export default class FormValidator {
    constructor(element, errorMessages) {
        this.element = element;
        this.errorMessages = errorMessages;

        this._init();
    }

    _isValidate = (input) => {
        input.setCustomValidity("");

        if (input.validity.valueMissing) {
            input.setCustomValidity(`${this.errorMessages.empty}`);
            return false;
        }

        if (input.validity.typeMismatch && input.type === "url") {
            input.setCustomValidity(`${this.errorMessages.wrongUrl}`);
            return false;
        }

        if (input.validity.tooLong || input.validity.tooShort) {
            input.setCustomValidity(`${this.errorMessages.wrongLength}`);
            return false;
        }

        return input.checkValidity();
    };

    // Отлично!
    _findErrorElement = (input) => {
        const errorElem = this.errorElems.find((element) => {
            return element.id === `${input.id}-error`;
        });
        return errorElem;
    };


    resetErrorForm = () => { //чистельщик
        // Тут кстати можно было минуя _findErrorElement просто перебрать массив элементов ошибок и чистить
        // Меньше лишних операций
        this.inputs.forEach((input) => {
            this._findErrorElement(input).textContent = "";
        });
    };

    _checkInputValidity = (input) => {
        const errorElem = this._findErrorElement(input);

        if (!this._isValidate(input)) {
            errorElem.textContent = input.validationMessage;
        } else {
            errorElem.textContent = "";
        }

    };

    setSubmitButtonState = (state) => {
        if (state) {
            this.button.removeAttribute("disabled");
            this.button.classList.add("popup__button_valid");

        } else {
            this.button.setAttribute("disabled", true);
            this.button.classList.remove("popup__button_valid");
        }

    };

    _init = () => {
        this.button = this.element.querySelector(".popup__button");
        this.inputs = [...this.element.querySelectorAll(".popup__input")];
        this.errorElems = this.inputs.map((input) => {
            return this.element.querySelector(`#${input.id}-error`);
        });
        this._setEventListeners();
    };

    _handlerInputForm = (event) => {
        const input = event.target;

        this._checkInputValidity(input);

        const isValidInputs = this.inputs.every((input) => {
            return this._isValidate(input);
        });

        this.setSubmitButtonState(isValidInputs);

    };


    _setEventListeners = () => {
        this.element.addEventListener("input", this._handlerInputForm);
    }

}
