document.addEventListener('DOMContentLoaded', function () {
    const openFormButton = document.getElementById('openFormButton');
    const popup = document.getElementById('popup');
    const feedbackForm = document.getElementById('feedbackForm');
    const submitFormButton = document.getElementById('submitFormButton');
    const messageContainer = document.getElementById('messageContainer');

    // Check LocalStorage for saved form values
    const storedFormValues = JSON.parse(localStorage.getItem('formValues')) || {};
    for (const key in storedFormValues) {
        if (Object.hasOwnProperty.call(storedFormValues, key)) {
            const inputElement = document.getElementById(key);
            if (inputElement) {
                inputElement.value = storedFormValues[key];
            }
        }
    }

    openFormButton.addEventListener('click', function () {
        popup.style.display = 'block';
        history.pushState({ formOpen: true }, null, '#form');
    });

    window.addEventListener('popstate', function (event) {
        if (event.state === null || !event.state.formOpen) {
            popup.style.display = 'none';
        }
    });

    submitFormButton.addEventListener('click', function () {

        if (!feedbackForm.checkValidity()) {
            messageContainer.textContent = 'Пожалуйста, заполните все обязательные поля и установите чекбокс.';
            return;
        }

        // Collect form data
        const formData = new FormData(feedbackForm);

        // Save form values to LocalStorage
        const formValues = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        localStorage.setItem('formValues', JSON.stringify(formValues));

        // Simulate form submission
        // Replace the URL with the actual backend endpoint
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://formcarry.com/s/7K-Ixu_vxd', true);
        //xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                messageContainer.textContent = 'Форма успешно отправлена!';
                // Clear form values after successful submission
                feedbackForm.reset();
                localStorage.removeItem('formValues');
                popup.style.display = 'none';
            } else {
                messageContainer.textContent = 'Ошибка при отправке формы. Пожалуйста, повторите попытку.';
            }
        };

        xhr.onerror = function () {
            messageContainer.textContent = 'Ошибка при отправке формы. Пожалуйста, повторите попытку.';
        };

        xhr.send(formData);
    });
});
