---
name: Cloud DNS
district: network
threat: 1
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Google's managed DNS, on the same infrastructure as Google: low latency, 100% availability SLA.
- Public zones answer the internet; private zones are visible only inside the VPCs you choose.
- DNS forwarding and peering resolve names between on-prem and Google Cloud.
Like what I know:

## Isolate
Pick it when: Hosting your domain's DNS records in Google Cloud, or internal names for VMs and services in a VPC.
Not it when (use a domain registrar instead): You need to buy or register the domain itself. Cloud DNS only serves the records.

## Execute
What I built:

## Missed
