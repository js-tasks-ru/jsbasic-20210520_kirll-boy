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

sumSalary(salaries)
