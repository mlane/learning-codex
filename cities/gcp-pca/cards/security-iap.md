---
name: Identity-Aware Proxy
district: security
threat: 2
threat_source: estimate
lives_at: global
---

## Baseline
What it is: A proxy in front of an app that enforces access control policies per user. The user signs in first, then IAP checks their IAM role before the request reaches the app. No VPN needed.
- Access is decided at the application level, centrally, instead of by network firewalls.
- Part of Google's zero trust model (BeyondCorp): no network is trusted, and every request is checked for who the user is and the context it comes from.
- IAP tunnels let you SSH to a VM that has no external IP.
- Fronts apps behind an Application Load Balancer, on App Engine, Cloud Run, GKE and Compute Engine, and on-prem apps through a connector.
- Roles: IAP-secured Web App User for web apps, IAP-secured Tunnel User for SSH and RDP tunnels. The firewall must allow 35.235.240.0/20 for tunnels.
- Context-aware access: on top of identity, require an access level (company-managed device, IP range, location), defined in Access Context Manager. Named in the exam guide.
- Chrome Enterprise Premium is the paid zero-trust product built around this (formerly BeyondCorp Enterprise): context-aware access plus threat and data protection in the browser. Also in the exam guide, under secure remote access.
Like what I know: An auth guard in front of a route, like login middleware, except it runs outside the app and the app never sees unauthenticated traffic.

## Isolate
Pick it when: Staff need to reach an internal app from anywhere and access should depend on who they are, not which network they're on.
Not it when (use Cloud VPN or Interconnect instead): Two networks need to be connected (on-prem to VPC), rather than users let into one app.

## Execute
What I built:

## Missed
