# Inbox

One line per signal while you watch or listen. Afterwards, move what still matters
into cards and delete the rest. This file should be empty most of the time.

Lab (Configure an Internal Network Load Balancer)
Google Cloud offers internal Network Load Balancing for your TCP/UDP-based traffic. Internal Network Load Balancing enables you to run and scale your services behind a private load balancing IP address that is accessible only to your internal virtual machine instances.

In this lab, you create two managed instance groups in the same region. Then you configure and test an internal Network Load Balancer with the instances groups as the backends, as shown in this network diagram:

Network architecture diagram

Objectives
In this lab, you will learn how to perform the following tasks:

Create internal traffic and health check firewall rules.
Create a NAT configuration using Cloud Router.
Configure two instance templates.
Create two managed instance groups.
Configure and test an internal Network Load Balancer.
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

student-04-c0062c0a80d6@qwiklabs.net
Copied!
You can also find the Username in the Lab setup and access panel.

Click Next.

Copy the Password below and paste it into the Welcome dialog.

gzmWlsGBqt0W
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
Task 1. Configure internal traffic and health check firewall rules
In this task, you configure firewall rules to allow internal traffic connectivity and health check probes for your application. You explore the existing network and create new firewall rules to permit traffic from specified IP ranges.

Configure firewall rules to allow internal traffic connectivity from sources in the 10.10.0.0/16 range. This rule allows incoming traffic from any client located in the subnet.

Health checks determine which instances of a load balancer can receive new connections. For Application Load Balancing (HTTP), the health check probes to your load-balanced instances come from addresses in the ranges 130.211.0.0/22 and 35.191.0.0/16. Your firewall rules must allow these connections.

Explore the my-internal-app network
The network my-internal-app with subnet-a and subnet-b and firewall rules for SSH and ICMP traffic have been configured for you.

In the Google Cloud console, in the Navigation menu (Navigation menu icon), click VPC network > VPC networks.
Notice the my-internal-app network with its subnets: subnet-a and subnet-b.

Each Google Cloud project starts with the default network. In addition, the my-internal-app network has been created for you as part of your network diagram.

You will create the managed instance groups in subnet-a and subnet-b. Both subnets are in the us-east4 region because an internal Network Load Balancer is a regional service. The managed instance groups will be in different zones, making your service immune to zonal failures.

Create the firewall rule to allow traffic from any sources in the 10.10.0.0/16 range
Create a firewall rule to allow traffic in the 10.10.0.0/16 subnet.

On the Navigation menu (Navigation menu icon), click VPC network > Firewall.
Notice the app-allow-icmp and app-allow-ssh firewall rules.

These firewall rules have been created for you.

Click Create firewall rule.

Specify the following, and leave the remaining settings as their defaults.

Property	Value (type value or select option as specified)
Name	fw-allow-lb-access
Network	my-internal-app
Targets	Specified target tags
Target tags	backend-service
Source filter	IPv4 ranges
Source IPv4 ranges	10.10.0.0/16
Protocols and ports	Allow all
Note: Make sure to include the /16 in the Source IPv4 ranges.
Click Create.
Create the health check rule
Create a firewall rule to allow health checks.

On the Navigation menu (Navigation menu icon), click VPC network > Firewall.

Click Create firewall rule.

Specify the following, and leave the remaining settings as their defaults.

Property	Value (type value or select option as specified)
Name	fw-allow-health-checks
Network	my-internal-app
Targets	Specified target tags
Target tags	backend-service
Source filter	IPv4 Ranges
Source IPv4 ranges	130.211.0.0/22 and 35.191.0.0/16
Protocols and ports	Specified protocols and ports
Note: Make sure to include the /22 and /16 in the Source IPv4 ranges.
For tcp, check the checkbox and specify port 80.
Click Create.
Click Check my progress to verify the objective.
Assessment Completed!
Configure internal traffic and health check firewall rules
Assessment Completed!

Task 2. Create a NAT configuration using Cloud Router
In this task, you create a Cloud Router instance and configure Cloud NAT to enable your backend instances to send outbound traffic.

The Google Cloud VM backend instances that you setup in Task 3 will not be configured with external IP addresses.

Instead, you will setup the Cloud NAT service to allow these VM instances to send outbound traffic only through the Cloud NAT, and receive inbound traffic through the load balancer.

Create the Cloud Router instance
On the Google Cloud console title bar, type Network services in the Search field, then click Network services in the Products & pages section.

On the Network service page, click Star next to Network services.

Click Cloud NAT.

Click Get started to configure a NAT gateway.

Specify the following, and leave the remaining settings as their defaults.

Property	Value (type value or select option as specified)
Gateway name	nat-config
Network	my-internal-app
Region	us-east4
Click Cloud Router, and select Create new router.

For Name, type nat-router-us-east4.

Click Create.

In Create Cloud NAT gateway, click Create.

Note: Wait until the NAT Gateway Status changes to Running before moving onto the next task.
Click Check my progress to verify the objective.
Assessment Completed!
Create a NAT configuration using Cloud Router
Assessment Completed!

Task 3. Configure instance templates and create instance groups
In this task, you verify the pre-configured instance templates and managed instance groups. You execute startup scripts on the existing instances and create a utility VM to test connectivity to the backend instances.

A managed instance group uses an instance template to create a group of identical instances. Use these to create the backends of the internal Network Load Balancer.

This task has been performed for you at the start of this lab. You will need to SSH into each instance group VM and run the following command to setup the environment.

On the Navigation menu, click Compute Engine > VM instances.
Notice the instances that start with instance-group-1 and instance-group-2.

Select the SSH button next to instance-group-1 to SSH into the VM.

If prompted, allow SSH-in-browser to connect to VMs, click Authorize.

Run the following command to re-run the instance's startup script:

sudo google_metadata_script_runner startup
Copied!
Repeat the previous steps for instance-group-2.

Wait for both startup scripts to finish executing, then close the SSH terminal to each VM. The output of the startup script should state the following:

