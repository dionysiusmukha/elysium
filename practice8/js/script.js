document.addEventListener('DOMContentLoaded', function () {
    const openFormBtn = document.getElementById('openFormBtn');
    const popupForm = document.getElementById('popupForm');
    const feedbackForm = document.getElementById('feedbackForm');
    const statusMessage = document.getElementById('statusMessage');

    // Проверяем, открывалась ли форма при предыдущем визите
    const isFormOpened = localStorage.getItem('isFormOpened') === 'true';

    // Скрываем кнопку открытия формы, если форма уже открывалась
    if (isFormOpened) {
        openFormBtn.style.display = 'none';
    }

    // Открытие формы и скрытие кнопки
    openFormBtn.addEventListener('click', function () {
        openFormBtn.style.display = 'none'; // Скрытие кнопки
        popupForm.style.display = 'block';
        history.pushState({ formOpen: true }, null, ''); // Изменение URL
        loadFormData(); // Загрузка данных из LocalStorage
        localStorage.setItem('isFormOpened', 'true'); // Сохранение информации о состоянии формы
    });

    // Обработка события нажатия кнопки "Назад" в браузере
    window.addEventListener('popstate', function (event) {
        if (event.state && event.state.formOpen) {
            popupForm.style.display = 'block';
        } else {
            openFormBtn.style.display = 'inline-block'; // Возвращение видимости кнопки
            popupForm.style.display = 'none';
        }
    });

    // Отправка формы при клике на кнопку "Отправить"
    document.getElementById('submitForm').addEventListener('click', function () {
        sendFormData(); // Отправка данных на сервер
    });

    // Функция для сохранения данных в LocalStorage
    function saveFormData() {
        const formFields = ['fullName', 'email', 'phone', 'organization', 'message', 'agree'];
        formFields.forEach(function (field) {
            const inputField = document.getElementById(field);
            localStorage.setItem(field, inputField.value);
        });
    }

    // Функция для загрузки данных из LocalStorage
    function loadFormData() {
        const formFields = ['fullName', 'email', 'phone', 'organization', 'message', 'agree'];
        formFields.forEach(function (field) {
            const inputField = document.getElementById(field);
            inputField.value = localStorage.getItem(field) || '';
        });
    }

    // Функция для отправки данных на сервер
    function sendFormData() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://example.com/submit', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('message').value
        };

        xhr.onload = function () {
            if (xhr.status === 200) {
                statusMessage.textContent = 'Форма успешно отправлена!';
                feedbackForm.reset(); // Очистка формы
                localStorage.clear(); // Очистка данных в LocalStorage
            } else {
                statusMessage.textContent = 'Произошла ошибка при отправке формы.';
            }
        };

        xhr.onerror = function () {
            statusMessage.textContent = 'Произошла ошибка при отправке формы.';
        };

        xhr.send(JSON.stringify(formData));
    }
});
