# Inbox

One line per signal while you watch or listen. Afterwards, move what still matters
into cards and delete the rest. This file should be empty most of the time.

Networking in Google Cloud: Network Architecture
Welcome to the third course of the "Networking in Google Cloud" series: Network Architecture!
In this course, you will explore the fundamentals of designing efficient and scalable network architectures within Google Cloud.
In the first module, Introduction to Network Architecture, we'll start by introducing you to the core components and concepts of network architecture, including subnets, routes, firewalls, and load balancing.
Then in the second module, network topologies, we'll dive into various network topologies commonly used in Google Cloud, discussing their strengths, and weaknesses.

What is network architecture?
Network architecture refers to the design of a virtual network in Google Cloud.
It defines how virtual machines, containers, and other resources connect and communicate with each other within your cloud environment.
While Google manages the underlying physical infrastructure, you are responsible for configuring the software, protocols, and Google Cloud managed services that make up your virtual network.
This includes components like VPC networks, subnets, firewalls, Cloud Routers, Cloud VPNs, and access points for on-premises connections.
The network design impacts the scalability, security, performance, and cost of your network.
A well-designed network can support your business growth by providing the scalability, security, performance, and cost-efficiency you need.
On the other hand, a poorly designed network can lead to a number of problems, such as outages, security breaches, and slow performance.
These problems can disrupt your business operations and damage your reputation.
Not all network designs are suitable for all situations.
You select network components and protocols based on your organization’s needs and priorities.
Tailoring your network architecture to your organization's specific needs is paramount.
Start by thoroughly assessing your current and future requirements, considering factors like the number of users, applications, traffic volume, and security considerations.
Once you have a clear understanding of your needs, define quantifiable metrics for scalability, security, performance, and cost efficiency.
These metrics can serve as a benchmark for evaluating your design choices.
Google Cloud offers a comprehensive suite of networking services and tools.
Google Cloud offers a comprehensive suite of networking services and tools.
Identify the ones that best suit your requirements and leverage them to craft a secure, scalable, and cost-effective network architecture.
Google Cloud provides a powerful arsenal of networking services that enable you to build robust and optimized VPC networks.
Each service plays a crucial role in achieving essential network characteristics like scalability, security, performance, and cost-efficiency.
A VPC network enables secure resource grouping by segmenting your network into distinct subnets based on functionality, security considerations, or project boundaries.
You have granular control over access lists and security policies within each VPC network.
Cloud VPN establishes secure tunnels for encrypted data communication between your on-premises network and Google Cloud.
Cloud Interconnect directly provides high-bandwidth, low-latency connections between your on-premises network and Google Cloud.
If needed, you can deploy Cloud VPN over Cloud Interconnect to provide encrypted data communication.
Cloud Router dynamically exchanges routes between Virtual Private Cloud Networks and on-premises networks.
A Cloud Router also serves as the control plane for Cloud NAT.
You have multiple configuration options, including policy-based routing and BGP peering.
Cloud Router provides BGP services for the following Google Cloud products: Cloud Interconnect, Cloud VPN, and Router appliance.
Load balancers play a vital role in cloud networks by intelligently distributing incoming traffic across multiple backend servers or instances.
This optimization prevents overload on individual servers, enhancing performance, scalability, and ensuring high availability for your cloud-based applications.
Firewall rules provide granular access control, which is critical in protecting your VPC network.
Grouping firewall rules into firewall policies helps you protect your Google Cloud infrastructure more easily.
The firewall provides more specific control over traffic entering or leaving individual virtual machine instances.
Cloud CDN caches content using Google's global edge network, accelerating web applications.
By selecting the most appropriate Network Service Tier, you can optimize network performance and cost based on your specific traffic requirements.
Choose Standard Tier for general workloads when speed is not a primary concern.
Choose Premium Tier for demanding applications that require higher throughput and lower latency.
Let’s take a look at an example: Cymbal Bank acquired a small subsidiary with a banking application on three VMs in one subnet.
One VM will host the web server, another VM will host the business logic, and another VM will host the database.
This approach was fine but now Cymbal Bank wants to roll out this a banking application to a global audience, with clients in Asia, North America, and Europe.
Cymbal Bank wants to avoid bottlenecks.
As shown, this network design is better for the following reasons: There are more servers to spread out the processing.
Here, we see two sets of VMs that run the web server, the business logic, and the database.
While the regions are mirrored, the subnet IP ranges are unique.
Probably, you would use more than two sets of VMs, but only two sets are shown here to simplify the example.
A load balancer handles routing client requests to the least busy set of VMs.
This way, you reduce the likelihood of a bottleneck.
Each VM is in a separate subnet.
This approach allows you to apply different security, such as firewall rules and IAM permissions, to each subnet.
Therefore, to each VM.
For example, using this approach, you can lock down the database to only accept messages from the business logic VM.
Depending on the application, and on the clients that use it, there may be other design changes that would be appropriate.
For now, it’s important to note that a good network design can help make an application run faster and more securely.
In this course, you will learn some common network design approaches.
Next, let’s briefly discuss some key considerations to design network architecture.
When designing a network architecture, there are a number of key considerations.
These include scalability, security, performance, and cost efficiency.
Scalability refers to the ability of your network to accommodate increasing demands, whether it's adding more resources or handling growing traffic volume.
Security refers to protecting your network from unauthorized access and attacks.
Implementing robust security measures like firewalls, access controls, and encryption is are crucial to safeguarding your network from unauthorized access, data breaches, and cyberattacks.
Compliance refers to observing guidelines, rules, and restrictions of your organization, industry, and pertinent government bodies.
Performance refers to the speed and responsiveness of your network.
Optimizing network performance translates to faster data transfer, improved application responsiveness, and a smooth user experience for your applications and services.
Cost efficiency refers to the cost of designing, implementing, and operating your network.
Striking a balance between achieving your network goals and staying within budget is essential.
Google Cloud offers various cost-optimization strategies and tools to help you build a cost-effective network architecture.
As a first step in your VPC network design, identify the decision makers and stakeholders that you must satisfy.
Stakeholders might include application owners, security architects, solution architects, and operations managers.
The stakeholders themselves might change depending on whether you are planning your VPC network for a project, a line of business, or the entire organization.
Gather requirements.
Engage with stakeholders to understand their specific needs regarding security, performance, scalability, compliance, and budget.
This also includes the operational expenditure.
This work might involve conducting interviews, workshops, or reviewing existing documentation.
You also must identify the people within your organization that can make decisions to approve your network design.
For example, engineering managers and accounting personnel.
With a clear understanding of the requirements, we can now begin to translate them into a tangible network design.
The high-level design outlines the overall structure of the network, including the major components and their relationships.
The low-level design provides a more granular view, specifying device configurations, IP addressing schemes, and security protocols.
This phase also involves making critical decisions about cloud infrastructure, geographic locations, and connectivity options.
Finally, build a BoM (Bill of Materials) and calculate the cost.
This comprehensive list includes all hardware, software, licenses, and services required to implement the network.
It serves as the basis for calculating the total cost of the project, both in terms of upfront capital expenditures (CapEx) and ongoing operational expenditures (OpEx).
This detailed cost analysis allows stakeholders to make informed decisions about the network design and implementation.
Let’s now talk through best practices for understanding the overall project and environment.
Clearly define the project's objectives and timeline to guide network design decisions.
This helps determine resource allocation, architecture complexity, and implementation phases.
Assess any existing on-premises or cloud infrastructure that the VPC network needs to integrate with.
This includes identifying existing VPCs, subnets, , security configurations, and network policies.
3:47 Lastly, let’s talk through technical considerations and constraints you should consider.
Research and understand any relevant security or data privacy regulations your organization needs to follow.
This might influence aspects like data segregation, access control, and logging.
Consider cost-saving strategies like right-sizing resources, utilizing committed use discounts, and exploring managed services where feasible.
Plan for ongoing network management, monitoring, and incident response procedures.
This might involve defining roles and responsibilities, automation practices, and logging configurations.

