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
Like what I know:

## Isolate
Pick it when: Moving an on-prem Hadoop or Spark cluster to Google Cloud, or keeping an investment in existing Spark code. "Spark" or "Hadoop" in the scenario gives it away.
Not it when (use Dataflow instead): It's a new pipeline with no Spark or Hadoop to preserve.

## Execute
What I built:

## Missed
