---
name: Storage Transfer Service and Transfer Appliance
district: data
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is: Two ways to move large amounts of data into Google Cloud.
- Storage Transfer Service: managed, schedulable transfers over the network into Cloud Storage, from other clouds (S3, Azure), HTTP sources, other buckets, or on-prem file systems through agents.
- Transfer Appliance: a rackable, high-capacity storage server Google ships to you. You load it and ship it back.
- Sizing rule: 1 TB over 100 Mbps takes about a day; 100 TB over the same link takes about three months. That gap is when the appliance wins.
- Small or one-off (up to around a terabyte): `gcloud storage cp` or `rsync`.
- Storage Transfer Service can run on a schedule or on events, limit bandwidth, and keep source and bucket in sync. It also does bucket to bucket.
- Transfer Appliance holds from a few TB to 300 TB per unit; data is encrypted before it ships.
- Different products with similar names: BigQuery Data Transfer Service (scheduled loads into BigQuery from SaaS apps and other warehouses), Database Migration Service (databases), Datastream (ongoing change capture).
Like what I know: rsync over the network versus mailing a hard drive.

## Isolate
Pick it when: The data is reachable online and the network can move it in reasonable time: Storage Transfer Service.
Not it when (use Transfer Appliance instead): Hundreds of terabytes or more over limited bandwidth, where a network transfer would take weeks.

## Execute
What I built:

## Missed
