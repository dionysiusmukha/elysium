

window.addEventListener('DOMContentLoaded', function (event) {
  const form = document.getElementById('form');
  const radio = document.getElementById('radio');
  const radio1 = document.getElementById('radio1');
  const radio2 = document.getElementById('radio2');
  const radio3 = document.getElementById('radio3');
  FormChangeHandler();
  form.addEventListener('change', getFormValue);
  radio.addEventListener('change', FormChangeHandler);
}

function FormChangeHandler() {
  if (radio1.checked) {
    document.getElementById('Select').hidden = true;
    document.getElementById('checkbox').hidden = true;
  } else if (radio2.checked) {
    document.getElementById('Select').hidden = false;
    document.getElementById('checkbox').hidden = true;
  } else if (radio3.checked) {
    document.getElementById('Select').hidden = true;
    document.getElementById('checkbox').hidden = false;
  }
}

function getFormValue(event) {
  event.preventDefault();
  const Number = form.querySelector('[name ="number"]');
  const Edition = form.querySelector('[name ="edition"]');
  const Result = form.querySelector('[name ="result"]');
  const CheckBox = form.querySelector('[name ="checkbox"]');

  if (radio1.checked) {
    Result.value = Number.value * 2000;
  } else if (radio2.checked) {
    if (Edition.value === 'standard') Result.value = 2000 * Number.value * 1.5;
    else if (Edition.value === 'gold') Result.value = 2000 * Number.value * 1.7;
    else if (Edition.value === 'deluxe') Result.value = 2000 * Number.value * 2;
    else Result.value = 'Выберите тип';
  } else if (radio3.checked) {
    if (CheckBox.checked) Result.value = Number.value * 3500 + 500;
    else Result.value = Number.value * 3500;
  }
}

