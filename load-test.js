import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages:[
        {
            duration:'5s',
            target:10
        },
        {
            duration:'30s',
            target:10
        },
        {
            duration:'5s',
            target:0
        }
    ],
}

export default function () {
    http.get('https://quickpizza.grafana.com/');
    sleep(1)
    http.get('https://quickpizza.grafana.com/admin')
    sleep(2)
    http.get('https://quickpizza.grafana.com/');
    sleep(2)

}