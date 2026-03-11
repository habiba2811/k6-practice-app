# k6 Practice App

Small practice repo for learning `k6` through smoke, load, stress, spike, soak, tagging, grouping, lifecycle, and local API examples.

## What This Repo Covers

- Common performance test shapes: smoke, load, stress, spike, soak, breakpoint
- Checks and thresholds
- Custom metrics and tags
- Grouped requests and group-level thresholds
- `setup()` / `teardown()` lifecycle flow
- Local API testing with `GET` and `POST`

## Test Targets

- `https://quickpizza.grafana.com/`
- generated `mockbin.io` endpoints
- `http://localhost:3000/` for [`script.js`](/e:/k6-practice/k6-practice-app/script.js)
- `http://localhost:8000/` for [`http-get.js`](/e:/k6-practice/k6-practice-app/http-get.js) and [`http-post.js`](/e:/k6-practice/k6-practice-app/http-post.js)

## Script Guide

- [`smoke-test.js`](/e:/k6-practice/k6-practice-app/smoke-test.js): 1 VU for 30 seconds against QuickPizza
- [`load-test.js`](/e:/k6-practice/k6-practice-app/load-test.js): ramp up to 10 VUs, hold, then ramp down
- [`stress-test.js`](/e:/k6-practice/k6-practice-app/stress-test.js): ramp up to 100 VUs to push the target harder
- [`spike-test.js`](/e:/k6-practice/k6-practice-app/spike-test.js): sudden jump to 100 VUs, then back down
- [`soak-test.js`](/e:/k6-practice/k6-practice-app/soak-test.js): long-duration run at 1000 VUs
- [`breakpoint-test.js`](/e:/k6-practice/k6-practice-app/breakpoint-test.js): climbs to 1000 VUs to probe system limits
- [`scenarios.js`](/e:/k6-practice/k6-practice-app/scenarios.js): checks, thresholds, counters, trends, and execution context
- [`system-tags.js`](/e:/k6-practice/k6-practice-app/system-tags.js): thresholds filtered by built-in system tags
- [`custom-tags.js`](/e:/k6-practice/k6-practice-app/custom-tags.js): custom tags plus a tagged custom error counter
- [`groups.js`](/e:/k6-practice/k6-practice-app/groups.js): nested groups and group-specific thresholds
- [`lifecycle.js`](/e:/k6-practice/k6-practice-app/lifecycle.js): `init`, `setup`, VU, and `teardown` stages
- [`abort.js`](/e:/k6-practice/k6-practice-app/abort.js): aborting a test from `setup()` when a dependency is unavailable
- [`script.js`](/e:/k6-practice/k6-practice-app/script.js): simple local health-style check for `http://localhost:3000/`
- [`http-get.js`](/e:/k6-practice/k6-practice-app/http-get.js): local API `GET` flow with checks on returned crocodile data
- [`http-post.js`](/e:/k6-practice/k6-practice-app/http-post.js): local API registration and login flow using generated credentials
