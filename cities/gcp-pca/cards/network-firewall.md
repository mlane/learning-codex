---
name: Firewall rules and policies
district: network
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is:
Like what I know:

## Isolate
Pick it when:
Not it when (use ___ instead):

## Execute
What I built: Badge lab, 2026-11-23. Two ingress rules on the default network, both targeted by network tag: one opening port 80 to the web VMs, one letting Google's health checkers (130.211.0.0/22, 35.191.0.0/16) reach the load balancer backends. Runbook: `labs/01-load-balancing-compute-engine.md`.

```bash
gcloud compute firewall-rules create fw-allow-health-check \
  --network=default --action=allow --direction=ingress \
  --source-ranges=130.211.0.0/22,35.191.0.0/16 \
  --target-tags=allow-health-check --rules=tcp:80
```

## Missed
