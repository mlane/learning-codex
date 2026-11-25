---
name: Cloud NAT
district: network
threat: 2
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Managed network address translation, so VMs and GKE nodes with no external IP can reach the internet (patches, updates, outside APIs). Outbound only: nothing on the internet can open a connection in.
- Regional, set up on a Cloud Router. Software-defined; no NAT VM to run.
- Why bother: no external IPs means a smaller attack surface, lower cost and lower latency.
- Cloud NAT logging: one entry when a NAT connection is created, and one when a packet is dropped because no port was free. Log either or both; they go to Cloud Logging.
- TCP and UDP only, and only outbound drops. A dropped inbound reply to an outbound request is not logged.
- Trainer's split: Cloud NAT for the occasional trip to the public web, Private Google Access for steady calls to Google APIs.
- It only borrows the Cloud Router as a place to hold its configuration: no BGP, and traffic doesn't flow through a device.
- Applies to the subnets you pick (or all of them), and only to VMs without an external IP. A VM with its own external IP bypasses it.
- Outbound IPs: allocated automatically, or reserved static ones when a partner has to allowlist your address.
Like what I know: A home router: many devices share one public IP to go out, and nothing outside can start a connection in.

## Isolate
Pick it when: Private VMs or nodes need outbound internet access.
Not it when (use Private Google Access instead): The destination is a Google API or service (Cloud Storage, BigQuery). For inbound traffic, a load balancer.

## Execute
What I built: Course labs (Elastic Infrastructure: both load balancer labs), date to add. Gateway `nat-config` on a new Cloud Router (`nat-router-us1`) so backend VMs with no external IP could still reach the internet (`apt-get install apache2`), while inbound traffic arrived only through the load balancer. Console build; the CLI form below is not yet run.

```bash
gcloud compute routers create nat-router-us1 --network=default --region=$REGION
gcloud compute routers nats create nat-config --router=nat-router-us1 --region=$REGION \
  --auto-allocate-nat-external-ips --nat-all-subnet-ip-ranges
```

## Missed
