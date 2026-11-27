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
- It is a Cloud Run service underneath: it's listed under Cloud Run, IAM sees it as `run.googleapis.com/Service`, and the console path is Cloud Run > Write a function.
- Deploy: `gcloud functions deploy NAME --gen2 --runtime --region --source --entry-point` plus one trigger flag: `--trigger-http`, `--trigger-topic` or `--trigger-bucket`. The entry point must match the name registered in the code. A redeploy keeps the existing trigger.
- A Storage trigger needs the bucket and the function in the same region, plus the Eventarc roles. See `delivery-eventarc`.
- A function that writes into the bucket that triggers it fires itself again. Guard against it in code (the thumbnail function skips files already named as thumbnails).
Like what I know: AWS Lambda.

## Isolate
Pick it when: Small event-driven glue code: resize an image when it lands in a bucket, react to a Pub/Sub message, connect Cloud services.
Not it when (use Cloud Run instead): It's a full app or service with many routes, a custom container, or more than one job.

## Execute
What I built: Badge lab, 2026-11-27. `memories-thumbnail-maker`: 2nd gen, Node.js 22, us-east4, triggered by object creation in the photo bucket. It downloads the image, resizes it to 64x64 with sharp, saves it back and publishes the new file name to a Pub/Sub topic. The first two deploys failed with "Permission denied while using the Eventarc Service Agent"; the roles were all present, and the third try a few minutes later went through. Runbook: `labs/02-app-dev-environment.md`.

```bash
gcloud functions deploy $FUNCTION --gen2 --runtime=nodejs22 --region=$REGION \
  --source=. --entry-point=$FUNCTION --trigger-bucket=$BUCKET
gcloud functions logs read $FUNCTION --region=$REGION --limit=20
```

Practice labs, date to add. `gcfunction`: HTTP function from the console inline editor (default `helloHttp`), public, maximum 5 instances, tested with the curl command the Test button generates. `nodejs-pubsub-function`: deployed from Cloud Shell with `--trigger-topic cf-demo`, tested by publishing a message and reading the logs.

```bash
gcloud functions describe nodejs-pubsub-function --region=$REGION
gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
gcloud functions logs read nodejs-pubsub-function --region=$REGION
```

## Missed
