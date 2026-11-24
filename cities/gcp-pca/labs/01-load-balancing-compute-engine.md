# Runbook 01: Load balancing on Compute Engine

| | |
|---|---|
| Badge | Implement Load Balancing on Compute Engine |
| Done | 2026-11-23, challenge lab passed |
| Built from | GSP007 (Network LB), GSP155 (Application LB), GSP041 (Internal LB), GSP313 (challenge) |
| Cards | `network-load-balancing`, `compute-instance-groups`, `network-firewall` |
| Status | Sections 1 to 3 ran clean in the challenge lab. Section 4 and the teardown are written from the practice labs and not yet re-run. |

Private notes. Don't post this file publicly.

## The shape

Every load balancer here is the same idea: something to send traffic **to**, a way to
know it's **healthy**, and a front door that **forwards** to it.

```
Network LB (layer 4, regional, passthrough)
  VMs -> firewall -> static IP -> legacy HTTP health check -> target pool -> forwarding rule

Application LB (layer 7, global, proxy)
  template -> managed instance group -> health-check firewall -> global IP
    -> health check -> backend service -> URL map -> HTTP proxy -> forwarding rule

Internal LB (layer 4, regional, private IP)
  template (no external IP) -> MIG -> firewall -> health check
    -> backend service (internal) -> forwarding rule on a private IP
```

Build order is back to front: backends first, front door last. Teardown is the reverse.

## 0. Variables

Copy these from the lab panel **every time**. Never reuse values from a previous run.

```bash
export REGION=us-east1
export ZONE=us-east1-b
export IMAGE=debian-12              # the Debian image family the lab names

gcloud config set compute/region $REGION
gcloud config set compute/zone $ZONE
```

Cloud Shell forgets these on reconnect. Re-run the block if the session drops.

## 1. Web servers and firewall

Three plain VMs, each serving a page with its own name so you can see which one answered.

```bash
for i in 1 2 3; do
gcloud compute instances create web$i \
  --zone=$ZONE \
  --tags=network-lb-tag \
  --machine-type=e2-small \
  --image-family=$IMAGE \
  --image-project=debian-cloud \
  --metadata=startup-script='#!/bin/bash
apt-get update
apt-get install apache2 -y
service apache2 restart
echo "<h3>Web Server: web'$i'</h3>" | tee /var/www/html/index.html'
done

gcloud compute firewall-rules create www-firewall-network-lb \
  --target-tags network-lb-tag --allow tcp:80
```

- The **tag** is the link: the firewall rule applies to any VM carrying `network-lb-tag`.
- The startup script is in **single quotes** so the shell leaves `#!` alone. `'$i'` steps
  out of the quotes just long enough to drop in the loop number.

## 2. Network load balancer (layer 4, regional)

```bash
gcloud compute addresses create network-lb-ip-1 --region $REGION

gcloud compute http-health-checks create basic-check

gcloud compute target-pools create www-pool \
  --region $REGION --http-health-check basic-check

gcloud compute target-pools add-instances www-pool \
  --instances web1,web2,web3 --instances-zone $ZONE

gcloud compute forwarding-rules create www-rule \
  --region $REGION \
  --ports 80 \
  --address network-lb-ip-1 \
  --target-pool www-pool
```

- Target pools take the **legacy** check: `http-health-checks`, not `health-checks`.
- Everything is `--region`. Nothing here is global.

Watch it spread traffic (Ctrl+C to stop):

```bash
IPADDRESS=$(gcloud compute forwarding-rules describe www-rule \
  --region $REGION --format="get(IPAddress)")
while true; do curl -m1 $IPADDRESS; done
```

## 3. Application load balancer (layer 7, global)

```bash
gcloud compute instance-templates create lb-backend-template \
  --region=$REGION \
  --network=default \
  --subnet=default \
  --tags=allow-health-check \
  --machine-type=e2-medium \
  --image-family=$IMAGE \
  --image-project=debian-cloud \
  --metadata=startup-script='#!/bin/bash
apt-get update
apt-get install apache2 -y
a2ensite default-ssl
a2enmod ssl
vm_hostname="$(curl -H "Metadata-Flavor:Google" \
http://169.254.169.254/computeMetadata/v1/instance/name)"
echo "Page served from: $vm_hostname" | \
tee /var/www/html/index.html
systemctl restart apache2'

gcloud compute instance-groups managed create lb-backend-group \
  --template=lb-backend-template --size=2 --zone=$ZONE

gcloud compute instance-groups managed set-named-ports lb-backend-group \
  --named-ports http:80 --zone=$ZONE

gcloud compute firewall-rules create fw-allow-health-check \
  --network=default \
  --action=allow \
  --direction=ingress \
  --source-ranges=130.211.0.0/22,35.191.0.0/16 \
  --target-tags=allow-health-check \
  --rules=tcp:80

gcloud compute addresses create lb-ipv4-1 --ip-version=IPV4 --global

gcloud compute health-checks create http http-basic-check --port 80

gcloud compute backend-services create web-backend-service \
  --protocol=HTTP \
  --port-name=http \
  --health-checks=http-basic-check \
  --global

gcloud compute backend-services add-backend web-backend-service \
  --instance-group=lb-backend-group \
  --instance-group-zone=$ZONE \
  --global

gcloud compute url-maps create web-map-http \
  --default-service web-backend-service

gcloud compute target-http-proxies create http-lb-proxy \
  --url-map web-map-http

gcloud compute forwarding-rules create http-content-rule \
  --address=lb-ipv4-1 \
  --global \
  --target-http-proxy=http-lb-proxy \
  --ports=80
```

