---
name: Cloud GPUs
district: compute
threat: 1
threat_source: trainer sheet
lives_at: zonal
---

## Baseline
What it is: Graphics processors attached to Compute Engine VMs (also GKE nodes and Cloud Run) to speed up work that runs huge numbers of calculations in parallel: ML training and inference, rendering, simulation, video transcoding.
- Two ways to get one: an accelerator-optimized machine type with GPUs built in (the A and G series), or GPUs attached to an N1 general-purpose VM.
- GPU VMs can't live-migrate: host maintenance stops them. Set the VM to restart, and expect Local SSD data on it to be lost.
- Expensive and capacity-limited: you need GPU quota in the region and not every zone has every model.
- Ways to pay (the exam guide's 'consumption models'): on-demand, Spot (much cheaper, for interruptible training), committed use, reservations, and Dynamic Workload Scheduler (queue for scarce GPUs and start when capacity is free).
- TPUs are Google's own ML chips, used through Vertex AI and GKE rather than attached to an ordinary VM.
- AI Hypercomputer is Google's name for the whole AI infrastructure stack: GPUs and TPUs plus the storage, networking and software tuned for them. Named in the exam guide; recognise it.
Like what I know: A dedicated graphics card in a render farm: rented by the hour, pointless unless the software is written to use it.

## Isolate
Pick it when: The workload is massively parallel maths and the software can use a GPU: model training, inference at scale, rendering, scientific simulation.
Not it when (use a managed AI service instead): You only need to call a model. Gemini on Vertex AI or a pre-trained API needs no GPU of your own. Ordinary web and database workloads gain nothing from one.

## Execute
What I built:

## Missed
