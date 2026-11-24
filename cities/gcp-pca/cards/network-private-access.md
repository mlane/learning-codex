---
name: Private Google Access and Private Service Connect
district: network
threat: 2
threat_source: estimate
lives_at: regional (subnet setting or endpoint)
---

## Baseline
What it is: Ways for resources with only internal IPs to reach services privately. Three names that sound alike:
- Private Google Access: a setting on a subnet. VMs without external IPs reach Google APIs and services (Cloud Storage, BigQuery). On-prem hosts can use it too, over VPN or Interconnect.
- Private Service Connect: an endpoint with an internal IP inside your own VPC that leads to one service, either Google APIs or a service published from another VPC (Google's, a vendor's or another team's).
- Private services access: a private connection (VPC peering underneath) to Google-managed services that live in a VPC, such as Cloud SQL and Memorystore.
- The comparison table is "Private access options for services" in the VPC docs (the trainer's link).
Like what I know:

## Isolate
Pick it when: VMs without external IPs only need Google APIs: Private Google Access.
Not it when (use Private Service Connect instead): You want the service on an internal IP you control, or need a service published in another VPC or organization without peering the networks. For internet destinations, Cloud NAT.

## Execute
What I built:

## Missed
