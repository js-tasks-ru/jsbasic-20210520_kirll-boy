function initCarousel() {
  const rightArrow = document.querySelector('.carousel__arrow_right')
  const leftArrow = document.querySelector('.carousel__arrow_left')
  const carousel = document.querySelector('.carousel__inner')
  leftArrow.style.display = 'none'
  
  let i = 0

  rightArrow.addEventListener('click', () => {
    i++
    carousel.style.transform = `translateX(${-i * 500}px)`

    if (i == 3) {
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

    if (i !== 3) {
      rightArrow.style.display = 'flex'
    }
  })
}
