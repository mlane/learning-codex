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
- Split horizon: a public and a private zone with the same name, so internal clients get internal IPs.
- Hybrid DNS: a forwarding zone sends queries for on-prem names to the on-prem DNS servers; an inbound server policy lets on-prem resolve Google Cloud private names. Both travel over VPN or Interconnect.
- DNS peering lets one VPC resolve names using another VPC's zones (hub and spoke).
- Routing policies return weighted, geolocation or failover answers, with health checks.
- DNSSEC signs public zones against spoofing.
- Compute Engine internal DNS names every VM automatically; those names don't cross VPC peering.
Like what I know: Route 53 or Cloudflare DNS: where the A and CNAME records live.

## Isolate
Pick it when: Hosting your domain's DNS records in Google Cloud, or internal names for VMs and services in a VPC.
Not it when (use a domain registrar instead): You need to buy or register the domain itself. Cloud DNS only serves the records.

## Execute
What I built:

## Missed
