---
name: Cloud Router
district: network
threat: 2
threat_source: lecture and lab
lives_at: regional
---

## Baseline
What it is: A managed BGP speaker for a VPC. It swaps routes with the router at the other end of a VPN tunnel or Interconnect attachment, so each side learns the other's subnets automatically instead of someone editing static routes.
- BGP (Border Gateway Protocol): how separate networks tell each other which IP ranges they can reach. Each side has an ASN (the network's ID number; private ones run 64512 to 65534) and the two hold a BGP session.
- Regional, and belongs to one VPC. Traffic doesn't pass through it: it only programs routes.
- Dynamic routing mode is a setting on the VPC. Regional (the default): the router advertises and learns routes only for its own region. Global: it advertises subnets from every region, and learned routes apply everywhere. One VPN or Interconnect serving VMs in several regions needs global.
- The BGP session runs on a pair of link-local addresses from 169.254.0.0/16, one per end, outside both networks' address space.
- A new subnet on either side is advertised by itself with nothing to change on the tunnel. Lecture example: a new Staging subnet in the cloud and a new 10.0.30.0/24 on-prem, usable at once.
- Required by HA VPN and by Dedicated and layer 2 Partner Interconnect. Cloud NAT also sits on a Cloud Router but uses no BGP.
- Custom route advertisements send extra ranges, or only chosen ones, instead of every subnet. Route priorities set active/active or active/passive across tunnels.
- The on-prem device must speak BGP.
Like what I know: Service discovery instead of a hard-coded hosts file: each side announces what it has and the other updates itself.

## Isolate
Pick it when: On-prem and cloud networks keep changing and the routes should follow by themselves. Mandatory with HA VPN and Interconnect.
Not it when (use static routes instead): One fixed route to an unchanging range, e.g. a Classic VPN tunnel to a small site whose device doesn't speak BGP.
- 'VMs in another region can't be reached over the VPN' is a routing mode question: switch the VPC to global dynamic routing.

## Execute
What I built: Course lab (Elastic Infrastructure: HA VPN), date to add. One Cloud Router per VPC (`vpc-demo-router1` ASN 65001, `on-prem-router1` ASN 65002), an interface and a BGP peer per tunnel, then global dynamic routing on `vpc-demo` so the us-west1 subnet was advertised too. Commands are on the `network-hybrid-connectivity` card. A third router, `nat-router-us1`, only hosted Cloud NAT (`network-cloud-nat`).

```bash
gcloud compute routers describe vpc-demo-router1 --region us-east1
gcloud compute networks describe vpc-demo     # routingConfig: routingMode: GLOBAL
```

## Missed
