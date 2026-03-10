import http from 'k6/http'
import { sleep, check } from 'k6'
import { Counter } from 'k6/metrics'
export const options = {
  thresholds: {
    http_req_duration: ['p(95)<300'],
    'http_req_duration{page:order}': ['p(95)<200'],
    http_errors: ['count==0'],
    'http_errors{page:order}': ['count==0'],
    checks: ['rate>=0.99'],
    'checks{page:order}': ['rate>=0.99'],
  },
}

let httpErrors = new Counter('http_errors')

export default function () {
  let res = http.get(
    'https://d635dcb97886438d9d045cc616c9cb55.api.mockbin.io/',
    {
      tags: {
        page: 'order',
      },
    },
  )

  if (res.error) {
    httpErrors.add(1, { page: 'order' })
  }

  check(res, {
    'status is 200': (r) => r.status === 200,
  })

  res = http.get('https://4e9265740fb04ea08f72bfe4311bd757.api.mockbin.io/')

  if (res.error) {
    httpErrors.add(1)
  }

  check(res, { 'status is 200': (r) => r.status === 201 }, { page: 'order' })

  sleep(1)
}
