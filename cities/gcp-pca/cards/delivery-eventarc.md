---
name: Eventarc
district: delivery
threat: 2
threat_source: lab
lives_at: regional
---

## Baseline
What it is: The event router. A trigger says "when this happens in that service, call this destination", and Eventarc does the delivery. Nothing polls.
- Sources: direct events from Google services (object created in Cloud Storage, a Pub/Sub message, a Firestore change), anything that writes a Cloud Audit Log entry, and third-party providers.
- Destinations: Cloud Run services and functions, GKE services, Workflows, internal HTTP endpoints in a VPC.
- Events arrive as CloudEvents (a standard envelope) in an HTTP request, at least once.
- Pub/Sub is the transport underneath. That's why a Cloud Storage trigger needs the Storage service agent to hold Pub/Sub Publisher.
- `gcloud functions deploy` with `--trigger-bucket` or `--trigger-topic` creates the trigger for you. `gcloud eventarc triggers create` is the direct way.
- Roles for a Storage trigger: Eventarc Service Agent on Eventarc's own service agent, Eventarc Event Receiver on the trigger's service account, Pub/Sub Publisher on the Storage service agent. Cloud Run Invoker too when the target requires authentication.
- Location: a Storage trigger must be in the same project and the same region (or multi-region) as the bucket.
- "Permission denied while using the Eventarc Service Agent" on a first deploy is usually propagation: the roles exist but haven't spread yet. Wait a few minutes and retry.
- Two editions: Standard (triggers, everything above) and Advanced (a central bus with filtering and transformation, for many sources and many targets).
Like what I know: `addEventListener` for the cloud, or a webhook I don't have to host: register a handler for an event on a source and it gets called.

## Isolate
Pick it when: Something that happens inside a Google service (file uploaded, resource created, audit log written) should call a Cloud Run service, a function or a workflow.
Not it when (use Pub/Sub instead): My own services exchange messages, several consumers each need every message, or messages must wait in a queue until a consumer pulls them.

## Execute
What I built: Badge lab, 2026-11-27. Didn't create a trigger by hand: `gcloud functions deploy --trigger-bucket` made one for "object created" on the photo bucket, calling `memories-thumbnail-maker`. The deploy failed twice on the Eventarc Service Agent permission. Listing the policy showed every role in place, and the third try a few minutes later worked. Runbook: `labs/02-app-dev-environment.md`.

```bash
gcloud projects get-iam-policy $PROJECT_ID --flatten="bindings[].members" \
  --filter="bindings.members:gcp-sa-eventarc OR bindings.members:gs-project-accounts" \
  --format="table(bindings.role, bindings.members)"
```

## Missed
