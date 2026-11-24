# Inbox

One line per signal while you watch or listen. Afterwards, move what still matters
into cards and delete the rest. This file should be empty most of the time.

Public internet peering introduces unacceptable latency and security risks, while dedicated VPNs are proving cost-prohibitive.
VPC Network Peering allows private connectivity across two VPC networks. Even if both VPC networks belong to the same project or the same organization, you can still peer them.
Remember that each VPC network will have firewall rules that define what traffic is allowed or denied between the peered networks.
To successfully establish VPC Network Peering, two peering relationships must be created.
The producer network administrator must peer the producer network with the consumer network.
The consumer network administrator must peer the consumer network with the producer network.
VPC Network Peering is a decentralized or distributed approach to multi-project networking.
Each VPC network may remain in the control of separate administrator groups and maintains its own global firewall and routing tables.
However, VPC Network Peering does not incur the network latency, security, and cost drawbacks that are present when you use external IP addresses or VPNs.
Each organization has its own organization node, VPC network, VM instances, Network Admin, and Instance Admin.
VPC Network Peering works with Compute Engine, Google Kubernetes Engine, and App Engine flexible environments.
You need to have the network administrator role to perform peering.
Peered VPC networks remain administratively separate.
In other words, routes, firewalls, VPNs, and other traffic management tools are administered and applied separately in each of the VPC networks.
A subnet CIDR prefix in one peered VPC network cannot overlap with a subnet CIDR prefix in another peered network.
Google Cloud returns an error if any of the following operations result in an overlap. Only directly peered networks can communicate, which means that transitive peering is not supported.
Let me explain this with an example.
Suppose VPC network CymbalBank1 is peered with CymbalBank2 and CymbalBank3.
In that scenario, CymbalBank2 and CymbalBank3 are not directly connected.
VPC network CymbalBank2 cannot communicate with VPC network CymbalBank3 over a peered connection.
If CymbalBank1 offered SaaS services to CymbalBank2 and CymbalBank3, this situation could be critical.
The VPC networks are not connected until each one has a peering configuration for the other.
After peering is established, the two networks automatically exchange subnet routes.
Suppose you want to peer the two VPC networks shown on the slide.
Let’s begin with the Cymbal-Rahway VPC network.
You must know the name of the other VPC network, which is Cymbal-Kampala.
Because Cymbal-Kampala is not in the same project as Cymbal-Rahway, you must also have the project ID.
Custom routes help achieve a desired granularity that cannot be achieved with a default route.
When you create or modify a peering configuration, you can choose to import routes, export routes, or both.
The peer network administrator must similarly configure their peering configuration before routes are exchanged.
This process ensures that both network administrators explicitly agree to exchange custom routes before they are exchanged.
Cloud Interconnect establishes direct, private connections between your on-premises network and your Google Cloud Virtual Private Cloud (VPC) network.
VPN on the other hand provides a secure remote access that establishes an encrypted connection over the public internet.
When using either of these connections, you can share dynamic routes.
Local routes are always preferred over dynamic routes that are learned by using VPC Network Peering.
First, we will go over shared VPC, which allows you to share a network across several projects in your Google Cloud organization.
Then we will go over VPC Network Peering, which allows you to configure private communication across projects in the same or different organizations.
When you use shared VPC, you designate a project as a host project and attach one or more other service projects to it.
In this case, the web application servers project is the host project, and the three other projects are the service projects.
The overall VPC network is called the Shared VPC network.
Shared VPC makes use of Cloud IAM roles for delegated administration.
Symbol has four networks that belong to the Web application servers project, namely the recommendation, personalization, analytics, and web.
The recommendation service, the personalization service, and the analytics service are each hosted on a different VPC.
In this model, Kim is facing challenges such as time consuming management of network, difficulty scaling, and limitation communicating between networks.
In addition to this, it is a constant turn to set up access policy, new projects, billing, etc.
Kim would like to centrally manage the VPC networks while still segregating workloads that use these networks.
Kim can benefit by implementing shared VPC among these networks.
When you use shared VPC, you designate a project as a host project and attach one or more other service projects to it.
In this case, the web application servers project is the host project, and the three other projects are the service projects.
The organization resource represents an organization, for example, a company, and is the root node in the Google Cloud Resource hierarchy.
The Google Workplace or Cloud Identity Super administrators are the first users who can access the organization, and they assign the organization Admin role to users.
The organization Admins role in provisioning shared VPC is to nominate shared VPC admins by granting them appropriate project creation and deletion roles, and the compute.xpnAdmin role for the organization.
Each project owner then created VM instances from their service projects in the shared subnets.
The first required role is the organization administrator.
Next, the shared VPC administrator performs various tasks necessary to set up shared VPC, such as enabling shared VPC on the host project, attaching service projects
The service project administrators must at least have the compute.instanceAdmin role to the corresponding service project.
This allows them to create and manage resources in the shared VPC.
By the way, billing for those VM instances is attributed to the project where the resources are created, which are the service projects.
The organization Admins role in provisioning shared VPC is to nominate shared VPC admins by granting them appropriate project creation and deletion roles, and the compute.xpnAdmin role for the organization.
Note that shared VPC is also referred to as XPN in the API and command line interface.
Next, the shared VPC administrator attached the three service projects to the host project and gave each project owner the network user role for the corresponding subnets.
Each project owner then created VM instances from their service projects in the shared subnets.
Overall, shared VPC is a centralized approach to multi-project networking because security and network policy occurs in a single designated VPC network.
If you want to configure private communication between VPC networks in different organizations, you must use VPC network peering shared VPC only works within the same organization.
If you want to configure private communication between VPC networks in the same project, you must use VPC network peering.
Shared VPC only works across projects.
Shared VPC is a centralized approach to multi project networking because security and network policy occurs in a single designated VPC network.
In contrast, VPC network peering is a decentralized approach.
Each VPC network is controlled by administrator groups in that VPC networks organization.
In Google Cloud you can peer with a shared VPC network. Here you can see an example of a shared VPC network called network SVPC. Network SVPC is in host project P One. Service projects P3 and P4 can attach VM instances to network SVPC, which enables private communication between VMs 1, 2, and 4. If we establish a peering session between Network A and network SVPC, all VM instances will have private internal IP connectivity. Each VPC network has firewall rules that define which traffic is allowed or denied between the networks.You can also set up VPC network peering between two shared VPC networks.
If you're still not sure where to start and how, you can always lean on Gemini, an AI-powered collaborator in Google Cloud, for some help.
In the Google Cloud console toolbar, click Chat_Spark.
Open Gemini, and type your prompt.
In this case, let's ask a peering question.
I need VM instances in Network A Org1, to access services from two different external organizations, Org2 and Org3, using internal IP addresses.
Is this possible with peering?
