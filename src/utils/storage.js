// 方便项目中使用本地存储
// eslint-disable-next-line no-unused-expressions
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try { return JSON.parse(res) } catch (err) {
    return res
  }
}

// eslint-disable-next-line no-unused-expressions
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
export function removeIte (key) {
  window.localStorage.removeItem(key)
}

export function clearItem () {
  window.localStorage.clearItem()
}
