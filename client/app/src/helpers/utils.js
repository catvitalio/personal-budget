export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}

export const nowDate = () => {
  return new Date(Date.now()).toISOString().substring(0, 10)
}

export const getRandomColor = data => {
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  return data.map(() => {
    var h = randomInt(0, 360)
    var s = randomInt(42, 98)
    var l = 60
    return `hsl(${h},${s}%,${l}%)`
  })
}
