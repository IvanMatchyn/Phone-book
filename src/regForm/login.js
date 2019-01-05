(function() {
    const regForm = document.querySelector('.ls__log-reg-form')

    fetch('../src/regForm/login.html').then(function (response) {
            return response.text().then(function(text) {
                regForm.innerHTML = text;
            });
        })
})();

