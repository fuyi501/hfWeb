import request from '@/plugin/axios'

export function img1Upload (url, data) {
  return request({
    url,
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    data
  })
}
