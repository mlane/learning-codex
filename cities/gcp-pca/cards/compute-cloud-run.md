---
name: Cloud Run
district: compute
threat: 2
threat_source: trainer sheet
lives_at: regional
---

## Baseline
What it is: Serverless containers, built on Knative. Deploy a container image from Artifact Registry, or source code (Buildpacks builds it), and get an HTTPS URL. Scales out with requests and back to zero.
- Pay for CPU and memory while handling requests (to the 100 ms), plus a fee per million requests. Bigger containers cost more. Minimum instances avoid cold starts.
- Containers must be stateless. Services answer requests; jobs run tasks to completion.
- Regional. For multi-region, put several behind a global Application Load Balancer.
- Cold starts unacceptable: set minimum instances (2 keeps two warm). Maximum instances, CPU limit and ingress settings don't help.
- Google's recommendation for new serverless apps, ahead of App Engine. Serverless first, then fully managed, then VMs: the further that way, the more of the security work is Google's.
- Outgrow it and the same container image deploys to GKE.
Like what I know:

## Isolate
Pick it when: Stateless web apps, APIs or microservices in containers that should scale automatically, including to zero, with no infrastructure to manage.
Not it when (use GKE instead): You need Kubernetes features or node-level control. For a single event handler, use Cloud Run functions.

## Execute
What I built:

## Missed
