---
name: Cloud Run functions (Cloud Functions)
district: compute
threat: 2
threat_source: trainer sheet
lives_at: regional
---

## Baseline
What it is: Single-purpose functions that run on an event. You write only the function; Google builds it and runs it on Cloud Run. (Formerly Cloud Functions.)
- Triggers: HTTP (synchronous), or events from Cloud Storage, Pub/Sub and others through Eventarc (asynchronous).
- Billed only while running; scales to zero. Integrated with Cloud Logging and Monitoring.
- Limits to design around: one function, one trigger. HTTP functions can run up to 60 minutes, event-driven ones up to 9.
- Events are delivered at least once, so the same event can arrive twice: make event handlers idempotent.
- Reaches private resources in a VPC the same way Cloud Run does (Direct VPC egress or a connector).
Like what I know: AWS Lambda.

## Isolate
Pick it when: Small event-driven glue code: resize an image when it lands in a bucket, react to a Pub/Sub message, connect Cloud services.
Not it when (use Cloud Run instead): It's a full app or service with many routes, a custom container, or more than one job.

## Execute
What I built:

## Missed
