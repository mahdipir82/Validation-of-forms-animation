class FormValidator {

    constructor(myform) {
        this.__myForm = myform;
        this.submitHandler();
    }


    //----------------------------------------------------------------
    submitHandler() {

        this.__myForm.addEventListener('submit', (event) => {

            event.preventDefault();

            var errors = [];

            var inputs =
                this.__myForm.querySelectorAll('[data-validation]');

            var ul =
                document.querySelector('.summery-validation');

            ul.innerHTML = '';


            for (let i = 0; i < inputs.length; i++) {

                var element = inputs[i];

                var validations =
                    element.dataset.validation.split(" ");


                for (let j = 0; j < validations.length; j++) {

                    var func = validations[j];

                    var message =
                        this[func](element);


                    if (message != "") {

                        errors.push(message);
                    }
                }
            }


            this.showErrors(errors);


            if (errors.length == 0) {

                this.__myForm.submit();
            }

        });
    }


    //----------------------------------------------------------------
    notEmpty(element) {

        if (element.value.trim() == "") {

            return "فیلد " +
                element.dataset.label +
                " نباید خالی بماند";
        }

        return "";
    }


    //----------------------------------------------------------------
    isMobile(element) {

        var re = /^09[0-3][0-9]{8}$/;


        if (
            element.value.trim() != "" &&
            !re.test(element.value)
        ) {

            return "قالب موبایل نادرست است";
        }

        return "";
    }

    showErrors(errors) {

        var ul =
            document.querySelector('.summery-validation');


        for (let i = 0; i < errors.length; i++) {

            var li =
                document.createElement('li');

            li.appendChild(
                document.createTextNode(
                    errors[i]
                )
            );

            ul.appendChild(li);
        }
    }
}


//----------------------------------------------------------------
document.addEventListener(
    "DOMContentLoaded",
    function () {

        var form =
            document.querySelector("form");

        var validator =
            new FormValidator(form);
    }
);



//----------------------------------------------------------------

// Open && Close Form-----------------------------------------------
var popup = document.getElementById("popup-form");
var form = document.getElementById("register-form");
var button = document.querySelector(".btn-popup");

popup.style.transition =
    "all 0.5s cubic-bezier(0.7,-0.5,0.3,1.5)";

form.style.transition =
    "all 0.5s cubic-bezier(0.7,-0.5,0.3,1.5)";

button.style.transition =
    "all 0.5s cubic-bezier(0.7,-0.5,0.3,1.5)";

button.onclick = function () {

    popup.classList.toggle("active");

    form.classList.toggle("active");

    button.classList.toggle("active");
}

// End Open && Close Form-----------------------------------------------