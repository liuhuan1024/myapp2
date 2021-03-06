import axios from 'axios'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      return data
    }
  }]
})
export default request
