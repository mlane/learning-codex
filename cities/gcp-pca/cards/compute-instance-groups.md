---
name: Managed instance groups
district: compute
threat: 2
threat_source: trainer sheet
lives_at: zonal or regional
---

## Baseline
What it is: A managed instance group (MIG) is a set of identical VMs built from one instance template and run as a single unit. It keeps the group at its target size, replaces broken VMs, scales with load and rolls out new versions.
- Instance template: the recorded recipe (machine type, image, disk, network, tags, startup script). Creating one looks exactly like creating a VM. It can't be edited: to change something, make a new template and roll it out.
- Autohealing: if a VM stops, crashes, is deleted outside the group or fails its health check, the MIG recreates it with the same name and template.
- Regional (multi-zone) MIGs are recommended over zonal: VMs spread across zones, so one zone failing doesn't take the app down.
- Autoscaling signals: CPU utilization, load balancer capacity (utilization or requests per second), Cloud Monitoring metrics, or a schedule. Queue-based scaling, e.g. unacknowledged Pub/Sub messages, goes through a Cloud Monitoring metric.
- It's a target, not a trigger. With a 75% CPU target and two VMs at 100% and 85%, the autoscaler adds a VM to bring the average under 75%. It removes VMs only while the rest still fit under the target.
- Health check: protocol, port, check interval, timeout, healthy threshold, unhealthy threshold. A VM is unhealthy only after that many failures in a row. Much like an uptime check in Cloud Monitoring.
- Initial delay (initialization period): how long after boot before health checks and autoscaling count the VM. Too short and the group kills VMs that are still starting.
- Health check probes come from 130.211.0.0/22 and 35.191.0.0/16. Without a firewall rule allowing them, every VM looks unhealthy.
- Updates: rolling (replace gradually, with max surge and max unavailable) or canary (two templates side by side, a share of VMs on the new one).
- Stateless MIGs suit web front ends and batch workers pulling from a queue. Stateful MIGs keep each VM's disks, name and IPs through recreation, for databases and legacy apps. Stateful IPs: internal and external IPv4 addresses survive autohealing and updates, which helps when clients or config depend on a fixed address or a migrated workload must keep its network setup.
- Unmanaged instance group: a hand-picked set of different VMs behind a load balancer. No autoscaling, autohealing or rolling updates.
Like what I know: A pool of identical CI runners built from one image: add runners when the queue grows, remove them when it's quiet, replace any that hang.

## Isolate
Pick it when: Identical, stateless VMs that should scale with load, heal themselves and sit behind a load balancer.
Not it when (use an unmanaged instance group instead): The VMs differ from each other and you only need to group existing machines behind a load balancer. If the app is already in containers, GKE or Cloud Run does the same job with less to manage.

## Execute
What I built: Badge lab, 2026-11-23. `lb-backend-group`, 2 VMs from an instance template, as the backend of a global Application LB. Set the named port `http:80` so the backend service could find it. Runbook: `labs/01-load-balancing-compute-engine.md`.

```bash
gcloud compute instance-groups managed create lb-backend-group \
  --template=lb-backend-template --size=2 --zone=$ZONE
gcloud compute instance-groups managed set-named-ports lb-backend-group \
  --named-ports http:80 --zone=$ZONE
```

Course lab (Elastic Infrastructure: Application LB with autoscaling), date to add. Built a custom image first: VM `webserver` with Apache enabled at boot (`sudo systemctl enable apache2`), boot disk set to be kept, VM deleted, image `mywebserver` made from the disk. Template `mywebserver-template` (e2-micro, that image, tag `allow-health-checks`, no external IP). Two regional MIGs from it, `us-1-mig` and `notus-1-mig`: 1 to 2 instances, autoscaling on HTTP load balancing utilization at 80%, initialization period 60 s, autohealing with `http-health-check` and a 60 s initial delay. Under the stress test both groups scaled out. Console build; the CLI form below is not yet run.

```bash
gcloud compute instance-groups managed create us-1-mig \
  --template=mywebserver-template --size=1 --region=$REGION \
  --health-check=http-health-check --initial-delay=60
gcloud compute instance-groups managed set-autoscaling us-1-mig --region=$REGION \
  --min-num-replicas=1 --max-num-replicas=2 \
  --target-load-balancing-utilization=0.8 --cool-down-period=60
```

## Missed