Finished running startup scripts.
Verify the backends
Verify that VM instances are being created in both subnets and create a utility VM to access the backends' HTTP sites.

On the Navigation menu, click Compute Engine > VM instances.
Notice the instances that start with instance-group-1 and instance-group-2.

These instances are in separate zones, and their internal IP addresses are part of the subnet-a and subnet-b CIDR blocks.

Click Create instance.

For the Machine configuration page, specify the following, and leave the remaining settings as their defaults:

Property	Value (type value or select option as specified)
Name	utility-vm
Region	us-east4
Zone	us-east4-c
Series	E2
Machine type	e2-medium (2 vCPU, 4 GB memory)
Click OS and storage.

If the Image shown is not Debian GNU/Linux 12 (bookworm), click Change and select Debian GNU/Linux 12 (bookworm), and then click Select.

Click Networking.

For Network interfaces, click the dropdown to edit the network interface.

Specify the following, and leave the remaining settings as their defaults.

Property	Value (type value or select option as specified)
Network	my-internal-app
Subnetwork	subnet-a
Primary internal IPv4 address	Ephemeral (Custom)
Custom ephemeral IP address	10.10.20.50
External IPv4 address	None
Click Done.

Click Create.

Note that the internal IP addresses for the backends are 10.10.20.2 and 10.10.30.2.

Note: If these IP addresses are different, replace them in the two curl commands below.
Click Check my progress to verify the objective.
Assessment Completed!
Configure instance templates and create instance groups
Assessment Completed!

For utility-vm, click SSH to launch a terminal and connect.

If prompted allow SSH-in-browser to connect to VMs, click Authorize.

To verify the welcome page for instance-group-1-xxxx, run the following command:

curl 10.10.20.2
Copied!
The output should look like this.

Output:

<h1>Internal Load Balancing Lab</h1><h2>Client IP</h2>Your IP address : 10.10.20.50<h2>Hostname</h2>Server Hostname:
 instance-group-1-1zn8<h2>Server Location</h2>Region and Zone: us-east4-a
To verify the welcome page for instance-group-2-xxxx, run the following command:
curl 10.10.30.2
Copied!
The output should look like this.

Output:

<h1>Internal Load Balancing Lab</h1><h2>Client IP</h2>Your IP address : 10.10.20.50<h2>Hostname</h2>Server Hostname:
 instance-group-2-q5wp<h2>Server Location</h2>Region and Zone: us-east4-b

Which of these fields identify the location of the backend?

Server Location

Server Hostname

Client IP

