---
name: Model Armor
district: security
threat: 1
threat_source: exam guide
lives_at: regional
---

## Baseline
What it is: A filter that sits between an app and an LLM. It screens prompts on the way in and responses on the way out, and blocks or flags what breaks policy.
- Catches: prompt injection and jailbreak attempts, sensitive data going in or coming out (it uses Sensitive Data Protection), malicious URLs, and harmful content.
- Model-agnostic: works in front of Gemini, other models on Vertex AI, or models hosted elsewhere.
- Policies are templates with a confidence level per filter. Floor settings enforce a minimum across an organization or folder.
- Named in the exam guide under AI security, next to Sensitive Data Protection and secure model deployment.
- Look-alike name: Cloud Armor is the web application firewall at the load balancer. Different product.
Like what I know: Input validation and output escaping, the way I'd stop XSS, applied to LLM prompts and responses.

## Isolate
Pick it when: A generative AI app takes untrusted input or shows model output to users, and both need screening (Cymbal's shopping assistant, Altostrat's content tools).
Not it when (use Sensitive Data Protection instead): Finding or masking sensitive data in storage and databases, with no LLM in the path. For web attacks on the app's endpoint, Cloud Armor.

## Execute
What I built:

## Missed
