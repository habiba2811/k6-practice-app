import http from 'k6/http'
import { sleep } from 'k6'
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'

export const options = {
  vus: 5,
  duration: '20s',
}

export default function () {
  http.get('https://quickpizza.grafana.com/')
  console.log(' VU STAGE')
  sleep(randomIntBetween(1, 5))
}
