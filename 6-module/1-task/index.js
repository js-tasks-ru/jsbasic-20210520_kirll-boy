/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    const btn = '<button class="btn">X</button>'
    const thead = this.elem.insertAdjacentHTML('afterbegin',
      `<thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead> `)

    for (let user of rows) {
      this.elem.insertAdjacentHTML(
        'afterbegin',
        `<tr>
              <td>${user.name}</td>
              <td>${user.age}</td>
              <td>${user.salary}</td>
              <td>${user.city}</td>
              <td>${btn}</td>
            </tr>`
      );
    }

    let buttons = this.elem.querySelectorAll('.btn')
    buttons.forEach(element => {
      element.addEventListener('click', event => {
        event.target.closest('tr').remove()
      })
    })
  }
}

