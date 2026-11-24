---
name: Shared VPC and VPC peering
district: network
threat: 3
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Two ways to connect networks across projects.
- Shared VPC: a host project owns the VPC; service projects in the same organization put resources in its subnets. Network admins keep central control; app teams manage their own resources.
- VPC Network Peering: links two separate VPCs (different projects or even organizations) over internal IPs. Each side stays independently managed. Not transitive: A-B and B-C doesn't give A-C. IP ranges can't overlap.

Shared VPC (centralized):
- Same organization only, and only across projects. Also called XPN in the API and CLI.
- Roles, top down: Organization Admin nominates a Shared VPC Admin (`compute.xpnAdmin`). The Shared VPC Admin enables the host project, attaches service projects and grants Network User on specific subnets. Service project admins need at least `compute.instanceAdmin` to create VMs in the shared subnets.
- Billing for a resource goes to the service project that created it, not the host.

VPC Network Peering (decentralized):
- Works between VPCs in the same project, the same organization or different organizations.
- Both sides must create a peering configuration; nothing connects until each has one for the other. Needs the Network Admin role, plus the other network's name and, if it's elsewhere, its project ID.
- Each network keeps its own firewall rules, routes and admins. Firewall rules on each side still decide what traffic passes.
- Subnet routes are exchanged automatically. Custom and dynamic routes (from VPN or Interconnect) only move if one side exports and the other imports. Local routes win over routes learned through peering.
- Avoids the latency, security and cost drawbacks of external IPs or VPNs.
- Works with Compute Engine, GKE and App Engine flexible.
- You can peer with a Shared VPC network, and peer two Shared VPC networks with each other.
Like what I know:

## Isolate
Pick it when: One organization wants central control of the network across many projects: Shared VPC.
Not it when (use VPC Network Peering instead): Connecting networks owned by different teams or organizations that should stay independently managed. Also the only choice of the two for different organizations, or for two VPCs in the same project.
- One network reaching services in two other organizations over internal IPs: peer with each directly. Those two still can't reach each other through it.

## Execute
What I built:

## Missed
