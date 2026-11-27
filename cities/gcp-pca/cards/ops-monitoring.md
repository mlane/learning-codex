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
- Vocabulary: a metric is a collection of measurements (request latency, free disk space); the thing being measured is a monitored resource.
- Charts on custom dashboards show VM utilization and network traffic: CPU, packets or bytes sent and received, packets dropped by the firewall. Filters cut noise, groups reduce the number of time series, aggregates combine them.
- Charts only help while someone is looking. Uptime checks plus alerting policies are the pair that tells you a web server is unreachable.
- Uptime checks: test a public service from locations around the world over HTTP, HTTPS or TCP. Every minute with a 10-second timeout in the lecture's example; both are adjustable. Targets in the lecture: a URL, a Compute Engine instance, an App Engine app, an AWS instance or load balancer. Each check can have its own alerting policy and shows latency per location.
- Alerting: a policy watches metrics in Monitoring or logs in Logging; when a condition is met, it opens an incident and notifies by email, SMS, webhook, Pub/Sub or a third-party service. It can also warn before Observability usage itself hits a billing threshold. Fewer, actionable alerts are what reduce alert fatigue.
- Ops Agent: the hypervisor can't see inside a VM (memory and disk usage, for two), so the agent runs in the VM and collects it. Primary agent for Compute Engine telemetry and Google's recommended one. A single install collects system metrics plus logs and metrics from third-party software (Apache, MySQL). It replaces the legacy Stackdriver logging and monitoring agents. Stackdriver is the company Google bought; the name still shows up in APIs.
- The metric's prefix says where it comes from: `agent.googleapis.com/...` is collected by the Ops Agent inside the VM and is absent until the agent is installed; `compute.googleapis.com/...` comes from the hypervisor and needs no agent.
- Custom metrics: send an app-level number (current users) straight to Monitoring instead of guessing from CPU or network load. An autoscaler can hold it at a utilization target, adding VMs above it and removing them below.
- Network-specific monitoring and troubleshooting is Network Intelligence Center: see `network-intelligence-center`.
- Same suite: Error Reporting counts and groups errors in running services. Cloud Trace shows request latency and how requests travel through the app. Cloud Profiler finds CPU- or memory-heavy functions.
- Managed Service for Prometheus: keep an existing Prometheus setup and its PromQL queries, with Google running the backend. The answer for "migrate Prometheus without rewriting queries".
- PromQL is now the query language in Metrics Explorer. MQL (Monitoring Query Language) is deprecated: no new MQL charts or alerts from the console, existing ones keep working.
- What to watch on any service, the four golden signals: latency, traffic, errors, saturation.
- SLO monitoring: define an SLO on a service and alert on how fast the error budget burns. See `ops-sre-slos`.
- Alerting strategy (exam guide 6.2): alert on symptoms users feel, not on every cause; page for the urgent, open a ticket for the rest.
- Case study hooks: EHR Healthcare has open source tools and email alerts that get ignored (centralise here, with real notification channels). Cymbal Retail runs Grafana, Nagios and Elastic; Managed Service for Prometheus keeps PromQL and Grafana dashboards working.
Like what I know: Real-user monitoring and uptime dashboards (Datadog, Grafana): Web Vitals, but for servers.

## Isolate
Pick it when: The question is whether something is up, healthy or fast enough: metrics, uptime checks, dashboards, alerts.
Not it when (use Cloud Logging instead): You need the record of what happened (entries to search, keep or audit), not numbers over time.

## Execute
What I built: Practice lab (Monitor a Compute Engine Instance with Cloud Monitoring), date to add. `lamp-1-vm` (e2-medium, Apache, HTTP allowed) with the Ops Agent installed over SSH. Uptime check `Lamp Uptime Check`: HTTP against the VM's external IP, every minute. Alerting policy `Inbound Traffic Alert`: the agent's network traffic metric above 500, retest window 1 minute, email channel. Custom dashboard with two line charts, CPU load (1m) and Received packets. Then stopped and started the VM to see it in the uptime check and the logs. Console build; steps in `labs/02-app-dev-environment.md`, section 8.

```bash
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
sudo systemctl status google-cloud-ops-agent"*"
```

- Opening Monitoring once is what creates the project's metrics scope.
- In the metric picker, untick "Active" or metrics with no recent data stay hidden.
- After a restart the uptime check can show every region failed for up to 5 minutes.
- Take the email channel off the policy afterwards; lab resources keep alerting for a while.

## Missed
