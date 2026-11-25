---
name: Well-Architected Framework
district: core
threat: 2
threat_source: exam guide
lives_at:
---

## Baseline
What it is: Google Cloud's set of design recommendations, organised into pillars (it used to be called the Architecture Framework). The exam guide expects familiarity with it (1.2) and gives the operational excellence pillar its own section (6.1).
- Pillars: operational excellence (deploy, operate, monitor and improve; automate; manage change and incidents), security, privacy and compliance, reliability (user-focused targets, redundancy, graceful degradation, tested recovery), cost optimization (visibility, right-sizing, discounts, a FinOps habit), performance optimization (plan capacity, scale elastically, measure and tune), and sustainability (the newest: energy-efficient, carbon-aware workloads).
- Perspectives cut across the pillars for one field, e.g. AI and ML.
- Ideas that recur in answers: prefer managed services, automate, decouple components, keep services stateless, design for failure, design for change.
- Trade-offs are the point: more reliability and performance cost more. The best exam answer meets the stated requirement with the least cost and operational effort, not the most powerful design.
- Lives in the Architecture Center, next to the reference architectures.
Like what I know: The AWS Well-Architected pillars, or the categories of a Lighthouse report: a checklist to review a design against.

## Isolate
Pick it when: A question asks for a recommended practice, a design review, or which trade-off to accept. Reason from the pillar the requirement belongs to.
Not it when (use the SRE practices instead): The question is specifically about SLOs, error budgets or incident handling. `ops-sre-slos` goes deeper on that part of the reliability pillar.

## Execute
What I built:

## Missed
