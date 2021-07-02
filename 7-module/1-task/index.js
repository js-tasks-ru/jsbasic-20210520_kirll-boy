import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render()
    this.onClick()

  }

  render() {
    this.elem = document.createElement('div')
    this.elem.classList.add('ribbon')
    const ribbonInner = document.createElement('nav')
    ribbonInner.classList.add('ribbon__inner')
    for (let categories of this.categories) {
      ribbonInner.insertAdjacentHTML('beforeend', ` <a href="#" class="ribbon__item" data-id="${categories.id}">${categories.name}</a> `)

    }
    this.elem.append(ribbonInner)
    this.aroows()
  }

  aroows() {
    this.elem.insertAdjacentHTML('afterbegin', `    <button class="ribbon__arrow ribbon__arrow_left ">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`)
    this.elem.insertAdjacentHTML('beforeend', `    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`)
    const a = this.elem.querySelector('.ribbon__inner')
    console.log(a)
    this.slide()
  }

  slide() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner')
    const rightArrow = this.elem.querySelector('.ribbon__arrow_right')

    rightArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0)
      if (this.elem.querySelector('.ribbon__inner').scrollLeft > 0) {
        this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible')
      }
    })

    this.elem.querySelector('.ribbon__arrow_left').addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0)
      if (ribbonInner.scrollLeft == 0) {
        this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible')
      }
    })

    this.elem.querySelector('.ribbon__inner').addEventListener('scroll', () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth

      if (ribbonInner.scrollLeft > 0) {
        this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible')
      } else {
        this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible')
      }

      if (scrollRight == 0) {
        this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible')

      } else {
        this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible')
      }

    })
  }

  onClick() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner')
    const ribbonItem = ribbonInner.querySelectorAll('.ribbon__item')
    this.elem.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('ribbon__item')) {
        ev.preventDefault()
        for (let category of ribbonItem) {
          category.classList.remove('ribbon__item_active');

        }
        ev.target.classList.add('ribbon__item_active');
        let ourEvent = new CustomEvent('ribbon-select', {
          detail: ev.target.dataset.id,
          bubbles: true
        });
        this.elem.dispatchEvent(ourEvent);
      }
    });
  }
}
