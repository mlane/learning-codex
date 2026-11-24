---
name: Dataflow
district: data
threat: 2
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Serverless data processing for streaming and batch pipelines. It runs Apache Beam code; workers start for the job, autoscale and shut down, with no cluster to manage.
- One model for streaming and batch, so it fits almost any ETL (extract, transform, load) pipeline.
- Google's default recommendation for new pipelines.
- Typical shape: Pub/Sub in, Dataflow in the middle, BigQuery or Bigtable out.
Like what I know:

## Isolate
Pick it when: A new ETL or streaming pipeline with no existing Spark or Hadoop code to keep.
Not it when (use Managed Service for Apache Spark, formerly Dataproc, instead): There's Spark or Hadoop code to keep, an on-prem Hadoop cluster to migrate, or the job needs Hive, Pig and the rest of that ecosystem.

## Execute
What I built:

## Missed
