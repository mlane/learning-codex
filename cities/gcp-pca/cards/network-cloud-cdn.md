---
name: Cloud CDN
district: network
threat: 2
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Caches content at Google's edge locations, close to users. Lower latency, less load on origins, lower egress costs. Turned on per backend of an external Application Load Balancer (a checkbox).
- Origins: instance groups, Cloud Storage buckets, network endpoint groups.
- Control with cache headers and TTLs; signed URLs for private content.
Like what I know:

## Isolate
Pick it when: Static or cacheable content (images, JS/CSS, downloads) for users in many places, served through an Application Load Balancer.
Not it when (use Media CDN instead): Large-scale video streaming and very large downloads. Media CDN is built for that.

## Execute
What I built:

## Missed
