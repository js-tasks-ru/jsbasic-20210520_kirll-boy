import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product
    this.render(product)
    this.addEventListener()
  }

  render(product) {
    let elem = document.createElement('div')
    elem.classList.add('card')
    this.elem = elem
    console.log(this.elem = elem)

    this.elem.insertAdjacentHTML('beforeend', `
      <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    `)
  }

  onClick(event) {
    this.elem.dispatchEvent(new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true
    }))
  }

  addEventListener() {
    this.elem.addEventListener('click', (event) => this.onClick(event))
  }
}