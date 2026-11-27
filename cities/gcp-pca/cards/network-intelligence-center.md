---
name: Network Intelligence Center
district: network
threat: 2
threat_source: estimate
lives_at: global
---

## Baseline
What it is: One console for seeing, monitoring and troubleshooting the Google Cloud network. The lecture's reason for it: 75% of network outages come from misconfiguration, usually found in production. Each module answers a different question.
- Network Topology: a picture of the VPCs, their connections and the metrics on them. Built from live traffic and telemetry, not only config, so it only draws things that actually communicated. Keeps six weeks of history in hourly snapshots. Entities roll up and expand: VM, instance group, zone, region; pod, workload, namespace, cluster.
- Network Topology use (lecture): users report slowness with no recent deploy. Select the traffic into the load balancer, see latency is up, widen the chart to six weeks to find when it jumped, then follow it to one slow backend instance.
- Connectivity Tests: can A reach B, and if not, where does it stop? Checks the configured path between two endpoints, inside Google Cloud or out to an external IP (on-prem, another cloud). Tests can be saved and re-run to check a firewall or route change before it causes an outage.
- Performance Dashboard: latency and packet loss between the zones where you have VMs. Answers "is it the network or my app?".
- Firewall Insights: how firewall rules are actually used: hit counts, unused or shadowed rules, connections blocked by mistake. Needs Firewall Rules Logging on.
- Network Analyzer: runs continuously, finds misconfigurations by itself, ties a failure to a recent config change and suggests a fix. Lecture example: a firewall rule blocking GKE nodes from the control plane.
- Flow Analyzer: explore VPC Flow Logs by the five connection values without writing SQL. Built on Log Analytics and BigQuery.
Like what I know: The Network tab in browser DevTools, for the cloud network: see what went where and where it stopped.

## Isolate
Pick it when: The question is why network traffic isn't arriving, whether a network change is safe, or whether firewall rules are doing what was intended. Match the module to the question.
Not it when (use Cloud Monitoring instead): You need dashboards, uptime checks or alerts on resource metrics. For the raw traffic records themselves, VPC Flow Logs (`network-vpc`); for full packet contents, Packet Mirroring.

## Execute
What I built: Course lab (Network Architecture: hub-and-spoke with NCC), 2026-11-27. Opened Network Topology after joining `spoke1-vpc` and `spoke2-vpc` through a Network Connectivity Center hub: moved the timeline slider to the current hour, zoomed out and expanded the region to see the VMs and the traffic between them. Console only. The build is on `network-connectivity-center`.

## Missed
