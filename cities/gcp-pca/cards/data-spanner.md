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
- Key design matters as on Bigtable: a steadily increasing primary key creates a hot spot.
- Two SQL dialects: GoogleSQL and a PostgreSQL-compatible interface.
- Schema changes and maintenance happen online, with no downtime windows.
- TrueTime, Google's synchronised clocks, is what makes global strong consistency possible. Recognise the word.
- Pricier than Cloud SQL at small scale, though it now starts at a fraction of a node (processing units).
- Has a local emulator.
Like what I know: Cloud SQL's bigger sibling: still SQL and transactions, but it scales out the way a NoSQL store does.

## Isolate
Pick it when: Relational data that outgrows one machine: high write throughput, global users, strong consistency, five nines (global inventory, finance, gaming).
Not it when (use Cloud SQL instead): A single-region relational database fits. It's cheaper, simpler and works with existing MySQL or PostgreSQL apps.

## Execute
What I built:

## Missed
