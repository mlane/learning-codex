---
name: Billing and cost controls
district: core
threat: 2
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Everything a project's resources consume adds up into one billing account. The controls on top of that are budgets, quotas, labels and billing export.
- Budget: set one to plan a project and keep costs under control. An alert at 100% only emails the billing admins; it doesn't stop spending.
- Quotas, three kinds: how many resources per project (e.g. VPC networks), how fast you can call an API (rate limits), how many resources per region (e.g. CPUs).
- Why quotas: stop runaway consumption from a mistake or an attack, avoid billing spikes, and force a sizing review (do I really need 96 cores?).
- A quota is a ceiling, not a guarantee: the resource can still be unavailable (a region out of SSDs) while you have quota left.
- Labels by team or cost center split the bill. Export billing to BigQuery to query it.
- One billing account pays for many projects; a project links to exactly one. Billing roles (Billing Account Administrator, Billing Account User) sit on the billing account, separate from project roles.
- A budget can also publish to Pub/Sub, and a function listening there can act (e.g. disable billing on a project). That is the only way a budget stops anything.
- Discounts: sustained-use (automatic, some Compute Engine series), committed-use (1 or 3 years, by resource or by spend), Spot VMs for interruptible work. Recommender (Active Assist) suggests rightsizing and idle resources to delete.
- CapEx to OpEx: no hardware bought up front, pay for what's used. The exam guide lists this under cost optimisation.
- Before building: Pricing Calculator for an estimate, Migration Center for a TCO report on a migration.
Like what I know: A performance budget in CI. It warns when the bundle is over; only a hard limit (a quota) actually fails the build.

## Isolate
Pick it when: The question is about seeing, splitting or limiting spend: budgets to track it, labels to attribute it, quotas to cap usage, BigQuery export to analyse it.
Not it when (use Organization Policy instead): The goal is to restrict what can be created or where, not how much is used.

## Execute
What I built: Queried a sample billing export in BigQuery to find the most expensive service. Details on the data-bigquery card.

## Missed
