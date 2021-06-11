function highlight(table) {
  let tbody = table.querySelector('tbody')
  let tds = tbody.querySelectorAll('td')
  let trs = tbody.querySelectorAll('tr')


  for (let tr of trs) {
    for (let td of tds) {
      let parent = td.closest('tr')

      console.log(td)

      if (td.textContent < 18) {
        parent.style.textDecoration = 'line-through'
      }

      if (td.textContent == 'm') {
        parent.classList.add('male')

      } else if (td.textContent == 'f') {
        parent.classList.add('female')
      }

      if (td.hasAttribute('data-available') == true) {

        if (td.getAttribute('data-available') == 'true') {
          parent.classList.add('available')

        } else if (td.getAttribute('data-available') == 'false') {
          parent.classList.add('unavailable')
        }
      }
    }
    
    if ((tr.classList.contains('available') === false) && (tr.classList.contains('unavailable') === false)) {
      tr.setAttribute('hidden', '')
    }
  }
}