---
name: Sole-tenant nodes
district: compute
threat: 2
threat_source: trainer sheet
lives_at: zonal
---

## Baseline
What it is: A physical Compute Engine server reserved for your project alone. Your VMs run on it and nobody else's do. They are still ordinary VMs; you just control which hardware they land on.
- A node template defines the server type; a node group is a set of those servers. VMs are steered onto them with node affinity labels.
- Main reasons: bring-your-own licences counted per physical core or socket (Windows Server, SQL Server, Oracle), and compliance or security rules that demand physical isolation from other customers.
- The maintenance policy can keep VMs on the same physical server or move them only within the node group, which per-core licences often require.
- You pay for the whole node plus a sole-tenancy premium, full or not. CPU overcommit packs more VMs onto it.
- Migration Center can build a TCO report with sole-tenant nodes as the target.
Like what I know: A dedicated server instead of shared hosting.

## Isolate
Pick it when: Licensing tied to physical cores or sockets, or a rule that workloads can't share hardware with other tenants.
Not it when (use standard Compute Engine VMs instead): Isolation at VM level is enough, which it is for most workloads. If the software can't run on a VM at all, Bare Metal Solution.

## Execute
What I built:

## Missed
