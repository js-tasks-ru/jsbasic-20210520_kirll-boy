import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product === undefined || product === null) {
      return
    }
    let cartItem = this.cartItems.find(item => (item.product.id === product.id));
    if (cartItem) {

      cartItem.count++
    } else {
      this.cartItems.push({ product: product, count: 1, })
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {

    let cartItem = this.cartItems.find(item => (item.product.id === productId));
    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1)
      document.querySelector(`[data-product-id="${productId}"]`).remove();
    };

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true
    } else {
      return false
    }
  }

  getTotalCount() {
    let count = 0
    for (let product of this.cartItems) {
      count += product.count
    }
    return count
  }

  getTotalPrice() {
    let price = 0
    for (let product of this.cartItems) {
      price += product.product.price * product.count
    }
    return price
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    this.modalBody = document.createElement('div');
    this.cartItems.map(item => {
      this.modalBody.append(this.renderProduct(item.product, item.count))
    });
    this.modalBody.append(this.renderOrderForm());
    this.modal.setBody(this.modalBody);
    this.modal.open();

    const cartCounter = document.querySelectorAll('.cart-counter__button')
    for (let card of cartCounter) {
      card.onclick = () => {

        let productId = card.closest('[data-product-id]').dataset.productId;
        if (card.classList.contains('cart-counter__button_minus')) {
          this.updateProductCount(productId, -1);
        }

        if (card.classList.contains('cart-counter__button_plus')) {
          this.updateProductCount(productId, 1);
        }
      }

    }

    const form = document.querySelector('.cart-form')
    form.addEventListener('submit', event => this.onSubmit(event))
  }
  onProductUpdate(cartItem) {

    this.cartIcon.update(this);
    if (document.querySelector('body').classList.contains('is-modal-open')) {
      for (let card of cartItem) {
        let productId = card.product.id

        let productCount = document.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = document.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = document.querySelector(`.cart-buttons__info-price`);

        productCount.innerHTML = card.count
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        productPrice.innerHTML = `€${(card.count * card.product.price).toFixed(2)}`;
      }

      if (cartItem.length === 0) {
        this.modal.close()
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();    
    let cartForm = document.querySelector('form');
    let formData = new FormData(cartForm);
    document.querySelector('.cart-form button').classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        let body = createElement(`<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `);
        this.modal.setTitle('Success!');
        this.modal.setBody(body);
        this.cartItems = [];
        this.cartIcon.update(this);
      } 
    })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

