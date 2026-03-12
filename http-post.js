import http from 'k6/http'
import { check } from 'k6'
import faker from 'k6/x/faker'

export default function () {
  const credentials = {
    username: faker.internet.username(),
    password: faker.internet.password(),
  }

  const registerResponse = http.post(
    'http://localhost:8000/user/register/',
    JSON.stringify(credentials),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const loginResponse = http.post(
    'http://localhost:8000/auth/token/login/',
    JSON.stringify(credentials),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const token = loginResponse.json().access
  const authHeaders = {
    Authorization: `Bearer ${token}`,
  }
  const jsonAuthHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const listResponse = http.get('http://localhost:8000/my/crocodiles/', {
    headers: authHeaders,
  })

  const createResponse = http.post(
    'http://localhost:8000/my/crocodiles/',
    JSON.stringify({
      name: 'Nile crocodile',
      sex: 'M',
      date_of_birth: '2000-12-23',
    }),
    {
      headers: jsonAuthHeaders,
    },
  )
  const crocodileId = createResponse.json().id
  const getResponse = http.get(
    `http://localhost:8000/my/crocodiles/${crocodileId}/`,
    {
      headers: authHeaders,
    },
  )
  check(getResponse, {
    'status is 200': (r) => r.status === 200,
    [`id is ${crocodileId}`]: (r) => r.json().id === crocodileId,
  })

  const putResponse = http.put(
    `http://localhost:8000/my/crocodiles/${crocodileId}/`,
    JSON.stringify({
      name: 'Updated crocodile',
      sex: 'F',
      date_of_birth: '2000-12-23',
    }),
    {
      headers: jsonAuthHeaders,
    },
  )

  const patchResponse = http.patch(
    `http://localhost:8000/my/crocodiles/${crocodileId}/`,
    JSON.stringify({
      name: 'Updated crocodile NEW',
    }),
    {
      headers: jsonAuthHeaders,
    },
  )

  const deleteResponse = http.del(
    `http://localhost:8000/my/crocodiles/${crocodileId}/`,
    null,
    {
      headers: authHeaders,
    },
  )
}
