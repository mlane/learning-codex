---
name: Compute Engine
district: compute
threat: 3
threat_source: trainer sheet
lives_at: zonal
---

## Baseline
What it is: IaaS virtual machines. You pick machine type, OS image, disks and network; you manage the OS and everything on it.
- Machine families: general-purpose, compute-optimized, memory-optimized, accelerator (GPUs). Custom machine types when presets don't fit.
- Per-second billing (1-minute minimum). Sustained-use discounts apply automatically on some machine series; committed-use discounts (1 or 3 years) for steady workloads.
- A VM lives in one zone. For high availability, use managed instance groups across zones.
Like what I know:

## Isolate
Pick it when: You need full OS control: lift-and-shift, specific OS or licensing, legacy software, GPUs, or software that won't containerize.
Not it when (use GKE or Cloud Run instead): The app is containerized and you'd rather not manage VMs and OS patching.

## Execute
What I built:

## Missed
