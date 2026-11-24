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
- Routes and a distributed firewall are built in; no appliances to provision.
- Subnet ranges can be expanded without downtime, not shrunk.
- Firewall rules target VMs by network tag or service account.
- VMs in one VPC reach each other across regions over internal IPs, no VPN needed.
- Separate VPCs are isolated by default: internal IPs don't cross networks, even between VMs in the same zone. Crossing needs VPC peering, VPN, or a VM with several network interfaces.
- External IPs are reachable from anywhere the firewall rules allow, whatever the network or zone.
- Every network has a default route to destinations outside it. A route alone doesn't deliver a packet; a firewall rule must also allow it.
- New projects start with a `default` auto mode network unless an organization policy prevents it.
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

## Missed
