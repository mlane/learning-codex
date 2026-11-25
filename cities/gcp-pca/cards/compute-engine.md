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
- Availability policy: on host maintenance a VM live-migrates by default (keeps running while Google patches the host); automatic restart brings it back after a crash. VMs with GPUs can't live-migrate and are stopped instead.
- Repeatable VMs: a startup script (metadata) configures the VM at boot; a custom image bakes the software in; an instance template records the whole recipe for a managed instance group.
- A stopped VM costs nothing for CPU and memory but still pays for its disks and reserved static IPs. Changing machine type needs the VM stopped.
- OS Login ties SSH access to IAM instead of scattered SSH keys. Shielded VM (secure boot, vTPM) protects the boot chain; Confidential VM encrypts memory while in use.
- Patching at scale: VM Manager (OS patch management, OS inventory, OS policies). The exam guide lists patch management under configuring compute.
- A reservation guarantees capacity in a zone; a committed-use discount only guarantees price. Rightsizing recommendations appear after about a week of metrics.
Like what I know: A VPS or an EC2 instance: a server I SSH into and maintain myself.

## Isolate
Pick it when: You need full OS control: lift-and-shift, specific OS or licensing, legacy software, GPUs, or software that won't containerize.
Not it when (use GKE or Cloud Run instead): The app is containerized and you'd rather not manage VMs and OS patching.

## Execute
What I built:

## Missed
