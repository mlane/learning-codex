---
name: Network Connectivity Center
district: network
threat: 2
threat_source: lecture and lab
lives_at: global
---

## Baseline
What it is: Google's managed hub-and-spoke. One hub resource, and networks attach to it as spokes; the hub shares routes between them, so you stop wiring pairs of networks together by hand.
- VPC spokes: whole VPC networks. They exchange subnet routes through the hub, so spokes reach each other. Spokes can live in other projects, even another organization.
- Hybrid spokes: on-prem or other-cloud connections. Three kinds: HA VPN tunnels, Cloud Interconnect VLAN attachments, router appliance VMs.
- Router appliance: a Compute Engine VM running a partner's router image or your own (an SD-WAN device, say). It peers with Cloud Router over BGP.
- Preset topology, chosen when the hub is created and fixed after that. Mesh (the default): every spoke reaches every other spoke. Star: spokes go into a center group or an edge group; edge spokes reach the center but not each other.
- The lecture and lab call the result 'hub-and-spoke', but the lab used the Mesh preset: both spoke VPCs could reach each other. Isolation between spokes needs Star.
- IP ranges across the spokes can't overlap.
- A VPC can be a spoke and also be peered with a non-spoke VPC, but the hub doesn't extend connectivity to that peered network.
- Firewall rules still apply in each VPC; the hub only moves routes.
- Lecture says IPv6 isn't supported on hybrid spokes. Current docs show it in Preview. Don't memorise either way.
Like what I know: An event bus instead of point-to-point integrations: each service connects once to the bus, not once to every other service.

## Isolate
Pick it when: Many VPCs must reach each other, or VPCs and several on-prem sites need one centrally managed place for connectivity. 'Transitive' or 'reduce the number of peerings' in a scenario points here.
Not it when (use VPC Network Peering instead): Two or three VPCs just need internal IPs to each other; peering is simpler and has no hub to pay for. One organization wanting a single centrally run network: Shared VPC (`network-shared-vpc-peering`).
- Spokes must be isolated from each other but share central services: NCC with the Star preset.

## Execute
What I built: Course lab (Network Architecture: hub-and-spoke with NCC), 2026-11-27. Two VPCs already there (`spoke1-vpc`, `spoke2-vpc`) with ICMP and SSH/RDP firewall rules. Made `spoke1-vm` and `spoke2-vm`; a ping between their internal IPs gave 100% loss. Created hub `my-hub` (Mesh topology) with two VPC spokes, `spoke1` and `spoke2`. The same pings then worked both ways. Looked at the result in Network Topology (`network-intelligence-center`). Built in the console; the CLI form below is not yet run.

```bash
gcloud network-connectivity hubs create my-hub --preset-topology=mesh
gcloud network-connectivity spokes linked-vpc-network create spoke1 \
  --hub=my-hub --vpc-network=spoke1-vpc --global
gcloud network-connectivity spokes linked-vpc-network create spoke2 \
  --hub=my-hub --vpc-network=spoke2-vpc --global
```

## Missed
