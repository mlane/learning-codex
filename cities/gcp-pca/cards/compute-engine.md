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
- Network bandwidth is set per VM by vCPU count (about 2 Gbps per vCPU, up to the machine series' cap). More memory doesn't raise it and neither do extra network interfaces. Egress to external IPs has a lower cap (7 Gbps on most series).
- The letter isn't the family: C3 and C4 are general-purpose, C2 and C2D are compute-optimized. Know the families, not every series.
- If security blocks SSH (no firewall allow for tcp:22), operations still manage VMs through IAM roles and gcloud.
Like what I know:

## Isolate
Pick it when: You need full OS control: lift-and-shift, specific OS or licensing, legacy software, GPUs, or software that won't containerize.
Not it when (use GKE or Cloud Run instead): The app is containerized and you'd rather not manage VMs and OS patching.

## Execute
What I built:

## Missed
