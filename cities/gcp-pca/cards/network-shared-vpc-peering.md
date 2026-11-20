---
name: Shared VPC and VPC peering
district: network
threat: 3
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Two ways to connect networks across projects.
- Shared VPC: a host project owns the VPC; service projects in the same organization put resources in its subnets. Network admins keep central control; app teams manage their own resources.
- VPC Network Peering: links two separate VPCs (different projects or even organizations) over internal IPs. Each side stays independently managed. Not transitive: A-B and B-C doesn't give A-C. IP ranges can't overlap.
Like what I know:

## Isolate
Pick it when: One organization wants central control of the network across many projects: Shared VPC.
Not it when (use VPC Network Peering instead): Connecting networks owned by different teams or organizations that should stay independently managed.

## Execute
What I built:

## Missed