1. You are designing a new network infrastructure in Google Cloud to support a global e-commerce application. Which two of the following are key considerations you should prioritize in your network design?
- To ensure high availability and disaster recovery capabilities for the network.
- To inform and guide design choices, ensuring the network aligns with organizational goals and constraints.

2. Which of the following practices is LEAST likely to improve network security in Google Cloud?
- Assigning public IP addresses to all virtual machines in a VPC.

Let’s start with a use case scenario.
Nur, a network engineer at Cymbal Corporation, is tasked with managing the company's expanding network infrastructure, which encompasses a growing number of remote offices and cloud-based applications.
To ensure centralized control and efficient data management, Nur wants a simple network topology that can be centrally managed with simple network administration.
Nur decides to use a hub-and-spoke topology.
The hub-and-spoke topology is shaped like a star, with the central hub at the center and all the other devices connected to it like spokes on a wheel.
Instead of managing each device individually, Nur can configure and monitor everything from the hub, saving Nur time and effort.
This topology is a common approach for managing network traffic in Google Cloud environments.
One Virtual Private Cloud (VPC) network (represented by the hub) acts as a transit point for the other VPC networks (represented by the spokes).
Additionally, spoke devices can be diverse, including remote offices, cloud instances, and on-premises data centers.
A hub-and-spoke topology features: A centralized point of control: Nur can easily configure, monitor, and troubleshoot the entire network from the central hub.
This eliminates the need to log in to individual devices for management tasks.
Simplified network administration.
There is no need for complex routing configurations between individual devices.
The hub automatically routes traffic between spokes based on predefined rules.
Scalability: The hub-and-spoke topology can easily accommodate future network growth by adding more spokes.
New devices can be quickly connected to the hub without impacting existing network configurations.
Improved security: Centralized security policies can be enforced at the hub, enhancing overall network security.
This simplifies security management and ensures consistent protection across all connected devices.
A hub-and-spoke network topology is a versatile approach for managing network traffic, but there are different ways to implement it.
Here are three common methods: VPC Network Peering allows direct connections between VPCs, enabling efficient communication with low latency.
Cloud VPN creates a secure tunnel over the public internet to connect VPCs across regions or even to on-premises networks.
While offering flexibility, Cloud VPN may introduce higher latency and require additional configuration compared to VPC peering.
Network Connectivity Center (NCC) simplifies building and managing complex network topologies, including hub-and-spoke.
It provides centralized configuration, automated provisioning, and integrated security features.
However, Network Connectivity Center may come with additional costs compared to basic VPC peering or Cloud VPN setups.
In this course, we will cover the NCC implementation.
Network Connectivity Center simplifies network management by supporting two types of spokes.
VPC spokes connect Virtual Private Clouds, while hybrid spokes connect on-premises networks, using HA VPN tunnels or Cloud Interconnect VLAN attachments with router appliance VMs.
You can configure a router appliance instance by installing an image on a Compute Engine VM.
You can use an image provided by a supported Network Connectivity Center partner.
You can also use a custom image, such as an image that you created.
You can then take advantage of logic specific to the router appliance instance to control connectivity between the spoke and the hub.
Before you create the hub-and-spoke topology using Network Connectivity Center, here are additional considerations to keep
in mind: Ensure that IP address spaces between the hub and spoke VPC networks don’t overlap.
IPv6 addressing isn’t supported for hybrid spokes.
Privately-used public IP addresses are supported by Network Connectivity Center.
For more information, refer to the Considerations section of the Network Connectivity Center Overview in the Google Cloud documentation.

