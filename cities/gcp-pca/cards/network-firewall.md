---
name: Firewall rules and policies
district: network
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is: Allow or deny rules that decide which traffic reaches or leaves the VMs in a VPC network.
- A rule belongs to one network. A new custom network has no allow rules, so nothing gets in until you add one.
- A rule applies to all instances in the network, or only to those with a given network tag or service account.
- One rule can carry several protocols and ports (`icmp,tcp:22,tcp:3389`), or you can split them across rules.
- A route isn't enough on its own: the firewall must also allow the packet.
Like what I know:

## Isolate
Pick it when: Controlling which traffic reaches or leaves VMs, by IP range, protocol, port, network tag or service account.
Not it when (use Cloud Armor instead): Filtering web requests at a load balancer: WAF rules, DDoS, blocking by country.

## Execute
What I built: Badge lab, 2026-11-23. Two ingress rules on the default network, both targeted by network tag: one opening port 80 to the web VMs, one letting Google's health checkers (130.211.0.0/22, 35.191.0.0/16) reach the load balancer backends. Runbook: `labs/01-load-balancing-compute-engine.md`.

```bash
gcloud compute firewall-rules create fw-allow-health-check \
  --network=default --action=allow --direction=ingress \
  --source-ranges=130.211.0.0/22,35.191.0.0/16 \
  --target-tags=allow-health-check --rules=tcp:80
```

Course lab, 2026-11-23. One rule per custom network allowing ICMP, SSH and RDP from anywhere to every instance in it. Commands are on the `network-vpc` card.

## Missed
