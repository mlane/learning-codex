---
name: Service accounts
district: core
threat: 3
threat_source: estimate
lives_at: global
---

## Baseline
What it is: An identity for a workload (VM, app, pipeline) instead of a person, so it can call Google APIs, e.g. a VM reading a Cloud Storage bucket. Identified by an email address and given roles through IAM like any principal.
- It's also a resource: you control who can use or impersonate it (Service Account User role).
- Attach it to the VM or Cloud Run service and Google handles short-lived credentials. User-managed (downloaded) keys are a last resort.
- If you do use keys: up to 10 per service account so they can be rotated, and Google keeps only the public half, so a lost private key can't be recovered. Rotate and audit them.
- Prefer one dedicated service account per app with only the roles it needs over the default Compute Engine one.
- On GKE: Workload Identity Federation for GKE gives pods an IAM identity through their Kubernetes service account. A Kubernetes service account and an IAM service account are different things until that's set up. See compute-gke.
- Kinds: user-managed (you create it), default (auto-created for Compute Engine and App Engine, historically with the Editor role, which is too broad), and service agents (Google's own services acting inside your project).
- Impersonation: grant Service Account Token Creator so a user or another service account gets short-lived credentials as this one. No key leaves Google.
- An org policy can forbid key creation outright (`iam.disableServiceAccountKeyCreation`).
- Access scopes on a VM are the legacy limiter. Set the scope to cloud-platform and control access with IAM roles.
Like what I know: A bot account or deploy token for CI: an identity for a machine rather than a person.

## Isolate
Pick it when: Code or a machine needs to call Google Cloud APIs without a person signed in.
Not it when (use Workload Identity Federation instead): The workload runs outside Google Cloud (on-prem, AWS, GitHub Actions). Federate its existing identity instead of exporting a key.

## Execute
What I built:

## Missed
