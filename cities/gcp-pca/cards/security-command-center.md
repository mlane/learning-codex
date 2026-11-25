---
name: Security Command Center
district: security
threat: 1
threat_source: estimate
lives_at: organization
---

## Baseline
What it is: Central view of security posture across the organization: misconfigurations, vulnerabilities and threats, reported as findings.
- Tiers: Standard (no extra charge), Premium, Enterprise (adds AWS and Azure).
- Database Center is the same idea for the database fleet, and draws on Security Command Center data.
- Built-in detectors: Security Health Analytics (misconfigurations: public buckets, open firewall rules, missing MFA), Event Threat Detection (threats found in logs), Container Threat Detection, Web Security Scanner, and attack path simulation that shows how findings chain toward valuable resources.
- Compliance view: maps findings to standards (CIS benchmarks, PCI DSS and others).
- Findings can be exported to Pub/Sub or BigQuery, or muted.
- AI Protection inventories AI assets (models, datasets, agents) and their risks, and works with Model Armor.
- Status check (2026): the Enterprise tier was deprecated in May 2026 and shuts down in May 2027, with those customers moving to Premium. Exam material can still describe three tiers.
Like what I know: A Lighthouse or npm audit report for the whole cloud organization: one ranked list of findings.

## Isolate
Pick it when: You need one place that shows misconfigurations, vulnerabilities and active threats across every project, or a view of posture against a compliance standard.
Not it when (use Cloud Logging and Monitoring instead): You're investigating one application's behaviour or alerting on a metric. To prevent a misconfiguration instead of detecting it afterwards, Organization Policy.

## Execute
What I built:

## Missed
