export const checkMustParams = <T>(obj: T, keys: (keyof T)[]): string => {
  let errorMsg = ''
  const len = keys.length
  for (let i = 0; i < len; i++) {
    if (!(keys[i] in obj)) {
      errorMsg = `参数${keys[i]}不存在`
      break
    }
  }
  return errorMsg
}