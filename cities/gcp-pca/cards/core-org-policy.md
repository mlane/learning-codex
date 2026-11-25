---
name: Organization Policy
district: core
threat: 2
threat_source: estimate
lives_at: organization, folder or project
---

## Baseline
What it is: Guardrails on what may be configured, set at organization, folder or project level and inherited downward. IAM says who may act; an org policy says what nobody may do, whatever their role.
- Built from constraints. Ones to recognise: restrict resource locations (`gcp.resourceLocations`, the data residency answer), no external IPs on VMs (`compute.vmExternalIpAccess`), no service account keys (`iam.disableServiceAccountKeyCreation`), skip the default network (`compute.skipDefaultNetworkCreation`), require OS Login, enforce uniform bucket-level access, domain restricted sharing (only identities from your domain can be granted roles).
- Set by someone with Organization Policy Administrator. Unlike IAM allow policies, a policy set lower down can replace the one it inherits.
- Custom constraints cover fields the built-in ones don't. Dry-run mode logs what would be blocked before you enforce.
- Not retroactive: resources that already break a new policy keep running. It bites on create and update.
Like what I know: A shared ESLint config enforced from the monorepo root: it bans patterns for everyone, whatever their repo permissions are.

## Isolate
Pick it when: A rule must hold across many projects regardless of who holds which role: only EU regions, no external IPs, no service account keys.
Not it when (use IAM instead): The question is who can do something, not whether it's allowed at all. To stop data leaving through Google APIs, VPC Service Controls.

## Execute
What I built:

## Missed
