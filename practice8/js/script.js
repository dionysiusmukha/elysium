document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    const popup = document.getElementById('feedbackForm');
    const openBtn = document.getElementById('openFormBtn');
    const closeBtn = document.getElementById('closeFormBtn');

    const savedFormData = JSON.parse(localStorage.getItem('formData')) || {};
    Object.keys(savedFormData).forEach(key => document.getElementById(key).value = savedFormData[key]);

    openBtn.addEventListener('click', function () {
        popup.style.display = 'block';
        history.pushState({ formOpen: true }, 'Форма обратной связи', '?formOpen=true');
    });

    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        history.pushState({}, 'Форма обратной связи', '?');
    });

    window.onpopstate = function (event) {
        if (event.state && event.state.formOpen) {
            popup.style.display = 'block';
        } else {
            popup.style.display = 'none';
        }
    };

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new URLSearchParams();
        Array.from(form.elements).forEach(item => {
            if (item.name) {
                formData.append(item.name, item.value);
            }
        });

        localStorage.setItem('formData', JSON.stringify(Object.fromEntries(formData)));

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'YOUR_BACKEND_URL', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                statusMessage.textContent = 'Форма успешно отправлена!';
                form.reset();
            } else {
                statusMessage.textContent = 'Ошибка при отправке формы. Попробуйте еще раз.';
            }
        };

        xhr.onerror = function () {
            statusMessage.textContent = 'Ошибка при отправке формы. Попробуйте еще раз.';
        };

        xhr.send(formData);
    });
});