Lab (Implement a Hub-and-Spoke Network Using Network Connectivity Center)
Overview
In this lab, you design and implement a classic hub-and-spoke network topology. Your pre-configured environment includes two VPC networks and two branches (spoke1 and spoke2). You will create virtual machines (VMs) on each network to test connectivity.

You begin by verifying connectivity between the VMs within and across VPCs. Then, you use Network Connectivity Center to implement a hub and spoke. You retest connectivity to confirm that your hub-and-spoke architecture is fully functional.

VPC spokes let you connect two or more VPC networks to a hub so that the networks exchange subnet routes. VPC spokes attached to a single hub can reference VPC networks in the same project or a different project (including a project in a different organization).

Objectives
In this lab, you learn how to perform the following tasks:

Configure VMs in different VPCs.
Test connectivity between networks before implementing a hub and spoke.
Use Network Connectivity Center to create a hub and spoke.
Test connectivity after implementing a hub and spoke.
Use Network Topology to view metrics for traffic between entities.
Setup and requirements
For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

Click the Start Lab button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the right is the Lab setup and access panel with the following:

The Open Google Cloud console button
The temporary credentials (username and password) that you must use for this lab
Other information, if needed, to step through this lab
Note that the lab timer is located near the top of the page, showing the remaining time.

Click Open Google Cloud console (or right-click and select Open Link in Incognito Window if you are running the Chrome browser).

