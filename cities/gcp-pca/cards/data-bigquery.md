---
name: BigQuery
district: data
threat: 2
threat_source: estimate
lives_at: regional or multi-region (set per dataset)
---

## Baseline
What it is: Data warehouse that stores data and gives an interactive SQL interface to query it.
- Layout: project, then dataset (has a location and an optional default table expiration), then tables.
- Loads files from Cloud Storage (e.g. Avro) and builds the schema from what it finds in the file.
- In a query, dataset ID and table ID are required. Project ID is optional and defaults to the current project.
- Cloud Billing can export straight to BigQuery for cost analysis.
Like what I know:

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
