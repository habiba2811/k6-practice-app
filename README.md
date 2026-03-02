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
- `soak-test.js`: long-duration stability (`1000 VUs`, `8h`)
- `breakpoint-test.js`: push toward failure point (`1000 VUs`)
- `script.js`: simple local check against `http://localhost:3000/`

## Run Tests
```bash
k6 run smoke-test.js
k6 run load-test.js
k6 run stress-test.js
k6 run spike-test.js
k6 run soak-test.js
k6 run breakpoint-test.js
k6 run script.js
```