Note: This will be useful when verifying that the internal load balancer sends traffic to both backends.
Close the SSH terminal to utility-vm:
exit
Copied!
Task 4. Configure the internal Network Load Balancer
In this task you configure the internal Network Load Balancer to balance traffic between the two backends (instance-group-1 in us-east4-a

Network diagram

Start the configuration
On the Google Cloud console title bar, type Network services in the Search field, then click Network services in the Products & pages section > Load balancing.
Click + Create load balancer.
For Type of load balancer, select Network Load Balancer (TCP/UDP/SSL), click Next.
For Proxy or passthrough, select Passthrough load balancer and click Next.
For Public facing or internal, select Internal and click Next.
For Create load balance, click Configure.
For Load Balancer name, type my-ilb.
For Region, type us-east4.
For Network, select my-internal-app from the dropdown.
Configure the regional backend service
The backend service monitors instance groups and prevents them from exceeding configured usage.

Click Backend configuration.

Specify the following, and leave the remaining settings as their defaults.

Property	Value (select option as specified)
Instance group	instance-group-1 (us-east4-a)
Click Done.

Click Add a backend.

For Instance group, select instance-group-2 (us-east4-b.

Click Done.

For Health check, select Create a health check.

Specify the following, and leave the remaining settings as their defaults.

Property	Value (select option as specified)
Name	my-ilb-health-check
Protocol	TCP
Port	80
Check interval	10 sec
Timeout	5 sec
Healthy threshold	2
Unhealthy threshold	3
Note: Health checks determine which instances can receive new connections. This HTTP health check polls instances every 10 seconds, waits up to 5 seconds for a response, and treats 2 successful or 3 failed attempts as healthy threshold or unhealthy threshold, respectively.
Click Create.
Verify that there is a blue checkmark next to Backend configuration in the Cloud console. If there isn't, double-check that you have completed all the steps above.
Configure the frontend
The frontend forwards traffic to the backend.

Click Frontend configuration.

Specify the following, and leave the remaining settings as their defaults.

Property	Value (type value or select option as specified)
Subnetwork	subnet-b
Internal IP purpose > IP address	Create IP address
Specify the following, and leave the remaining settings as their defaults.

Property	Value (type value or select option as specified)
Name	my-ilb-ip
Static IP address	Let me choose
Custom IP address	10.10.30.5
Click Reserve.

Under Ports, for Port number, type 80.

Click Done.

Review and create the internal Network Load Lalancer
Click Review and finalize.
Review the Backend and Frontend.
Click Create.
Wait for the load balancer to be created before moving to the next task.
Click Check my progress to verify the objective.
Assessment Completed!
Configure the internal Network Load Balancer
Assessment Completed!

Task 5. Test the internal Network Load Balancer
In this task, you verify that the my-ilb IP address forwards traffic to instance-group-1 in us-east4-a

Access the internal Network Load Balancer
On the Navigation menu, click Compute Engine > VM instances.
For utility-vm, click SSH to launch a terminal and connect.
If prompted allow SSH-in-browser to connect to VMs, click Authorize.
To verify that the internal Network Load Balancer forwards traffic, run the following command:
curl 10.10.30.5
Copied!
The output should look like this.

Output:

<h1>Internal Load Balancing Lab</h1><h2>Client IP</h2>Your IP address : 10.10.20.50<h2>Hostname</h2>Server Hostname:
 instance-group-2-1zn8<h2>Server Location</h2>Region and Zone: us-east4-b
Note: As expected, traffic is forwarded from the internal load balancer (10.10.30.5) to the backend.
Run the same command a multiple times:
curl 10.10.30.5
curl 10.10.30.5
curl 10.10.30.5
curl 10.10.30.5
curl 10.10.30.5
curl 10.10.30.5
curl 10.10.30.5
curl 10.10.30.5
curl 10.10.30.5
curl 10.10.30.5
Copied!
You should be able to see responses from instance-group-1 in us-east4-a

Infrastructure Automation

Person: Now that we've covered several of Google Cloud's services and features, it makes sense to talk about how to automate the deployment of Google Cloud Infrastructure.
Calling the Cloud API from code is a powerful way to generate infrastructure.
But writing code to create infrastructure also has some challenges.
One issue is that the maintainability of the infrastructure depends directly on the quality of the software.
For example, a program could have dozens of locations that call the Cloud API to create VMs.
Fixing the problem with the definition of one VM would require you first identifying which of the dozen calls actually created it.
Standard software development best practices will apply and it's important to note that applications undergo changes rapidly requiring maintenance on your code.
Clearly another level of organization is needed, and that's the purpose of Terraform.
Terraform uses a system of highly structured templates and configuration files to document the infrastructure in an easily readable and understandable format.
Terraform conceals the actual Cloud API calls so you don't need to write the code and can focus on the definition of the infrastructure.
In this module we will cover how to use Terraform to automate the deployment of infrastructure and how to use Google Cloud Marketplace to launch infrastructure solutions.
You will use Terraform to deploy a VPC network, a firewall rule and VM instances in the lab for this module.
Let's start by talking about Terraform.
So far, you have been creating Google Cloud resources using the Google Cloud console and Cloud Shell.
We recommend the console when you are new to using a service or if you prefer a UI.
Cloud Shell works best when you are comfortable using a specific service and you want to quickly create resources using the command line.
Terraform takes this one step further.
Terraform is one of the tools used for Infrastructure as Code or IaC.
Before we dive into understanding Terraform, let’s look at what Infrastructure as Code is.
In essence, infrastructure as code allows for the quick provisioning and removing of infrastructures.
The on-demand provisioning of a deployment is extremely powerful.
This can be integrated into a continuous integration pipeline that smoothens the path to continuous deployment.
Automated infrastructure provisioning means that the infrastructure can be provisioned on demand, and the deployment complexity is managed in code.
This provides the flexibility to change infrastructure as requirements change.
And all the changes are in one place.
Infrastructure for environments such as development and test can now easily replicate production and can be deleted immediately when not in use.
All because of infrastructure as code.
Several tools can be used for IaC.
Google Cloud supports Terraform, where deployments are described in a file known as a configuration.
This details all the resources that should be provisioned.
Configurations can be modularized using templates which allow the abstraction of resources into reusable components across deployments.
In addition to Terraform, Google Cloud also provides support for other IaC tools, including: Chef Puppet Ansible Packer In this course we will focus on Terraform.
Terraform lets you provision Google Cloud resources—such as virtual machines, containers, storage, and networking—with declarative configuration files.
You just specify all the resources needed for your application in a declarative format and deploy your configuration.
HashiCorp Configuration Language (HCL) allows for concise descriptions of resources using blocks, arguments, and expressions.
This deployment can be repeated over and over with consistent results, and you can delete a whole deployment with one command or click.
The benefit of a declarative approach is that it allows you to specify what the configuration should be and let the system figure out the steps to take.
Instead of deploying each resource separately, you specify the set of resources which compose the application or service, allowing you to focus on the application.
Unlike Cloud Shell, Terraform will deploy resources in parallel.
Terraform uses the underlying APIs of each Google Cloud service to deploy your resources.
This enables you to deploy almost everything we have seen so far, from instances, instance templates, and groups, to VPC networks, firewall rules, VPN tunnels, Cloud Routers, and load balancers.
For a full list of supported resource types, a link to the Using Terraform with Google Cloud documentation page is included in the Course Resources.
The Terraform language is the user interface to declare resources.
Resources are infrastructure objects such as Compute Engine virtual machines, storage buckets, containers, or networks.
A Terraform configuration is a complete document in the Terraform language that tells Terraform how to manage a given collection of infrastructure.
A configuration can consist of multiple files and directories.
The syntax of the Terraform language includes: Blocks that represent objects and can have zero or more labels.
A block has a body that enables you to declare arguments and nested blocks.
Arguments are used to assign a value to a name.
An expression represents a value that can be assigned to an identifier.
Terraform can be used on multiple public and private clouds.
Terraform is already installed in Cloud Shell.
The example Terraform configuration file shown starts with a provider block that indicates that Google Cloud is the provider.
The region for the deployment is specified inside the provider block.
The resource block specifies a Google Cloud Compute Engine instance, or virtual machine.
The details of the instance to be created are specified inside the resource block.
The output block specifies an output variable for the Terraform module.
In this case, a value will be assigned to the output variable "instance_ip."
Let’s look at a simple example in Terraform.
Before you get into the lab, let me walk you through how Terraform can be used to set up an auto mode network with an HTTP firewall rule.
For this example we are going to define our infrastructure in a single file, main.tf.
As our infrastructure becomes more complex we can build each element in a separate file to make the management easier.
Let’s start with the main.tf file.
The main.tf file is where we specify the infrastructure we wish to create.
It is like a blueprint for our desired state.
First we define the provider.
Next we define our network, setting the auto create subnetworks flag to true which will automatically create a subnetwork in each region.
We also set the mtu to 1460.
Next, we define our firewall.
Here we are allowing TCP access to port 80 and 8080.
Terraform takes this main.tf file and uses it as the specification for what to create.
Once we have completed the main.tf file, we can deploy the defined infrastructure in Cloud Shell.
We use the command terraform init to initialize the new Terraform configuration.
We run this command in the same folder as the main.tf file.
The terraform init command makes sure that the Google provider plugin is downloaded and installed in a subdirectory of the current working directory, along with various other bookkeeping files.
You will see an "Initializing provider plugins" message.
Terraform knows that you're running from a Google project, and it is getting Google resources.
The terraform plan command performs a refresh, unless explicitly disabled, and then determines what actions are necessary to achieve the desired state specified in the configuration files.
This command is a convenient way to check whether the execution plan for a set
of changes matches your expectations without making any changes to real resources or to the state.
The terraform apply command creates the infrastructure defined in the main.tf file.
Once this command has completed you will be able to access the defined infrastructure.

Lab (Automating the Deployment of Infrastructure Using Terraform)
Overview
Terraform enables you to safely and predictably create, change, and improve infrastructure. It is an open-source tool that codifies APIs into declarative configuration files that can be shared among team members, treated as code, edited, reviewed, and versioned.

In this lab, you create a Terraform configuration with a module to automate the deployment of Google Cloud infrastructure. Specifically, you deploy one auto mode network with a firewall rule and two instances, as shown in this diagram:

Terraform configuration diagram

Objectives
In this lab, you learn how to perform the following tasks:

Create a configuration for an auto mode network
Create a configuration for a firewall rule
Create a module for instances
Create and deploy a configuration
Verify the deployment of a configuration
Setup
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
Task 1. Set up Terraform and Cloud Shell
In this task, you configure your Cloud Shell environment to use Terraform.

Activate Google Cloud Shell
Google Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud.

Google Cloud Shell provides command-line access to your Google Cloud resources.

In Cloud console, on the top right toolbar, click the Open Cloud Shell button.

Highlighted Cloud Shell icon

Click Continue.

It takes a few moments to provision and connect to the environment. When you are connected, you are already authenticated, and the project is set to your PROJECT_ID. For example:

Project ID highlighted in the Cloud Shell Terminal

gcloud is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

You can list the active account name with this command:
gcloud auth list
Copied!
Output:

Credentialed accounts:
 - <myaccount>@<mydomain>.com (active)
</mydomain></myaccount>
Example output:

Credentialed accounts:
 - google1623327_student@qwiklabs.net
You can list the project ID with this command:
gcloud config list project
Copied!
Output:

[core]
project = <project_id>
</project_id>
Example output:

[core]
project = qwiklabs-gcp-44776a13dea667a6
Note: Full documentation of gcloud is available in the gcloud CLI overview guide .
Install Terraform
Terraform is not pre-installed in Cloud Shell. You must install the Terraform CLI and configure it to persist across your Cloud Shell sessions.

To configure the HashiCorp repository and install Terraform, and to ensure that this installation persists across future sessions, run the following commands in the Cloud Shell terminal:
cat <<'EOF' > ~/.customize_environment
# Set up HashiCorp repository and install Terraform
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install -y terraform
EOF
bash ~/.customize_environment
Copied!
To verify that Terraform has been installed correctly, run:
terraform --version
Copied!
The output should show the installed version (v1.5.7 or later):

Terraform v1.9.0
Create the configuration files
Now that you have installed Terraform, create the directory and files for your Terraform configuration.

To create a directory for your Terraform configuration, run the following command:
mkdir tfinfra
Copied!
In Cloud Shell, click Open Editor (Cloud Shell Editor icon).
Note: If you see the message "Unable to load code editor because third-party cookies are disabled", click Open in New Window. The code editor will open in a new tab. Return to the original tab, click Open Terminal and then switch back to the code editor tab. You will periodically need to switch back to the Cloud Shell terminal in this lab.

In the left pane of the code editor, expand the tfinfra folder.
Initialize Terraform
Terraform uses a plugin-based architecture to support the numerous infrastructure and service providers available. Each "provider" is its own encapsulated binary distributed separately from Terraform itself. Initialize Terraform by setting Google as the provider.

To create a new file inside tfinfra folder, right-click on tfinfra folder and then click New File.
Name the new file provider.tf, and then open it.
Copy the code into provider.tf:
provider "google" {}
Copied!
To save provider.tf, click File > Save.

To initialize Terraform, run the following command:

cd tfinfra
terraform init
Copied!
You are now ready to work with Terraform in Cloud Shell.

Task 2. Create mynetwork and its resources
In this task, you create the auto mode network mynetwork along with its firewall rule and two VM instances (mynet_vm_1 and mynet_vm_2).

Configure mynetwork
Create a new configuration, and define mynetwork.

To create a new file inside tfinfra, right-click on tfinfra folder and then click New File.
Name the new file mynetwork.tf, and then open it.
Copy the following base code into mynetwork.tf:
// Create the mynetwork network
resource [RESOURCE_TYPE] "mynetwork" {
name = [RESOURCE_NAME]
// RESOURCE properties go here
}
Copied!
This base template is a great starting point for any Google Cloud resource. The name field allows you to name the resource, and the type field allows you to specify the Google Cloud resource that you want to create. You can also define properties, but these are optional for some resources.

In mynetwork.tf, replace [RESOURCE_TYPE] with "google_compute_network" (with the quotes).
Note: The google_compute_network resource is a VPC network. Available resources are in the Google Cloud provider documentation. Learn more about this specific resource in the Terraform documentation.

In mynetwork.tf, replace [RESOURCE_NAME] with "mynetwork" (with the quotes).
Add the following property to mynetwork.tf:
auto_create_subnetworks = true
Copied!
By definition, an auto mode network automatically creates a subnetwork in each region. Therefore, you are setting auto_create_subnetworks to true.

Verify that mynetwork.tf file look like this:
// Create the mynetwork network
resource "google_compute_network" "mynetwork" {
name = "mynetwork"
// RESOURCE properties go here
auto_create_subnetworks = true
}
Copied!
To save mynetwork.tf, click File > Save.
Configure the firewall rule
Define a firewall rule to allow HTTP, SSH, RDP, and ICMP traffic on mynetwork.

Add the following base code to mynetwork.tf:
// Add a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on mynetwork
resource [RESOURCE_TYPE] "mynetwork-allow-http-ssh-rdp-icmp" {
name = [RESOURCE_NAME]
// RESOURCE properties go here
}
Copied!
In mynetwork.tf, replace [RESOURCE_TYPE] with "google_compute_firewall" (with the quotes).
Note: The google_compute_firewall resource is a firewall rule. Learn more about this specific resource in the Terraform documentation.

In mynetwork.tf, replace [RESOURCE_NAME] with "mynetwork-allow-http-ssh-rdp-icmp" (with the quotes).
Add the following property to mynetwork.tf:
network = google_compute_network.mynetwork.self_link
Copied!
Note: Because this firewall rule depends on its network, you are using the google_compute_network.mynetwork.self_link reference to instruct Terraform to resolve these resources in a dependent order. In this case, the network is created before the firewall rule.

Add the following properties to mynetwork.tf:
allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
    }
allow {
    protocol = "icmp"
    }
source_ranges = ["0.0.0.0/0"]
Copied!
The list of allow rules specifies which protocols and ports are permitted.

Verify that your mynetwork.tf file look like this:
// Create the mynetwork network
resource "google_compute_network" "mynetwork" {
name = "mynetwork"
// RESOURCE properties go here
auto_create_subnetworks = "true"
}
// Add a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on mynetwork
resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
name = "mynetwork-allow-http-ssh-rdp-icmp"
// RESOURCE properties go here
network = google_compute_network.mynetwork.self_link
allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
    }
