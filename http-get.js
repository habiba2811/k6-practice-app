import http from 'k6/http'
import { check } from 'k6'

export default function () {
  let res = http.get('http://localhost:8000/public/crocodiles/')
  const crocodiles = res.json()
  const crocadileId = crocodiles[6].id
  const crocadileName = crocodiles[6].name

  res = http.get(`http://localhost:8000/public/crocodiles/${crocadileId}`)
  console.log(res.headers['Content-Type'])

  check(res, {
    'status is 200': (r) => r.status === 200,
    'Crocodile is Sobek': (r) => r.json().name === crocadileName,
  })
}
