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
- Standard tier has a replica and automatic failover; Basic is a single node and loses the cache if it fails. Redis Cluster and Valkey scale out with shards.
- Reached on a private IP inside the VPC, never from the internet.
- Uses: cache in front of a database, session store, leaderboards, rate-limit counters.
- Case study hook: EHR Healthcare and Cymbal Retail both run Redis today. Memorystore is the like-for-like target.
Like what I know: Redis as the cache in front of an API, hosted for me.

## Isolate
Pick it when: An app needs a cache or session store with very fast reads, and nobody wants to run Redis themselves.
Not it when (use Cloud SQL or Firestore instead): The data has to be the durable source of truth, not a cache in front of one.

## Execute
What I built:

## Missed
