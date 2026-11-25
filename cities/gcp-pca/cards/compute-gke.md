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

Workloads:
- Deployment: the object that keeps N replicas of a pod running and rolls out new versions. Service: the stable address that spreads traffic across those pods; it sits between the load balancer and the pods.
- Usually one container per pod. Extra containers are sidecars (mesh proxy, monitoring agent). Containers in a pod talk over localhost with nothing exposed, but they're now coupled, which works against microservices.
- Horizontal Pod Autoscaler adds pods (scale out). Vertical Pod Autoscaler makes pods bigger (scale up).
- Requests: what a container needs, used by the scheduler to place it. Limits: the most it may use.
- Rolling update: `maxSurge` is how many extra pods may exist above the target, `maxUnavailable` how many may be down. New pod in, old pod out, automatically; both versions run side by side for a while. Canary: send the new version to a small share (10%) first.
- PodDisruptionBudget (`minAvailable` or `maxUnavailable`): how many pods must stay up during planned disruptions such as node upgrades. Readiness probe gates traffic to a pod; liveness probe restarts it.

Autopilot or Standard:
- Trainer: Autopilot fits about 80% of cases and is close to serverless in practice, but the exam still counts GKE as fully managed, not serverless.
- Standard is for node-level control: custom node pools, your own machine shapes (GPU, Spot), bin packing to keep utilization high and cost low.
- Pod placement controls: node selector (pods go to nodes with a label, e.g. GPU nodes), affinity and anti-affinity (keep pods together, or apart for availability), taints and tolerations (a taint keeps everything off a node except pods that tolerate it). Trainer: these are for Standard.
- Shielded GKE Nodes are always on in Autopilot and on by default in Standard.

Security:
- Workload Identity Federation for GKE (the trainer and older material say "Workload Identity"): ties a Kubernetes service account to IAM so pods call Google APIs with no key files. Google's recommended way; expect a question.
- Access: IAM at project and cluster level, plus Kubernetes RBAC for finer control inside the cluster (per namespace, per team).
- GKE Sandbox (gVisor): an extra isolation layer between a container and the node's kernel, for untrusted code such as a third-party image.
- Private cluster: nodes have no external IPs. Outbound through Cloud NAT, Google APIs through Private Google Access.
- Pulling a private image: grant Artifact Registry Reader to the node service account, and don't run nodes as the default Compute Engine service account.

Network and operations:
- IP planning: nodes take addresses from the subnet's primary range, pods from a secondary range. Default maximum is 110 pods per node, so each node gets a /24 of pod addresses. A /29 subnet has 8 addresses, 4 usable (Google reserves 4), so 4 nodes and a /21 pod range. A changed pods-per-node maximum changes the sum.
- Release channels: Rapid, Regular, Stable. Production on Regular or Stable. Upgrade and release notifications can go to a Pub/Sub topic and fan out from there.
- Separate environments (at least pre-production and production), each tied to a suitable release channel.
- Service mesh (Istio; Google's managed one is Cloud Service Mesh): sidecar proxies handle traffic policy, security and telemetry between services, set once at mesh level. Anthos no longer exists as a brand; multi-cluster management is now GKE fleets.

More to recognise:
- Node scaling: cluster autoscaler adds or removes nodes; node auto-provisioning creates whole node pools to fit pending pods. HPA and VPA act on pods, these act on nodes.
- State: a PersistentVolumeClaim asks for a disk; a StatefulSet gives each replica a stable name and its own volume (databases, queues). Deployments are for stateless pods.
- Exposing apps: Service types ClusterIP (inside the cluster only), NodePort, LoadBalancer (a passthrough Network LB). Ingress or the Gateway API creates an Application LB for HTTP routing. Container-native load balancing sends traffic straight to pods through NEGs.
- Network policies restrict pod-to-pod traffic: a firewall inside the cluster.
- Binary Authorization: only images signed (attested) by your pipeline can be deployed. The software supply chain control.
- Several regions: a multi-cluster Gateway puts one global load balancer in front of clusters in different regions. Backup for GKE backs up workloads and their volumes.
- Case study hook (EHR Healthcare): existing Kubernetes on-prem that must run the same way as the cloud. GKE with fleets, attached or on-prem clusters, and Config Sync to keep configuration identical.
Like what I know: Docker Compose grown up. I declare the desired state in YAML and a controller keeps reality matching it, the way React reconciles the DOM to the declared UI.

## Isolate
Pick it when: Many containerized services that need Kubernetes features: custom networking, stateful workloads, sidecars, or portability to other Kubernetes environments (hybrid, multicloud).
Not it when (use Cloud Run instead): Stateless containers serving HTTP requests, where you don't need Kubernetes control.
- "Fully serverless" in the scenario points to Cloud Run. The same container image can move to GKE later if it outgrows Cloud Run.

## Execute
What I built:

## Missed
