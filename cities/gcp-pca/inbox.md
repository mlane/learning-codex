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


<!-- QUESTIONS -->

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

What is the main reason customers choose Spot VMs?
- To reduce cost (The per-hour price of Spot VMs incorporates a substantial discount).

In Google Cloud VPCs, what scope do subnets have?
- Regional (VPC subnets can span the zones that make up a region. This is beneficial because your solutions can incorporate fault tolerance without complicating your network topology)

How does global Cloud Load Balancing allow you to balance HTTP-based traffic?
- Across multiple Compute Engine regions (Correct! With global Cloud Load Balancing, your application presents a single front-end to the world.). 

For which of these interconnect options is a Service Level Agreement available?
-Dedicated Interconnect (Correct! Dedicated Interconnect is correct because Google provides an SLA for this managed service, guaranteeing performance.)

Which of the following describes a Virtual Private Cloud (VPC)?
- A secure, individual, private cloud-computing model hosted within a public cloud.

Which storage use case is best suited for Google Cloud Storage?
- Storing unstructured data that requires high durability (99.999999999% / 11 9s) and available object storage designed for unstructured data like media files, backups, and logs.

A company requires a relational database service that can scale horizontally to petabytes of data while maintaining high availability. Which Google Cloud service meets this requirement?
- Spanner is an enterprise-grade, horizontally scalable relational database that scales to petabytes of storage with strong consistency and up to 99.999% availability

For what primary use case should an organization choose the Coldline storage class in Cloud Storage?
- To minimize monthly storage costs for data accessed less than once a quarter.
- Coldline storage offers significantly lower monthly at-rest storage rates compared to Standard and Nearline classes, making it ideal for data accessed infrequently (at most once every 90 days).

What is a Kubernetes pod?
- A group of containers (In Kubernetes, a group of one or more containers is called a pod. Containers in a pod are deployed together. They are started, stopped, and replicated as a group.The simplest workload that Kubernetes can deploy is a pod that consists only of a single container.)

Where do the resources used to build Google Kubernetes Engine clusters come from?
- Compute Engine (resources used to build Google Kubernetes Engine clusters come from Compute Engine, Google Kubernetes Engine gets to take advantage of Compute Engine’s and Google VPC’s capabilities)

