# k6 Practice App

Practice repository for learning `k6` with small, focused scripts that cover common load-testing patterns, checks, thresholds, tags, groups, lifecycle hooks, and local API flows.

## What This Repo Covers

- Smoke, load, stress, spike, soak, and breakpoint-style tests
- Checks and thresholds
- Custom metrics and tags
- Grouped requests and group-specific thresholds
- `setup()` and `teardown()` lifecycle flow
- Local API testing with `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`

## Script Guide

- [`smoke-test.js`](/e:/k6-practice/k6-practice-app/smoke-test.js): 1 VU for 30 seconds against QuickPizza
- [`load-test.js`](/e:/k6-practice/k6-practice-app/load-test.js): ramps to 10 VUs, holds, then ramps down
- [`stress-test.js`](/e:/k6-practice/k6-practice-app/stress-test.js): pushes the target harder with a larger ramp
- [`spike-test.js`](/e:/k6-practice/k6-practice-app/spike-test.js): sudden jump in load, then recovery
- [`soak-test.js`](/e:/k6-practice/k6-practice-app/soak-test.js): long-duration high-concurrency run
- [`breakpoint-test.js`](/e:/k6-practice/k6-practice-app/breakpoint-test.js): keeps scaling to probe system limits
- [`scenarios.js`](/e:/k6-practice/k6-practice-app/scenarios.js): checks, thresholds, counters, trends, and execution context
- [`system-tags.js`](/e:/k6-practice/k6-practice-app/system-tags.js): thresholds filtered with built-in system tags
- [`custom-tags.js`](/e:/k6-practice/k6-practice-app/custom-tags.js): custom tags plus a tagged custom error counter
- [`groups.js`](/e:/k6-practice/k6-practice-app/groups.js): nested groups and group-specific thresholds
- [`lifecycle.js`](/e:/k6-practice/k6-practice-app/lifecycle.js): `init`, `setup`, VU, and `teardown` stages
- [`abort.js`](/e:/k6-practice/k6-practice-app/abort.js): aborting a test from `setup()` when a dependency is unavailable
- [`script.js`](/e:/k6-practice/k6-practice-app/script.js): basic local health-style check for `http://localhost:3000/`
- [`http-get.js`](/e:/k6-practice/k6-practice-app/http-get.js): reads public crocodile data from the local API and validates the response
- [`http-post.js`](/e:/k6-practice/k6-practice-app/http-post.js): registers a user, logs in, then exercises authenticated CRUD operations against `/my/crocodiles/`

## Targets Used

- `https://quickpizza.grafana.com/`
- generated `mockbin.io` endpoints in some example scripts
- `http://localhost:3000/`
- `http://localhost:8000/`
