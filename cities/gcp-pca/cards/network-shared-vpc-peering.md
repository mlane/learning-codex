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
- A peering shows INACTIVE until the matching configuration exists on the other side, then ACTIVE.
- Deleting one side ends the whole peering: the other side drops to INACTIVE and all peering routes disappear.
- Compute Engine internal DNS names don't work across peered networks. Reach the VM by its IP.
- Avoids the latency, security and cost drawbacks of external IPs or VPNs.
- The cost part: traffic between external IPs is charged as egress even inside the same zone. Peered networks use internal IPs and avoid that; normal network pricing still applies.
- Works with Compute Engine, GKE and App Engine flexible.
- You can peer with a Shared VPC network, and peer two Shared VPC networks with each other.

From the Elastic Infrastructure lecture:
- Vocabulary: a project in a Shared VPC setup is a host project or a service project. One that is neither is a standalone project, and an unshared network is a standalone VPC network.
- Shared VPC is the centralised model: security and network policy live in one designated network. Peering is the decentralised one: each network keeps its own admins, firewall and routing tables.
- Forced choices: different organizations, or two VPCs in the same project, means peering. Shared VPC only works across projects within one organization.
- When peering runs out (not transitive, per-network peering limits): Network Connectivity Center with VPC spokes gives hub and spoke between many VPCs. See `network-connectivity-center`.

From the Network Architecture lecture:
- Hub-and-spoke can be built three ways: VPC peering, Cloud VPN or Network Connectivity Center. With peering the spokes still can't reach each other through the hub. Patterns are on `network-topology-patterns`.
- Scaling pattern: keep the VPN or Interconnect in one dedicated VPC, peer the other VPCs to it, and export custom routes over the peering so every VPC learns the on-prem routes from one place.
Like what I know: Shared VPC: one platform team owns the shared config in a monorepo and product teams build inside it. Peering: two separate repos that agree to consume each other's packages.

## Isolate
Pick it when: One organization wants central control of the network across many projects: Shared VPC.
Not it when (use VPC Network Peering instead): Connecting networks owned by different teams or organizations that should stay independently managed. Also the only choice of the two for different organizations, or for two VPCs in the same project.
- One network reaching services in two other organizations over internal IPs: peer with each directly. Those two still can't reach each other through it.

## Execute
What I built: Course lab, 2026-11-24. Peered `mynetwork` and `privatenet` in one project with `peering-1-2` and `peering-2-1`. Before: from `mynet-us-vm`, the external IP of `privatenet-us-vm` answered a ping, the internal IP gave 100% loss. After both sides were ACTIVE: internal pings worked both ways and Routes showed the peering as next hop for each subnet, but `ping mynet-us-vm` by name failed. Deleted `peering-1-2`: the other side went INACTIVE, the routes vanished and the internal ping failed again. Built in the console; the CLI form below is not yet run.

```bash
gcloud compute networks peerings create peering-1-2 \
  --network=mynetwork --peer-network=privatenet
gcloud compute networks peerings create peering-2-1 \
  --network=privatenet --peer-network=mynetwork

gcloud compute networks peerings list
gcloud compute networks peerings delete peering-1-2 --network=mynetwork
```

## Missed
