# Lab runbooks

One file per skill badge: the commands that built it, why each one is there, how to
check it, and how to tear it down. Cards say **when to pick** a product; runbooks say
**how to build** it.

| # | Badge | Runbook |
|---|---|---|
| 01 | Implement Load Balancing on Compute Engine | [01-load-balancing-compute-engine.md](01-load-balancing-compute-engine.md) |
| 02 | Set Up an App Dev Environment on Google Cloud | |
| 03 | Implement Cloud Security Fundamentals on Google Cloud | |
| 04 | Cloud Architecture: Design, Implement, and Manage | |
| 05 | Manage Kubernetes in Google Cloud | |
| 06 | Engineer AI Agents with Agent Development Kit (ADK) | |
| 07 | Develop Serverless Applications on Cloud Run | |

## How to add one

1. Copy `_template.md` to `NN-short-name.md`.
2. Do the practice labs first. Paste each command that worked into the matching section.
3. Before the challenge lab, swap the practice names for the challenge names.
4. After passing, mark what ran clean in Status and add the row above.
5. Put one line under "What I built" in each card it touches, pointing back here.

## Rules

- Variables at the top, copied from the lab panel every run. Region, zone and image
  change between runs.
- Create only what the lab asks for. Extra or misplaced resources can get a Skills
  account blocked.
- Private notes. Don't publish these.
- In my own project, always run the teardown.
