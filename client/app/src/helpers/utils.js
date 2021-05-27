export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}

export const nowDate = () => {
  return new Date(Date.now()).toISOString().substring(0, 10)
}

export const getColors = data => {
  var colors = [
    '#3366cc',
    '#dc3912',
    '#ff9900',
    '#109618',
    '#990099',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395',
    '#3366cc',
    '#994499',
    '#22aa99',
    '#aaaa11',
    '#6633cc',
    '#e67300',
    '#8b0707',
    '#651067',
    '#329262',
    '#5574a6',
    '#3b3eac',
    '#b77322',
    '#16d620',
    '#b91383',
    '#f4359e',
    '#9c5935',
    '#a9c413',
    '#2a778d',
    '#668d1c',
    '#bea413',
    '#0c5922',
    '#743411'
  ]
  return data.map((element, index) => {
    if (typeof colors[index] != undefined) return colors[index]
    else return '#' + Math.floor(Math.random() * 16777215).toString(16)
  })
}
