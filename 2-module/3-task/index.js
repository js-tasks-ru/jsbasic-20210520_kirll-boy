let calculator = {

  read(a,b) {
    this.a = a
    this.b = b
  },

  sum() {
    return this.a + this.b
  },

  mul() {
    return this.a * this.b
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально

function isEmpty(obj) {
  for (let key in obj) {
    return false
  }
  return true
}

function sumSalary(salaries) {
  let sum = 0

  for (let key in salaries) {

    if (typeof salaries[key] === 'number') {

      if (salaries[key] == Infinity || salaries[key] == -Infinity || isNaN(salaries[key])) {
      } else {
        sum += salaries[key]
      }
    }
  }

  return sum
}