allow {
    protocol = "icmp"
    }
source_ranges = ["0.0.0.0/0"]
}
Copied!
To save mynetwork.tf, click File > Save.
Configure the VM instance
Define the VM instances by creating a VM instance module. A module is a reusable configuration inside a folder. You will use this module for both VM instances of this lab.

To create a new folder inside tfinfra, select the tfinfra folder, and then click File > New Folder.
Name the new folder instance.
To create a new file inside instance, right-click on instance folder and then click New File.
Name the new file main.tf, and then open it.
You should have the following folder structure in Cloud Shell:

Folder structure

Copy the following base code into main.tf:
resource [RESOURCE_TYPE] "vm_instance" {
  name = [RESOURCE_NAME]
  // RESOURCE properties go here
}
Copied!
In main.tf, replace [RESOURCE_TYPE] with "google_compute_instance" (with the quotes).
Note: The google_compute_instance resource is a Compute Engine instance. Learn more about this specific resource in the Terraform documentation.

In main.tf, replace [RESOURCE_NAME] with "${var.instance_name}" (with the quotes).
Because you will be using this module for both VM instances, you are defining the instance name as an input variable. This allows you to control the name of the variable from mynetwork.tf. Learn more about input variables in the Terraform: Define Input Variables Guide.

Add the following properties to main.tf:
  zone         = "${var.instance_zone}"
  machine_type = "${var.instance_type}"
