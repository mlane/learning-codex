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
- No joins, no multi-row transactions, one index: the row key. Sequential keys (a timestamp first) put all writes on one node, a hot spot. Lead with a well-spread field.
- Replication across zones or regions; app profiles route requests. Replicas are eventually consistent. Up to 99.999% availability with multi-region replication.
- SSD or HDD storage, chosen at creation. Autoscaling adds and removes nodes.
- Has a local emulator (the exam guide lists emulators for Bigtable, Spanner, Pub/Sub and Firestore).
- Case study hook: vehicle or sensor telemetry at scale (KnightMotives) is the classic Bigtable shape.
Like what I know: One enormous sorted key-value map: fast get by key or key range, no joins. Closer to DynamoDB or Cassandra than to a SQL database.

## Isolate
Pick it when: More than 1 TB with heavy, low-latency reads and writes: IoT and sensor time series, financial ticks, ad tech, user analytics serving, or moving off HBase.
Not it when (use BigQuery instead): You need SQL analytics across the whole dataset rather than fast key lookups. For small app data, Firestore.

## Execute
What I built:

## Missed
