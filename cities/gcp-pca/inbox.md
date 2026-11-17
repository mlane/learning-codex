# Inbox

One line per signal while you watch or listen. Afterwards, move what still matters
into cards and delete the rest. This file should be empty most of the time.

Cloud computing - way of using IT that has the following (on-demand/self-service, access over internet, resources are allocates via user pools, resources are elastic/flexible and pay by allocation/usage)
IaaS (Infra as a service) - raw compute, storage and network (similar to physical data centers)
  - pay by allocation (per-second billing/flexible)
PaaS (Platform as a service) - binds code to libraries (application logic)
  - pay by usage
SaaS (Software as a Service) - provides app stack (e.g. Google Workspace, utilizing Gmail, Docs and Drive)


https://cloud.google.com/about/locations


What is the primary benefit to a Google Cloud customer of using resources in several zones within a region?
- For improved fault tolerance

Why might a Google Cloud customer use resources in several regions around the world?
- To bring their applications closer to users around the world, and for improved fault tolerance

What type of cloud computing service lets you bind your application code to libraries that give access to the infrastructure your application needs?
- Platform as a service


IAM (Identity and Access Management) - lets you control who has access to resources

Cloud Identity - defines user/group policies via Google Admin console

Cloud Shell - provides CLI access to resources, pre-auth via SDK (ready for immediate use)

Service accounts - assign permissions to VMs to interact with other services.
  - e.g. authenticate VM to Cloud Storage
  - identified with email
  - use crypto keys to acccess resources
  - Managed by IAM

Select the list of IAM role types that are ordered from broadest to finest-grained.
  - Basic roles, predefined roles, custom roles

Shared VPC - connect resources from multiple projects to VPC network

VPN (Virtual Private Network) - IPsec tunnels to connect to a VPC networks to other neworks/clouds.
VPC (Virtual Private Cloud) - secure/private cloud-computing model hosted within a public cloud (e.g. Google Cloud). global networks to connect to other resources (e.g. VMs). May have subnets (which can span zones).
VPC Peering - relationship betwen two VPCs to exchange traffic


Compute
Storage
Big Data
Machine Learning
Application Services


1. Purpose/Value - allowing users to access/manage IaaS/PaaS/SaaS.
2. How infra is organized/defined
3. Basic infra (Virtual Machines/Virtual Networks)
4. Storage options
5. GKE (containers) purpose/value
6. Serverless (applications) purpose/value
# ---
Cloud Computing - form of IT that consist of customers getting
- computing resources (on-demand/self-serve)
- accessibility (internet)
- allocation to a pool of resource among users
- elastic/scalable to match users intent
- pay per usage/service/reserve
# --- History ---
1. Colocation - renting physical space
2. Virtualized - renting digital space (user-controller/configured)
3. Containerized - like virtualized but more granular (more fine-control on specifics)
# -- Quiz ---
What is the primary benefit to a Google Cloud customer of using resources in several zones within a region?
  - For improved fault tolerance - As part of building a fault-tolerant application, you can spread your resources across multiple zones in a region.
What type of cloud computing service lets you bind your application code to libraries that give access to the infrastructure your application needs?
  - Platform as a Service - PaaS is designed for developers. It provides the SDKs, libraries, and runtime environments needed to build and deploy applications without managing the underlying hardware or OS.
Why might a Google Cloud customer use resources in several regions around the world?
  - To bring their applications closer to users around the world, and for improved fault tolerance.
Services and APIs are enabled on a per-__________ basis.
  - Project
Select the list of IAM role types that are ordered from broadest to finest-grained.
  - Basic roles, predefined roles, custom roles
Which of these values is globally unique, permanent, and unchangeable, but can be modified by the customer during creation?
  - The project ID - The project ID is immutable (cannot be changed) after creation, but can be changed during creation.
# --- Misc ---
Geographical locations (large) include regions (medium) and zones (small).
Servers (data centers) make up 2% of worlds electricity
# --- Terms ---
Cloud Load Balancing - distributing user traffic across multiple instances of an application. Reduces risk of performance issues. Doesnt run in VM works out of the box.
Cloud resilience - system capacity to withstand disruptions and continue running under pressure and recover quickly.
Cloud provisioning - process of allocating/configuring/deploying resources to a user/org.
Fault tolerance - keep operating without interruptions when infra fails.
High Throughput - handling large volumne of tasks simultaneously over period of time (real-time)
  - e.g. 100 content caching nodes by location demand
