import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  vus: 2,
  duration: '5s',
}

console.log(' Init stage ')

export default function () {
  console.log(' VU stage ')
  console.log(data)
  sleep(1)
}

export function setup() {
  console.log(' Setup stage ')
  sleep(10)
  const data = { foo: 'bar' }
  return data
}

export function teardown() {
  console.log(' Teardown stage ')
}
