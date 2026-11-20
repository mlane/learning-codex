# Inbox

One line per signal while you watch or listen. Afterwards, move what still matters
into cards and delete the rest. This file should be empty most of the time.

# --- QUIZ
Identify the option that is NOT a type of IAM member.
- Organization Account
What abstraction is primarily used to administer user access in IAM?
- Roles, an abstraction of job roles.
Identify the option that is NOT a type of IAM role.
- Advanced
# --- IAM
Organization node - root node (roles, organization admin (define IAM policies, userful for auditing), project creator) - provisioned automatically when a user with Google Workspace or Cloud Identity crated Google Cloud Project. Resource manager Roles (Admin, Viewer)
Folders - grouping/isolation boundary between projects. Allows delegation of admin rights. Resource manager Roles (Admin, Creator, Viewer)
Resource manager roles - inherited top-down. 
Project - Resource manager Roles (Creator, Deleter)
Five types of members: Google Accounts (dev, admin, anyone interacting with Google Cloud), service accounts (belongs to app instead of person), Google groups (named collection of Google Accounts/service accounts, convenient way to apply an access policy to collection  of users), Google Workspace domains (represents virtual group of Google accounts that have been created in an orgs workspace account), and Cloud Identity domains (same as Google workspace except non-google-workspace-customers, you manage users using Google admin conosole but don't pay for Google workspace collaboration products).
Cloud Identity or Google Workspace are used for creating or managing users NOT IAM.
Policy - list of bindings, binding binds a list of members to a role. Role is a named list of permissions defined by IAM.
Service accounts - if an app interacts with Cloud Storage, it must first auth to Cloud Storage. Identified by email. User-managed keys should be used as a last resort. Up to 10 account keys per service account to faciliate key rotation. User-managed private keys does not save them, so can't help with recover. User managed keys should be used as last resort.
Org restrictions - let you prevent data exfiltration through phishing or insider attacks. Requirement is managed device (e.g. computer). Egress proxy administrator configures proxy to add restrictions.
IAM Best Practices - leverage resource hierarchy, use principle of least privilege, audit policies/membership. Grant roles to groups over individuals. Service accounts establish key rotations and audit. Identity-Aware Proxy (IAP) - enforce access control policies for apps (IAM policy applied after auth, requires a VPN)