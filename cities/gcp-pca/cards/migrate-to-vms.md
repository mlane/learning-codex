---
name: Migrate to Virtual Machines
district: migrate
threat: 1
threat_source: trainer sheet
lives_at: regional
---

## Baseline
What it is: The lift-and-shift tool: copies whole virtual machines from elsewhere into Compute Engine without changing the application.
- Sources: VMware vSphere on-prem, AWS EC2, Azure VMs and Google Cloud VMware Engine. It also imports virtual disk images.
- How: disks replicate continuously in the background while the source keeps running, a test clone tries the VM out in Google Cloud, then a short cutover. The source is untouched, so rolling back is possible.
- Move in waves: groups of VMs that belong together (an app and its dependencies), least critical first.
- The result is a normal Compute Engine VM that you still patch. Modernising (containers, managed databases) is a later step; Migrate to Containers handles the container part.
Like what I know: Moving a legacy app to a new host without rewriting any of it.

## Isolate
Pick it when: Many VMs must move quickly with no application changes, for example when a data centre lease is ending (EHR Healthcare).
Not it when (use Google Cloud VMware Engine instead): The team wants to keep running VMware itself (vCenter, NSX, its existing tooling) instead of converting the VMs. For databases, Database Migration Service.

## Execute
What I built:

## Missed
