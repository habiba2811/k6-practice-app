import http from 'k6/http'
import {check} from 'k6'
import {sleep} from 'k6'
import { Counter,Trend } from 'k6/metrics'
import exec from 'k6/execution'

export const options ={
    vus:10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<300'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate<0.01'],
        http_reqs:['count>20'],
        http_reqs:['rate>4'],
        vus: ['value>9'],
        checks: ['rate>=0.98'],
        my_counter: ['count>20'],
        response_time_admin_page: ['p(95)<300']

    }
}
let myCounter = new Counter('my_counter')
let adminPageResponseTrend=  new Trend('response_time_admin_page')

export default function () {
    let res= http.get('https://quickpizza.grafana.com/' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''))
    myCounter.add(1)
    check(res, {
        'status is 200': (r)=> r.status === 200,
        'page is startpage': (r)=> r.body.includes('QuickPizza') 
    })
    sleep(1)
    res = http.get('https://quickpizza.grafana.com/admin')
    adminPageResponseTrend.add(res.timings.duration)
    sleep(1)

}
