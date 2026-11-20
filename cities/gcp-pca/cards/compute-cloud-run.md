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
Like what I know:

## Isolate
Pick it when: Stateless web apps, APIs or microservices in containers that should scale automatically, including to zero, with no infrastructure to manage.
Not it when (use GKE instead): You need Kubernetes features or node-level control. For a single event handler, use Cloud Run functions.

## Execute
What I built:

## Missed
