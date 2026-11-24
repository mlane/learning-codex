---
name: VPC Service Controls
district: security
threat: 2
threat_source: estimate
lives_at: organization
---

## Baseline
What it is: A service perimeter around projects and the Google-managed services in them (Cloud Storage, BigQuery and others). API calls that cross the perimeter are blocked unless a rule allows them, even when IAM would allow them. The defence against data exfiltration.
- IAM decides who. VPC Service Controls decides from where: stolen credentials used from outside the perimeter don't work.
- Access levels and ingress and egress rules open controlled paths across. Dry-run mode tests a perimeter before enforcing it.
- Trainer: one of the fundamentals to know.
Like what I know:

## Isolate
Pick it when: The worry is data leaving: exfiltration from managed services, or a compliance boundary around sensitive data.
Not it when (use VPC firewall rules instead): Controlling network traffic between VMs. VPC Service Controls guards Google APIs, not packets.

## Execute
What I built:

## Missed
