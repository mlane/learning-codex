---
name: Cloud NAT
district: network
threat: 2
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Managed network address translation, so VMs and GKE nodes with no external IP can reach the internet (patches, updates, outside APIs). Outbound only: nothing on the internet can open a connection in.
- Regional, set up on a Cloud Router. Software-defined; no NAT VM to run.
- Why bother: no external IPs means a smaller attack surface, lower cost and lower latency.
- Cloud NAT logging: one entry when a NAT connection is created, and one when a packet is dropped because no port was free. Log either or both; they go to Cloud Logging.
- TCP and UDP only, and only outbound drops. A dropped inbound reply to an outbound request is not logged.
- Trainer's split: Cloud NAT for the occasional trip to the public web, Private Google Access for steady calls to Google APIs.
Like what I know:

## Isolate
Pick it when: Private VMs or nodes need outbound internet access.
Not it when (use Private Google Access instead): The destination is a Google API or service (Cloud Storage, BigQuery). For inbound traffic, a load balancer.

## Execute
What I built:

## Missed
