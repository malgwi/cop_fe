const TOKEN_KEY = 'auth._token.local'
const isArrayOrObject = (val) =>
  Array.isArray(val) || val.constructor.name.toLowerCase() === 'object'

const store = (key, value) => {
  const _value = isArrayOrObject(value) ? JSON.stringify(value) : value
  localStorage.setItem(key, _value)
  // sessionStorage.setItem(key, _value)
}

const retrieve = (key) => {
  const value = localStorage.getItem(key)
  // const value = sessionStorage.getItem(key)
  if (value) {
    return isArrayOrObject(value) ? JSON.parse(value) : value
  }
  return value
}
const flush = () => {
  sessionStorage.clear()
}
const flushItem = (key) => {
  sessionStorage.removeItem(key)
}

export { store, retrieve, flush, flushItem, TOKEN_KEY} //TOKEN_KEY 
