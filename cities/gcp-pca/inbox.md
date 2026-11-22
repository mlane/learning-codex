# Inbox

One line per signal while you watch or listen. Afterwards, move what still matters
into cards and delete the rest. This file should be empty most of the time.

# --- Quiz
No resources in Google Cloud can be used without being associated with...
- a project
How do quotas protect Google Cloud customers?
- By preventing uncontrolled consumption of resources.
A budget is set at $500 and an alert is set at 100%. What happens when the full amount is used?
- A notification email is sent to the Billing Administrator.
Which strategy effectively reduces alert fatigue?
- Report all noise to ensure all data points are presented.
Select all valid targets for Cloud Monitoring uptime alert notifications.
- webhook, 3rd party service, SMS, Pub/sub, email
# --- Resource Monitoring
Google Cloud Observability dynamically discovers cloud resources and application services based on deep integration with Google Cloud and Amazon Web Services.
This provides you with access to powerful data and analytics tools plus collaboration with many different third-party software providers.
Monitoring is important to Google because it is at the base of site reliability engineering, a discipline that has enabled Google to build, deploy, monitor, and maintain some of the largest software systems in the world.
Cloud Monitoring dynamically configures monitoring after resources are deployed and has intelligent defaults that allow you to easily create charts for basic monitoring activities.
This allows you to monitor your platform, system, and application metrics by ingesting data, such as metrics, events, and metadata.
You can then generate insights from this data through dashboards, charts, and alerts.
A metrics scope contains the custom dashboards, alerting policies, uptime checks, notification channels, and group definitions that you use with your monitored projects.
The name of that project becomes the name of your metrics scope.
To access an AWS account, you must configure a project in Google Cloud to hold the AWS Connector.
You can also create an alerting policy that monitors your usage of Google Cloud Observability and alerts you when you approach the threshold for billing.
Uptime checks can be configured to test the availability of your public services from locations around the world, as you can see on this slide.
When this condition is met, you or someone else can be automatically notified through email, SMS, or other channels in order to troubleshoot this issue.
The type of uptime check can be set to HTTP, HTTPS, or TCP.
The resource is checked every minute with a 10-second timeout.
With Google Compute Engine instances, because the VMs are running on Google hardware, the hypervisor cannot access some of the internal metrics inside a VM, for example, memory usage.
The Ops Agent collects metrics inside the VM, not at the hypervisor level.
The Ops Agent is the primary agent for collecting telemetry data from your Compute Engine instances.
From an infrastructure perspective, you might consider using CPU load or perhaps network traffic load as values that are somewhat correlated with the number of users.
But with a custom metric, you could actually pass the current number of users directly from your application into Cloud Monitoring.
When you want to maintain a metric at a target value, specify a utilization target.
The autoscaler creates VMs when the metric value is above the target and deletes VMs when the metric value is below the target.

# --- Misc