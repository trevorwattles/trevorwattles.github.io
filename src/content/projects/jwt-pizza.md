---
# Facts traced to Trevor's commits in ~/Downloads/cs329 (jwt-pizza, jwt-pizza-service),
# the CI workflow files, the incident report, and the pen-test report.
# The React frontend and Express service started as course code; only Trevor's work is described.
title: JWT Pizza
order: 2
oneLiner: The testing and DevOps side of a pizza-ordering web app, with automated tests, CI/CD pipelines that deploy to AWS, and live monitoring with alerts.
role: Testing, CI/CD, and AWS deployment
dates: Sep – Dec 2025
context: BYU CS 329, QA & DevOps
stack:
  - Playwright
  - Jest
  - GitHub Actions
  - Docker
  - AWS (S3, CloudFront, ECR, ECS)
  - Grafana Cloud
  - k6
  - Node.js
  - MySQL
visibility: public
links:
  repo: https://github.com/trevorwattles/jwt-pizza-service
media:
  - type: image
    src: grafana-logging.png
    alt: Grafana Cloud logging dashboard for jwt-pizza-service, showing recent structured log events with auth headers redacted, a count of 72 exceptions, a pie chart of HTTP status codes, and factory request volume over six hours.
    caption: Grafana Cloud logging dashboard for the pizza service
  - type: image
    src: k6-load-test.png
    alt: k6 Cloud load test results showing 742 requests with no HTTP failures, a peak of 10.33 requests per second, a 150 ms 95th-percentile response time, and per-endpoint timings for login, ordering, and menu requests.
    caption: k6 load test of login and ordering, 742 requests
  - type: image
    src: github-actions-run.png
    alt: GitHub Actions run summary for the jwt-pizza-service CI pipeline, triggered by a push to main, showing a successful Build job (36 seconds) followed by a successful Deploy job (1 minute 11 seconds).
    caption: CI pipeline run, build then deploy to AWS
draft: false
---

#### What I built

- Wrote 48 Playwright end-to-end tests for the frontend and Jest tests for the Express API, added user update, list and delete features test-first, and published coverage badges from CI.
- Built GitHub Actions pipelines for both repos. Every push lints, tests and checks coverage. Then the frontend deploys to S3 behind CloudFront, and the backend ships as an ARM64 Docker image to ECR and ECS. The pipelines sign in to AWS with OIDC, so no access keys are stored.
- Added Grafana Cloud metrics and logging to the service, covering requests by method, latency, auth successes and failures, pizzas sold, revenue, CPU and memory, with an alert on spikes in 5xx errors.
- Load-tested login and ordering with k6, ran a chaos exercise and wrote the incident report, and pen-tested my deployment with a classmate.

#### The hard part

The security test found two holes that together gave admin access. Any logged-in diner could call `GET /api/user` and get every user's email and role, which showed who the admins were. And the password check only ran in the browser: deleting the password field from the login form let me sign in as an admin with just an email address. I added a role check so non-admins get a 403, removed a duplicate `/api/user` route that was overriding the real handler, moved password verification to the server, and hid admin links from other roles. Then I confirmed the fix with `curl` as a diner and as an admin.
