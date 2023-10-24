function doClick(event) {
  event.preventDefault();
  const Count = calc.querySelector('[name="first"]');
  const Good = calc.querySelector('[name="select1"]');
  const Result = calc.querySelector('[name="result"]');
  var price;
  if (Good.value == 'S.T.A.L.K.E.R.: Shadow of Chernobyl') {
    price = 25;
  } else if (Good.value == 'S.T.A.L.K.E.R.: Clear Sky') {
    price = 50;
  } else if (Good.value == 'S.T.A.L.K.E.R.: Call of Pripyat') {
    price = 75;
  } else alert('Товар не выбран');
  if (Count.value > 0) {
    Result.value = Count.value * price;
  } else alert('Количество товаров должно быть положительным');
}
