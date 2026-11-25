---
name: Filestore
district: data
threat: 1
threat_source: estimate
lives_at: zonal or regional
---

## Baseline
What it is: Managed network file storage (NFS). A file share with folders and files that many VMs or GKE pods mount at the same time and use like a local directory.
- Tiers: Basic (HDD or SSD, one zone, simple shares; now labelled legacy), Zonal (more capacity and performance), Regional (replicated across zones), Enterprise (regional, for critical apps). New instances: Zonal or Regional.
- Sits on a VPC network and is reached over internal IPs. Capacity is provisioned up front, so it costs more per GB than Cloud Storage.
- Backups on every tier; snapshots on all but Basic.
- GKE: the Filestore CSI driver gives pods a volume that many pods can write at once (ReadWriteMany), which an ordinary disk can't.
- A parallel file system for HPC or AI training is Managed Lustre, not Filestore.
Like what I know: A shared network drive (NAS) mounted by several machines.

## Isolate
Pick it when: A lift-and-shift app that expects a shared file system: content management, shared home directories, rendering, legacy apps that write to a common folder.
Not it when (use Cloud Storage instead): Objects served over HTTP or kept cheaply at scale. For a disk used by one VM, Persistent Disk or Hyperdisk.

## Execute
What I built:

## Missed
