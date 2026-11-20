---
name: Google Kubernetes Engine
district: compute
threat: 3
threat_source: estimate
lives_at: zonal or regional
---

## Baseline
What it is: Google-managed Kubernetes. GKE runs the control plane; nodes are Compute Engine VMs. Sits between PaaS automation and IaaS control.
- Pod: the smallest deployable unit. One or more containers that share network and storage and are deployed together.
- Declarative: describe the desired state (5 replicas) in config, kubectl apply, Kubernetes makes it so.
- Autopilot (recommended): Google manages nodes, scaling, upgrades and security; you pay for what pods request. Standard: you manage node pools and pay per node.
- Zonal cluster: control plane in one zone. Regional cluster: control plane and nodes replicated across zones.
- Built in: node auto-repair, auto-upgrade, cluster autoscaler, Cloud Logging and Monitoring.
Like what I know:

## Isolate
Pick it when: Many containerized services that need Kubernetes features: custom networking, stateful workloads, sidecars, or portability to other Kubernetes environments (hybrid, multicloud).
Not it when (use Cloud Run instead): Stateless containers serving HTTP requests, where you don't need Kubernetes control.

## Execute
What I built:

## Missed
