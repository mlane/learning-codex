---
name: Cloud SDK, Cloud Shell and emulators
district: delivery
threat: 1
threat_source: exam guide
lives_at:
---

## Baseline
What it is: The ways to drive Google Cloud from the command line and from code instead of the console (exam guide 5.2).
- Cloud SDK command-line tools: `gcloud` for most services, `gcloud storage` (older `gsutil`) for Cloud Storage, `bq` for BigQuery, `kubectl` for GKE.
- Cloud Shell: a free browser terminal on a small temporary VM with the tools preinstalled, already signed in as you, with a 5 GB home directory that persists.
- Cloud Shell Editor: a browser IDE on that same VM. Cloud Code: the IDE extension (VS Code, JetBrains, Cloud Shell Editor) for writing, running and debugging Cloud Run and GKE apps.
- Client libraries: the per-language libraries for calling Google APIs, preferred over raw REST calls. They find credentials through Application Default Credentials: your own user locally, the attached service account in the cloud. No key file either way.
- Emulators run a service on your machine for development and tests, with no cost and no network: Bigtable, Spanner, Pub/Sub, Firestore.
- API good practice: retry with exponential backoff, respect quotas, paginate and batch, enable only the APIs a project needs.
- gcloud configurations hold an account, project and default region and zone; switch between them instead of retyping flags.
Like what I know: Node tooling: CLI commands, a local dev server and mock APIs. An emulator is the mock service worker of the backend.

## Isolate
Pick it when: Scripting a one-off task, developing locally against Google services, or a question about which tool does what.
Not it when (use Terraform instead): The infrastructure has to be repeatable and reviewed. A pile of gcloud commands is imperative and drifts.

## Execute
What I built:

## Missed
