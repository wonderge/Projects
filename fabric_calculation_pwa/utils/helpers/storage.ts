export const getFromStorage = (key: string) => {
  let data = undefined;
  if (typeof window !== 'undefined') {
    data = window.localStorage.getItem(key);
  }
  return data;
}


export const setToStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value)
  }
}