---
name: Cloud Identity
district: core
threat: 2
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Google's identity service for users and groups who aren't on Google Workspace, managed in the Google Admin console. Setting it up for a domain is what gives a company its organization node.
- Sync users from Active Directory or LDAP with Google Cloud Directory Sync, or keep an existing identity provider (Entra ID, Okta) for single sign-on via SAML.
- Free and Premium editions.
- Users are created and managed here (or in Workspace), not in IAM. Same Admin console as Workspace, without paying for the collaboration products.
- Google Cloud Directory Sync is one-way: Active Directory or LDAP stays the source of truth and Google is updated to match.
- Workforce Identity Federation: staff sign in with the external identity provider directly, with no synced Google accounts. (Workload Identity Federation is the same idea for machines.)
- Case study hook: EHR Healthcare manages users in Microsoft Active Directory and needs sign-in to stay consistent during the migration.
Like what I know: The company SSO directory (Okta, Entra ID) behind a 'Sign in with' button. It owns the accounts; each app only decides what an account may do.

## Isolate
Pick it when: The company needs managed Google identities for staff, especially when they already run Active Directory or their own SSO.
Not it when (use Google Workspace instead): They also need Gmail, Docs and Drive. Workspace includes the same identity features.

## Execute
What I built:

## Missed
