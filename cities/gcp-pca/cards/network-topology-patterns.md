---
name: Network topology patterns
district: network
threat: 2
threat_source: lecture
lives_at:
---

## Baseline
What it is: The named shapes a network design can take. A scenario describes requirements; the answer is the shape that fits.
- Hub-and-spoke: everything connects through one central network. Central control, simple admin, security policy enforced at the hub, grow by adding spokes. Spokes can be VPCs, offices or data centres.
- Three ways to build it: VPC Network Peering (low latency, but spokes can't reach each other through the hub), Cloud VPN (works across anything, more latency and setup), Network Connectivity Center (managed; see `network-connectivity-center`).
- Mesh: nodes link to each other directly. Full mesh: every node to every node. Partial mesh: only chosen nodes, e.g. between regions for failover. Several paths means no single point of failure, at the cost of more links to manage.
- Mirrored: a replica of an environment's design somewhere else. A DR standby ready to take over, or a test/dev copy of production where nothing done in it touches production.
- Gated: traffic across the boundary between Google Cloud and on-prem or another cloud is controlled at a gate. Gated egress controls outbound from the cloud, gated ingress controls inbound, gated ingress and egress controls both.
- Google's architecture docs use the same names for hybrid and multicloud patterns (mirrored, meshed, gated, plus handover, which the course skips). There, mirrored assumes test and production don't talk to each other.
- Network design considerations the course keeps returning to: scalability, security, compliance, performance, cost.
Like what I know: App architecture shapes. Hub-and-spoke is a central store every component talks to; mesh is components calling each other directly; gated is an API gateway in front of everything.

## Isolate
Pick it when: The scenario asks which topology fits. Match the requirement:
- Dispersed sites or networks, isolated from each other, centrally managed, all needing to communicate: hub-and-spoke.
- Strict security, sensitive data isolated, communication between segments limited: gated ingress and egress.
- Mission-critical, must survive a link or node failing: mesh.
- DR standby or a test environment identical to production: mirrored.
Not it when (use a product card instead): The question is how to build the link, not which shape. Then it's `network-connectivity-center`, `network-shared-vpc-peering` or `network-hybrid-connectivity`.

## Execute
What I built: Course lab, 2026-11-27. The hub-and-spoke build is on `network-connectivity-center`.

## Missed
