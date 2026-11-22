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
Like what I know:

## Isolate
Pick it when: Staff need to reach an internal app from anywhere and access should depend on who they are, not which network they're on.
Not it when (use Cloud VPN or Interconnect instead): Two networks need to be connected (on-prem to VPC), rather than users let into one app.

## Execute
What I built:

## Missed
