---
name: App Engine
district: compute
threat: 2
threat_source: trainer sheet
lives_at: regional
---

## Baseline
What it is: PaaS for web apps and APIs: deploy code, Google runs and scales it.
- Standard environment: sandboxed runtimes, scales to zero.
- Flexible environment: runs on VMs, more runtime freedom, doesn't scale to zero.
- One App Engine app per project, and its region is fixed at creation.
- Flexible allows SSH into its VMs (off by default) and background processes; standard allows neither. Standard starts faster and handles sudden spikes better.
- Released in 2008 and still examined: know standard versus flexible.
Like what I know:

## Isolate
Pick it when: An existing App Engine app, or a case study that already runs on it.
Not it when (use Cloud Run instead): It's a new serverless web app. Google now points most new work to Cloud Run.

## Execute
What I built:

## Missed
