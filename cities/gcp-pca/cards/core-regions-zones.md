---
name: Regions and zones
district: core
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is: Where resources physically run. A region is a geographic area (us-central1) made up of zones (us-central1-a). Every resource is zonal, regional or global, and that scope decides what one failure can take down.
- Several zones in one region: survives a zone failure, with low latency between parts.
- Several regions: closer to users worldwide, and survives a whole-region outage.
- Region choice also answers data residency and compliance requirements.
- Scope examples. Zonal: VM, zonal disk, zonal MIG. Regional: subnet, regional MIG, Cloud SQL instance, Cloud Run service, Cloud NAT, Cloud VPN gateway, Cloud Router. Global: VPC network, firewall rules, images, snapshots, global load balancer, Pub/Sub, IAM.
- Multi-region is a location type some services offer (Cloud Storage, BigQuery, Spanner, Firestore): Google replicates across regions for you.
- Choosing a region: latency to users, data residency law, price (it varies by region), which services and machine types exist there, carbon footprint.
- A zone is a deployment area inside a region, not one building. Treat it as a single failure domain.
Like what I know: AWS regions and availability zones: same idea. Or CDN regions, except here I choose where things run.

## Isolate
Pick it when: Surviving a zone failure is enough: spread across zones in one region (regional MIGs, regional GKE, Cloud SQL HA).
Not it when (use multiple regions instead): The scenario mentions region-wide outages, disaster recovery, or users on several continents.

## Execute
What I built:

## Missed
