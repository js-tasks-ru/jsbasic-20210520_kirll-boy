import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides;
    this.carousel()
    this.render()
    this.slider()
    this.addProduct()
  }

  carousel() {
    this.elem = document.createElement('div')
    this.elem.classList.add('carousel')
    this.elem.insertAdjacentHTML('beforeend', `   
      <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`)

  }

  render() {
    const carousel = document.querySelector('.carousel')
    let carouselInner = document.createElement('div')
    carouselInner.classList.add('carousel__inner')

    for (let slide of this.slides) {
      carouselInner.insertAdjacentHTML('beforeend', `
          <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
          `)
    }

    this.elem.appendChild(carouselInner)
  }

  slider() {
    const slidesAmount = this.slides.length - 1
    const rightArrow = this.elem.querySelector('.carousel__arrow_right')
    const leftArrow = this.elem.querySelector('.carousel__arrow_left')
    const carousel = this.elem.querySelector('.carousel__inner')
    leftArrow.style.display = 'none'
    let i = 0

    rightArrow.addEventListener('click', () => {
      i++
      carousel.style.transform = `translateX(${-i * 500}px)`

      if (i == slidesAmount) {
        rightArrow.style.display = 'none'
      } else {
        rightArrow.style.display = 'flex'
      }

      if (i !== 0) {
        leftArrow.style.display = 'flex'
      }
    })

    leftArrow.addEventListener('click', () => {
      i--
      carousel.style.transform = `translateX(${-i * 500}px)`

      if (i == 0) {
        leftArrow.style.display = 'none'

      } else {
        leftArrow.style.display = 'flex'
      }

      if (i !== slidesAmount) {
        rightArrow.style.display = 'flex'
      }
    })
  }

  addProduct() {
    this.elem.onclick = ({ target }) => {
      let button = target.closest('.carousel__button');
      if (button) {
        let id = target.closest('[data-id]').dataset.id;

        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: id,
          bubbles: true
        }));
      }
    }
  }
}