Copied!
These properties define the zone and machine type of the instance as input variables.

Add the following properties to main.tf:
  boot_disk {
    initialize_params {
      image = "debian_image_project/debian_image_id_short"
      }
  }
Copied!
This property defines the boot disk to use the debian_image_name OS image. Because both VM instances will use the same image, you can hard-code this property in the module.

Add the following properties to main.tf:
  network_interface {
    network = "${var.instance_network}"
    access_config {
      // Allocate a one-to-one NAT IP to the instance
    }
  }
Copied!
This property defines the network interface by providing the network name as an input variable and the access configuration. Leaving the access configuration empty results in an ephemeral external IP address (required in this lab). To create instances with only an internal IP address, remove the access_config section. For more information, see the Terraform documentation.

Verify that main.tf looks like this, including brackets {}
resource "google_compute_instance" "vm_instance" {
  name         = "${var.instance_name}"
  zone         = "${var.instance_zone}"
  machine_type = "${var.instance_type}"
  boot_disk {
    initialize_params {
      image = "debian_image_project/debian_image_id_short"
      }
  }
  network_interface {
    network = "${var.instance_network}"
    access_config {
      // Allocate a one-to-one NAT IP to the instance
    }
  }
}
Copied!
To save main.tf, click File > Save.
To create a new file inside instance, right-click on instance folder and then click New File.
Name the new file variables.tf, and then open it.
Define the 4 input variables in variables.tf.
variable "instance_name" {}
variable "instance_zone" {}
variable "instance_type" {
  default = "e2-micro"
  }
variable "instance_network" {}
Copied!
By giving instance_type a default value, you make the variable optional. The instance_name, instance_zone, and instance_network are required, and you will define them in mynetwork.tf.

To save variables.tf, click File > Save.
Add the following VM instances to mynetwork.tf:

// Create the mynet-vm-1 instance
module "mynet-vm-1" {
  source           = "./instance"
  instance_name    = "mynet-vm-1"
  instance_zone    = "Zone"
  instance_network = google_compute_network.mynetwork.self_link
}

// Create the mynet-vm-2" instance
module "mynet-vm-2" {
  source           = "./instance"
  instance_name    = "mynet-vm-2"
  instance_zone    = "Zone 2"
  instance_network = google_compute_network.mynetwork.self_link
}
Copied!
These resources are leveraging the module in the instance folder and provide the name, zone, and network as inputs. Because these instances depend on a VPC network, you are using the google_compute_network.mynetwork.self_link reference to instruct Terraform to resolve these resources in a dependent order. In this case, the network is created before the instance.

Note: The benefit of writing a Terraform module is that it can be reused across many configurations. Instead of writing your own module, you can also leverage existing modules from the Terraform Module registry.

To save mynetwork.tf, click File > Save.

Verify that mynetwork.tf looks like this, including brackets {}

// Create the mynetwork network
resource "google_compute_network" "mynetwork" {
name = "mynetwork"
// RESOURCE properties go here
auto_create_subnetworks = "true"
}
// Add a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on mynetwork
resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
name = "mynetwork-allow-http-ssh-rdp-icmp"
// RESOURCE properties go here
network = google_compute_network.mynetwork.self_link
allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
    }
allow {
    protocol = "icmp"
    }
