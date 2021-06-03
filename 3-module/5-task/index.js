function getMinMax(str) {
  let result = str.match(/(-?\d+(\.\d+)?)/g).map(i => +i)
  return result = {
    min: Math.min.apply(null, result),
    max: Math.max.apply(null, result),
  }
}
