---
name: Bare Metal Solution
district: migrate
threat: 1
threat_source: trainer sheet
lives_at: regional extension
---

## Baseline
What it is: Dedicated physical servers that Google hosts in facilities next to its regions (regional extensions), linked to your VPC over a low-latency connection. For workloads that can't run on virtual machines, mainly Oracle databases whose licensing or certification is tied to specific hardware.
- You manage the OS, the database and the licences. Google manages the hardware, power, network and facility.
- Reaches Google Cloud through Partner Interconnect, so apps on Compute Engine or GKE sit close to the database.
- Status check (2026): it is moving to an allowlist-only model, and Google steers Oracle customers to Oracle Database@Google Cloud (Oracle-run Exadata inside Google data centres). Older exam material still presents Bare Metal Solution as the Oracle answer.
Like what I know: Colocation, rented from Google.

## Isolate
Pick it when: A specialised workload, typically Oracle, needs certified non-virtualised hardware and must sit close to apps moving to Google Cloud.
Not it when (use Compute Engine or Cloud SQL instead): The database is MySQL, PostgreSQL or SQL Server, or the software runs fine on VMs. For per-core licences that only need a dedicated host, sole-tenant nodes.

## Execute
What I built:

## Missed
