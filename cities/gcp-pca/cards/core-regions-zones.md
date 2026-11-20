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
Like what I know:

## Isolate
Pick it when: Surviving a zone failure is enough: spread across zones in one region (regional MIGs, regional GKE, Cloud SQL HA).
Not it when (use multiple regions instead): The scenario mentions region-wide outages, disaster recovery, or users on several continents.

## Execute
What I built:

## Missed
