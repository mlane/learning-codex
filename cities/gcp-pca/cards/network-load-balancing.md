---
name: Cloud Load Balancing
district: network
threat: 3
threat_source: estimate
lives_at: global or regional
---

## Baseline
What it is: Managed, software-defined load balancing; no VMs to run. Health checks, autoscaling, and one anycast IP with multi-region failover for global load balancers.
- Application LB: layer 7, HTTP(S). Proxy, TLS termination, URL and host-based routing. Works with Cloud CDN, Cloud Armor and IAP. External or internal, global or regional.
- Network LB, proxy: layer 4 TCP (optional SSL offload); terminates connections.
- Network LB, passthrough: layer 4 TCP/UDP; doesn't terminate connections and keeps the client's IP. Regional.
- Backends: instance groups, or network endpoint groups for GKE, Cloud Run and other serverless.
Like what I know:

## Isolate
Pick it when: HTTP(S) apps, content-based routing, TLS termination, global users: Application LB.
Not it when (use a Network LB instead): Non-HTTP traffic (TCP/UDP), or the backend needs the client's IP or must terminate TLS itself (passthrough).

## Execute
What I built: Badge lab, 2026-11-23. Two load balancers in front of Apache VMs, all from the CLI. Runbook: `labs/01-load-balancing-compute-engine.md`.
- Passthrough Network LB (regional): static IP, legacy HTTP health check, target pool of 3 VMs, forwarding rule.
- Application LB (global): template, managed instance group, health-check firewall, global IP, health check, backend service, URL map, HTTP proxy, forwarding rule.

```bash
gcloud compute forwarding-rules list
gcloud compute backend-services get-health web-backend-service --global
```

## Missed
