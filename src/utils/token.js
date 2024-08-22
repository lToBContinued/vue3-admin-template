// 封装本地存储和读取数据方法
export const SET_TOKEN = (token) => {
  localStorage.setItem('token', token)
}
export const GET_TOKEN = () => {
  return localStorage.getItem('token')
}
// 本地存储删除数据
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('token')
}
