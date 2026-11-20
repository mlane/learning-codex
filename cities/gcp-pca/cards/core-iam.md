---
name: IAM roles and policies
district: core
threat: 3
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Who (principal) can do what (role) on which resource. Roles are bundles of permissions, granted in allow policies at any level of the hierarchy and inherited downward. Deny policies block specific permissions regardless of what's granted.
- Principals: Google accounts, groups, service accounts, Cloud Identity domains. Grant to groups, not individuals.
- Basic: Owner, Editor, Viewer (now "legacy basic"; newer basic roles are Admin, Writer, Reader). Thousands of permissions; avoid in production.
- Predefined: per-service roles from Google, e.g. roles/storage.objectViewer.
- Custom: your own permission set, project or org level only, and you maintain it.
- Allow policies only add on the way down: a child can't remove a role granted above. Use a deny policy for that.
Like what I know:

## Isolate
Pick it when: A predefined role covers the job. That's Google's default recommendation for least privilege.
Not it when (use a custom role instead): Even the narrowest predefined role grants more than the job needs.

## Execute
What I built:

## Missed
