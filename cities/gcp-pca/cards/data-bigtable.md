---
name: Bigtable
district: data
threat: 2
threat_source: estimate
lives_at: zonal clusters, replicable across regions
---

## Baseline
What it is: Google's wide-column NoSQL database for huge workloads at consistent low latency and high throughput (powers Search, Maps, Gmail). Built for fast lookups and scans by row key, not relational queries. HBase-compatible.
- Scale by adding nodes; throughput grows with them.
- Row key design decides performance.
- Fed by streaming (Dataflow, Spark) or batch (Dataflow, Hadoop, Spark).
Like what I know:

## Isolate
Pick it when: More than 1 TB with heavy, low-latency reads and writes: IoT and sensor time series, financial ticks, ad tech, user analytics serving, or moving off HBase.
Not it when (use BigQuery instead): You need SQL analytics across the whole dataset rather than fast key lookups. For small app data, Firestore.

## Execute
What I built:

## Missed
