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
What I built:

## Missed
