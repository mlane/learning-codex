---
name: Local SSD
district: compute
threat: 1
threat_source: trainer sheet
lives_at: zonal (tied to one VM)
---

## Baseline
What it is: SSD storage physically attached to the server that hosts the VM, instead of reached over the network. Very high IOPS and very low latency, but temporary: the data lives and dies with the VM.
- Survives a guest reboot and live migration. Lost when the VM is stopped, deleted or preempted, or when the host fails. (Keeping the data through a stop is in Preview and not on every machine type.)
- Fixed-size 375 GiB disks chosen when the VM is created; you can't add one afterwards. On the newer machine series it's called Titanium SSD and comes with specific `-lssd` machine types.
- No snapshots, no images, can't be detached and moved to another VM. Always encrypted.
Like what I know: The build cache or /tmp on a CI runner: very fast, gone when the machine goes.

## Isolate
Pick it when: Scratch space, caches, temp files and processing where speed matters and the data can be rebuilt, or is replicated elsewhere by the software.
Not it when (use Hyperdisk or Persistent Disk instead): The data must outlive the VM. Anything you'd be upset to lose goes on durable network disks.

## Execute
What I built:

## Missed
