---
name: Memorystore
district: data
threat: 1
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Fully managed in-memory data store on Google's infrastructure. Google automates high availability, failover, patching and monitoring.
- The course covers Memorystore for Redis. Current engines: Valkey, Redis Cluster, Redis and Memcached.
Like what I know:

## Isolate
Pick it when: An app needs a cache or session store with very fast reads, and nobody wants to run Redis themselves.
Not it when (use Cloud SQL or Firestore instead): The data has to be the durable source of truth, not a cache in front of one.

## Execute
What I built:

## Missed
