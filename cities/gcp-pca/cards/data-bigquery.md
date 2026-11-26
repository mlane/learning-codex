---
name: BigQuery
district: data
threat: 2
threat_source: estimate
lives_at: regional or multi-region (set per dataset)
---

## Baseline
What it is: Data warehouse that stores data and gives an interactive SQL interface to query it.
- Petabyte scale with no database administrator needed. Reached from the console, the `bq` command-line tool, or the REST API through client libraries (Java, .NET, Python).
- Layout: project, then dataset (has a location and an optional default table expiration), then tables.
- Loads files from Cloud Storage (e.g. Avro) and builds the schema from what it finds in the file.
- In a query, dataset ID and table ID are required. Project ID is optional and defaults to the current project.
- Cloud Billing can export straight to BigQuery for cost analysis.
- Serverless: storage and compute are separate and billed separately. Compute is on-demand (per TB scanned) or capacity-based (reserved slots).
- Cheaper, faster queries: partition tables (usually by date), cluster them, select only the columns needed, never SELECT * on a big table.
- Getting data in as it happens: the Storage Write API, a Pub/Sub BigQuery subscription, or Dataflow.
- Query without loading: external tables over Cloud Storage files, and federated queries to Cloud SQL and Spanner.
- BigQuery ML trains and runs models in SQL and can call Gemini over table rows. BI tools sit on top for dashboards.
- Access: IAM at project, dataset and table level, plus column-level and row-level security. An authorized view shares a query result without exposing the tables behind it.
- Time travel recovers table data from the last 7 days.
- Sharing or selling data (KnightMotives wants to monetize data): BigQuery sharing, formerly Analytics Hub, publishes datasets without copying them.
Like what I know: SQL I already know, pointed at an analytics-sized dataset, with no server to size or index to tune.

## Isolate
Pick it when: SQL analytics over a large dataset: reporting, a data warehouse, digging through billing data.
Not it when (use Cloud SQL or Spanner instead): The app needs a transactional database it reads and writes row by row. For fast key lookups at scale, Bigtable.

## Execute
What I built: Lab, analysing a billing export. Created a dataset, loaded an Avro file from a bucket into a native table (415,602 rows), then queried it. Compute Engine had the highest total cost.

```sql
SELECT service.description, ROUND(SUM(cost),2) AS total_cost
FROM `billing_dataset.sampleinfotable`
GROUP BY service.description
ORDER BY total_cost DESC
```

Course lab, 2026-11-24. Queried VPC Flow Logs that a Cloud Logging sink wrote into a dataset, to rank source IPs by bytes sent to a web server. Query is on the `ops-logging` card.

## Missed