source_ranges = ["0.0.0.0/0"]
}
// Create the mynet-vm-1 instance
module "mynet-vm-1" {
  source           = "./instance"
  instance_name    = "mynet-vm-1"
  instance_zone    = "Zone"
  instance_network = google_compute_network.mynetwork.self_link
}
// Create the mynet-vm-2" instance
module "mynet-vm-2" {
  source           = "./instance"
  instance_name    = "mynet-vm-2"
  instance_zone    = "Zone 2"
  instance_network = google_compute_network.mynetwork.self_link
}
Copied!
Create mynetwork and its resources
It's time to apply the mynetwork configuration.

To rewrite the Terraform configuration files to a canonical format and style, run the following command:
terraform fmt
Copied!
The output should look like this:

mynetwork.tf
Note: If you get an error, revisit the previous steps to ensure that your configuration matches the lab instructions. If you cannot troubleshoot the issue of your configuration, download and then look at these finished configurations:

mynetwork.tf
main.tf
provider.tf
variables.tf
To initialize Terraform, run the following command:
terraform init
Copied!
The output should look like this:

Initializing the backend...

Initializing modules...

Initializing provider plugins...
- Reusing previous version of hashicorp/google from the dependency lock file
- Using previously-installed hashicorp/google v8.3.0

...

Terraform has been successfully initialized!
Note: If you get an error, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.

To create an execution plan, run the following command:
terraform plan
Copied!
The output should look like this:

...
Plan: 4 to add, 0 to change, 0 to destroy.
...
Terraform determined that the following 4 resources need to be added:

Name	Description
mynetwork	VPC network
mynetwork-allow-http-ssh-rdp-icmp	Firewall rule to allow HTTP, SSH, RDP and ICMP
mynet-vm-2	VM instance in Zone
mynet-vm-2	VM instance in Zone 2
To apply the desired changes, run the following command:
terraform apply
Copied!
To confirm the planned actions, type:
yes
Copied!
The output should look like this:

...
Apply complete! Resources: 4 added, 0 changed, 0 destroyed.
Click Check my progress to verify the objective.
Create mynetwork and its resources

Note: If you get an error during the execution, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.

Task 3. Verify your deployment
In the Google Cloud console, verify that the resources were created.

Verify your Virtual Private Cloud (VPC) network in the Google Cloud console
In the Google Cloud console, in the Navigation menu (Navigation menu icon), click VPC network > VPC networks.
View the mynetwork VPC network with a subnetwork in every region.
In the Navigation menu, click VPC network > Firewall.
Sort the firewall rules by Network.
View the mynetwork-allow-http-ssh-rdp-icmp firewall rule for mynetwork.
Verify your VM instances in the Cloud console
In the Navigation menu (Navigation menu icon), click Compute Engine > VM instances.
View the mynet-vm-1 and mynet-vm-2 instances.
Note the internal IP address for mynet-vm-2.
For mynet-vm-1, click SSH to launch a terminal and connect.
To test connectivity to mynet-vm-2's internal IP address, run the following command in the SSH terminal (replacing mynet-vm-2's internal IP address with the value noted earlier):
ping -c 3 <Enter mynet-vm-2's internal IP here>
Copied!
Note: This should work because both VM instances are on the same network, and the firewall rule allows ICMP traffic!
Task 4. Review
In this lab, you created a Terraform configuration with a module to automate the deployment of Google Cloud infrastructure. As your configuration changes, Terraform can create incremental execution plans, which allows you to build your overall configuration step by step.

The instance module allowed you to re-use the same resource configuration for multiple resources while providing properties as input variables. You can leverage the configuration and module that you created as a starting point for future deployments.

Person: Let's learn a little more about Google Cloud Marketplace.
Google Cloud Marketplace let's you quickly deploy functional software packages that run on Google Cloud.
Essentially Cloud Marketplace offers production grade solutions from third-party vendors who have already created their own deployment configurations based on Terraform.
These solutions are billed together with all of your project's Google Cloud Services.
If you already have a license for a third-party service, you might be able to use a bring-your-own-license solution.
You can deploy a software package now and scale that deployment when your application requires additional capacity.
Google Cloud even updates the images of these software packages to fix critical issues and vulnerabilities, but doesn't update software that you've already deployed.
You even can get direct access to partner support.


Philipp: Let me show you how to launch infrastructure solutions on GCP Marketplace.
My goal is to deploy a LAMP stack to a single compute engine instance.
A LAMP stack consists of Linux, Apache HTTP server, MySQL, and PHP.
So here I am in the GCP Console.
And let's go ahead and navigate to the GCP Marketplace.
I'm going to go to the navigation menu and just go to Marketplace.
Now I have lots of different options available.
There's some filters on the left that could search directly.
There's some featured solutions that are in here.
So there's really a lot of stuff to choose from.
In my case, I'm going to search for LAMP stack, because that's what I want to create.
And here, I actually have different options.
They're different providers, that's really what that means.
The different providers will offer these services.
I'm going to click the first one that's in here.
Now I have the configuration page.
I see the package contents.
Tells me what LAMP is again.
I can see that also here, the operating system is Linux.
It has Apache installed.
I have PHP, and I have MySQL.
And we should also obviously have HTTP enabled and we'll see that in a second.
There's no usage fee for the service.
If there was, it would all be billed together.
We have an instance billing.
This is just an N1 standard one instance along with its persistent disk and there's a sustained use discount.
So if I click on launch and compute engine, I get the actual VM configuration page.
I could now change the instance type if I wanted.
I could create a larger instance, a small instance, I could customize an instance.
And now because this is an Apache HTTP, we can see that the HTTP firewall role is also set up.
I also have some networking options if I want to, you know, place this somewhere else.
I even have some extra options if I want to install phpMyAdmin.
All that is available to me here.
And I have logging options for Stackdriver to enable Stackdriver logging and monitoring and I can do that directly in here.
So it's just like a regular VM instance page.
So I'm going to go and click deploy.
And when I do that, it's going to navigate us to Deployment Manager.
And you can see all of the configuration, as well as all the imported files that were just displayed there that are used throughout this deployment.
So we can see again that the solutions on Marketplace are just Deployment Manager configurations that
are already set up for you to use so that you don't have to recreate them.
I also see that a password is being generated, a VM is being generated.
I can click on that and get some more information about it.
We can see the recent software and we have that HTTP firewall role, so just TCP80 that's being enabled here.
So we can just wait for that.
The instance is up.
It's just configuring some more software.
And then once it's up and running, we can get some more information about that LAMP stack that we just have generated.
So I can click back on LAMP.
It's still pending, but once it's up and running, we'll have some more information here.
Let's see.
It doesn't have the address yet, it's still pending.
And there we go.
So we have an address, we have a user, we have a password, the instance.
So all the type of information.
We can visit the site, we can SSH to this.
We have some next steps.
We could open also HTTPS traffic, change the password, assign a static external IP address rather then the current default ephemeral IP address.
We can learn more about the software that's being installed.
But we can also look at this from a Compute Engine perspective.
So if I navigate to Compute Engine, I'll also see the instance right here.
That's how easy it is to launch infrastructure solutions on GCP Marketplace.


