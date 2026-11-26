---
name: Firewall rules and policies
district: network
threat: 2
threat_source: estimate
lives_at: global (per VPC network)
---

## Baseline
What it is: Allow or deny rules that decide which traffic reaches or leaves the VMs in a VPC network.
- A rule belongs to one network. A new custom network has no allow rules, so nothing gets in until you add one.
- A rule applies to all instances in the network, or only to those with a given network tag or service account.
- One rule can carry several protocols and ports (`icmp,tcp:22,tcp:3389`), or you can split them across rules.
- A route isn't enough on its own: the firewall must also allow the packet.
- Firewall Rules Logging records the connections a rule allowed or denied. Firewall Insights needs it turned on: see `network-intelligence-center`.
- Every VPC has two implied rules that can't be deleted: deny all ingress and allow all egress, at the lowest priority (65535). Everything else is yours.
- Priority runs 0 to 65535 and the lowest number wins; a new rule defaults to 1000. Stateful: once a connection is allowed one way, its replies are allowed automatically.
- The `default` network ships with allow rules for internal traffic, SSH, RDP and ICMP. Fine for a lab, too open for production.
- Ranges to remember: load balancer health checks come from 130.211.0.0/22 and 35.191.0.0/16; IAP's SSH and RDP tunnelling comes from 35.235.240.0/20.
- Firewall policies are the newer model. Hierarchical firewall policies attach to the organization or a folder and apply to every VPC below, so a central team sets rules projects can't override (named in the exam guide). Network firewall policies (global or regional) attach to one VPC. Default order: hierarchical policies, then VPC firewall rules, then network firewall policies.
- Secure tags (governed by IAM) replace network tags in policies. Anyone who can edit a VM can add a network tag; a secure tag needs a permission.
- Cloud Next Generation Firewall tiers: Essentials (the rules above), Standard (adds FQDN and geolocation objects and threat intelligence lists), Enterprise (adds intrusion prevention with TLS inspection). The exam guide's 'intrusion protection'.
Like what I know: AWS security groups, or an allowlist on a server: closed by default, open specific ports to specific sources.

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

Course lab (Elastic Infrastructure: internal Network LB), date to add. Two ingress rules on `my-internal-app`, both targeting the `backend-service` tag: `fw-allow-lb-access` (everything from 10.10.0.0/16, the clients inside the network) and `fw-allow-health-checks` (tcp:80 from 130.211.0.0/22 and 35.191.0.0/16). An internal load balancer still needs the health-check rule. Console build; the rest is on `network-load-balancing`.

## Missed
