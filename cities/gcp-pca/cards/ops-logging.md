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
- A sink is how the export is set up: a filter plus a destination. Built from Logs Explorer with Actions > Create Sink.
- A sink only sends entries that arrive after it was created. Earlier logs are not copied over.
- In Logs Explorer you narrow by resource (Subnetwork) and log name (`vpc_flows`), then add text such as an IP address on a new line of the query.
- Log buckets: `_Required` holds Admin Activity and System Event audit logs for 400 days, free and unchangeable. `_Default` holds the rest for 30 days. Custom buckets set their own retention and region.
- Audit log types: Admin Activity (always on), Data Access (off by default except BigQuery; can be large and costly), System Event, Policy Denied.
- Centralised logging: an aggregated sink at folder or organization level collects from every project below into one destination.
- Destination by purpose: Cloud Storage for cheap long retention, BigQuery for analysis, Pub/Sub to stream to a SIEM or other tool, another log bucket to centralise.
- Exclusion filters drop noisy logs before they're stored and billed. Log-based metrics turn matching entries into a metric to alert on.
- Log Analytics runs SQL over a log bucket without exporting it.
- Tamper-proof audit trail: a locked retention policy on the bucket.
Like what I know: console.log for the whole platform, collected in one searchable place. Sentry or a log drain, built in.

## Isolate
Pick it when: You need to search, keep or audit what happened: application and system logs, with export for long-term storage or analysis.
Not it when (use Cloud Monitoring instead): You need metrics, uptime checks and alert thresholds rather than the log entries themselves.

## Execute
What I built: Course lab, 2026-11-24. Apache `web-server` (e2-micro, tag `http-server`) on a subnet with VPC Flow Logs on, and a firewall rule opening tcp 80 and 22 to that tag. Opened the page, then found my own IP in the `vpc_flows` entries in Logs Explorer. Created sink `bq_vpcflows` to a new BigQuery dataset of the same name, sent 50 curls from Cloud Shell, and queried the table for the top talkers by bytes. Cloud Shell's IP came out on top; my own machine's earlier visits weren't there because they happened before the sink existed.

```bash
export MY_SERVER=<external IP of web-server>
for ((i=1;i<=50;i++)); do curl $MY_SERVER; done
```

```sql
#standardSQL
SELECT
  jsonPayload.connection.src_ip,
  jsonPayload.connection.dest_ip,
  SUM(CAST(jsonPayload.bytes_sent AS INT64)) AS bytes,
  jsonPayload.connection.dest_port,
  jsonPayload.connection.protocol
FROM `your_table_id`
WHERE jsonPayload.reporter = 'DEST'
GROUP BY 1, 2, 4, 5
ORDER BY bytes DESC
LIMIT 15
```

- The table name starts with `compute_googleapis`. Use the Table ID without the project ID in front.

Practice labs (App Dev Environment badge), date to add. Logs Explorer filtered to VM Instance > `lamp-1-vm`, then stopped and started the VM and watched the entries arrive. Read a function's logs from the CLI; they can lag by several minutes. Runbook: `labs/02-app-dev-environment.md`.

```bash
gcloud functions logs read $FUNCTION --region=$REGION --limit=20
```

## Missed
