---
name: Cloud Armor
district: network
threat: 2
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Web application firewall and DDoS protection at Google's edge. It filters requests at the load balancer, before they reach the backends.
- Security policies: allow or deny by IP or country, preconfigured WAF rules for the OWASP Top 10 (SQL injection, cross-site scripting), rate limiting.
- Attaches to the backend services of an external Application Load Balancer.
- Works on requests (layer 7). VPC firewall rules work on packets (layers 3 and 4).
Like what I know:

## Isolate
Pick it when: An internet-facing app behind an Application Load Balancer needs protection from DDoS or web attacks, or blocking by IP or region.
Not it when (use VPC firewall rules instead): The traffic is between VMs or into a VPC and you're filtering by IP, port, tag or service account. For per-user access to an internal app, IAP.

## Execute
What I built:

## Missed
