---
name: Resource hierarchy
district: core
threat: 3
threat_source: estimate
lives_at: global
---

## Baseline
What it is: The tree every resource sits in: organization node, then folders (optional, nestable), then projects, then resources. IAM and org policies set at any level flow down to everything below.
- Project: the base unit for billing, enabling APIs and quotas. Project ID is globally unique and can't change after creation.
- Folders group projects by team, department or environment.
- Organization node: the top, tied to a Cloud Identity or Workspace domain. Holds org-wide roles like Organization Admin.
Like what I know:

## Isolate
Pick it when: Separating teams or environments (dev and prod in separate projects, grouped in folders) and applying one policy to many projects at once.
Not it when (use labels instead): You only need to tag resources for cost reports or filtering. Labels don't change access.

## Execute
What I built:

## Missed
