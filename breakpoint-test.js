import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages:[
        {
            duration:'2m',
            target:1000
        },

    ],
}

export default function () {
    http.get('https://quickpizza.grafana.com/');
    sleep(1)

}