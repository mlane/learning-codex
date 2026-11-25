---
name: Cloud Build
district: delivery
threat: 2
threat_source: estimate
lives_at: global or regional
---

## Baseline
What it is: Serverless continuous integration. It runs a build as a series of steps, each in its own container, and produces artifacts. No build servers to maintain.
- Config in `cloudbuild.yaml`: steps (build, test, scan, push), each naming a builder image. A Dockerfile alone also works, or buildpacks with no Dockerfile.
- Triggers start a build on a push, pull request or tag from GitHub, GitLab or Bitbucket; also manual, Pub/Sub or webhook.
- Outputs go to Artifact Registry (images, packages) or Cloud Storage.
- It runs as a service account: grant only what the pipeline needs (e.g. Artifact Registry Writer, Cloud Run Developer).
- Private pools run builds inside your VPC to reach private resources (internal repositories, a private GKE control plane).
- It can deploy too (`gcloud run deploy`, `kubectl apply`), but promotion through environments with approvals is Cloud Deploy's job.
- Supply chain: generates build provenance (SLSA) and pairs with Artifact Analysis and Binary Authorization.
- The usual chain: commit, Cloud Build (build and test), Artifact Registry, Cloud Deploy, GKE or Cloud Run.
Like what I know: GitHub Actions: steps in a YAML file, each step running in a container.

## Isolate
Pick it when: Building and testing on every commit for workloads that land on Google Cloud, without running Jenkins or other build servers.
Not it when (use Cloud Deploy instead): The question is about releasing: promoting one build through dev, staging and production with approvals, canaries and rollback. For provisioning infrastructure, Terraform.

## Execute
What I built:

## Missed
