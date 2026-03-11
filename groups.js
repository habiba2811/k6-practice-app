import http from 'k6/http'
import { group, check, sleep } from 'k6'

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<250'],
    'group_duration{group:::Main page}': ['p(95)<8000'],
    'group_duration{group:::Main page::Assets}': ['p(95)<3000'],
    'group_duration{group:::Login page}': ['p(95)<6000'],
    'http_req_duration{expected_response:true}': ['p(95)<1000'],
  },
}

export default function () {
  group('Main page', function () {
    const res = http.get('https://deelay.me/5000/https://api.example.com/data')
    check(res, { 'status is 200': (r) => r.status === 200 })

    group('Assets', function () {
      http.get('https://deelay.me/1000/https://api.example.com/data')
      http.get('https://deelay.me/1000/https://api.example.com/data')
    })
  })

  group('Login page', function () {
    http.get('https://deelay.me/5000/https://api.example.com/data')
    // http.get('https://b36bf4a706d6461b9ccd9250a8d56d20.api.mockbin.io/') // -> to smuilate 503 api error
  })

  sleep(1)
}
