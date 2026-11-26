---
name: Terraform on Google Cloud
district: delivery
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is: Infrastructure as code. You declare resources in configuration files and Terraform creates, changes or deletes real resources to match. Open source, from HashiCorp, and the default IaC tool on Google Cloud. No longer preinstalled in Cloud Shell (removed June 2026): the lecture still says it is, the lab installs it.
- Four commands: `terraform init` (fetch providers), `terraform plan` (preview the changes), `terraform apply` (make them), `terraform destroy` (tear everything down). `terraform fmt` tidies the files into the standard style.
- Language is HCL: blocks (`provider`, `resource`, `variable`, `output`, `module`) holding arguments (name = value) and expressions. A configuration is all the `.tf` files in the folder.
- Order comes from references: `network = google_compute_network.mynetwork.self_link` makes the network get built before the firewall rule. Anything unrelated is created in parallel, unlike a gcloud script running line by line.
- State: a file recording what Terraform built. Teams keep it in a Cloud Storage bucket.
- Google's own tool, Deployment Manager, is retired (support ended March 2026). Infrastructure Manager is Google's managed service that runs Terraform for you.
- Gemini Cloud Assist can write the gcloud script or Terraform for a described setup.
- State needs care: a Cloud Storage backend locks it so two people can't apply at once. Never edit it by hand or commit it to Git (it can hold secrets).
- Modules package reusable pieces (a VPC, a GKE cluster): a folder of `.tf` files with input variables, called with `module "x" { source = "./folder" ... }`. A variable with a `default` is optional. Google publishes ready-made ones (Cloud Foundation Toolkit); there is also the public Terraform Registry.
- Other IaC tools Google Cloud supports, named in the lecture: Chef, Puppet, Ansible, Packer.
- Google Cloud Marketplace: ready-to-deploy third-party software (e.g. a LAMP stack on one VM), packaged by the vendor as Terraform deployment configurations. Billed with the rest of the project; some offer bring-your-own-license. Google patches the images, but not software already deployed. The course demo still shows Deployment Manager, which is gone.
- Imperative versus declarative: a gcloud script says how; Terraform says what, and the next `plan` shows any drift from it.
- 'Service catalog and provisioning' (exam guide 4.1): Service Catalog offers approved Terraform solutions for teams to self-serve.
- Teams that live in Kubernetes can manage Google Cloud resources as Kubernetes objects with Config Connector.
Like what I know: package.json plus a lockfile for infrastructure, and React's model: declare the end state, the tool works out the diff and applies it.

## Isolate
Pick it when: Infrastructure has to be repeatable, reviewable and versioned: the same environment for dev, staging and production, or one that can be rebuilt after a disaster.
Not it when (use the console or gcloud instead): It's a one-off look or a quick experiment. For shipping application versions rather than infrastructure, Cloud Build and Cloud Deploy.

## Execute
What I built: Course lab (Elastic Infrastructure: Terraform), date to add. In Cloud Shell, folder `tfinfra`: `provider.tf` (`provider "google" {}`), `mynetwork.tf` (auto mode network `mynetwork`, one firewall rule for tcp 22, 80, 3389 and ICMP from anywhere, two calls to a module) and a module in `instance/` (`main.tf`, `variables.tf`) that builds one VM from four variables: name, zone, network, and type defaulting to e2-micro. Plan said 4 to add; apply built the network, the rule and `mynet-vm-1` and `mynet-vm-2` in two zones. `mynet-vm-1` could ping `mynet-vm-2` on its internal IP. An empty `access_config {}` gives a VM an ephemeral external IP; leave the block out for internal only.

```bash
terraform fmt && terraform init && terraform plan
terraform apply     # type yes
```

```hcl
module "mynet-vm-1" {
  source           = "./instance"
  instance_name    = "mynet-vm-1"
  instance_zone    = "ZONE"
  instance_network = google_compute_network.mynetwork.self_link
}
```

## Missed
