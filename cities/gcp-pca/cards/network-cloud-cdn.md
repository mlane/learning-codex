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
- Cache miss: the edge doesn't have the content, so the request goes to the load balancer and on to a backend; the response is stored if it's cacheable. (It may be filled from a nearby cache first.) Cache hit: the edge serves it and the origin never sees the request.
- Cache modes: `USE_ORIGIN_HEADERS` (cache only what the origin's headers allow), `CACHE_ALL_STATIC` (the default: static content without no-store, private or no-cache, plus whatever the origin marks cacheable), `FORCE_CACHE_ALL` (cache everything and ignore origin headers; never on a backend that serves per-user HTML or API responses).
- Every request is logged with its cache hit or miss status, in the load balancer's logs.
- Usual split behind one URL map: static assets from a backend bucket (Cloud Storage), dynamic requests to a backend service.
- Cache invalidation removes content before its TTL ends. For mistakes, not the routine way to publish; version file names instead.
Like what I know: Cloudflare, Fastly or CloudFront. The same Cache-Control headers I already set for static assets decide what gets cached.

## Isolate
Pick it when: Static or cacheable content (images, JS/CSS, downloads) for users in many places, served through an Application Load Balancer.
Not it when (use Media CDN instead): Large-scale video streaming and very large downloads. Media CDN is built for that.

## Execute
What I built:

## Missed
