---
name: Managed instance groups
district: compute
threat: 2
threat_source: trainer sheet
lives_at:
---

## Baseline
What it is:
Like what I know:

## Isolate
Pick it when:
Not it when (use ___ instead):

## Execute
What I built: Badge lab, 2026-11-23. `lb-backend-group`, 2 VMs from an instance template, as the backend of a global Application LB. Set the named port `http:80` so the backend service could find it. Runbook: `labs/01-load-balancing-compute-engine.md`.

```bash
gcloud compute instance-groups managed create lb-backend-group \
  --template=lb-backend-template --size=2 --zone=$ZONE
gcloud compute instance-groups managed set-named-ports lb-backend-group \
  --named-ports http:80 --zone=$ZONE
```

## Missed
