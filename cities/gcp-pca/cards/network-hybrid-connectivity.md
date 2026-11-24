---
name: Cloud VPN and Interconnect
district: network
threat: 3
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Ways to connect a VPC to on-prem or another cloud.
- Cloud VPN: IPsec tunnels over the internet, encrypted, through Cloud Router. HA VPN has a 99.99% SLA. Limited by internet bandwidth. Encrypted but not a private circuit, so "private connection" in a scenario rules it out.
- Dedicated Interconnect: private physical connections to Google at a colocation facility. The smallest circuit is 10 Gbps (then 100 and 400), so it's oversized and overpriced for a 1 Gbps need. 99.99% SLA needs four connections across two regions; 99.9% needs two in one metro; one connection has no SLA.
- Partner Interconnect: the same idea through a service provider, 50 Mbps to 50 Gbps. Up to 99.99%, but Google only covers its side.
- Cross-Cloud Interconnect: dedicated link to another cloud provider, for multicloud.
- Interconnect traffic isn't encrypted by default. Add MACsec or HA VPN over Interconnect if required.
- Direct and Carrier Peering reach Google's public services (Workspace, APIs), not your VPC. No SLA.
- Both Interconnects meet Google in a colocation facility; you never plug into a Google data centre. Dedicated: your own router is there. Partner: the provider's is, and the provider carries you the rest of the way.
- Cross-Cloud Interconnect is a Dedicated Interconnect with the ports already in place on the other cloud's side. 10 or 100 Gbps.
- There is no "Hybrid Interconnect" product. Distractor.
Like what I know:

## Isolate
Pick it when: Mission-critical, high-bandwidth private link, and you can reach a Google colocation facility: Dedicated Interconnect.
Not it when (use Partner Interconnect or Cloud VPN instead): You can't reach a colocation facility or need less bandwidth (Partner). Cheap, quick and encrypted over the internet (HA VPN).
- Private connection, about 1 Gbps, lowest cost: Partner Interconnect. VPN isn't private; Dedicated starts at 10 Gbps.

## Execute
What I built:

## Missed
