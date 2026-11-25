---
name: Terraform on Google Cloud
district: delivery
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is: Infrastructure as code. You declare resources in configuration files and Terraform creates, changes or deletes real resources to match. Open source, from HashiCorp, and the default IaC tool on Google Cloud; preinstalled in Cloud Shell.
- Four commands: `terraform init` (fetch providers), `terraform plan` (preview the changes), `terraform apply` (make them), `terraform destroy` (tear everything down).
- State: a file recording what Terraform built. Teams keep it in a Cloud Storage bucket.
- Google's own tool, Deployment Manager, is retired (support ended March 2026). Infrastructure Manager is Google's managed service that runs Terraform for you.
- Gemini Cloud Assist can write the gcloud script or Terraform for a described setup.
- State needs care: a Cloud Storage backend locks it so two people can't apply at once. Never edit it by hand or commit it to Git (it can hold secrets).
- Modules package reusable pieces (a VPC, a GKE cluster). Google publishes ready-made ones (Cloud Foundation Toolkit).
- Imperative versus declarative: a gcloud script says how; Terraform says what, and the next `plan` shows any drift from it.
- 'Service catalog and provisioning' (exam guide 4.1): Service Catalog offers approved Terraform solutions for teams to self-serve.
- Teams that live in Kubernetes can manage Google Cloud resources as Kubernetes objects with Config Connector.
Like what I know: package.json plus a lockfile for infrastructure, and React's model: declare the end state, the tool works out the diff and applies it.

## Isolate
Pick it when: Infrastructure has to be repeatable, reviewable and versioned: the same environment for dev, staging and production, or one that can be rebuilt after a disaster.
Not it when (use the console or gcloud instead): It's a one-off look or a quick experiment. For shipping application versions rather than infrastructure, Cloud Build and Cloud Deploy.

## Execute
What I built:

## Missed