The lab spins up resources, and then opens another tab that shows the Sign in page.

Tip: Arrange the tabs in separate windows, side-by-side.

Note: If you see the Choose an account dialog, click Use Another Account.
If necessary, copy the Username below and paste it into the Sign in dialog.

"Username"
Copied!
You can also find the Username in the Lab setup and access panel.

Click Next.

Copy the Password below and paste it into the Welcome dialog.

"Password"
Copied!
You can also find the Password in the Lab setup and access panel.

Click Next.

Important: You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
Note: Using your own Google Cloud account for this lab may incur extra charges.
Click through the subsequent pages:

Accept the terms and conditions.
Do not add recovery options or two-factor authentication (because this is a temporary account).
Do not sign up for free trials.
After a few moments, the Google Cloud console opens in this tab.

Note: To view a menu with a list of Google Cloud products and services, click the Navigation menu at the top-left, or type the service or product name in the Search field. Navigation menu icon
Task 1. Explore the pre-configured network
The network spoke1-vpc with spoke1-subnet, and spoke2-vpc with spoke2-subnet along with firewall rules for RDP, SSH, and ICMP traffic have been configured for you.

In the Google Cloud console, in the Navigation menu (Navigation menu icon), click VPC network > VPC networks.
Notice the spoke1-vpc, and spoke2-vpc network with its subnets: spoke1-subnet, and spoke2-subnet.

Each Google Cloud project starts with the default network. In addition, the spoke1-vpc, and spoke2-vpc network has been created for you as part of your network diagram.

You create a VM in spoke1-subnet, and spoke2-subnet.

Explore the firewall rules
On the Navigation menu (Navigation menu icon), click VPC network > Firewall.
Notice the app-allow-icmp and app-allow-ssh-rdp firewall rules.

These firewall rules have been created for you.

Task 2. Create a VM in each VPC
In the Google Cloud console, on the Navigation menu (Navigation menu icon), click Compute Engine > VM instances.

Click Create instance.

Specify Name as spoke1-vm.

In the left frame, click Networking.

Under Network interfaces , click default. From the Network dropdown select spoke1-vpc.

Click Create.

Repeat the process to create a spoke2-vm VM in spoke2-vpc.

Click Check my progress to verify the objective.
Create a VM in each VPC

Task 3: Test connectivity
spoke1-vm and spoke2-vm are in two different VPCs. Let us test the connectivity between the two.

On the VM instances page, for spoke1-vm, copy the internal IP address.

On the VM instances page, for spoke2-vm, click SSH. If prompted, click Authorize.

Run the following command:

ping <internal IP address of spoke1-vm>
Copied!
Notice how the ping fails. This should execute and display 100% packet loss. Press Ctrl+C to stop the command.

