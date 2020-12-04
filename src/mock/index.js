import Mock from 'mockjs'
import { getUserLogin, getUserInfo } from './user'

// const data = Mock.mock(/\/login/, 'get', getUserLogin)

// export default data

export const data = () => {
  return Mock.mock(/\/login/, 'get', getUserLogin)
}

export const userinfo = () => {
  return Mock.mock(/\/my/, 'get', getUserInfo)
}
