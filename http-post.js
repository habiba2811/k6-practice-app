import http from 'k6/http'
import { check } from 'k6'
import faker from 'k6/x/faker'

export default function () {
  const credentials = {
    username: faker.internet.username(),
    password: faker.internet.password(),
  }

  http.post(
    'http://localhost:8000/user/register/',
    JSON.stringify(credentials),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const res = http.post(
    'http://localhost:8000/auth/token/login/',
    JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const token = res.json().access
  console.log(`token is ${token}`)
}