Now, SSH into spoke1-vm to test the connectivity from spoke1-vm to spoke2-vm:
ping <internal IP address of spoke2-vm>
Copied!
Notice how the ping fails. This should execute and display 100% packet loss. Press Ctrl+C to stop the command.

Task 4: Create a hub and spoke using Network Connectivity Center
Network Connectivity Center lets you create VPC spokes to connect VPC networks together for full mesh connectivity.

In the Google Cloud console, on the Navigation menu (Navigation menu icon), click View all products > Networking > Network Connectivity.

Click Create hub.

For Hub policy mode, select Mesh topology, if not already selected.

Click Next step.

For Hub Name, type my-hub.

Click Next step.

Click Add a spoke.

Select VPC network as the Spoke type.

For Spoke name, type spoke1.

In Associated VPC network, click VPC network*, and then select spoke1-vpc.

Click Done.

To add a second spoke, click Add a spoke.

Select VPC network as the Spoke type.

For Spoke name, type spoke2.

In Associated VPC network, click VPC network*, and then select spoke2-vpc.

Click Done.

When you have finished adding spokes, click Create.

Click Check my progress to verify the objective.
Create a hub and spoke using Network Connectivity Center

Task 5. Retest connectivity
VPC spokes reduce the operational complexity of managing the individual pair-wise VPC Network Peering connections through the use of VPC spokes and a centralized connectivity management model. Now you retest the connectivity between the VMs from spokes.

This task has been performed for you at the start of this lab. You will need to SSH into VM and run the following command to setup the environment.

In the Google Cloud console, on the Navigation menu (Navigation menu icon), click Compute Engine > VM instances.

Select the SSH button next to spoke1-vm to SSH into the VM. If prompted, click Authorize.

Run the following command:

ping -c 3 <internal IP address of spoke2-vm>
Copied!
Repeat the previous steps for spoke2-vm.
Task 6. Explore the Network Topology Tool
Network Topology is a visualization tool that shows the topology of your network infrastructure. You can also view metrics and details of network traffic to other Shared VPC networks and inter-region traffic.

For each Network Topology hierarchy, the Google Cloud console displays a single metric for Compute Engine virtual machine (VM) instance entities and region entities, as well as for connections.

In the Google Cloud console, on the Navigation menu (Navigation menu icon), click View all products > Networking > Network Intelligence > Network Topology.

Toggle the View options panel to close it.

In the Infrastructure pane, scroll down to the bottom of the screen.

At the bottom of the Infrastructure pane, click and slide the timeline slider to the current time, which is toward the right of the slider.

Click Zoom out to view your infrastructure topology.

Click Expand next to the region to see more information.

Congratulations!
In this lab, you implemented a classic hub-and-spoke network topology. You created virtual machines (VMs) on each network to test connectivity.

You started by verifying connectivity between the VMs within and across VPCs. Then, you used Network Connectivity Center to implement a hub and spoke. You retested connectivity to confirm that the hub-and-spoke architecture was fully functional.


