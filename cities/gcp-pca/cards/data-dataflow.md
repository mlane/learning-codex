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
- Streaming words to recognise: windows (group events by time), watermarks and triggers (how late data is handled), exactly-once processing.
- Pipelines are written with the Apache Beam SDK in Java, Python or SQL. Lecture diagram: in from Pub/Sub, Datastore, Kafka or Avro files; out to BigQuery or Bigtable. Alerts on a pipeline go through Cloud Monitoring.
- Templates, Google's or your own, run common pipelines without writing code, e.g. Pub/Sub to BigQuery.
- Look-alikes: Managed Service for Apache Spark (Dataproc) for Spark and Hadoop, Cloud Data Fusion for visual no-code ETL, Cloud Composer (managed Airflow) to orchestrate jobs across services, Dataform for SQL transformations inside BigQuery, Dataprep by Trifacta for exploring and cleaning data by clicking instead of coding, before it enters a pipeline (a partner service, now run by Alteryx; serverless, suggests the next transformation, and runs its jobs on Dataflow).
Like what I know: RxJS operators (map, filter, window, merge) applied to a distributed stream instead of UI events.

## Isolate
Pick it when: A new ETL or streaming pipeline with no existing Spark or Hadoop code to keep.
Not it when (use Managed Service for Apache Spark, formerly Dataproc, instead): There's Spark or Hadoop code to keep, an on-prem Hadoop cluster to migrate, or the job needs Hive, Pig and the rest of that ecosystem.
- The lecture's two questions, in order: does it depend on Hadoop or Spark tools? Then the Spark service. If not, hands-on (DevOps) operations points to the Spark service and hands-off (serverless) points to Dataflow.

## Execute
What I built:

## Missed
