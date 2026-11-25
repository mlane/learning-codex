---
name: Migration Center
district: migrate
threat: 1
threat_source: estimate
lives_at:
---

## Baseline
What it is: The starting point for a migration: one place to discover what you have, assess it and estimate what it would cost on Google Cloud. Named in the exam guide (1.4).
- Discovery: a discovery client scans servers, VMs and databases on-prem, or you import inventory from AWS, Azure or a file. An offline CLI exists for sensitive environments.
- Assessment: groups assets, recommends target products and sizes, and builds a total cost of ownership (TCO) report comparing today's cost with Compute Engine, VMware Engine or sole-tenant nodes.
- Free to use. It hands over to the tools that move things: Migrate to Virtual Machines, Database Migration Service, VMware HCX.
- Google's migration phases: assess, plan, deploy, optimize. Migration Center covers the first two.
- Per workload, pick the path: rehost (lift and shift), replatform (lift and optimise), refactor (move and improve), re-architect, rebuild, repurchase (go SaaS), or retire. The exam guide calls this workload disposition: build, buy, modify or deprecate.
- Also from the exam guide: move tightly coupled systems together (dependency planning), test each workload before cutover, and check whether licences can come along.
Like what I know: The audit before a framework migration: inventory every dependency and estimate the effort before touching code.

## Isolate
Pick it when: Before anything moves: what do we have, what depends on what, what will it cost, and in what order should it go?
Not it when (use Migrate to Virtual Machines instead): The assessment is done and it's time to actually move VMs.

## Execute
What I built:

## Missed
