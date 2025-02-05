enum nameStorage {
  chatId = 'chatId',
}

export const getStorage = (key: keyof typeof nameStorage) => {
  return window.sessionStorage.getItem(key)
}

export const setStorage = (key: keyof typeof nameStorage, value: string) => {
  window.sessionStorage.setItem(key, value)
}
