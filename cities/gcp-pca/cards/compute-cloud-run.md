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
- Revisions: every deploy creates an immutable revision. Split traffic by percentage between revisions for canary or blue/green, and roll back at once.
- Concurrency: one instance serves many requests at the same time (80 by default). Lower it for CPU-heavy work. Request timeout up to 60 minutes.
- Reaching private resources (Cloud SQL private IP, Memorystore): Direct VPC egress, or a Serverless VPC Access connector.
- Who can call it: ingress setting (all, internal, or internal plus load balancer) and IAM (Cloud Run Invoker). Allow unauthenticated only for public sites.
- Third shape besides services and jobs: worker pools, always-on background workers with no HTTP endpoint (e.g. pulling from Pub/Sub).
- GPUs can be attached for model inference, still scaling to zero.
Like what I know: Vercel or Netlify functions, but for any container: hand over an image, get an HTTPS URL, pay per request.

## Isolate
Pick it when: Stateless web apps, APIs or microservices in containers that should scale automatically, including to zero, with no infrastructure to manage.
Not it when (use GKE instead): You need Kubernetes features or node-level control. For a single event handler, use Cloud Run functions.

## Execute
What I built:

## Missed