IAM (Identity and Access Management) - lets you control who has access to resources
IaaS (Infra as a service) - raw compute, storage and network (similar to physical data centers)
  - pay by allocation (per-second billing/flexible)
PaaS (Platform as a service) - binds code to libraries (application logic)
  - pay by usage
PoLP (Principle of least privilege) - model stating users/programs/processes should receive only what they need to do specific jobs.
SaaS (Software as a Service) - provides app stack (e.g. Google Workspace, utilizing Gmail, Docs and Drive)
Serverless - event-driven code (think AWS lambda)
  - pay per execution
Service accounts - assign permissions to VMs to interact with other services.
  - e.g. authenticate VM to Cloud Storage
  - identified with email
  - use crypto keys to acccess resources
  - Managed by IAM
Shared VPC - connect resources from multiple projects to VPC network
VPN (Virtual Private Network) - IPsec tunnels to connect to a VPC networks to other neworks/clouds.
VPC (Virtual Private Cloud) - secure/private cloud-computing model hosted within a public cloud (e.g. Google Cloud). global networks to connect to other resources (e.g. VMs). May have subnets.
VPC Peering - relationship betwen two VPCs to exchange traffic
Zone - area where a resource gets deployed (e.g. VM)
# --- Interacting with Google Cloud
1. Google Cloud console
  - helps you deploy, scale and diagnose prod issues
2. Google Cloud SDK/Cloud Shell
  - collection of CLI tools (Google Cloud CLI and bq CLI)
3. APIs
  - Google APIs Explorer
4. Google Cloud app
  - Start/Stop/SSH/View Logs
# --- Hierarchical
Made up of four levels
1. Resources (e.g. VMs, Buckets, VPC, BigQuery tables, etc)
2. Projects (billed separately, specific owners)
3. Folders/Subfolders (optional)
4. Organization node (outer level)
* Policies are inherity downward (e.g. folder -> project -> resource)
* Organization node can have special roles (e.g. changing policies, creating projects)
# --- IAM ---
Policies are managed by IAM
Deny policy prevents IAM permissions
Three kinds of roles
1. Basic
  - broad, roles include (owner, editor, viewer, and billing admin)
  - potentially too broad for sentitive data
2. Predefined
  - compute.instances.get (defined by Google)
3. Custom
  - defined only at project/org level
# --- Products ---
App Engine - PaaS (hosting web apps)
Cloud Marketplace - preconfigured/supports modifying
Compute Engine - IaaS (runs VMs)
  -second billing (just like any IaaS)
  - sustained-use discounts (apply the longer they run)
  - committed-use discounts (predefined agreements like x amount usage)
  - Spot VMs (automated/batching tasks/no supervising) - can be terminated by Google (cheapest but depends on availability)
# --- Tools ---
Cloud Identity - defines user/group policies via Google Admin console
Cloud Shell - provides CLI access to resources, pre-auth via SDK (ready for immediate use)
Resource Manager tool - CRUD/recover/APIs
# --- VPC ---
Conect to GC resources, include segmenting networks/firewall rules/static routes
-Segmenting can span zones/subnets
-Subnet range expands IP range, not resources (e.g. VMs)
Do not require firewall to be provisioned
# --- VM ---
VMs can be created with Google Console/Google Cloud CLI/Compute Engine
Autoscaling - resilient
Router tables are built-in and so provisioning/managing routing is not needed.
  - round robin is probaly how this works with spreading evenly.
Big VMs - memory/compute
# --- Cloud Load Balancing ---
Supports HTTP(S), TCP, SSL, UDP
  - Multi-region failover
Options
  - Application Load Balancers
    - Application layer (layer 7)
    - HTTP/HTTPS traffic
    - Require content-based routing/SSL/TLS terminatio
    - Reverse proxy based on rules you define
  - Network Load Balancers
    - Transport layer (layer 4)
    - Two types
      - Proxy Load Balancer - reverse proxies, can modify/terminate connections
      - Passthrough Load Balancer - do not modify/terminate connections






#player-control-overlay.fadein .player-controls-content{opacity:0}