We covered hub and spoke in the previous section.
Now, let's explore other topologies.
In a mesh topology, devices or network nodes have multiple interconnected links.
This contrasts with a hub-and-spoke topology, where devices connect through a central point, that is, the hub.
There are two main types of mesh topology.
In a full mesh, every node is connected to every other node.
This topology can be useful for GKE Enterprise applications, where the microservices are all internally connected.
In a partial mesh, only select, strategic nodes are connected.
For example, for some failover scenarios, a partial mesh is helpful.
You create a partial mesh between VPCs in different regions or zones.
You can configure routing rules that direct traffic to the active region or zone normally but also configure automatic failover.
If a primary region experiences issues, automatic failover to a nearby region or zone using the mesh links keeps your workloads working normally from a client perspective.
Let’s consider some of the benefits of a mesh topology.
Mesh topologies provide high availability and resilience.
The multiple paths between nodes in a mesh network ensure that if one connection fails, traffic can be rerouted.
This makes mesh networks ideal for mission-critical applications that require high uptime.
The Google Cloud infrastructure is designed for scalability.
Mesh topologies can easily expand with your cloud environment as you add new nodes or Google Cloud regions.
A mesh topology can offer the potential for improved performance.
The multiple pathways in a mesh can facilitate better load balancing and reduce network congestion, potentially leading to improved application performance.
The lack of a single central point of failure also aids in security.
By distributing traffic across multiple paths, mesh topology can make it harder for attackers to compromise the entire network.
In Google Cloud, mirrored topology means creating a replica of your network infrastructure in another environment or region.
Let’s consider some use cases For disaster recovery, an identical standby environment is ready to take over in case of failure.
For testing and development, an isolated but otherwise identical configuration as a production environment is available for testing and experimentation.
Here are two examples shown.
Any actions taken in the testing and development environment will have no effect on production.
Finally, by distributing traffic across regions, your workloads can take advantage of having an identical environment available nearby, resulting in improved workload performance.
Shown here is an example of a type of gating topology.
Gating topologies are essential for managing and securing network traffic flows in cloud environments, particularly in hybrid and multi-cloud scenarios.
By implementing these gating mechanisms, you gain fine-grained control over data movement between your cloud and external resources, ensuring security and compliance.
There are three types of topologies that restrict access: There are three types of topologies that restrict access: Gated egress: Controls outbound traffic from the cloud.
Gated ingress: Controls inbound traffic to the cloud.
This is the gating topology type shown here.
Gated ingress and egress: Controls inbound and outbound traffic between hybrid and multi-cloud environments.
More information about each of these topologies can be found in Gated patterns, in the Google Cloud documentation.

It goes beyond static configurations by incorporating real-time operational data, revealing traffic paths, throughput, and the current state of connections between various workloads.
By presenting this information in a graph format, where nodes and lines represent entities and connections, Network Topology simplifies the understanding of complex networking relationships.
This visual representation aids in identifying bottlenecks, optimizing traffic flows, and troubleshooting network issues more effectively.
Network Topology actively gathers real-time telemetry and configuration data from Google's infrastructure to create a visual representation of your network resources.
It captures various elements like configuration details, performance metrics, and logs to deduce the relationships between resources within a single project or across multiple projects.
By consolidating this information, Network Topology generates a comprehensive graph that accurately depicts your entire network deployment.
Network Topology maintains a historical record spanning six weeks, offering valuable insights into past network configurations and interactions.
This history is organized into hourly snapshots, commencing at the beginning of each hour.
Each snapshot captures the fundamental entities and their communication patterns within that specific hour.
Even if resources, like instances, are created and deleted within an hour, they are still documented in the snapshot for that duration.
This ensures a comprehensive historical representation of your network's evolution.
At the lowest level of each hierarchy are base entities, which represent individual resources capable of direct network communication, such as VM instances or GKE pods.
When dealing with complex networks containing numerous base entities, a flat view can be overwhelming.
To address this, Network Topology aggregates base entities into higher-level hierarchical entities that can be expanded or collapsed.
Initially, the graph displays all base entities aggregated into their top-level hierarchy.
For example, VM instances are aggregated into instance groups, then into zones.
Meanwhile, GKE pods are aggregated into workloads, then namespaces, and finally into clusters.
Each entity, whether base or hierarchical, is represented as a circular node in the graph, and each base entity has its own unique hierarchy.
For example, load balancers are organized differently than VM instances within the graph.
To simplify the view, Network Topology aggregates related resources into hierarchical entities, with each resource type having its own distinct hierarchy.
Network Topology visually represents traffic between entities as lines, connecting entities if at least one side is sending traffic.
It displays connections across various hierarchy levels, as long as the base entities communicate.
For instance, a connection between two regions is shown if at least one VM instance in each region is communicating.
The tool supports various traffic protocols (TCP, UDP, ICMP, ICMPV6, ESP, GRE) for specific paths, visualizing traffic within
and across VPC networks, between Google Cloud and the internet, and to/from VPN gateways, Interconnect connections, and router appliances.
In the GKE view, Network Topology shows traffic within a cluster (between pods on different nodes), and
between pods on the same node if intranode visibility is enabled, and between clusters and external IPs.
Let’s explore a use case.
Charlie, a network administrator, is responsible for a network that includes several load-balanced applications.
Charlie has been alerted to a latency issue causing the organization's mobile application to intermittently slow down and time out.
Multiple users are experiencing this problem, and Charlie has confirmed that no recent application deployments have occurred.
The issue is likely due to a change in the network environment rather than a problem with the application itself.
Charlie needs to use the Network Topology tool to get a comprehensive visibility into the cloud network infrastructure.
They do this because the graphical representation of the network topologies enables the engineers to quickly understand the connections between resources, identify potential bottlenecks, and to troubleshoot network issues efficiently.
Beginning with the external clients in the Americas, Charlie selects the traffic metrics between that region and the shopping-site-lb load balancer.
Network Topology then displays charts in the details pane, providing information such as ingress and egress traffic
between the selected entities, along with key metrics like queries per second (QPS) and HTTP request latency.
Upon reviewing the request latency chart, Charlie notices that the 50th, 95th, and 99th percentile values are all higher than expected.
To gain a broader perspective on this latency issue, Charlie extends the time series charts to cover the past 6 weeks for further analysis.
After expanding the timeframe, Charlie observes a significant jump in latency that occurred approximately two hours ago, coinciding with the initial reports of the issue.
This confirms their suspicion that the increased latency is related to the load balancer.
To investigate further, Charlie navigates to the Load balancing page in the Google Cloud console.
Their analysis reveals that one of the instances in the load balancer's backend service was taking longer than usual to respond.
By removing this problematic instance from service, Charlie successfully resolved the latency issue and restored normal application performance.

