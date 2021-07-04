import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement('div')
    this.elem.classList.add('products-grid')
    const productInner = document.createElement('div')
    productInner.classList.add('products-grid__inner')
    this.elem.append(productInner)
    this.render(products)
  }

  render(products) {
    const productInner = this.elem.querySelector('.products-grid__inner')

    productInner.innerHTML = ''
    for (let product of products) {
      productInner.insertAdjacentHTML('beforeend', `
      <div class="card">
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
        </div>
      `)
    }


  }

  updateFilter(filters) {
    
    this.filters = Object.assign(this.filters, filters);
    console.log(this.filters, filters)
    let productFilter = this.products;

    if (this.filters.maxSpiciness) {
      productFilter = productFilter.filter((product) => (product.spiciness <= this.filters.maxSpiciness));
      console.log(productFilter)
    } 

    if (this.filters.vegeterianOnly) {
      productFilter = productFilter.filter((product) => (product.vegeterian == this.filters.vegeterianOnly));
      console.log(productFilter)
    } 

    if (this.filters.category) {
      productFilter = productFilter.filter((product) => (product.category == this.filters.category));
      console.log(productFilter)
    } 
    if (this.filters.noNuts) {
      productFilter= productFilter.filter((product) => (product.nuts !== this.filters.noNuts));
      console.log(productFilter)
    } 


    return this.render(productFilter)
  }
}

