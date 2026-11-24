---
name: Artifact Registry
district: delivery
threat: 1
threat_source: estimate
lives_at: regional or multi-region
---

## Baseline
What it is: Managed store for build outputs: container images and language packages (npm, Maven, Python). Cloud Build pushes to it; GKE and Cloud Run pull from it. Replaced Container Registry.
- Access is IAM. For GKE to pull a private image, grant Artifact Registry Reader (`roles/artifactregistry.reader`) to the node service account. Not a public repository, and not a username and password stored in a secret.
Like what I know:

## Isolate
Pick it when:
Not it when (use ___ instead):

## Execute
What I built:

## Missed
