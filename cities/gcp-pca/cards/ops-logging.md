---
name: Cloud Logging
district: ops
threat: 2
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Fully managed service to store, search, analyze, monitor and alert on log data and events from Google Cloud and AWS. Scales to application and system logs from thousands of VMs.
- Three parts: storage for logs, Logs Explorer (the UI), and an API to manage logs in code.
- Retention is 30 days by default (adjustable). To keep logs longer or use them elsewhere, export to Cloud Storage, BigQuery or Pub/Sub.
- Logs exported to BigQuery can be queried with SQL and turned into reports and dashboards in Data Studio.
Like what I know:

## Isolate
Pick it when: You need to search, keep or audit what happened: application and system logs, with export for long-term storage or analysis.
Not it when (use Cloud Monitoring instead): You need metrics, uptime checks and alert thresholds rather than the log entries themselves.

## Execute
What I built:

## Missed
