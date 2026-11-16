---
name: Resource hierarchy (example)
district: core
threat: 3
threat_source: estimate
lives_at: global
---

<!-- A filled-in example so you can see the size and tone. Files starting with _ are ignored by the build.
     Write your own version in core-resource-hierarchy.md; do not copy this one. -->

## Baseline
What it is: The tree every resource hangs from: organization, then folders, then projects, then the resources themselves. Access and rules attach at any level and flow down.
Like what I know: Nested config in a monorepo. Root settings apply everywhere and a package can add its own.

## Isolate
Pick it when: The question is about separating teams or environments, or applying one rule to many projects. Group them in a folder and attach the rule there.
Not it when (use labels instead): You only need to group things for cost reports or filtering. Labels do not change who has access.

## Execute
What I built: Listed what my lab account could see.

```bash
gcloud projects list
gcloud resource-manager folders list --organization=ORG_ID
```

## Missed
- [x] Thought a project could remove a role granted on its folder. It cannot: IAM allow policies only add on the way down. Org policies are the ones a lower level can override.