What’s the benefit of writing templates for your Terraform configuration?
- Allows you to abstract part of your configuration into individual building blocks that you can reuse

What does Google Cloud Marketplace offer?
- Production-grade solutions from third-party vendors who have already created their own deployment configurations based on Terraform


Managed Services
In the last module, we discussed how to automate the creation of infrastructure.
As an alternative to infrastructure automation, you can eliminate the need to create infrastructure by leveraging a managed service.
Managed services are partial or complete solutions offered as a service.
They exist on a continuum between platform-as-a-service and software-as-a-service, depending on how much of the internal methods and controls are exposed.
Using a managed service allows you to outsource a lot of the administrative and maintenance overhead to Google if your application requirements fits within the service offering.
In this module, we give you an overview of BigQuery, Dataflow, Dataprep by Trifacta, and Managed Service for Apache Spark.
Now, all of these services are for data analytics purposes, and since that's not the focus on this course series, there won't be any labs in this module.
Instead, we'll have a quick demo to illustrate how easy it is to use managed services.

BigQuery
Let’s start by talking about BigQuery.
BigQuery is Google Cloud's serverless, highly-scalable, and cost-effective cloud data warehouse.
It is a petabyte scale data warehouse that allows for super-fast queries using the processing power of Google's infrastructure.
Because there is no infrastructure for you to manage, you can focus on uncovering meaningful insights using familiar SQL without the need for a database administrator.
BigQuery is used by all types of organizations.
You can access BigQuery by using the Google Cloud console, by using a command-line tool, or by
making calls to the BigQuery REST API using a variety of client libraries such as Java, .
NET, or Python.
There are also several third-party tools that you can use to interact with BigQuery, such as visualizing the data, or loading the data.
Here is an example of a Standard SQL query on a table called groceries.
This query produces one output column for each column in the table groceries, aliased as g.

Data flow
Let's learn a little bit about Dataflow.
Dataflow is a managed service for executing a wide variety of data processing patterns.
It's essentially a fully managed service for transforming and enriching data in stream and batch modes with equal reliability and expressiveness.
With Dataflow, a lot of the complexity of infrastructure setup and maintenance is handled for you.
It's built on Google Cloud infrastructure and autoscales to meet the demands of your data pipelines, allowing it to intelligently scale to millions of queries per second.
Dataflow supports fast, simplified pipeline development via expressive SQL, Java, and Python APIs in the Apache Beam SDK, which
provides a rich set of windowing and session analysis primitives, as well as an ecosystem of source and sync connectors.
Dataflow is also tightly coupled with other Google Cloud services, like Google Cloud Observability, so you can set
up priority alerts and notifications to monitor your pipeline and the quality of data coming in and out.
This diagram shows some example use cases of Dataflow.
As I just mentioned, Dataflow processes stream and batch data.
This data could come from other Google Cloud services like Datastore or Pub/Sub, which is Google's messaging and publishing service.
The data could also be ingested from third-party services like Apache Avro and Apache Kafka.
After you transform the data with Dataflow, you can analyze it in BigQuery, Gemini, or even Bigtable.
Using Data Studio, you can even build real time dashboards for IoT devices.

Dataprep by Trifacta
Let’s learn a little bit about Dataprep by Trifacta, which is commonly referred to as Dataprep.
Dataprep is an intelligent data service for visually exploring, cleaning, and preparing structured and unstructured data for analysis, reporting, and machine learning.
Because Dataprep is serverless and works at any scale, there is no infrastructure to deploy or manage.
Your next ideal data transformation is suggested and predicted with each UI input, so you don't have to write code.
With automatic schema, data type, possible joins, and anomaly detection, you can skip time-consuming data profiling and focus on data analysis.
Dataprep is an integrated partner service operated by Trifacta and based on their industry-leading data-preparation solution, Trifacta Wrangler.
Google works closely with Trifacta to provide a seamless user experience that removes the need for up-front software installation, separate licensing costs, or ongoing operational overhead.
Dataprep is fully managed and scales on-demand to meet your growing data-preparation needs, so you can stay focused on analysis.
Here's an example of a Dataprep architecture.
As you can see, Dataprep can be leveraged to prepare raw data from BigQuery, Cloud Storage, or a file upload before ingesting it onto a transformational pipeline like Dataflow.
The refined data can then be exported to BigQuery or Cloud Storage for analysis and machine learning.