- `130.211.0.0/22` and `35.191.0.0/16` are Google's health checkers. Without that
  firewall rule the backends never go healthy and the load balancer returns errors.
- `--port-name=http` on the backend service matches the **named port** `http:80` on the
  instance group. That pairing is how the load balancer knows which port to hit.
- Front-end pieces are `--global`. The instance group is still zonal.
- Give it 3 to 5 minutes before judging it.

Test:

```bash
LB_IP=$(gcloud compute addresses describe lb-ipv4-1 --global --format="get(address)")
curl http://$LB_IP
```

## 4. Internal load balancer (layer 4, private)

Same idea, but the front door is a private IP that only works from inside the VPC.
From GSP041. Two more values to set: an unused IP in the subnet, and the subnet's range.

```bash
export ILB_IP=10.142.0.10           # a free address in the region's default subnet
export SUBNET_RANGE=10.142.0.0/20   # that subnet's range

gcloud compute instance-templates create primecalc \
  --metadata-from-file startup-script=backend.sh \
  --no-address --tags backend --machine-type=e2-medium

gcloud compute firewall-rules create http --network default --allow=tcp:80 \
  --source-ranges $SUBNET_RANGE --target-tags backend

gcloud compute instance-groups managed create backend \
  --size 3 --template primecalc --zone $ZONE

gcloud compute health-checks create http ilb-health --request-path /2

gcloud compute backend-services create prime-service \
  --load-balancing-scheme internal --region=$REGION \
  --protocol tcp --health-checks ilb-health

gcloud compute backend-services add-backend prime-service \
  --instance-group backend --instance-group-zone=$ZONE \
  --region=$REGION

gcloud compute forwarding-rules create prime-lb \
  --load-balancing-scheme internal \
  --ports 80 --network default \
  --region=$REGION --address $ILB_IP \
  --backend-service prime-service
```

- `backend.sh` is the startup script that runs the app on port 80. Any small HTTP
  server works.
- `--no-address` means no public IP on the backends. That's the point.
- Cloud Shell can't reach it. Test from a VM inside the network: `curl $ILB_IP/2`.

## Debug: is it there, and is it healthy?

```bash
gcloud compute instances list
gcloud compute firewall-rules list --format="table(name,targetTags.list(),sourceRanges.list(),allowed[].map().firewall_rule().list())"
gcloud compute forwarding-rules list
gcloud compute target-pools get-health www-pool --region $REGION
gcloud compute backend-services get-health web-backend-service --global
gcloud compute instance-groups managed list-instances lb-backend-group --zone $ZONE
```

| Symptom | Usual cause |
|---|---|
| `curl` to a VM hangs | Firewall rule missing, or the VM lacks the tag |
| VM answers but shows the default Apache page | Startup script still running; wait a minute |
| Backends stuck unhealthy | Health-check firewall rule missing, or wrong tag on the template |
| Load balancer IP returns 404 or 502 | Too early; wait 3 to 5 minutes |
| "already exists" | You ran it twice. Move on. |
| "event not found" | Startup script was in double quotes; use single quotes |
| Progress check fails but everything exists | Wrong region or zone, or a typo in a resource name |

## Sandbox knobs

What to change when practising in my own project:

| Knob | Where | Try |
|---|---|---|
| Number of backends | `--size=2` on the MIG | `--size=3`, then delete one VM and watch it come back |
| Machine size | `--machine-type` | `e2-micro` to keep it cheap |
| Routing | `url-maps` | Add a second backend service and a path rule such as `/video` |
| Kill a backend | `gcloud compute instances stop web2` | Watch the curl loop skip it |
| Autoscaling | `gcloud compute instance-groups managed set-autoscaling` | `--max-num-replicas=4 --target-cpu-utilization=0.6` |

## Teardown (own project only)

A Skills lab cleans up when it ends. In my own project these cost money until deleted,
the forwarding rules and reserved IPs especially. Reverse order of creation:

```bash
# Application LB
gcloud compute forwarding-rules delete http-content-rule --global --quiet
gcloud compute target-http-proxies delete http-lb-proxy --quiet
gcloud compute url-maps delete web-map-http --quiet
gcloud compute backend-services delete web-backend-service --global --quiet
gcloud compute health-checks delete http-basic-check --quiet
gcloud compute addresses delete lb-ipv4-1 --global --quiet
gcloud compute instance-groups managed delete lb-backend-group --zone $ZONE --quiet
gcloud compute instance-templates delete lb-backend-template --region $REGION --quiet
gcloud compute firewall-rules delete fw-allow-health-check --quiet

# Network LB
gcloud compute forwarding-rules delete www-rule --region $REGION --quiet
gcloud compute target-pools delete www-pool --region $REGION --quiet
gcloud compute http-health-checks delete basic-check --quiet
gcloud compute addresses delete network-lb-ip-1 --region $REGION --quiet
gcloud compute instances delete web1 web2 web3 --zone $ZONE --quiet
gcloud compute firewall-rules delete www-firewall-network-lb --quiet
```

Confirm nothing is left:

```bash
gcloud compute instances list
gcloud compute forwarding-rules list
gcloud compute addresses list
```

## What this taught me

Write these from memory, then move them into the cards.

- 
- 
- 
