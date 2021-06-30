import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement('div')
    this.elem.classList.add('modal')
    this.open()
    this.model()
    this.buttonClose()
    this.closeWithEscape()
  }

  model() {
    this.elem.insertAdjacentHTML('beforeend', `
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
    
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>`)
  }

  open() {
    const body = document.querySelector('body')
    body.classList.add('is-modal-open')
    body.append(this.elem)
  }

  setTitle(titleText) {
    const title = this.elem.querySelector('.modal__title')
    title.innerHTML = titleText
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = ''
    console.log(node)
    modalBody.append(node)
  }

  close() {
    this.elem.remove()
    document.body.classList.remove('is-modal-open')
  }

  buttonClose() {
    const button = document.querySelector('.modal__close')
    button.onclick = () => {
      this.close()
    }
  }

  closeWithEscape() {
    document.onkeydown = (event) => {
      if (event.code === 'Escape') {
        this.close()
      }
    }
  }
}