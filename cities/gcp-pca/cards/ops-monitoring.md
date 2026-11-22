---
name: Cloud Monitoring
district: ops
threat: 2
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Takes in metrics, events and metadata from your resources and turns them into dashboards, charts and alerts. It configures itself after resources are deployed, with sensible defaults. Part of Google Cloud Observability; monitoring is the base of SRE.
- Metrics scope: one scoping project holds the custom dashboards, alerting policies, uptime checks, notification channels and groups for every project it monitors. The scope takes that project's name.
- Uptime checks: test a public service from locations around the world over HTTP, HTTPS or TCP. Every minute with a 10-second timeout in the lecture's example; both are adjustable.
- Alerting: when a condition is met, it notifies by email, SMS, webhook, Pub/Sub or a third-party service. It can also warn before Observability usage itself hits a billing threshold. Fewer, actionable alerts are what reduce alert fatigue.
- Ops Agent: the hypervisor can't see inside a VM (memory usage, for one), so the agent runs in the VM and collects it. Primary agent for Compute Engine telemetry.
- Custom metrics: send an app-level number (current users) straight to Monitoring instead of guessing from CPU or network load. An autoscaler can hold it at a utilization target, adding VMs above it and removing them below.
- Same suite: Error Reporting counts and groups errors in running services. Cloud Trace shows request latency and how requests travel through the app. Cloud Profiler finds CPU- or memory-heavy functions.
Like what I know:

## Isolate
Pick it when: The question is whether something is up, healthy or fast enough: metrics, uptime checks, dashboards, alerts.
Not it when (use Cloud Logging instead): You need the record of what happened (entries to search, keep or audit), not numbers over time.

## Execute
What I built:

## Missed
