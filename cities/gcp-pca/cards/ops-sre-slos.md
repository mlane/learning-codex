---
name: SLIs, SLOs and error budgets
district: ops
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is: The vocabulary Google's Site Reliability Engineering uses to decide how reliable a service needs to be, and when to slow down releases.
- SLI (indicator): a measurement of what users experience, as good events over all events. E.g. the share of requests answered within 300 ms.
- SLO (objective): the target for an SLI over a window. E.g. 99.9% of requests succeed over 28 days. An internal goal.
- SLA (agreement): a promise to customers with a penalty if broken. Always looser than the SLO, to leave room to react.
- Error budget: 100% minus the SLO. Budget left: ship features. Budget spent: freeze releases and fix reliability. It turns 'dev wants speed, ops wants stability' into one number both agree on.
- Downtime allowed per 30 days: 99% is 7.2 hours, 99.9% is 43 minutes, 99.95% is 22 minutes, 99.99% is 4.3 minutes, 99.999% is 26 seconds. Each extra nine costs far more than the last.
- Dependencies in a chain multiply: two 99.9% services in series give about 99.8%. Redundant copies in parallel raise it. A service can't be more reliable than what it depends on.
- Four golden signals: latency, traffic, errors, saturation.
- Burn-rate alerts fire when the budget is being spent too fast, instead of on every blip.
- Toil is manual, repetitive work that grows with the service; SRE automates it away. Postmortems are blameless: fix the system, not the person.
- Releases that protect the budget: rolling update (replace gradually), blue/green (two full environments, switch traffic), canary (a small share first), each with a quick rollback.
- Proving reliability on purpose (exam guide 4.3 and 6.6): chaos engineering injects failures (kill a VM, cut a zone) to show the system survives; load testing finds the limit; penetration testing hunts security holes, and needs no notice to Google on your own projects.
Like what I know: Performance budgets. A Core Web Vitals threshold is an SLO; the error budget is how much slack is left before feature work stops and performance work starts.

## Isolate
Pick it when: The question is how reliable is reliable enough, whether to release or freeze, or what to alert on. Define SLIs, set an SLO, manage the error budget.
Not it when (use RTO and RPO instead): The question is recovering from a disaster: how long to restore and how much data can be lost. That is `ops-disaster-recovery`.

## Execute
What I built:

## Missed
