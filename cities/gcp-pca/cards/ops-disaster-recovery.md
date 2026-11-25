---
name: Disaster recovery: RTO and RPO
district: ops
threat: 3
threat_source: estimate
lives_at:
---

## Baseline
What it is: Planning for the loss of a zone, a region or the data itself. Two numbers drive every choice.
- RTO (recovery time objective): how long the service may be down. RPO (recovery point objective): how much data, measured in time, may be lost. Smaller numbers cost more.
- Patterns, cheapest first. Cold: backups only, rebuild when needed; RTO in hours or days. Warm: a scaled-down copy already running elsewhere, scale it up; RTO in minutes to hours. Hot: full capacity in two regions behind a global load balancer; RTO near zero.
- High availability is not disaster recovery. HA rides out a zone failure (regional MIG, Cloud SQL HA, regional GKE). DR covers a region failing, or data being corrupted or deleted, which replication copies faithfully. Only backups and point-in-time recovery undo that.
- Data building blocks: disk snapshots on a schedule; Cloud SQL backups, point-in-time recovery and cross-region replicas; dual-region or multi-region Cloud Storage with versioning; multi-region Spanner and Firestore; BigQuery time travel and cross-region dataset replication.
- Backup and DR Service: central, policy-driven backups for VMs, databases and file systems, kept in a backup vault that can't be altered or deleted before its retention ends (ransomware protection). The exam guide's 'backup and recovery'.
- Compute building blocks: images and instance templates, Terraform to recreate the environment, MIGs in a second region, a global load balancer or DNS failover to move the traffic.
- A plan that hasn't been tested isn't a plan: run recovery drills and measure the real RTO.
- On-prem as primary with Google Cloud as the DR site is a common first step of a migration. EHR Healthcare asks for a better DR plan.
- Business continuity plan (exam guide 1.1 and 4.2) is the wider document: people, process and communication. DR is its technology part.
Like what I know: Git plus backups for a laptop: RPO is how much uncommitted work is gone, RTO is how long until a replacement machine is set up and working.

## Isolate
Pick it when: The scenario states an RTO or RPO, mentions a region outage, ransomware or accidental deletion, or asks for the cheapest design that meets a recovery target. Choose the cheapest pattern that still meets both numbers.
Not it when (use high availability instead): The need is to keep serving through one zone failing or routine maintenance, with no data loss scenario. A multi-zone deployment is enough.

## Execute
What I built:

## Missed
