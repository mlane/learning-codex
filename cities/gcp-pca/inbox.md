# Inbox

One line per signal while you watch or listen. Afterwards, move what still matters
into cards and delete the rest. This file should be empty most of the time.

Migrating VM instance from one network to another
The VM must be stopped before it can be migrated.
The VM must not be in an instance group or network endpoint group NEG.
If the VM is in an unmanaged instance group or NEG, you must take it out of the group before migrating it.
VMs in managed instance groups cannot be migrated.
The migrations supported from Legacy network to a VPC network in the same project, from one VPC network to another VPC network in the same project.
In all cases, the VM stays in the region and zone where it was before only the attached network changes.
There are limitations to migrating that you should consider.
You cannot migrate a VM interface to a legacy network.
A target pool is a group of Google compute engine instances that receive incoming traffic from a load balancer.




How does VPC Peering exchange routing information between two peered VPCs?
- It automatically discovers and propagates routes through the Google Cloud Router.

Which of the following statements about VPC Network Peering is correct?
- Transitive peering is not supported.

Which of the following approaches to multi-project networking uses a centralized network administration model?
- Shared VPC


Before we dive deep into monitoring, let's take a look at a scenario.
Tal is a Cloud network engineer at Cymbal, where networks are incredibly large and complex.
There are multiple VPCs and multiple interconnections used and monitored by various teams.
Tal faces challenges with maintaining visibility into the network, ensuring optimal network performance, identifying bottlenecks and connectivity issues, analyzing and viewing network insights.
With growing complexity, Tal can benefit from a solution to streamline network monitoring and gain actionable insights.
Let's explore the comprehensive set of tools that Tal can utilize to monitor the network.
To have visibility into the network, Tal can use Google Cloud monitoring to create custom dashboards that contain charts of the metrics that he wants to monitor.
For example, Tal can create charts that display instances CPU utilization, the packets or bytes sent
and received by those instances, and the packets or bytes dropped by the firewall of those instances.
In other words, charts provide visibility into the utilization and network traffic of your VM instances, as shown on this slide.
These charts can be customized with filters to remove noise, groups to reduce the number of time series and aggregates to group multiple time series together.
For a full list of supported metrics, please refer to the documentation.
Now, although charts are extremely useful, they can only provide insight while someone is looking at them,
but what if Tal server goes down in the middle of the night or over the weekend?
Tal is not always available to look at dashboards and determine whether the servers are available, or of enough capacity or bandwidth.
To solve that, Tal can create alerting policies that notify when specific conditions are met.
An alerting policy describes the circumstances under which you want to be alerted and how you want to be notified about an incident.
The alerting policy can monitor time series data stored by Cloud monitoring, or log stored by Cloud logging.
When that data meets the alerting policy condition, Cloud monitoring creates an incident and sends the notifications.
Tal can create an alerting policy when the network egress of your VM instance goes above a certain threshold for a specific time frame.
When this condition is met, you or someone else can be automatically notified through email, SMS, or other channels in order to troubleshoot this issue.
There are also uptime checks that Tal can configure to test the availability of public services from locations around the world, as you can see on this slide.
The type of uptime check can be set to HTTP, HTTPS, or TCP.
The resource to be checked can be an app engine application, a compute engine instance, a URL of a host, or an AWS instance or load balancer.
For each up time check, you can create an alerting policy and view the latency of each global location.
Checking up time time helps in monitoring and maintaining service level indicator, service level agreement, and service level objective for availability.
Seventy five percent of network outages happen due to misconfiguration.
More often than not, these misconfigurations are discovered in production.
Not knowing the impact of making a configuration change in firewall rules or routing rules, makes network monitoring reactive rather than proactive, introducing risk and extending mean time to resolution.
Network intelligence center enables Tal to prevent networking outages and performance issues before they happen.
Centralized monitoring cuts down troubleshooting time and effort, increases network security, and improves the overall user experience.
Network intelligent center modules offer network topology, visualization, network connectivity tests, a performance dashboard, and firewall insights.
When a virtual machine is unreachable, Tal may need to diagnose the connectivity issue quickly to prevent any issues.
For example, there may be an issue between source and destination endpoints in your VPC network.
Using the network intelligence center connectivity tests, Tal can self diagnose connectivity issues within Google Cloud or Google Cloud to an external
IP address, which could be on premises or on another Cloud, helping to isolate whether the issue is in Google Cloud or not.
Tal can create, save, and run tests to help verify the impact of configuration changes
and ensure that network intent captured by these tests is not violated proactively preventing network outages.
These tests also help assure network security and compliance.
Connectivity tests have been used internally by the Google Cloud Support team to resolve customer issues.
How can Tal diagnose if the application or the underlying network is the root cause of the issues?
Network intelligence centers performance dashboard can show you real-time performance metrics, latency and packet loss between the zones where you have
VMs, enabling you to quickly troubleshoot where the packet loss is happening, and indeed, if it's a networking issue at all.
Performance dashboard now shows customer project information and also Google Cloud general information.
Firewall configuration can be daunting.
How can Tal verify that firewall rules are being used in the intended way?
Firewall insights enables you to better understand and safely optimize firewall configurations.
Firewall insights provides reports that contain information about firewall usage and the impact of various firewall rules on your virtual Private Cloud, VPC network.
Make sure to enable firewall rules logging to view the reports.
Firewall Insights uses Cloud monitoring metrics and recommender insights.
Cloud monitoring collects measurements to help you understand how your applications and system services are performing.
A collection of these measurements is generically called a metric.
The applications and system services being monitored are called monitored resources.
Measurements might include the latency of requests to a service, the amount of disk space available on a
machine, the number of tables in your SQL database, the number of wig its sold, and so forth.
Recommender is a service that provides recommendations and insights for using resources on Google Cloud.
These recommendations and insights are per product or per service, and are generated based on heuristic methods, machine learning, and current resource usage.
You can use insights independently from recommendations.
Each insight has a specific insight type.
Insight types are specific to a single Google Cloud product and resource type.
Firewall insights metrics let Tal analyze the way firewall rules are being used.
Firewall insights metrics are available through Cloud Monitoring and Google Cloud Console, metrics are derived through firewall rules logging.
With firewall insights metrics, you can perform the following tasks.
Analyze firewall rule usage, determine if firewall rules are functioning as expected.
Track connection behavior.
Verify that firewall rules are permitting or blocking the correct traffic over defined time intervals.
Diagnose dropped connections.
Investigate connections that may be unintentionally blocked by firewall rules.
Identify potential threats.
Detect anomalies in firewall rule hit counts, which could indicate malicious network activity.
Network analyzer automatically monitors your VPC network configurations and detects misconfigurations and suboptimal configurations.
It provides insights on network topology, firewall rules, routes, configuration dependencies, and connectivity to services and applications.
It identifies network failures, provides root cause information, and suggests possible resolutions.
Network analyzer runs continuously and triggers relevant analysis based on near real-time configuration updates in your network.
If a network failure is detected, it tries to correlate the failure with recent configuration changes to identify root causes, whenever possible, it provides recommendations to fix the issues.
In the example above, an insight of the type error, a GKE node to control plane connectivity is generated.
The insight page also describes the following.
The root cause.
An ingress firewall rule is blocking the connection between the node and the plane.
This indicated that the default firewall rules were modified, removed, or shadowed by another firewall rule.
A solution.
If the root of the problem is a deleted firewall, create a new firewall rule.
If it's a shadowed firewall rule that increase the priority, you can use Gemini if you are unsure of where to find a particular performance metric.
For example, you can ask Gemini how to find out the average latency between my VMs in US East 4 and US Central 1.
Gemini assists you with the dashboard name and its purpose.


