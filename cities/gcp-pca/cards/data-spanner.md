---
name: Spanner
district: data
threat: 2
threat_source: estimate
lives_at: regional or multi-region
---

## Baseline
What it is: Fully managed relational database that scales horizontally, stays strongly consistent and speaks SQL. Up to 99.999% availability on multi-region configurations (99.99% regional).
- Joins, secondary indexes and ACID transactions at global scale.
- Capacity is set in nodes or processing units; add more to scale reads and writes.
Like what I know:

## Isolate
Pick it when: Relational data that outgrows one machine: high write throughput, global users, strong consistency, five nines (global inventory, finance, gaming).
Not it when (use Cloud SQL instead): A single-region relational database fits. It's cheaper, simpler and works with existing MySQL or PostgreSQL apps.

## Execute
What I built:

## Missed
