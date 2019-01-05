(function() {
    const regFormBlock = document.querySelector('.ls__log-reg-form');

    fetch('./regForm/login.html')
        .then(function (response) {
            return response.text().then(function(text) {
                regFormBlock.innerHTML = text;
            })

            .then(function () {
                const regForm = document.querySelector('.login-form');
                const regFormButton = document.querySelector('.reg-form-submit');
                const regLink = document.querySelector('.login-registration')


                regFormButton.addEventListener('click', function () {
                    regForm.preventDefault();
                });

                regLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    const mainBlock = document.querySelector('.main__article');

                    fetch('./regForm/RegistrationForm.html')
                        .then(function (response) {
                            return response.text().then(function (text) {
                                mainBlock.innerHTML = text;
                            })
                        })
                })
            })
        })


})();


