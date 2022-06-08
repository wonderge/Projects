export const isNum = (value: any): boolean => {
  return typeof(value) === 'number'
}

export const isEnum = (value: any, enumClass: any): boolean => {
  for (let item in enumClass) {
    if (value === item) {
      return true
    }
  }

  return false
}