Managed Service for Apache Spark
Let’s learn a little bit about Managed Service for Apache Spark.
Managed Service for Apache Spark is a fast, easy-to-use, fully managed cloud service for running Apache Spark and Apache Hadoop clusters in a simpler way.
You only pay for the resources you use with per-second billing.
If you leverage preemptible instances in your cluster, you can reduce your cost even further.
Without using Managed Service for Apache Spark, it can take from 5 to 30 minutes to create Spark and Hadoop clusters on-premises or through other infrastructure- as-a-service providers.
Managed Service for Apache Spark clusters are quick to start, scale, and shut down, with each of these operations taking 90 seconds or less, on average.
This means you can spend less time waiting for clusters and more hands-on time working with your data.
Managed Service for Apache Spark has built-in integration with other Google Cloud services such as BigQuery, Cloud Storage, Bigtable, Cloud Logging and Cloud Monitoring.
This provides you with a complete data platform rather than just a Spark or Hadoop cluster.
As a managed service, you can create clusters quickly, manage them easily, and save money by turning clusters off when you don't need them.
With less time and money spent on administration, you can focus on your jobs and your data.
If you're already using Spark, Hadoop, Pig, or Hive, you don't even need to learn new tools or APIs to use Managed Service for Apache Spark.
This makes it easy to move existing projects into Managed Service for Apache Spark without redevelopment.
Now, Managed Service for Apache Spark and Dataflow can both be used for data processing, and there’s overlap in their batch and streaming capabilities.
So how do you decide which product is a better fit for your environment?
Well, first, ask yourself whether you have dependencies on specific tools or packages in the Apache Hadoop or Spark ecosystem.
If that's the case, you'll obviously want to use Managed Service for Apache Spark.
If not, ask yourself whether you prefer a hands-on or DevOps approach to operations, or a hands-off or serverless approach.
If you opt for the DevOps approach, you want to use Managed Service for Apache Spark, otherwise, use Dataflow.

Managed service for apache spark
Let’s look at how to create a Managed Service for Apache Spark cluster, modify the number of workers in the cluster, and submit a simple Apache Spark job.
Kindly note that Managed Service for Apache Spark used to be called Dataproc.
So here I am in the GCP console.
And the first thing I want to do is navigate to Cloud Dataproc.
It's pretty far down, so let's navigate down to big data.
We have Dataproc.
And it's going to check if there is already a cluster, which we don't have, so we can go ahead and now create a cluster.
And we can start off by defining the name.
Let's just call it our example cluster.
And then I'm not going to change any of the other settings.
I'll just kind of highlight them.
We can define where this is stored, what regions and zones, what kind of mode, which defines the relationship between nodes and workers.
We want to have one master and workers.
You can also have a high availability setting where you have three masters and then define the name of the workers.
You have the machine types available for the master node, so four virtual CPUs.
And then we also have the workers.
There also can be four virtual CPUs, and they're going to be two of them.
So in total, this itself is going to create 12 virtual CPUs.
If we go to the advanced options, we could make some of these nodes preemptible.
We can define the network [Indistinct] network tags in terms of firewall rules, make this internal IP only, Cloud storage bucket for staging, image.
You can see there are lots of other options, all the way down to the specific encryption.
So let me go ahead and just create this with the default configuration.
And click create.
And again, this is going to create a bunch of different machines for us now.
If I open another tab and actually navigate to Compute Engine, we'll see all those instances being generated for us.
So I can go to Compute Engine.
So even though this is a managed service, we can see all the instances.
They're all ready.
So we have the master and we have our two worker nodes, and they just take the name that I specified.
That attaches M for master, W for worker, and starts with a zero index.
So if I come back here, I can refresh.
The cluster itself is still being initialized.
That's the software that's being installed and all the setup is happening in the back end.
And once the cluster is ready, we can go ahead and we could maybe resize that.
We see that we currently have two worker nodes.
We could change that to something else that can be three worker nodes.
And then after that, we're actually going to go ahead and submit a job for this.
So here we are.
Just took another minute or two.
We have the cluster up and running.
I can go click on the cluster itself and I can get more information about it.
So here we have all sorts of monitoring set up.
If I go to the VM instances, I'll see those.
[Indistinct] master, any jobs I have, which currently we don't have any yet.
And if I click on the configuration, we'll see that we currently have two worker nodes.
And if I click on edit, I can change that.
So let's say we want three worker node.
We can change that to three and hit save, and it's now going to go ahead and request that update for us.
So it's going to create another worker and it's also going to update the master and let the master
know that there is another worker out there so when we submit jobs, all the workers are being leveraged.
So if I change back to Compute Engine, here we see the new worker is already up and running.
And if come back here and refresh, you can see that the cluster itself is still being updated.
And this again should just take a minute or two.
Pretty fast.
Again, this is a managed service, but we can see the actual back-end instances that are being leveraged.
So here we can see the cluster update is complete.
I can click on it again and go to the configuration.
We can see that we now have three worker nodes.
So time to submit a job.
Let's go to the job section and click on submit a job.
I can leave the job ID, leave the region.
Obviously you want to select the cluster, especially if I had multiple clusters.
The job type in this case is going to be Spark.
I'm going to define a main class.
This is just from the example class.
And what we're going to do actually is we're going to provide an example to calculate the value of pi.
So arguments, I'm just going to give it 1,000.
And jar file, I'm going to provide that as well.
And then I can review that.
There's lots of other things.
I have properties, labels.
So I'm all set, so I'm going to click submit on this job.
So it's going to go ahead and submit that.
And that job is now running.
That's the status symbol that's on here right now.
I can go click on that job itself.
And here I can see the job actually running.
I can also review the configuration one more time, so here you see all the different settings that I just specified.
And we can go back to output.
And again, this is now going to do a rough calculation for us to estimate the value of pi.
So we'll just wait for that.
And here we go.
It says pi is roughly this.
So the job is now complete.
And if this is all that we wanted to do, we could go ahead and delete the cluster.
Otherwise, we could submit more jobs.
In our case, we're done.
So let's go back to the cluster, select it and click delete.
It's going to delete also all the data.
Can't undo this.
Okay.
Click that.
You can go to Compute Engine, refresh here.
We can already see that all of these are now being stopped and will then be deleted.
And that way you can easily spin up clusters and delete them so that you're only being charged for the uses of the cluster while you need it.
So we can wait around for this to be deleted.
So that just took another minute or two.
We can see that the cluster itself is deleted.
And if I go to the instances, we can also see that all the instances are gone.
That's how easy it is to create a Managed Service for Apache Spark cluster and submit a job to that cluster.