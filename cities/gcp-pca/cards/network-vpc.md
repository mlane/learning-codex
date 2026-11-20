---
name: VPC networks and subnets
district: network
threat: 3
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Your private, software-defined network in Google Cloud. The VPC is global; subnets are regional and span all zones in their region, so one subnet can hold VMs in several zones.
- Auto mode: one subnet per region made for you. Custom mode: you choose subnets and ranges (recommended for production).
- Routes and a distributed firewall are built in; no appliances to provision.
- Subnet ranges can be expanded without downtime, not shrunk.
- Firewall rules target VMs by network tag or service account.
- VMs in one VPC reach each other across regions over internal IPs, no VPN needed.
Like what I know:

## Isolate
Pick it when: Every workload needs one. The design question is how many VPCs and which subnets.
Not it when (use Shared VPC instead): Several projects or teams need one centrally managed network.

## Execute
What I built:

## Missed
