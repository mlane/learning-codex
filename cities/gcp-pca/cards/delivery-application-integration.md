---
name: Application Integration
district: delivery
threat: 1
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Google Cloud's integration platform as a service (iPaaS). A visual designer for flows that connect applications and data: a trigger starts the flow, tasks transform and route the data, connectors talk to the systems.
- Integration Connectors: ready-made connections to SaaS and enterprise systems (Salesforce, SAP, ServiceNow, databases) and to Google Cloud services.
- Triggers: an API call, a Pub/Sub message, a schedule, or an event in a connected app.
- Low-code: data mapping, branching, retries and error handling are configured, not programmed.
- Fits the exam guide's 'integration patterns with external systems', and case studies with CRM, ERP and third-party systems to wire together (KnightMotives, Cymbal Retail).
- Look-alikes: Workflows (orchestration of Google Cloud services and HTTP APIs defined in code, for developers), Pub/Sub (only moves messages), Apigee (publishes and governs APIs, doesn't run business flows), Cloud Composer (data pipelines).
Like what I know: Zapier or Make for the enterprise: visual flows wiring SaaS apps together.

## Isolate
Pick it when: Business applications need to exchange data and trigger each other (an order in the CRM creates a record in the ERP), and the team wants ready-made connectors instead of custom code.
Not it when (use Workflows instead): Developers are orchestrating a sequence of Cloud Run services, functions and API calls in code. To publish and govern APIs, Apigee.

## Execute
What I built:

## Missed
