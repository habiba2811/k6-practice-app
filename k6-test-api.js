import http from 'k6/http'
import { sleep, check } from 'k6'
import {
  randomIntBetween,
  randomString,
} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'

const baseUrl = 'http://localhost:8000'

export const options = {
  stages: [
    {
      duration: '10s',
      target: 10,
    },
    {
      duration: '60s',
      target: 10,
    },
    {
      duration: '10s',
      target: 0,
    },
  ],
  thresholds: {
    http_req_duration: ['p(90)<1250', 'p(95)<1300'],
    checks: ['rate>=0.1'],
  },
  gracefulRampDown: '0s',
  gracefulStop: '5s',
}

function parseJson(response) {
  try {
    return response.json()
  } catch (_) {
    return null
  }
}

function responseSummary(response) {
  const body = response.body || ''
  const trimmedBody = body.length > 200 ? `${body.slice(0, 200)}...` : body

  return `status=${response.status} body=${trimmedBody}`
}

function logFailure(step, response) {
  console.error(`${step} failed: ${responseSummary(response)}`)
}

export default function () {
  const credentials = {
    username: `user_${randomString(10)}`,
    password: `pass_${randomString(14)}`,
  }

  let res = http.post(
    `${baseUrl}/user/register/`,
    JSON.stringify(credentials),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: { name: 'registerUserURL' },
    },
  )
  const registerBody = parseJson(res)

  const registerOk = check(res, {
    'register status is 201': (r) => r.status === 201,
    'registered username matches': () =>
      registerBody !== null && registerBody.username === credentials.username,
  })

  if (!registerOk) {
    logFailure('register', res)
    return
  }

  sleep(randomIntBetween(0, 5))

  res = http.post(`${baseUrl}/auth/token/login/`, JSON.stringify(credentials), {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: { name: 'loginUserURL' },
  })
  const loginBody = parseJson(res)
  const accessToken = loginBody?.access
  const authHeaders = {
    Authorization: `Bearer ${accessToken}`,
  }
  const jsonAuthHeaders = {
    ...authHeaders,
    'Content-Type': 'application/json',
  }

  const loginOk = check(res, {
    'login status is 200': (r) => r.status === 200,
    'login has token': () =>
      typeof accessToken === 'string' && accessToken.length > 0,
  })

  if (!loginOk) {
    logFailure('login', res)
    return
  }

  sleep(randomIntBetween(0, 5))

  res = http.get(`${baseUrl}/my/crocodiles/`, {
    headers: authHeaders,
    tags: { name: 'listCrocodilesURL' },
  })
  const listBody = parseJson(res)

  const listOk = check(res, {
    'list status is 200': (r) => r.status === 200,
    'list is an array': () => Array.isArray(listBody),
  })

  if (!listOk) {
    logFailure('list', res)
    return
  }

  sleep(randomIntBetween(0, 5))

  res = http.post(
    `${baseUrl}/my/crocodiles/`,
    JSON.stringify({
      name: 'Random croc',
      sex: 'M',
      date_of_birth: '1900-10-28',
    }),
    {
      headers: jsonAuthHeaders,
      tags: { name: 'createCrocodileURL' },
    },
  )
  const createBody = parseJson(res)
  const newCrocodileId = createBody?.id

  const createOk = check(res, {
    'create status is 201': (r) => r.status === 201,
    'created crocodile has id': () => Number.isInteger(newCrocodileId),
  })

  if (!createOk) {
    logFailure('create', res)
    return
  }

  sleep(randomIntBetween(0, 5))

  res = http.get(`${baseUrl}/my/crocodiles/${newCrocodileId}/`, {
    headers: authHeaders,
    tags: { name: 'getCrocodileURL' },
  })
  const getBody = parseJson(res)

  const getOk = check(res, {
    'get status is 200': (r) => r.status === 200,
    'crocodile id matches': () =>
      getBody !== null && getBody.id === newCrocodileId,
  })

  if (!getOk) {
    logFailure('get', res)
    return
  }

  sleep(randomIntBetween(0, 5))

  res = http.put(
    `${baseUrl}/my/crocodiles/${newCrocodileId}/`,
    JSON.stringify({
      name: 'Updated Random croc',
      sex: 'M',
      date_of_birth: '1900-10-28',
    }),
    {
      headers: jsonAuthHeaders,
      tags: { name: 'updateCrocodilePutURL' },
    },
  )
  const putBody = parseJson(res)

  const putOk = check(res, {
    'put status is 200': (r) => r.status === 200,
    'crocodile name updated': () =>
      putBody !== null && putBody.name === 'Updated Random croc',
  })

  if (!putOk) {
    logFailure('put', res)
    return
  }

  sleep(randomIntBetween(0, 5))

  res = http.patch(
    `${baseUrl}/my/crocodiles/${newCrocodileId}/`,
    JSON.stringify({
      sex: 'F',
    }),
    {
      headers: jsonAuthHeaders,
      tags: { name: 'updateCrocodilePatchURL' },
    },
  )
  const patchBody = parseJson(res)

  const patchOk = check(res, {
    'patch status is 200': (r) => r.status === 200,
    'crocodile sex updated': () => patchBody !== null && patchBody.sex === 'F',
  })

  if (!patchOk) {
    logFailure('patch', res)
    return
  }

  sleep(randomIntBetween(0, 5))

  res = http.del(`${baseUrl}/my/crocodiles/${newCrocodileId}/`, null, {
    headers: authHeaders,
    tags: { name: 'deleteCrocodileURL' },
  })

  const deleteOk = check(res, {
    'delete status is 204': (r) => r.status === 204,
  })

  if (!deleteOk) {
    logFailure('delete', res)
  }

  sleep(randomIntBetween(0, 5))
}
