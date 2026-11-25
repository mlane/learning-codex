---
name: Persistent Disk
district: compute
threat: 3
threat_source: trainer sheet
lives_at: zonal or regional
---

## Baseline
What it is: Durable network block storage for VMs. The disk is a separate resource from the VM, so the data survives a stop, a crash or deleting the VM. Two generations: Persistent Disk (older) and Hyperdisk (newer, recommended, and the only choice on the latest machine series).
- Persistent Disk types, cheapest to fastest: standard (`pd-standard`, HDD), balanced (`pd-balanced`, SSD, the console default), SSD (`pd-ssd`), extreme (`pd-extreme`). Performance grows with disk size and the VM's vCPU count.
- Hyperdisk: IOPS and throughput are set separately from size. Balanced for most workloads, Extreme for top-end databases, Throughput for analytics, ML for read-heavy model data shared by many VMs, Balanced High Availability for a disk replicated across two zones.
- Zonal by default. A regional disk replicates synchronously to a second zone in the same region, so a database can fail over to the other zone without losing data.
- A disk can grow at any time with no downtime (then extend the file system). It can't shrink.
- Snapshots: incremental backups stored apart from the disk, usable to create a disk in any region. Snapshot schedules automate them. An image is for booting new VMs; a snapshot is for backup.
- Encrypted at rest by default. Options: customer-managed keys in Cloud KMS (CMEK) or customer-supplied keys (CSEK).
- Sharing: several VMs can attach one disk read-only. Multi-writer needs Hyperdisk and software built for shared disks. For a shared file system, Filestore.
- The boot disk is deleted with the VM by default. Turn auto-delete off to keep it (the Application LB lab does this to build a custom image from the disk).
Like what I know: An external drive plugged into the VM over the network: unplug it and the data stays, plug it into another machine.

## Isolate
Pick it when: A VM needs a boot disk or durable block storage: databases, application data, anything that must survive the VM.
Not it when (use Local SSD instead): Temporary data that needs the lowest possible latency and can be lost. For files shared by many VMs, Filestore; for objects, Cloud Storage.

## Execute
What I built:

## Missed
