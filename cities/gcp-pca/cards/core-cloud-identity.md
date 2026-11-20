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
Like what I know:

## Isolate
Pick it when: The company needs managed Google identities for staff, especially when they already run Active Directory or their own SSO.
Not it when (use Google Workspace instead): They also need Gmail, Docs and Drive. Workspace includes the same identity features.

## Execute
What I built:

## Missed
