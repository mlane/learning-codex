---
name: Firestore
district: data
threat: 2
threat_source: estimate
lives_at: regional or multi-region
---

## Baseline
What it is: Serverless NoSQL document database for mobile, web and server apps. Documents grouped in collections, flexible schema, scales automatically, strongly consistent.
- Real-time listeners and offline sync for client apps.
- Pay per read, write and delete, plus storage.
Like what I know:

## Isolate
Pick it when: App data with a flexible schema (user profiles, game state, product catalogs), especially mobile or web apps that need real-time sync.
Not it when (use Bigtable instead): Massive throughput or time-series data at terabyte-to-petabyte scale. For relational data, Cloud SQL.

## Execute
What I built:

## Missed
