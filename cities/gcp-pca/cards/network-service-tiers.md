---
name: Network Service Tiers
district: network
threat: 2
threat_source: estimate
lives_at: per project default, or per resource
---

## Baseline
What it is: A choice of how traffic travels between users and your resources: optimise for performance (Premium) or for cost (Standard).
- Premium: traffic rides Google's private global backbone, with over 100 points of presence. The default. 99.99% SLA. Global and regional external IPv4 addresses.
- Standard: traffic rides the public internet over regular ISP networks. Cheaper, performance comparable to other public clouds. 99.9% SLA. Regional external IPv4 addresses only.
- Standard still supports Cloud NAT, the external Application LB and the external passthrough Network LB, but regional only. A global load balancer on one anycast IP needs Premium.
- Premium: traffic enters and leaves Google's network at the edge closest to the user (cold potato). Standard: it uses the public internet until it reaches the region (hot potato).
- Set as a project default or per resource (an IP address or forwarding rule).
Like what I know: Paying for a CDN's private backbone versus letting traffic take its chances on the ordinary internet.

## Isolate
Pick it when: Performance matters, users are global, you need a global load balancer, or you don't want traffic on the public internet: Premium.
Not it when (use Standard tier instead): Cost is the priority, public internet routing is acceptable, and the workload sits in one region.

## Execute
What I built:

## Missed
