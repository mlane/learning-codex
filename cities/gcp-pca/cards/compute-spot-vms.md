---
name: Spot and preemptible VMs
district: compute
threat: 2
threat_source: trainer sheet
lives_at: zonal
---

## Baseline
What it is: Spare Compute Engine capacity at a 60 to 91% discount. Google can stop them at any time with 30 seconds' notice. No maximum runtime (the older preemptible VMs stopped after 24 hours).
- No SLA; availability varies.
- Pair with a managed instance group so they're recreated when capacity returns.
Like what I know:

## Isolate
Pick it when: The work can be interrupted and restarted: batch processing, rendering, CI jobs, data crunching.
Not it when (use standard VMs with committed-use discounts instead): The workload must stay up (web servers, databases) but you still want savings on steady usage.

## Execute
What I built:

## Missed
