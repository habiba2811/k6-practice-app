# k6 Practice App

`k6` scripts for public endpoint testing and local API performance testing. It covers request validation, authenticated API flows, custom metrics, thresholds, grouped scenarios, lifecycle hooks, randomized test data, and external datasets.

## Project Coverage

- Baseline HTTP scripts for simple `GET` and `POST` testing
- End-to-end authenticated API flows for register, login, list, create, read, update, and delete operations
- Common performance test patterns: smoke, load, stress, spike, soak, and breakpoint tests
- Utility scripts for randomized input, randomized think time, and random entity selection
- Example data-driven tests using CSV and JSON files
- k6 scripts with checks, thresholds, tags, counters, trends, and failure logging
- Writing reusable `k6` test scripts for API validation and performance testing
- Testing authenticated REST APIs with dynamic test data
- Simulating realistic user behavior with random credentials and variable delays
- Organizing tests by purpose: basic requests, scenarios, lifecycle behavior, and load profiles
- Working with external datasets through `SharedArray`
- Measuring quality with checks, response-time thresholds, and tagged requests

## Repository Highlights

- [http-post.js](/e:/k6-practice/k6-practice-app/http-post.js): authenticated CRUD flow using generated credentials
- [k6-test-api.js](/e:/k6-practice/k6-practice-app/k6-test-api.js): more complete staged API test with thresholds, tags, random waits, and failure reporting
- [smoke-test.js](/e:/k6-practice/k6-practice-app/smoke-test.js), [load-test.js](/e:/k6-practice/k6-practice-app/load-test.js), [stress-test.js](/e:/k6-practice/k6-practice-app/stress-test.js), [spike-test.js](/e:/k6-practice/k6-practice-app/spike-test.js), [soak-test.js](/e:/k6-practice/k6-practice-app/soak-test.js), [breakpoint-test.js](/e:/k6-practice/k6-practice-app/breakpoint-test.js): different load profiles
- [scenarios.js](/e:/k6-practice/k6-practice-app/scenarios.js), [groups.js](/e:/k6-practice/k6-practice-app/groups.js), [lifecycle.js](/e:/k6-practice/k6-practice-app/lifecycle.js), [custom-tags.js](/e:/k6-practice/k6-practice-app/custom-tags.js), [system-tags.js](/e:/k6-practice/k6-practice-app/system-tags.js), [abort.js](/e:/k6-practice/k6-practice-app/abort.js): advanced k6 features
- [random-item.js](/e:/k6-practice/k6-practice-app/random-item.js), [random-sleep.js](/e:/k6-practice/k6-practice-app/random-sleep.js), [random-string.js](/e:/k6-practice/k6-practice-app/random-string.js): helper-focused practice scripts
- [examples/csv/external-csv.js](/e:/k6-practice/k6-practice-app/examples/csv/external-csv.js) and [external-json.js](/e:/k6-practice/k6-practice-app/external-json.js): data-driven testing from external files

## Running the Project

Examples:

```bash
k6 run script.js
k6 run http-get.js
k6 run http-post.js
k6 run k6-test-api.js
k6 run smoke-test.js
```