Which scenario is best suited for using Cloud Run instead of Cloud Run functions?
- Hosting a dynamic web application that allows users to upload and share photos. (This scenario requires a scalable web application with persistent connections and user interactions, making it ideal for Cloud Run's containerized environment and autoscaling capabilities.)

Which of these statements about Cloud Run functions are correct? Select three. 'Cloud Run functions:'
- Is a scalable functions-as-a-service platform. (Cloud Run functions is a service that enables you to build single-purpose functions that can automatically scale based on the number of requests to your function.)
- Can be used to extend Cloud services. (Cloud Run functions can be used as a connective layer to connect and extend other cloud services and create a serverless application.)
- Is integrated with Cloud Logging. (Cloud Run functions is integrated with Google Cloud Observability logging and monitoring services to make it fully observable.)

Why might a Google Cloud customer choose to use Cloud Run functions?
- Their application contains event-driven code that they don't want to provision compute resources for.

What is the primary defining function of generative AI?
- Generate original text, images, code, or other media using generative models.

You need a large language model (LLM) to convert unstructured text into a rigid, custom JSON structure. Which prompting technique should you implement?
- A few-shot prompt that includes illustrative output examples.

How can you avoid hallucinations when training or prompting a large language model (LLM)?
- Train the model on a clean, curated dataset.

You are designing prompts to guide a large language model (LLM) toward clear and reliable responses. Which practice aligns with Google-recommended guidelines for prompt construction?
- Maintain concise phrasing and direct instructions.

--------------

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
VPC (Virtual Private Cloud) - secure/private cloud-computing model hosted within a public cloud (e.g. Google Cloud). global networks to connect to other resources (e.g. VMs). May have subnets. Tags to allow.
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
Full distributed software-defined managed servuce (put behind all traffic)
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
# --- Cloud DNS ---
Managed DNS run on the same infra as google, low latency, high aivalable, cost effeictive
Global system of edge-cases (caching content closer to users)
Origins will experience reduced load
save money
enabled via checkbox
# --- Connecting to VPC to other networks ---
1. VPN connection over interntion (tunnel connection via Cloud Router, noit always best because of seuciryt and bandwidth)
2. Direct peering (putting router in same data center)
3. Carrier peering give direct access from on premis through serrviec (not covere dby google agreement)
4. Dedicated interconnect - allow oner more direct private conenctions to google (99.99%% SLA coverafed and backed up yb VPN)
5. Partrnr Interconnect - userful if datacenter cant reach dedictaed innterconenct colloocastionf aiclity or cant reach 10GB connection. mission critical service shtta cna tolerta downtime. can be coverfe dby 99.99% SLA but google isnt repsonsibieble
6. Cross-cloud interconnect -  high bandwidht deidcate conneciton betwengogole cloud and another cloud serrvivce provider (use to peer wiht your networ, supports adotpion of multicluod strategy, twi sizxes 10GBps or 100GBps)
Access by three questions
1. Do you need private-to-private connection
  - cloud vpn is best best
2. Do bandwidtr and perofmrnac eof cutrent conenction google google serice meet you busines reuiqrments
  - use public ip address if you dont need privcate
  - direct peeting if you need it
  - 
3. Are you wiling to manage aces and routing euqiintm in one of Google pint of presnec elcoaitons
<!-- Data -->
Structured Data
Unstructured Data
Transactional data
Relational data
--
Cloud Storage - store any amount of data and retrieve as often as needed. Charged per access.
- primary use is when BLOB is neede for online content,backup and storage of intermeeiate results in processing workflows. Organized into buckets.
- Needs unique name (global identifier) and geogrpahicl locaiton of wher it shodl eb sotrde.
- if most of your users are in Europe, you probably want to pick a European location, so either a specific Google Cloud region in Europe, or else the EU multi-region.
- Cloud Storage are immutable, which means that you do not edit them, but instead a new version is created with every change made.
-  If you don’t turn on object versioning, by default new versions will always overwrite older versions.
- In many cases, personally identifiable information may be contained in data objects, so controlling access to stored data is essential to ensuring security and privacy are maintained.
- Using IAM roles and, where needed, access control lists (ACLs), organizations can conform to security best practices, which require each user to have access and permissions to only the resources they need to do their jobs, and no more than that.
- Roles are inherited from project to bucket to object.
- Each access control list consists of two pieces of information (1 specific user or group of users, 2 permission what actions can be performed).
- Cloud Storage also offers lifecycle management policies. Can specifiy when objects shodo en dleted.
- primary storage classes in Cloud Storage.
  - Standard Storage (best for frequently accessed, or “hot,” data.)
  - Nearline Storage (best for storing infrequently accessed data, like reading or modifying data on average once a month or less, examples data backups, long-tailmultimedia content or data archiving)
  - Coldline Storage (low-cost option for storing infrequently accessed data) - meant for reading or modifying data, at most, once every 90 days
  - Archive Storage (lowest-cost option, used ideally for data archiving, online backup, and disaster recovery) - best if you plan to access less than once a year, higher cost for dtaa access and 365 day mininum storage duration
  - These include: Unlimited storage with no minimum object size requirement, worldwide accessibility and locations, low latency and high durability, a uniform experience, which extends to security, tools, and APIs, and geo-redundancy if data is stored in a multi-region or dual-region.
  - Cloud Storage also provides a feature called Autoclass, which automatically transitions objects to appropriate storage classes based on each object's access pattern. The feature moves data that is not accessed to colder storage classes to reduce storage cost and moves data that is accessed to Standard storage to optimize future accesses. Autoclass simplifies and automates cost saving for your Cloud Storage data.
  - Data traveling between a customer’s device and Google is encrypted by default using HTTPS/TLS, which is Transport Layer Security.
  - Storage Transfer Service enables you to import large amounts of online data into Cloud Storage quickly and cost-effectively.
  - And then there is the Transfer Appliance, which is a rackable, high-capacity storage server that you lease from Google Cloud.
  - You can also store App Engine logs, Firestore backups, and objects used by App Engine applications, like images.
Cloud SQL
- managed relational databases, including Cloud SQL for MySQL, Cloud SQL for PostgreSQL, and Cloud SQL for SQL Server as a service.
- It can scale up to 128 processor cores, 864 GB of RAM, and 64 TB of storage.
- The cost of an instance covers seven backups.
Spanner
- managed relational database service that scales horizontally, is strongly consistent, and speaks SQL.
- Battle tested by Google’s own mission- critical applications and services, Spanner is the service that powers Google’s $400 billion business.
- Spanner is especially suited for applications that require a SQL relational database management system with joins and secondary indexes, built-in high availability, external consistency, and high numbers of input and output operations per second.
Firestore
- Firestore is a flexible, horizontally scalable, NoSQL cloud database for mobile, web, and server development.
Bigtable.
- Google's NoSQL big data database service.
- It's the same database that powers many core Google services, including Search, Analytics, Maps, and Gmail.
- designed to handle massive workloads at consistent low latency and high throughput
- great choice for both operational and analytical applications, including Internet of Things, user analytics, and financial data analysis.
- When deciding which storage option is best, customers often choose Bigtable if: They’re working with more than 1TB of semi-structured or structured data.
- NoSQL data - This usually means transactions where strong relational semantics are not required.
- Data is a time-series or has natural semantic ordering.
- Or they’re running machine learning algorithms on the data.
- Typically this is used to serve data to applications, dashboards, and data services.
- Data can also be streamed in through a variety of popular stream processing frameworks like Dataflow Streaming, Spark Streaming, and Storm.
- And if streaming is not an option, data can also be read from and written to Bigtable through batch processes like Hadoop MapReduce, Dataflow, or Spark.
--
Object storage - data storage architecture that manages data as “objects” and not as a file and folder hierarchy (file storage), or as chunks of a disk (block storage).
# --- Containers ---
The smallest unit of compute is an app with its VM.
The guest OS might be large, even gigabytes in size, and take minutes to boot.
A container is an invisible box around your code and its dependencies with limited access to its own partition of the file system and hardware.
All that’s needed on each host is an OS kernel that supports containers and a container runtime.
This makes code ultra portable, and the OS and hardware can be treated as a black box.
So you can go from development, to staging, to production, or from your laptop to the cloud, without changing or rebuilding anything.
Google Kubernetes Engine (GKE) acts as a bridge between these models, providing the automation of PaaS with the granular control of IaaS.
With a container, you can do this in seconds and deploy dozens or hundreds of them, depending on the size of your workload, on a single host.
However, you'll probably want to build your applications using lots of containers, each performing their own function like microservices.
If you build them this way and connect them with network connections, you can make them modular, deploy easily, and scale independently across a group of hosts.
Kubernetes is an open-source platform for managing containerized workloads and services.
At the highest level, Kubernetes is a set of APIs that you can use to deploy containers on a set of nodes called a cluster.
The system is divided into a set of primary components that run as the control plane and a set of nodes that run containers.
In Kubernetes, a node represents a computing instance, like a machine.
Note that this is different to a node on Google Cloud which is a virtual machine running in Compute Engine.
A Pod is the smallest unit in Kubernetes that you can create or deploy.
One way to run a container in a Pod in Kubernetes is to use the kubectl run command, which starts a Deployment with a container running inside a Pod.
In GKE, the load balancer is created as a network load balancer.
To scale a Deployment, run the kubectl scale command.
But the real strength of Kubernetes comes when you work in a declarative way.
Instead of issuing commands, you provide a configuration file that tells Kubernetes what you want your desired state to look like, and Kubernetes determines how to do it.
To run five replicas instead of three, all you do is update the Deployment config file and run the kubectl apply command to use the updated config file.
GKE is a Google-hosted managed Kubernetes service in the cloud.
The GKE environment consists of multiple machines, specifically Compute Engine instances, grouped together to form a cluster.
You can create a Kubernetes cluster with GKE, but how is GKE different from Kubernetes?
GKE is responsible for provisioning and managing all the control plane infrastructure behind it.
It also eliminates the need for a separate control plane.
With the Autopilot mode, which is recommended, GKE manages the underlying infrastructure such as node configuration, autoscaling, auto- upgrades, baseline security configurations, and baseline networking configuration.
With the Standard mode, you manage the underlying infrastructure, including configuring the individual nodes.
Autopilot is optimized for production.
To start up Kubernetes on a cluster in GKE, all you do is run this command: gcloud container clusters create-auto k1 --region, specifying the cluster region.
Running a GKE cluster comes with the benefit of advanced cluster management features that Google Cloud provides.
These include Google Cloud's load-balancing for Compute Engine instances; Node pools to designate subsets of nodes within a cluster for additional flexibility; Automatic scaling of your cluster's node instance count; Automatic upgrades for your cluster's node software; Node auto-repair to maintain node health and availability; And logging and monitoring with Google Cloud Observability for visibility into your cluster.
# --- Cloud Run ---
Cloud Run is serverless.
Cloud Run is built on Knative, an open API and runtime environment built on Kubernetes.
It can automatically scale up and down from zero almost instantaneously, and it charges only for resources used, calculated down to the nearest 100 milliseconds, so you‘ll never pay for over-provisioned resources.
The Cloud Run developer workflow is a straightforward three-step process.
1. First, you write your application using your favorite programming language. Listens for web requests
2. Second, you build and package your application into a container image.
3. And third, the container image is pushed to Artifact Registry, where Cloud Run will deploy it.
Once you’ve deployed your container image, you’ll get a unique HTTPS URL back.
Cloud Run then starts your container on demand to handle requests, and ensures that all incoming requests are handled by dynamically adding and removing containers.
Because Cloud Run is serverless, it means that you, as a developer, can focus on building your application and not on building and maintaining the infrastructure that powers it.
You can use a container-based workflow, as well as a source-based workflow.
The source-based approach will deploy source code instead of a container image.
Cloud Run does this using Buildpacks - an open source project.
Cloud Run handles HTTPS serving for you.
That means you only have to worry about handling web requests, and you can let Cloud Run take care of adding the encryption.
The pricing model on Cloud Run is unique; as you only pay for the system resources you use
Additionally, there is a small fee for every one million requests you serve.
The price of container time increases with CPU and memory.
A container with more vCPU and memory is more expensive.
You can use Cloud Run to run any binary, as long as it’s compiled for Linux sixty-four bit.
Now, this means you can use Cloud Run to run web applications written using popular languages, such as: Java, Python, Node.js, PHP, Go, and C++.
You can also run code written in less popular languages, such as: Cobol, Haskell, and Perl.
Many applications contain event-driven parts.
For example, an application that lets users upload images.
When that event takes place, the image might need to be processed in a few different ways, like converting the image to a standard format, converting a thumbnail into different sizes, and storing each new file in a repository.
With Cloud Run functions, you write a single-purpose function that completes the necessary image manipulations and then arrange for it to automatically run whenever a new image is uploaded.
You’re billed to the nearest 100 milliseconds, but only while your code is running.
Events from Cloud Storage and Pub/Sub can trigger Cloud Run functions asynchronously, or you can use HTTP invocation for synchronous execution.
# --- Prompt Engineering --
Generative AI and large language models are proving to be powerful tools, but to leverage their capabilities, it's important to understand their architecture.
What is generative AI?
- Generative AI encompasses a broader range of models capable of generating various types of content beyond just text
- subset of artificial intelligence that is capable of creating text, images, or other data using generative models, often in response to prompts.
What is a large language model?
- It has grown in popularity hugely since 2021 but artificial intelligence has been around since the mid 1950s.
- prompt is a specific instruction, question, or cue given to a computer program or user to initiate a specific action or response, but we examine this more later.
- In its current format, gen AI models are like conversational programs that can generate content based on the inputs supplied.
- LLM specifically refers to a subset of generative AI models focusing on language tasks.
What is prompt engineering?
Prompt engineering best practices.
Generative AI has uses across a wide range of industries, including software development, healthcare, finance, entertainment, customer service, and sales.
Large language models refer to large, general-purpose language models that can be pre-trained and then fine-tuned for specific purposes.
In this context, large refers to: The size of the training dataset, which can sometimes be at the petabyte scale.
Parameters are the memories and knowledge that the machine has learned during model training.
They determine the ability of a model to solve a problem, such as predicting text, and can reach billions or even trillions in size.
General-purpose means that the models can sufficiently solve common problems.
This is thanks to the commonality of a human language, regardless of the specific tasks.
Saying LLMs are pre-trained and fine-tuned, means… …that they have been pre-trained for a general purpose with a large dataset… ...and then fine-tuned for specific goals with a much smaller dataset.
But how are LLMs trained?
The probability is determined through a task called pre-training.
Pre-training an LLM involves feeding a massive dataset of text, images, and code to the model so that it can learn the underlying structure and patterns of the language.
But sometimes the LLM gives a completely wrong answer.
This is called a hallucination.
Hallucinations are words or phrases that are generated by the model that are often nonsensical or grammatically incorrect.
Hallucinations can be a problem for LLMs because they can make the output text difficult to understand.
Prompts can be in the form of a question, and are categorized into four categories: zero-shot, one-shot, few-shot, and role prompts.
Zero-shot prompts do not contain any context or examples to assist the model.
For example, the prompt “What’s the capital of France?” does not provide any examples of what a capital is.
One-shot prompts, however, provide one example to the model for context.
And few-shot prompts provide at least two examples to the model for context.
LLM to better understand what you want. It can include the context for the task, the task itself, and some examples to guide the model. The
Be clear and concise in the prompts that you feed into the model.
Another best practice is to adopt a persona for your input.
And finally, it’s a recommended practice to keep each sentence concise.
Longer sentences can sometimes produce suboptimal results.
With this new prompt, Gemini proposes a hub-and-spoke network architecture, which fits Sasha’s needs exactly.
Hallucinations can be caused by a number of factors, including: The model is not trained on enough data.
The model is trained on noisy or dirty data.
The model is not given enough context.
The model is not given enough constraints.


# --- Misc ---


#player-control-overlay.fadein .player-controls-content{opacity:0}
