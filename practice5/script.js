const calc = document.getElementById('calc');
calc.addEventListener('submit', doClick);

function doClick(event) {
  event.preventDefault();
  const Count = calc.querySelector('[name="first"]');
  const Good = calc.querySelector('[name="select1"]');
  const Result = calc.querySelector('[name="result"]');
  var price;
  if (Good.value == 'obj2') {
    price = 25;
  } else if (Good.value == 'obj3') {
    price = 50;
  } else if (Good.value == 'obj4') {
    price = 75;
  } else alert('Товар не выбран');
  if (Count.value > 0) {
    Result.value = Count.value * price;
  } else alert('Количество товаров должно быть положительным');
}
