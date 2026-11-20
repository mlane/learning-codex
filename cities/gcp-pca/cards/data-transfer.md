---
name: Storage Transfer Service and Transfer Appliance
district: data
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is: Two ways to move large amounts of data into Google Cloud.
- Storage Transfer Service: managed, schedulable transfers over the network into Cloud Storage, from other clouds (S3, Azure), HTTP sources, other buckets, or on-prem file systems through agents.
- Transfer Appliance: a rackable, high-capacity storage server Google ships to you. You load it and ship it back.
Like what I know:

## Isolate
Pick it when: The data is reachable online and the network can move it in reasonable time: Storage Transfer Service.
Not it when (use Transfer Appliance instead): Hundreds of terabytes or more over limited bandwidth, where a network transfer would take weeks.

## Execute
What I built:

## Missed