In this module, we’ll focus on VPC Flow Logs and exporting your logs to BigQuery and Data Studio so that you can analyze and visualize your logs.
VPC Flow Logs records a sample of network flows sent from and received by VM instances, as you can see in this animation.
These logs can be used for network monitoring, forensics, real-time security analysis, and expense optimization.
Google Cloud is unique for its near-real-time visibility, providing log updates every 5 seconds.
Also, there is no extra delay and no performance penalty in routing the logged IP packets to their destination.
DNS provides a lookup for sites on the internet.
You can think of it as a phone book, but instead of using the name of an organization
to look up its phone number, you use the name of an organization to find an IP address.
A DNS service is provided by your ISP (internet service provider).
For example, suppose a request comes from a client computer to access cymbal.com.
To direct the client computer to the cymbal.com site, the internet service provider needs the IP address of cymbal.com.
The ISP connects to get this information from its DNS service.
The DNS service recursive resolver issues a request to look up the IP address of cymbal.com from one of its name servers.
The name server responds with the ISP.
You can enable or disable VPC Flow Logs per VPC subnet.
Once enabled for a subnet, VPC Flow Logs collect data from all VM instances in that subnet.
Each log entry contains a record of different fields.
For example, this table illustrates the IP connection information that is recorded.
This consists of the source IP address and port, the destination IP address and port, and the protocol number.
This set is commonly referred to as 5-tuple.
Other fields include the start and end time of the first and last observed packet, the bytes and packets sent, instance details, VPC details, and geographic details.
For more information on all data recorded by VPC Flow Logs, please refer to the documentation.
VPC Flow Logs capture traffic from both ends of a VM-to-VM conversation within the same VPC network.
To use this feature, ensure both the communicating VMs reside in subnets with VPC Flow Logs enabled.
In this example, VM 10.10.0.2 sends a request with 1,224 bytes to VM 10.50.0.2, which is also in a subnet that has logging enabled.
In turn, 10.50.0.2 responds to the request with a reply containing 5,342 bytes.
Both the request and reply are recorded from both the requesting and responding VMs.
Flow Analyzer lets you quickly and efficiently understand your Virtual Private Cloud traffic flows without the need to write complex SQL queries for analyzing VPC Flow Logs.
Flow Analyzer lets you perform opinionated network traffic analysis with 5-tuple granularity (source IP, destination IP, source port, destination port, and protocol).
Developed using Log Analytics and powered by BigQuery, Flow Analyzer enables in-depth analysis of inbound and outbound traffic of your VM instances.
It lets you monitor, troubleshoot, and optimize your networking deployment for better performance and enhanced security which helps ensure compliance, and save on costs.
Packet Mirroring clones the traffic of specific instances in your Virtual Private Cloud network and forwards it for examination.
It also captures all ingress and egress traffic and packet data, such as payloads and headers.
The mirroring happens on the virtual machines, not on the network.
Consequently, Packet Mirroring consumes additional bandwidth on the hosts.
Packet Mirroring is useful when you need to monitor and analyze your security status.
It exports all traffic, not only the traffic between sampling periods.
For example, you can use security software that analyzes mirrored traffic to detect all threats or anomalies.
Additionally, you can inspect the full traffic flow to detect application performance issues.
Cloud NAT logging allows you to log NAT connections and errors.
When Cloud NAT logging is enabled, one log entry can be generated for each of the following scenarios: When a network connection using NAT is created.
And when a packet is dropped because no port was available for NAT.
You can choose to log both kinds of events, or only one.
Created logs are sent to Cloud Logging.
Cloud NAT logging handles TCP and UDP traffic only.
Cloud NAT logging only logs dropped packets if they are egress (outbound) TCP and UDP packets.
It does not log dropped incoming packets, for example, if an inbound response to an outbound request is dropped for any reason, no error is logged.
Although Tal can explore each log entry within Google Cloud Logging, we recommend exporting logs to BigQuery.
BigQuery runs blazing-fast SQL queries on gigabytes to petabytes of data.
This allows Tal to analyze network traffic to better understand traffic growth to forecast capacity, analyze network usage to optimize network traffic expenses, or analyze network forensics to examine incidents.
For example, in this screenshot we queried my logs to identify the top IP addresses that have exchanged traffic with my web server.
Depending on where they are and who they belong to, we could relocate part of my infrastructure to save
on networking costs or deny some of these IP addresses if we don’t want them to access my web server.
If Tal wants to visualize logs, we recommend connecting BigQuery tables to Data Studio.
Data Studio transforms raw data into the metrics and dimensions that Tal can use to create easy-to-understand reports and dashboards.