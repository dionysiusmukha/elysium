document.addEventListener('DOMContentLoaded', function () {
    const openFormBtn = document.getElementById('openFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const popupForm = document.getElementById('popupForm');
    const feedbackForm = document.getElementById('feedbackForm');
    const statusMessage = document.getElementById('statusMessage');

    
    openFormBtn.addEventListener('click', function () {
        popupForm.style.display = 'block';
        history.pushState({ formOpen: true }, null, ''); 
        loadFormData();
    });

    
    closeFormBtn.addEventListener('click', function () {
        popupForm.style.display = 'none';
        history.pushState(null, null, ''); 
    });

    
    feedbackForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveFormData(); 
        sendFormData();
    });

    
    window.addEventListener('popstate', function (event) {
        if (event.state && event.state.formOpen) {
            popupForm.style.display = 'block';
        } else {
            popupForm.style.display = 'none';
        }
    });

    
    function saveFormData() {
        const formFields = ['fullName', 'email', 'phone', 'organization', 'message', 'agree'];
        formFields.forEach(function (field) {
            const inputField = document.getElementById(field);
            localStorage.setItem(field, inputField.value);
        });
    }

    
    function loadFormData() {
        const formFields = ['fullName', 'email', 'phone', 'organization', 'message', 'agree'];
        formFields.forEach(function (field) {
            const inputField = document.getElementById(field);
            inputField.value = localStorage.getItem(field) || '';
        });
    }

    
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
                statusMessage.textContent = 'Форма отправлена';
                feedbackForm.reset();
                localStorage.clear(); 
            } else {
                statusMessage.textContent = 'Ошибка. Не удалось отправить форму';
            }
        };

        xhr.onerror = function () {
            statusMessage.textContent = 'Ошибка. Не удалось отправить форму';
        };

        xhr.send(JSON.stringify(formData));
    }
});