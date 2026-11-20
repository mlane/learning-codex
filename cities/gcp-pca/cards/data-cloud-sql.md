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
Like what I know:

## Isolate
Pick it when: A standard relational workload (web app, CRM, ERP), often a lift-and-shift of an existing MySQL, PostgreSQL or SQL Server database.
Not it when (use Spanner instead): It needs horizontal write scaling, global strong consistency or 99.999% availability.

## Execute
What I built:

## Missed
