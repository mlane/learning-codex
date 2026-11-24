---
name: Compliance and shared responsibility
district: security
threat: 2
threat_source: session 4
lives_at:
---

## Baseline
What it is: Who secures what, and which standards the platform helps you meet.
- Shared responsibility: Google secures the infrastructure; you secure your configuration, access and data. The more managed the service, the more of the work is Google's.
- So the order of preference is serverless first, then fully managed, then VMs. VMs leave the most to configure and the most to get wrong.
- Covered at baseline (trainer's list): ISO 27001, SOC 2, PCI DSS, FIPS 140-2.
- Needs extra work from you: HIPAA (healthcare APIs and services help) and FedRAMP.
- No separate government regions, unlike AWS and Azure. Assured Workloads applies compliance controls inside the standard regions.
- Zero trust (BeyondCorp) pieces to recognise: IAP, VPC Service Controls, Sensitive Data Protection, Cloud Armor, Security Command Center.
Like what I know:

## Isolate
Pick it when: The scenario names a regulation (HIPAA, PCI DSS, FedRAMP) or a data residency rule. Start from what Google already covers, then add the controls that are yours.
Not it when (use Organization Policy instead): The need is only to restrict where or what can be created, with no named standard behind it.

## Execute
What I built:

## Missed
