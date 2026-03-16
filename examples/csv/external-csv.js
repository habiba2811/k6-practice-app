import { SharedArray } from 'k6/data'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

const userCrendentials = new SharedArray('Users with credentials', function () {
  return papaparse.parse(open('./users.csv'), {
    header: true,
  }).data
})
export default function () {
  userCrendentials.forEach((item) => console.log(item.username))
}
