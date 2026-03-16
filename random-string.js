import http from 'k6/http'
import { sleep } from 'k6'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'

export const options = {
  vus: 5,
  duration: '5s',
}

const credentials = {
  username: `test_${randomString(8)}`,
  password: randomString(8),
}

export default function () {
  http.post(
    'http://localhost:8000/user/register/',
    JSON.stringify(credentials),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  console.log(credentials)
}
