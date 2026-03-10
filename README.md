# k6-practice-app

Practice repo for learning `k6` with common load-testing patterns, thresholds, checks, and metric tagging.

## Targets

- `https://quickpizza.grafana.com/`
- `https://mockbin.io/` via generated mock endpoints
- `http://localhost:3000/` for `script.js`

## Run Tests

```bash
k6 run smoke-test.js
k6 run load-test.js
k6 run stress-test.js
k6 run spike-test.js
k6 run soak-test.js
k6 run breakpoint-test.js
k6 run scenarios.js
k6 run system-tags.js
k6 run custom-tags.js
k6 run script.js
```

## Test Files

- `smoke-test.js`: simple smoke test with `1` virtual user for `30s`
- `load-test.js`: baseline load test with ramp-up, hold, and ramp-down
- `stress-test.js`: higher traffic level to observe behavior under pressure
- `spike-test.js`: sudden traffic increase followed by a drop
- `soak-test.js`: long-running test for stability over time
- `breakpoint-test.js`: ramps toward a high target to explore capacity limits
- `scenarios.js`: thresholds, checks, counters, trends, and execution context practice
- `system-tags.js`: system-tag threshold example 
- `custom-tags.js`: custom tag example and tagged error metrics
- `script.js`: basic local endpoint check

## Metrics Practice

`scenarios.js` includes:

- checks for response status and response content
- a custom `Counter` and `Trend` metrices
- threshold examples for duration, failure rate, request count, VUs, checks, and custom metrics

`system-tags.js` demonstrates:

- threshold filtering with built-in system tags

`custom-tags.js` demonstrates:

- attaching custom tags to requests
- filtering thresholds by custom tag values
- recording a tagged custom error counter

