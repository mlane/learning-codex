---
name: IAM roles and policies
district: core
threat: 3
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Who (principal) can do what (role) on which resource. Roles are bundles of permissions, granted in allow policies at any level of the hierarchy and inherited downward. Deny policies block specific permissions regardless of what's granted.
- Principals (members), five types: Google accounts, service accounts, Google groups, Google Workspace domains, Cloud Identity domains. Grant to groups, not individuals. IAM doesn't create or manage users; Cloud Identity or Workspace does.
- Policy: a list of bindings. A binding ties a list of members to one role; a role is a named list of permissions.
- Basic: Owner, Editor, Viewer (now "legacy basic"; newer basic roles are Admin, Writer, Reader). Thousands of permissions; avoid in production.
- Predefined: per-service roles from Google, e.g. roles/storage.objectViewer.
- Custom: your own permission set, project or org level only, and you maintain it.
- Allow policies only add on the way down: a child can't remove a role granted above. Use a deny policy for that.
- Best practice: least privilege, lean on the hierarchy, audit policies and group membership.
- Organization restrictions (not Organization Policy): stops data exfiltration through phishing or insiders. An egress proxy adds a header to requests from managed devices so they only reach approved organizations.
- Exam reflex: IAM is Google's preferred way to control access. Uniform bucket-level access over ACLs, IAM roles and gcloud when SSH is blocked, an Artifact Registry role for image pulls. An option that bypasses IAM checks is wrong.
- Common real-world failures (OWASP Top 10 2025, first and second): broken access control and security misconfiguration. Default service accounts, the default VPC and broad roles kept "for now".
- Service account impersonation: a person or workload borrows a service account's identity through a short-lived token instead of holding its key. Needs Service Account Token Creator. In the exam guide under secure remote access.
- IAM Conditions: a binding that applies only when a condition holds (a time window, a resource name prefix, an access level).
- Separation of duties: split roles so nobody can both make and approve a change. The key admin doesn't read the data; billing admins aren't project owners.
- Audit: Cloud Audit Logs record who did what. Admin Activity logs are always on; Data Access logs are off by default (except BigQuery) and must be turned on.
- Tools: Policy Troubleshooter (why was this allowed or denied), Policy Analyzer (who can reach what), IAM recommender (roles nobody has used in 90 days).
Like what I know: Route guards and role-based permissions in a web app: the user carries roles, each role unlocks a set of actions, and the check happens on every request.

## Isolate
Pick it when: A predefined role covers the job. That's Google's default recommendation for least privilege.
Not it when (use a custom role instead): Even the narrowest predefined role grants more than the job needs.

## Execute
What I built:

## Missed