Now that you’ve learned how to gather topology data, let's next explore some best practices to consider when exploring the right connectivity options.
Selecting the right network connectivity solution for hybrid or multicloud environments requires careful consideration of several key factors.
These include ensuring the solution meets the required service-level agreements (SLAs) for performance and uptime.
For organizations aiming to expand a hub-and-spoke network architecture across multiple VPC networks, establishing centralized hybrid connectivity within
a dedicated VPC network, then peering with other projects using custom advertised routes, can be an effective strategy.
This approach enables the seamless sharing of both static and dynamically learned routes with peered VPC
networks, fostering a centralized configuration that simplifies management and facilitates scalability in your VPC network design.
To enhance application accessibility and management, it's recommended to expose applications through APIs using an API gateway or load balancer.
A comprehensive API platform, such as Apigee, can be utilized to simplify this process.
This type of platform acts as an intermediary for your backend service APIs, providing features like
enhanced security, rate limiting, quotas, and analytics for better control and monitoring of your API usage.
When leveraging Cloud Load Balancing, utilize the application capacity optimization features whenever possible.
These capabilities can be valuable in mitigating capacity challenges that often arise in globally distributed applications, ensuring smoother operation and better user experiences.
When deciding where DNS resolution should be performed in a hybrid setup, it is recommended to use two authoritative DNS systems
for your private Google Cloud environment and for your on-premises resources that are hosted by existing DNS servers in your on-premises environment.
Before we wrap up, here is a quick preview of some prompts you can use with Gemini related to network topology.
You can use a prompt such as “Describe a scenario where a would be the best choice.”
Or “What are the advantages and disadvantages of a mesh topology.”

You are designing a Google Cloud network for a large financial services company with strict security requirements. The network needs to isolate sensitive customer data from other resources and limit communication between specific network segments. Which of the following network topologies would be most suitable for this scenario?
- Gated ingress and egress

You are migrating a large ecommerce company's existing on-premises data center to Google Cloud. The on-premises network consists of geographically dispersed regional offices, each with its own network segment requiring secure isolation. However, central management and communication between all regional offices are critical for business operations. Which network topology would most effectively address these requirements in Google Cloud?
- Hub-and-spoke
