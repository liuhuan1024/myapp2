/**
 * 本地存储封装模块
 */
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 因为data有可能不是JSON格式字符串，所以使用try-catch
  try {
    // 用JSON.parse将数据转为JSON对象
    return JSON.parse(data)
  } catch (error) {
    // 数据不是JSON格式字符串时，原样返回
    return data
  }
}

export const setItem = (name, value) => {
  // 如果值是对象，则转为JSON格式字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
