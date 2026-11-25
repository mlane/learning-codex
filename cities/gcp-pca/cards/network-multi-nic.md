---
name: Multiple network interfaces
district: network
threat: 2
threat_source: estimate
lives_at: zonal
---

## Baseline
What it is: One VM with several network interfaces (NICs), each in a different VPC network, so the VM sits in all of them at once and can pass or inspect traffic between them.
- Each NIC must be in a different VPC, and the subnets' IP ranges can't overlap.
- The VPCs and subnets must exist before the VM is created.
- NICs are set at creation only. You can't add one later, or delete one without deleting the VM.
- Limits: up to 2 vCPUs gives 2 NICs. Above that, one NIC per vCPU, maximum 8.
- Only nic0 gets the default route, and internal DNS resolves the VM's name to nic0. The other NICs only reach their own directly connected subnet unless you add policy routing.
- Extra NICs don't add bandwidth: the egress cap is per VM, set by vCPU count.
- Trainer: a self-built inspection appliance is the cheap option but yours to maintain. Managed or third-party inspection (Palo Alto and similar) is easier and costs more.
Like what I know: A laptop on Wi-Fi and Ethernet at once: one machine, a leg in two networks.

## Isolate
Pick it when: One VM must act as a network appliance or gateway between networks (firewall, IDS/IPS, WAF, load balancer), or the scenario wants strong traffic separation such as management plane versus data plane.
Not it when (use VPC Network Peering or Shared VPC instead): Two networks simply need to talk over internal IPs. No appliance is needed for that.

## Execute
What I built: Course lab, 2026-11-23. `vm-appliance` (e2-standard-4) with three NICs: privatenet, managementnet and mynetwork. It could ping VMs on all three directly connected subnets, but not `mynet-notus-vm`, whose subnet in another region wasn't in its routing table, so the ping left on nic0 into the wrong network. Built in the console; the CLI form below is not yet run.

```bash
gcloud compute instances create vm-appliance \
  --zone=$ZONE --machine-type=e2-standard-4 \
  --network-interface=subnet=privatesubnet-us \
  --network-interface=subnet=managementsubnet-us \
  --network-interface=subnet=mynetwork

# inside the VM
sudo ifconfig     # one interface per NIC: ens4, ens5, ens6
ip route          # default route is on ens4 (nic0) only
```

## Missed
