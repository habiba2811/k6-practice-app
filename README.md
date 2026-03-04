# k6-practice-app

Simple k6 practice suite with common performance test patterns against:
- `https://quickpizza.grafana.com/`
- `http://localhost:3000/` (for `script.js`)

## Install
```bash
npm install
```

## Test Files
- `smoke-test.js`: quick validation (`1 VU`, `30s`)
- `load-test.js`: baseline traffic ramp (`10 VUs`)
- `stress-test.js`: higher sustained pressure (`100 VUs`)
- `spike-test.js`: sudden burst and drop (`100 VUs`)
- `soak-test.js`: long-duration stability (`1000 VUs`, `8h` hold)
- `breakpoint-test.js`: ramp toward high load (`1000 VUs`)
- `scenarios.js`: thresholds and custom metrics practice (`10 VUs`, `10s`)
- `script.js`: simple local check against `http://localhost:3000/`

## scenarios.js highlights
- Uses checks for status and response content.
- Tracks custom metrics:
  - `my_counter` (`Counter`)
  - `response_time_admin_page` (`Trend`)
- Includes threshold practice for request timing, failures, checks, VUs, and custom metrics.

## Run Tests
```bash
k6 run smoke-test.js
k6 run load-test.js
k6 run stress-test.js
k6 run spike-test.js
k6 run soak-test.js
k6 run breakpoint-test.js
k6 run scenarios.js
k6 run script.js
```
