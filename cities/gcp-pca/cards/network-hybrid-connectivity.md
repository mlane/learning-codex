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
- Dedicated Interconnect: private physical connections to Google at a colocation facility. The smallest circuit is 10 Gbps (then 100 and 400), so it's oversized and overpriced for a 1 Gbps need. 99.99% SLA needs four connections, two in each of two metros, each pair in different edge availability domains; 99.9% needs two in one metro (different domains); one connection has no SLA. Up to 8 circuits per connection (the lecture's '2 x 100 Gbps' is out of date).
- Partner Interconnect: the same idea through a service provider, 50 Mbps to 50 Gbps. Up to 99.99%, but Google only covers its side.
- Cross-Cloud Interconnect: dedicated link to another cloud provider, for multicloud.
- Interconnect traffic isn't encrypted by default. Add MACsec or HA VPN over Interconnect if required.
- Direct and Carrier Peering reach Google's public services (Workspace, APIs), not your VPC. No SLA.
- Both Interconnects meet Google in a colocation facility; you never plug into a Google data centre. Dedicated: your own router is there. Partner: the provider's is, and the provider carries you the rest of the way.
- Cross-Cloud Interconnect is a Dedicated Interconnect with the ports already in place on the other cloud's side. 10 or 100 Gbps.
- There is no "Hybrid Interconnect" product. Distractor.

Cloud VPN detail:
- A VPN joins two trusted networks through an untrusted one (the internet) with an encrypted tunnel: one gateway encrypts, the other decrypts. Site to site only; no client software dialling in.
- Classic VPN: one interface, one external IP, 99.9% SLA. Static routes only now: BGP on Classic VPN was retired in August 2025, though the lecture still says it does both.
- HA VPN: two interfaces, each with an external IP that Google picks from a different pool. BGP only. 99.99% when both interfaces carry tunnels; one active interface works but loses that SLA.
- HA VPN peer shapes: two peer devices with one tunnel each (`TWO_IPS_REDUNDANCY`), one device with two IPs, or one device with one IP. To AWS: four tunnels, two per interface; only a transit gateway supports ECMP (traffic spread equally across tunnels). VPC to VPC: an HA VPN gateway in each, interface 0 to interface 0 and 1 to 1.
- Route priorities decide active/active or active/passive.
- A gateway is regional. Each tunnel carries roughly 1 to 3 Gbps (250,000 packets per second); more bandwidth means more tunnels.
- A connection needs a tunnel defined from each side before traffic passes. The on-prem gateway's MTU can't exceed 1460 bytes, because of the encapsulation.

Choosing (the lecture's flow):
- Interconnect and VPN reach internal (RFC 1918) addresses in your VPC, with an SLA. Peering reaches Google's public addresses (Workspace, YouTube, APIs), with none: Direct Peering if you meet Google's requirements, Carrier Peering if not. Google recommends Interconnect over peering.
- Extending your network to a VPC: can you meet Google in a colocation facility? Yes: Dedicated. No: Partner or VPN.
- VPN when the need is modest bandwidth, short term or a trial, with encryption built in. Otherwise Partner.
- Partner layer 2: you run BGP yourself with Cloud Router. Layer 3: the provider handles the routing.
- Dedicated is the wrong pick when 10 Gbps is too much or you can't supply your own encryption. HA VPN over Cloud Interconnect gives Google-managed encryption on a private link.
- Cross-Cloud Interconnect covers AWS, Azure, Oracle Cloud and Alibaba Cloud. Google supports the link up to the other provider's edge and can't open a ticket with them for you. Another cloud with no big bandwidth need: HA VPN.
- All of these exchange routes over BGP through a Cloud Router: see `network-cloud-router`.
Like what I know: Cloud VPN is the company VPN, but joining two sites instead of one laptop. Interconnect is a leased line.

## Isolate
Pick it when: Mission-critical, high-bandwidth private link, and you can reach a Google colocation facility: Dedicated Interconnect.
Not it when (use Partner Interconnect or Cloud VPN instead): You can't reach a colocation facility or need less bandwidth (Partner). Cheap, quick and encrypted over the internet (HA VPN).
- Private connection, about 1 Gbps, lowest cost: Partner Interconnect. VPN isn't private; Dedicated starts at 10 Gbps.

## Execute
What I built: Course lab (Elastic Infrastructure: HA VPN), date to add. Two VPCs: `vpc-demo` (subnets in us-east1 and us-west1) and `on-prem` (a stand-in data centre, us-east1). An HA VPN gateway and a Cloud Router in each (ASN 65001 and 65002), two tunnels per gateway (interface 0 to 0, 1 to 1), then a router interface and BGP peer per tunnel on 169.254.x.x/30 addresses. From `on-prem-instance1` the us-east1 VM (10.1.1.2) answered a ping; the us-west1 VM (10.2.1.2) only answered after `vpc-demo` was switched to global dynamic routing. Deleted `vpc-demo-tunnel0`: the other end showed a broken handshake and pings carried on over the second tunnel.

```bash
gcloud compute vpn-gateways create vpc-demo-vpn-gw1 --network vpc-demo --region us-east1
gcloud compute routers create vpc-demo-router1 --region us-east1 --network vpc-demo --asn 65001

gcloud compute vpn-tunnels create vpc-demo-tunnel0 \
  --peer-gcp-gateway on-prem-vpn-gw1 --region us-east1 --ike-version 2 \
  --shared-secret [SHARED_SECRET] --router vpc-demo-router1 \
  --vpn-gateway vpc-demo-vpn-gw1 --interface 0

gcloud compute routers add-interface vpc-demo-router1 \
  --interface-name if-tunnel0-to-on-prem --ip-address 169.254.0.1 --mask-length 30 \
  --vpn-tunnel vpc-demo-tunnel0 --region us-east1
gcloud compute routers add-bgp-peer vpc-demo-router1 \
  --peer-name bgp-on-prem-tunnel0 --interface if-tunnel0-to-on-prem \
  --peer-ip-address 169.254.0.2 --peer-asn 65002 --region us-east1

gcloud compute networks update vpc-demo --bgp-routing-mode GLOBAL
gcloud compute vpn-tunnels describe vpc-demo-tunnel0 --region us-east1   # Tunnel is up and running
```

- Repeat tunnel, interface and peer for interface 1, then mirror all of it on the `on-prem` side.
- Each side also needs a firewall rule allowing the other side's subnet ranges.

## Missed
