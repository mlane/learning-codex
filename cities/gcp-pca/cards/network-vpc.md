---
name: VPC networks and subnets
district: network
threat: 3
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Your private, software-defined network in Google Cloud. The VPC is global; subnets are regional and span all zones in their region, so one subnet can hold VMs in several zones.
- Auto mode: one subnet per region made for you. Custom mode: you choose subnets and ranges (recommended for production).
- Auto mode subnets all come from 10.128.0.0/9. When a new region opens, a subnet from that block is added automatically.
- Routes and a distributed firewall are built in; no appliances to provision.
- Subnet ranges can be expanded without downtime, not shrunk.
- Firewall rules target VMs by network tag or service account.
- VMs in one VPC reach each other across regions over internal IPs, no VPN needed.
- Separate VPCs are isolated by default: internal IPs don't cross networks, even between VMs in the same zone. Crossing needs VPC peering, VPN, or a VM with several network interfaces.
- External IPs are reachable from anywhere the firewall rules allow, whatever the network or zone.
- Every network has a default route to destinations outside it. A route alone doesn't deliver a packet; a firewall rule must also allow it.
- New projects start with a `default` auto mode network unless an organization policy prevents it.
- Google reserves 4 addresses in every subnet (the first two and the last two), so a /29 has 4 usable, not 8.
- RFC 1918 private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.
- The default network has a /20 subnet in every region. Delete it in production and build a custom one.
- Prefer VMs without external IPs: smaller attack surface, lower cost, lower latency. They reach out through Cloud NAT or Private Google Access.

VPC Flow Logs:
- Record a sample of traffic to and from VMs. Off by default; turned on per subnet in the lecture and labs. Current docs also allow a whole network or organization, VLAN attachments and VPN tunnels.
- VM to VM inside one VPC is recorded from both ends, but only if both subnets have Flow Logs on.
- Each entry carries the connection's five values: source IP and port, destination IP and port, and the IANA protocol number. Plus bytes sent and which end reported it (`SRC` or `DEST`).
- No performance impact, but busy systems produce a lot of logs, and that costs money.
- Three knobs trade visibility for cost. Aggregation interval: 5 sec (default), 30 sec, 1, 5, 10 or 15 min. Sampling: 0.5 by default, from 1.0 (keep all) to 0.0 (keep none). Metadata annotations (VM names, region of external addresses): on by default, can be turned off.
- Going from 5-second to 30-second aggregation can cut log size by up to 83%.
- Uses: see where an app is accessed from to cut network cost, decide where a global load balancer helps, find IPs to block with Cloud Armor.
- They land in Cloud Logging as `vpc_flows` under the Subnetwork resource. See `ops-logging` for export, `network-intelligence-center` for Flow Analyzer (no SQL).
- Packet Mirroring is the other tool: it clones all traffic of chosen VMs, payloads and headers included, and forwards it to security software for inspection. Not sampled. The mirroring happens on the VM, so it uses extra bandwidth there. Flow Logs = sampled metadata; Packet Mirroring = full packets.

Moving a VM to another network:
- The VM must be stopped. It stays in its region and zone; only the attached network changes.
- Supported: legacy network to VPC, VPC to VPC, or subnet to subnet in one network, all in the same project. Never into a legacy network.
- Not while it's in an instance group or NEG: take it out of an unmanaged group or NEG first. A VM in a managed instance group can't be moved at all; build a new MIG from a new template.
Like what I know:

## Isolate
Pick it when: Every workload needs one. The design question is how many VPCs and which subnets.
Not it when (use Shared VPC instead): Several projects or teams need one centrally managed network.

## Execute
What I built: Course lab, 2026-11-23. Two custom mode networks (`managementnet`, `privatenet`) with their own subnets, firewall rules and VMs, next to an existing auto mode network. From `mynet-us-vm`, every external IP answered a ping, but internal IPs only answered inside the same VPC: a VM on another continent in the same network replied, a VM in the same zone on a different network didn't. See also `network-multi-nic`.

```bash
gcloud compute networks create privatenet --subnet-mode=custom
gcloud compute networks subnets create privatesubnet-us \
  --network=privatenet --region=$REGION --range=172.16.0.0/24

gcloud compute firewall-rules create privatenet-allow-icmp-ssh-rdp \
  --direction=INGRESS --priority=1000 --network=privatenet \
  --action=ALLOW --rules=icmp,tcp:22,tcp:3389 --source-ranges=0.0.0.0/0

gcloud compute instances create privatenet-us-vm \
  --zone=$ZONE --machine-type=e2-medium --subnet=privatesubnet-us

gcloud compute networks list
gcloud compute networks subnets list --sort-by=NETWORK
gcloud compute firewall-rules list --sort-by=NETWORK
gcloud compute instances list --sort-by=ZONE
```

Course lab, 2026-11-24. Custom network `vpc-net` with one subnet (`vpc-subnet`, 10.1.3.0/24) and Flow Logs on, then changed the subnet to 30-second aggregation and 25% sampling. The rest of the lab is on the `ops-logging` card. Built in the console; the CLI form below is not yet run.

```bash
gcloud compute networks subnets update vpc-subnet --region=$REGION \
  --enable-flow-logs \
  --logging-aggregation-interval=interval-30-sec \
  --logging-flow-sampling=0.25
```

## Missed
