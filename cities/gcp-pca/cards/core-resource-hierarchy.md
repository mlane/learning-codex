---
name: Resource hierarchy
district: core
threat: 3
threat_source: estimate
lives_at: global
---

## Baseline
What it is: The tree every resource sits in: organization node, then folders (optional, nestable), then projects, then resources. IAM and org policies set at any level flow down to everything below. Resource Manager is the service that manages it.
- Project: the base unit for billing, enabling APIs and quotas. Every resource belongs to one. Project ID is globally unique and can't change after creation.
- Folders group projects by team, department or environment. An isolation boundary between projects, and a way to delegate admin rights.
- Organization node: the root, tied to a Cloud Identity or Workspace domain and created automatically when a user from that domain creates a project. Holds org-wide roles like Organization Admin (sets IAM policies, useful for auditing) and Project Creator.
- Resource Manager roles per level, inherited top-down: organization (Admin, Viewer), folder (Admin, Creator, Viewer), project (Creator, Deleter).
- Labels: key-value pairs on resources (VMs, disks, snapshots, images) for cost breakdowns and bulk scripts, e.g. by team or cost center. Network tags are different: instances only, used for firewall rules and routes.
- A project has three identifiers: name (yours, changeable), ID (unique, permanent), number (assigned by Google).
- A resource has one project; a project has one parent. Folders nest up to 10 levels.
- Moving a project to another folder changes what it inherits: the new parent's IAM and org policies apply.
- Typical layout: folders by environment or business unit, one project per app per environment. Separate projects are the cheap way to separate blast radius, quotas and billing.
Like what I know: A GitHub organization, then teams, then repositories: settings and access granted higher up apply to everything below.

## Isolate
Pick it when: Separating teams or environments (dev and prod in separate projects, grouped in folders) and applying one policy to many projects at once.
Not it when (use labels instead): You only need to tag resources for cost reports or filtering. Labels don't change access.

## Execute
What I built:

## Missed
