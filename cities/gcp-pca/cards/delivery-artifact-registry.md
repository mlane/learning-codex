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
- Vulnerability scanning (Artifact Analysis) checks images on push and keeps checking as new CVEs appear.
- Repository modes: standard (your artifacts), remote (a caching proxy for Docker Hub, npm, Maven Central), virtual (one address in front of several).
- Supply chain (exam guide 3.1): Cloud Build pushes the image and records its provenance; Binary Authorization lets GKE and Cloud Run deploy only images built and signed by your pipeline.
- Cleanup policies delete old versions automatically.
Like what I know: A private npm registry and Docker Hub in one.

## Isolate
Pick it when: Build outputs need a private, access-controlled home close to where they run: container images for GKE and Cloud Run, or internal npm, Maven and Python packages.
Not it when (use Cloud Storage instead): Arbitrary files or backups that aren't packages or images. If a question offers Container Registry, it's gone: Artifact Registry.

## Execute
What I built:

## Missed
