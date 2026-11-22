---
name: Cloud SQL
district: data
threat: 3
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Fully managed relational database: MySQL, PostgreSQL, SQL Server. Google handles patches, backups, replication and failover.
- High availability: a standby in another zone of the same region, automatic failover.
- Read replicas, including cross-region, for scaling reads and disaster recovery.
- Scales up (bigger machine), not out: writes go to one primary.
- Sizing: shared-core machines are for prototyping and aren't covered by the SLA. For OLTP, give it enough memory to hold the whole working set plus the active connections. More vCPUs raise the network throughput cap.
- Storage: SSD suits most cases. HDD (Enterprise edition only) is slower but cheaper, for rarely accessed data that doesn't need low latency. Disk throughput grows with storage capacity.
Like what I know:

## Isolate
Pick it when: A standard relational workload (web app, CRM, ERP), often a lift-and-shift of an existing MySQL, PostgreSQL or SQL Server database running on a single machine.
Not it when (use Spanner instead): It needs horizontal write scaling, global strong consistency or 99.999% availability. For demanding PostgreSQL workloads that mix transactions and analytics, AlloyDB.

## Execute
What I built:

## Missed
