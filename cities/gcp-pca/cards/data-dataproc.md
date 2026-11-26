---
name: Managed Service for Apache Spark (Dataproc)
district: data
threat: 2
threat_source: session 4
lives_at: regional
---

## Baseline
What it is: Managed Apache Spark and Hadoop. Dataproc was renamed Managed Service for Apache Spark in 2026; the exam question pool can still show either name.
- Two deployments. Clusters (the old Dataproc on Compute Engine): you size the cluster and pay while it's up. Serverless: submit a Spark job and pay for its runtime.
- Runs the Hadoop ecosystem: Spark, Hadoop, Hive, Pig.
- Trainer: the serverless option blurs the old "Dataflow, because there's no cluster" reasoning in practice. For the exam, Dataflow is still the default for new pipelines and this is the migration answer.
- Cost pattern: ephemeral clusters. Start a cluster for the job, keep the data in Cloud Storage instead of HDFS, delete the cluster afterwards. Spot VMs for the secondary workers.
- Clusters start, scale and shut down in about 90 seconds on average, against 5 to 30 minutes on-prem. Billed per second.
- A cluster is ordinary Compute Engine VMs you can see: one master and N workers (`name-m`, `name-w-0`), or three masters in high availability mode. Workers can be added or removed while it runs.
- Existing Spark, Hadoop, Pig and Hive jobs run without being rewritten. Built-in connections to BigQuery, Cloud Storage, Bigtable, Cloud Logging and Cloud Monitoring.
- Course demo (watched, not built): cluster with 2 workers, resized to 3, a Spark job estimating pi submitted, cluster deleted. That is the ephemeral pattern above.
- The rename covers both forms: 'Dataproc on Compute Engine' is the cluster deployment and 'Serverless for Apache Spark' is the serverless one.
Like what I know: Renting a ready-made Spark cluster instead of installing Hadoop yourself. AWS EMR.

## Isolate
Pick it when: Moving an on-prem Hadoop or Spark cluster to Google Cloud, or keeping an investment in existing Spark code. "Spark" or "Hadoop" in the scenario gives it away.
Not it when (use Dataflow instead): It's a new pipeline with no Spark or Hadoop to preserve.
- With no Spark or Hadoop dependency, the lecture's tie-breaker is operations: wanting hands-on control of the cluster keeps it here, wanting serverless goes to Dataflow.

## Execute
What I built:

## Missed
