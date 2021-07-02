export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div')
    this.elem.classList.add('slider')
    this.elem.addEventListener('click', ev => this.onClick(event, steps))
    this.elem.addEventListener('pointerdown', ev => this.onClick(event, steps))

  
    this.render(value, steps)
    this.steps(steps, value)
  }

  render(value, steps) {
    let segments = steps - 1
    let valuePercents = value / segments * 100
    this.elem.insertAdjacentHTML('beforeend', ` 
    <div class="slider__thumb" style="left: ${valuePercents}%">
    <span class="slider__value">${value}</span>
    </div> 
    <div class="slider__progress" style=width:${valuePercents}%></div>`)
  }


  steps(steps, value) {
    let i = 0
    const slideSteps = document.createElement('div')
    slideSteps.classList.add('slider__steps')
    while (i < steps) {
      slideSteps.insertAdjacentHTML('beforeend', `<span></span>`)
      i++
    }
    slideSteps.childNodes[value].classList.add('slider__step-active')
    this.elem.append(slideSteps)
  }

  onClick(event, steps) {
    let left = event.clientX - this.elem.getBoundingClientRect().left
    let leftRelative = left / this.elem.offsetWidth
    let segments = steps - 1
    let approximateValue = leftRelative * segments
    let value = Math.round(approximateValue)
    let valuePercents = value / segments * 100

    const thumb = document.querySelector('.slider__thumb')
    const progress = document.querySelector('.slider__progress')
    const sliderValue = document.querySelector('.slider__value')
    let sliderSteps = document.querySelector('.slider__steps')

    sliderSteps = sliderSteps.querySelectorAll('span');

    for (let elem of sliderSteps) {
      elem.classList.remove("slider__step-active");
    }
    sliderSteps[value].classList.add("slider__step-active");

    sliderValue.textContent = `${value}`
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    }));

    function moveThumb(mouseEvent) {
      let slider = document.querySelector('.slider')
      slider.classList.add('slider_dragging')
      const sliderValue = document.querySelector('.slider__value')
      let left = mouseEvent.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;
      let segments = steps - 1
      let approximateValue = leftRelative * segments
      let value = Math.round(approximateValue)
      let valuePercents = value / segments * 100
      let sliderSteps = document.querySelector('.slider__steps')

      sliderSteps = sliderSteps.querySelectorAll('span');

      for (let elem of sliderSteps) {
        elem.classList.remove("slider__step-active");
      }
      sliderSteps[value].classList.add("slider__step-active");


      if (value <= segments && value >= 0) {
        sliderValue.textContent = `${value}`
      }

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;

      let thumb = slider.querySelector('.slider__thumb');
      let progress = slider.querySelector('.slider__progress');


      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    }

    function onMouseUp(mouseEvent) {
      document.removeEventListener('pointermove', moveThumb)
      let slider = document.querySelector('.slider')
      slider.classList.remove('slider_dragging')
      const sliderValue = document.querySelector('.slider__value')
      let left = mouseEvent.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;
      let segments = steps - 1
      let approximateValue = leftRelative * segments

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }
      let value = Math.round(approximateValue)
      let valuePercents = value / segments * 100
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      }));

      document.removeEventListener('pointerup', onMouseUp)

    }
    document.addEventListener('pointermove', moveThumb)
    document.addEventListener('pointerup', onMouseUp)
  }

}


