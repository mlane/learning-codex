---
name: Google Cloud VMware Engine
district: migrate
threat: 1
threat_source: trainer sheet
lives_at: regional
---

## Baseline
What it is: A complete VMware environment (vSphere, vCenter, vSAN, NSX, HCX) on dedicated hardware in Google Cloud, sold as a service. Existing VMware VMs move across unchanged and are managed with the same tools.
- A private cloud of dedicated nodes, connected to your VPCs and to Google services over the internal network.
- HCX moves VMs from on-prem vSphere, live if needed, and can stretch the network so IP addresses stay the same.
- Google runs the hardware and the VMware stack's lifecycle; you keep administering your VMs.
- Why: the fastest data centre exit with the least retraining and no re-platforming. Existing VMware tooling, DR and processes keep working, and modernising can wait.
- Named in the exam guide under compute networking (2.3).
Like what I know: Running the old framework unchanged on new hosting, to buy time before a rewrite.

## Isolate
Pick it when: A large VMware estate must leave the data centre fast, and the operations team wants to keep vCenter and its existing processes.
Not it when (use Migrate to Virtual Machines instead): The goal is to end up on native Compute Engine VMs and stop paying for the VMware stack.

## Execute
What I built:

## Missed
