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
- Target pool: a group of Compute Engine instances that receives traffic from a load balancer. The older backend type for passthrough Network LBs, as in the badge lab.

Picking one, from the lecture:
- Three questions: is the traffic HTTP(S) or not, is the load balancer external (internet-facing) or internal, and are the backends global or in one region.
- Application LB (layer 7): a flexible feature set for HTTP(S). Modes: global external, regional external, classic, regional internal, cross-region internal. Global external and classic run on Google Front Ends; the others are managed Envoy proxies.
- Proxy Network LB (layer 4): TCP with optional TLS offload, backends in several regions, on-prem or in other clouds. The client connection ends at the load balancer and a second one opens to the backend. External (global, regional, classic) or internal (regional, cross-region). For HTTP(S), use an Application LB instead.
- Passthrough Network LB (layer 4): TCP, UDP, ESP, GRE, ICMP. Always regional, external or internal. Not a proxy: backends see the client's source IP, and replies go straight back to the client (direct server return).
- Old names still in older material: HTTP(S) LB is the Application LB; SSL Proxy and TCP Proxy are the proxy Network LB; Network LB is the external passthrough; Internal TCP/UDP LB is the internal passthrough. A 'hardware-defined' load balancer doesn't exist.

Inside an Application LB:
- Chain: forwarding rule (IP and port), target HTTP(S) proxy, URL map, backend service or backend bucket, backends.
- The URL map does content-based routing: `/video` to one backend service and everything else to another, on a single IP.
- A backend service holds the health check, session affinity, a timeout (30 seconds by default; a fixed response timeout, not an idle one) and its backends. Default distribution is round robin; session affinity tries to keep a client on the same VM.
- Each backend has a balancing mode (CPU utilization or requests per second) that defines when it's full, and a capacity setting on top: 80% utilization at capacity 100% is the normal ceiling, capacity 50% halves it.
- Cross-region load balancing: a request goes to the closest region with healthy capacity and spills over to the next closest when that one is full or unhealthy.
- HTTPS: a target HTTPS proxy with at least one SSL certificate (up to 15). TLS ends at the load balancer. QUIC (HTTP/3) is supported.
- IPv6 clients terminate at the load balancer and are proxied to the backends over IPv4.
- Backend types beyond instance groups. Backend bucket: static content from Cloud Storage. NEG (network endpoint group): zonal (VM or container IP:port), serverless (Cloud Run, App Engine, Cloud Run functions in the NEG's region), internet (one endpoint outside Google Cloud, by FQDN or IP), hybrid (on-prem or another cloud over VPN or Interconnect).
- Changes to a backend service take a few minutes to spread.

Internal load balancing:
- Internal Application LB: regional, Envoy-based, can be made reachable from other regions; cross-region mode adds backends in several regions for failover. Envoy-based regional load balancers need a proxy-only subnet in the region.
- Internal passthrough Network LB: a private IP in front of backends in one region. Built on Andromeda, Google's network virtualisation, so traffic goes from client to backend with no proxy in between.
- Internal proxy Network LB: TCP behind an internal IP, Envoy-based, backends can also be on-prem or in other clouds.
- Three-tier pattern: a global external Application LB for the web tier, an internal load balancer per region for the application tier, the database tier behind that. Only the web tier is exposed.
- Global load balancers need the Premium network tier. External passthrough Network LBs accept clients from either tier.
Like what I know: nginx as a reverse proxy in front of several app servers, with path-based routing like a frontend router, except Google runs it and it has one IP worldwide.

## Isolate
Pick it when: HTTP(S) apps, content-based routing, TLS termination, global users: Application LB.
Not it when (use a Network LB instead): Non-HTTP traffic (TCP/UDP), or the backend needs the client's IP or must terminate TLS itself (passthrough).
- The backend must see the real client IP at layer 4, or the protocol is UDP, ESP or ICMP: passthrough Network LB.
- TCP that isn't HTTP, with global users or TLS offload: external proxy Network LB.
- Service-to-service traffic inside the VPC: internal Application LB for HTTP, internal passthrough Network LB for TCP and UDP.
- 'One global anycast IP' with HTTP(S): global external Application LB, which is also the lecture's recommended answer for HTTP(S).

## Execute
What I built: Badge lab, 2026-11-23. Two load balancers in front of Apache VMs, all from the CLI. Runbook: `labs/01-load-balancing-compute-engine.md`.
- Passthrough Network LB (regional): static IP, legacy HTTP health check, target pool of 3 VMs, forwarding rule.
- Application LB (global): template, managed instance group, health-check firewall, global IP, health check, backend service, URL map, HTTP proxy, forwarding rule.

```bash
gcloud compute forwarding-rules list
gcloud compute backend-services get-health web-backend-service --global
```

Course lab (Elastic Infrastructure: Application LB with autoscaling), date to add. `http-lb`: global external Application LB with an IPv4 and an IPv6 frontend on port 80 and one backend service, `http-backend`, holding two regional MIGs: `us-1-mig` (balancing mode rate, 50 RPS per instance) and `notus-1-mig` (balancing mode utilization, 80%). Backends had no external IPs: Cloud NAT for outbound, health-check firewall rule for the probes. Stress test from a VM near the first region with ApacheBench: traffic went to the closest MIG first, spilled into the other region as RPS climbed, and both groups scaled out. The MIG side is on `compute-instance-groups`. Console build.

```bash
export LB_IP=<IPv4 address of http-lb>
ab -n 500000 -c 1000 http://$LB_IP/
```

Course lab (Elastic Infrastructure: internal Network LB), date to add. `my-ilb`: internal passthrough Network LB in the `my-internal-app` network. Backends `instance-group-1` and `instance-group-2` in two zones of one region (subnet-a and subnet-b), TCP health check on port 80 (10 s interval, 5 s timeout, healthy after 2, unhealthy after 3), frontend on the reserved internal IP 10.10.30.5 in subnet-b. Firewall rules to the `backend-service` tag: `fw-allow-lb-access` from 10.10.0.0/16 and `fw-allow-health-checks` from the two probe ranges. From `utility-vm` (no external IP), repeated `curl 10.10.30.5` was answered from both zones. Console build.

## Missed
