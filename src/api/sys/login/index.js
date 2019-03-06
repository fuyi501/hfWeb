import request from '@/plugin/axios'

export function AccountLogin (data) {
  console.log('accountLogin')
  return request({
    // url: '/login',
    url: 'http://192.168.2.254:8360/login/login',
    method: 'post',
    data
  })
}
