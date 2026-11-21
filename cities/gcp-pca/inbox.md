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
Which data storage service provides data warehouse services for storing data but also offers an interactive SQL interface for querying the data?
- BigQuery
Which Google Cloud data storage service offers ACID transactions and can scale globally?
- Spanner
What data storage service might you select if you just needed to migrate a standard relational database running on a single machine in a datacenter to the cloud?
- Cloud SQL
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
# --- Storage ---
Object Lifecycle Management which lets you automatically delete or archive objects. lifecycle configuration may take up to 24 hours to go into effect.
Directory synchronization
Soft Delete feature is enabled by default with a retention duration of seven days

Shared-core machines are good for prototyping, and are not covered by Cloud SLA.
Each vCPU is subject to a 250 MB/s network throughput cap for peak performance. Each additional core increases the network cap, up to a theoretical maximum of 2000 MB/s.
For performance-sensitive workloads such as online transaction processing (OLTP), a general guideline is to ensure that your instance has enough memory to contain the entire working set and accommodate the number of active connections.
Note: A few points to consider:

SSD (solid-state drive) is the best choice for most use cases. HDD (hard-disk drive) offers lower performance, but storage costs are significantly reduced, so HDD may be preferable for storing data that is infrequently accessed and does not require very low latency.
There is a direct relationship between the storage capacity and its throughput.
AlloyDB for PostgreSQL is a fully managed, PostgreSQL-compatible database service that’s designed for demanding workloads such as hybrid transactional and analytical processing.
Memorystore for Redis provides a fully managed in-memory datastore service built on scalable, secure, and highly available infrastructure managed by Google. Also automates complex tasks like enabling high availability, failover, patching, and monitoring.
