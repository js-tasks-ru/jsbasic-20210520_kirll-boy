export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    console.log(this.cartItems)
    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1)
      console.log(this.cartItems)
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
      console.log(price)
    }
    return price
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}