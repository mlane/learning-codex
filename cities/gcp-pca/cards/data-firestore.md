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
- Modes: Native (documents, real-time, mobile and web SDKs) and Datastore mode (server-side only, successor of the old Datastore). There is also MongoDB compatibility, which matters when a case study runs MongoDB today (EHR Healthcare, Cymbal Retail).
- Every query is served by an index, and there are no joins. Model the data around the queries.
- Multi-region locations give 99.999% availability.
- Security rules control direct access from mobile and web clients; server code uses IAM.
- Has a local emulator.
Like what I know: Firebase's database: JSON-like documents with real-time listeners straight into the client.

## Isolate
Pick it when: App data with a flexible schema (user profiles, game state, product catalogs), especially mobile or web apps that need real-time sync.
Not it when (use Bigtable instead): Massive throughput or time-series data at terabyte-to-petabyte scale. For relational data, Cloud SQL.

## Execute
What I built:

## Missed
