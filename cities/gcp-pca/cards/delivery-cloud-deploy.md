---
name: Cloud Deploy
district: delivery
threat: 2
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Managed continuous delivery. You define a delivery pipeline (an ordered list of targets such as dev, staging, prod), create a release, and promote that same release from target to target.
- Targets: GKE, Cloud Run, GKE attached clusters (other clouds, on-prem) or custom targets. All targets in one pipeline are the same runtime type.
- Release: an immutable snapshot of what to deploy. Rollout: one deployment of a release to one target.
- Controls: required approval before a target, canary with percentage phases, deploy verification, one-click or automatic rollback, automation rules that promote on success.
- Uses Skaffold to render manifests and Cloud Build to run the work. Your CI (Cloud Build or anything else) creates the release.
- Everything is audited: who promoted and who approved what.
Like what I know: The promote-to-production half of a pipeline: preview, staging and production environments with an approval gate, as on Vercel or Netlify.

## Isolate
Pick it when: The same artifact must move through several environments in order, with approvals, canary or verification steps and a quick rollback, onto GKE or Cloud Run.
Not it when (use Cloud Build instead): The work is compiling, testing and packaging (CI). One Cloud Run service with one environment can deploy straight from Cloud Build and use Cloud Run's own traffic splitting.

## Execute
What I built:

## Missed
