---
name: Pub/Sub
district: data
threat: 2
threat_source: estimate
lives_at: global
---

## Baseline
What it is: Managed asynchronous messaging. Publishers send messages to a topic; subscribers receive them through subscriptions, pull or push. The sender doesn't need to know who processes the message, or when.
- Scales automatically; delivers at least once by default.
- The usual trigger in event-driven designs: a message arrives and a Cloud Run function runs.
- Front of a streaming pipeline: Pub/Sub, then Dataflow, then BigQuery.
- GKE can publish upgrade and release notifications to a topic, which then fan out to email, chat or PagerDuty.
Like what I know:

## Isolate
Pick it when: Services should be decoupled, one event has several consumers, or ingestion must absorb bursts.
Not it when (use Cloud Tasks instead): One specific handler must be called at a controlled rate or a scheduled time, and the sender chooses the target.

## Execute
What I built:

## Missed
