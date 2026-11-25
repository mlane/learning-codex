---
name: Apigee and API Gateway
district: delivery
threat: 1
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Full API management. A proxy layer in front of backend services that adds security, rate limits, analytics and a developer portal, so APIs can be offered to partners and outside developers as a product.
- API proxy: the public face of a backend. Policies on it handle API keys and OAuth, quotas and spike arrest, transformation and caching.
- API products and a developer portal package APIs for consumers, monetization bills for them, analytics show who calls what.
- Backends can be anywhere: Google Cloud, on-prem, other clouds. Apigee hybrid runs the runtime on your own Kubernetes.
- Migration use: put a modern REST face on a legacy system and swap the backend behind it later. KnightMotives dealer tools over the mainframe and ERP; EHR Healthcare's insurer integrations.
- API management good practice (exam guide 5.1): version the API, a key per consumer, quotas, never expose a backend directly.
- API Gateway is the lightweight one: an OpenAPI spec in front of Cloud Run, Cloud Run functions or App Engine, with authentication and API keys. No portal, no monetization.
Like what I know: A backend-for-frontend or gateway layer sold as a product: API keys, rate limits and a docs portal out of the box.

## Isolate
Pick it when: APIs are a product: outside developers or partners, keys and quotas per consumer, analytics, monetization, or one consistent front for many backends including legacy and on-prem ones.
Not it when (use API Gateway instead): A few serverless backends just need an authenticated HTTP front door. For spreading traffic with no API management, a load balancer.

## Execute
What I built:

## Missed
