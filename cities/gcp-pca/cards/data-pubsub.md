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
- Subscription types: pull (the subscriber asks), push (Pub/Sub POSTs to an HTTPS endpoint such as Cloud Run), and BigQuery or Cloud Storage subscriptions that write straight in with no pipeline.
- Fan-out: one topic, several subscriptions, each gets every message. Work queue: one subscription, several subscribers share the messages.
- Unacknowledged messages are kept (7 days by default) and redelivered. A dead-letter topic catches messages that keep failing. Ordering keys keep per-key order; exactly-once delivery is an option on pull subscriptions.
- The number of unacknowledged messages is the Cloud Monitoring metric a MIG or GKE autoscaler scales workers on.
- Global service; a message storage policy can pin the data to chosen regions.
- Look-alikes: Cloud Tasks (you pick the target, rate and time), Eventarc (routes events from Google services to Cloud Run), Managed Service for Apache Kafka (existing Kafka apps).
- Has a local emulator.
- `gcloud pubsub subscriptions pull` returns one message unless `--limit` is set, and `--auto-ack` is what acknowledges it. Without the ack the message is redelivered after the ack deadline (10 seconds by default).
- A subscription only gets messages published after it was created. Topic and subscription names are unique per project, not globally.
- Inside an event-driven function the message body arrives base64-encoded (`cloudEvent.data.message.data`).
- Pub/Sub is the transport under Eventarc and Cloud Storage events. See `delivery-eventarc`.
Like what I know: An event bus, the way EventEmitter or Redux actions decouple components, but between services. AWS SNS and SQS in one.

## Isolate
Pick it when: Services should be decoupled, one event has several consumers, or ingestion must absorb bursts.
Not it when (use Cloud Tasks instead): One specific handler must be called at a controlled rate or a scheduled time, and the sender chooses the target.

## Execute
What I built: Badge lab, 2026-11-27. Topic `topic-memories-172`. The thumbnail function publishes each new thumbnail's file name to it; nothing subscribes yet. Runbook: `labs/02-app-dev-environment.md`.

```bash
gcloud pubsub topics create $TOPIC
```

Practice labs (console, CLI, Python), date to add. Topic plus pull subscription, four messages published, pulled one at a time, then three at once with `--limit=3`. The same again with the Python client library (`publisher.py` and `subscriber.py` from the python-pubsub samples, in a virtual environment). Also deployed a function triggered by a topic (`--trigger-topic cf-demo`).

```bash
gcloud pubsub subscriptions create --topic myTopic mySubscription
gcloud pubsub topics publish myTopic --message "Hello"
gcloud pubsub subscriptions pull mySubscription --auto-ack --limit=3
gcloud pubsub topics list-subscriptions myTopic
```

- "Listed 0 items" from a pull means nothing is waiting.

## Missed
