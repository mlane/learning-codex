---
name: Secret Manager
district: security
threat: 2
threat_source: estimate
lives_at: global, or regional (regional secrets)
---

## Baseline
What it is: A managed store for small sensitive values: API keys, database passwords, certificates. Apps fetch the value at run time instead of carrying it in code, config files or images.
- A secret has versions. Add a version to rotate; an app pins a version or reads `latest`; old versions can be disabled or destroyed.
- Access is IAM per secret (Secret Manager Secret Accessor), and every read lands in the audit logs.
- Replication: automatic (Google picks the regions) or user-managed (you name them, for residency). Regional secrets keep everything in one region.
- A rotation schedule only sends a Pub/Sub message when it's time; your function does the rotating.
- Encrypted by default; CMEK optional.
- Built into the runtimes: Cloud Run and Cloud Run functions expose a secret as an environment variable or a mounted file, GKE through an add-on, Cloud Build inside build steps.
- Parameter Manager is the companion for configuration that isn't secret.
Like what I know: A .env file done properly: versioned, access-controlled and audited. GitHub Actions secrets, for the whole platform.

## Isolate
Pick it when: An app or pipeline needs a credential at run time and it must not sit in source code, an image or a Terraform file.
Not it when (use Cloud KMS instead): You need to encrypt data or manage encryption keys. For a workload calling Google APIs you need no secret at all: attach a service account, or use Workload Identity Federation from outside Google Cloud.

## Execute
What I built:

## Missed
