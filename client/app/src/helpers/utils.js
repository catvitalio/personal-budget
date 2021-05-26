export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}

export const nowDate = () => {
  return new Date(Date.now()).toISOString().substring(0, 10)
}
