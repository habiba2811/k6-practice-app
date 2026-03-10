import http from 'k6/http'

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    'http_req_duration{status:200}': ['p(95)<1000'],
  },
}

export default function () {
  http.get('https://d635dcb97886438d9d045cc616c9cb55.api.mockbin.io/')
  http.get('https://4e9265740fb04ea08f72bfe4311bd757.api.mockbin.io/')
}
