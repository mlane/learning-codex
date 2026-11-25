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
- Private Google Access changes nothing for a VM that has an external IP; it already reaches Google APIs.
- From on-prem: route `private.googleapis.com` (199.36.153.8/30), or `restricted.googleapis.com` (199.36.153.4/30, only services VPC Service Controls supports), over VPN or Interconnect.
- Private Service Connect in producer and consumer terms: the producer publishes a service attachment, the consumer creates an endpoint (an internal IP) in their own VPC. No peering, so overlapping IP ranges don't matter and nothing else in either network is exposed. Named in the exam guide.
- Serverless reaching into a VPC is a different thing again: Direct VPC egress or Serverless VPC Access.
Like what I know: Calling an internal API over the corporate network instead of through its public URL.

## Isolate
Pick it when: VMs without external IPs only need Google APIs: Private Google Access.
Not it when (use Private Service Connect instead): You want the service on an internal IP you control, or need a service published in another VPC or organization without peering the networks. For internet destinations, Cloud NAT.

## Execute
What I built:

## Missed
