---
name: Database Migration Service and Datastream
district: migrate
threat: 2
threat_source: case studies
lives_at: regional
---

## Baseline
What it is: Two managed services for moving database data. Database Migration Service (DMS) moves a whole database into a managed one on Google Cloud. Datastream streams ongoing changes out of a database for analytics.
- DMS, same engine (homogeneous): MySQL, PostgreSQL and SQL Server into Cloud SQL, or PostgreSQL into AlloyDB. Different engine (heterogeneous): Oracle or SQL Server into PostgreSQL, with a conversion workspace to translate schema and code.
- Continuous migration: an initial copy, then change data capture keeps the target in sync until you decide to cut over. Downtime is the few minutes of the switch. A one-time dump and load is simpler but the app is down for the whole copy.
- Reaching the source: IP allowlist, VPN or Interconnect, or a reverse SSH tunnel.
- Datastream: serverless change data capture from MySQL, PostgreSQL, Oracle or SQL Server into BigQuery or Cloud Storage. For near real-time analytics on operational data, not for moving the app's database.
- Before cutover: test under real load, keep a rollback path, and check what doesn't come across by itself (users, some stored procedures).
- Case study hooks: EHR Healthcare and Cymbal Retail both run MySQL, SQL Server, MongoDB and Redis. Relational ones go through DMS to Cloud SQL, MongoDB to Firestore with MongoDB compatibility, Redis to Memorystore.
Like what I know: Running the old and the new API side by side with a sync job, then flipping DNS.

## Isolate
Pick it when: An existing relational database must move into Cloud SQL or AlloyDB with minimal downtime.
Not it when (use Datastream instead): The database stays where it is and you want its changes flowing into BigQuery. To move whole VMs, Migrate to Virtual Machines; for files and objects, Storage Transfer Service.

## Execute
What I built:

## Missed
