$(document).ready(function () {
    const form = $('#contactForm');
    const statusMessage = $('#statusMessage');
    const popup = $('#feedbackForm');
    const openBtn = $('#openFormBtn');
    const closeBtn = $('#closeFormBtn');
    var href = $(this).attr("action");

    // Check if form data is present in localStorage
    const savedFormData = JSON.parse(localStorage.getItem('formData')) || {};
    Object.keys(savedFormData).forEach(key => $(`#${key}`).val(savedFormData[key]));

    // Open form on button click
    openBtn.click(function () {
        popup.show();
        history.pushState({ formOpen: true }, 'Форма обратной связи', '?formOpen=true');
    });

    // Close form on close button click
    closeBtn.click(function () {
        popup.hide();
        history.pushState({}, 'Форма обратной связи', '?');
    });

    // Handle browser back button
    window.onpopstate = function (event) {
        if (event.state && event.state.formOpen) {
            popup.show();
        } else {
            popup.hide();
        }
    };

    // Handle form submission
    form.submit(function (event) {
        event.preventDefault();

        // Collect form data
        const formData = {};
        form.serializeArray().forEach(item => formData[item.name] = item.value);

        // Save form data to localStorage
        localStorage.setItem('formData', JSON.stringify(formData));

        // Simulate form submission with AJAX
        $.ajax({
            type: 'POST',
            url: href,
            data: formData,
            success: function (response) {
                statusMessage.text('Форма успешно отправлена!');
                form[0].reset();
            },
            error: function (error) {
                statusMessage.text('Ошибка при отправке формы. Попробуйте еще раз.');
            }
        });
    });
});