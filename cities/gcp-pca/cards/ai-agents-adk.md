---
name: AI agents and the Agent Development Kit
district: ai
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is: An AI agent is a system that perceives its environment, decides, and acts on that environment through the tools it has been given, working toward a goal. The Agent Development Kit (ADK) is Google's open-source framework for building agents and multi-agent systems in code.
- Trainer: the architect exam asks about agents at concept level only. Building and orchestrating them is a separate, newer exam.
- Parts of an agent: a model (the reasoning), instructions (role and goal), tools (functions, APIs, search, other agents) and memory or session state.
- Multi-agent: a coordinator hands sub-tasks to specialist agents. ADK's workflow agents fix the order when the model shouldn't decide it: sequential, parallel, loop.
- Protocols to recognise: MCP (Model Context Protocol) connects an agent to tools and data; A2A (Agent2Agent) lets agents from different vendors talk to each other.
- Where it runs: develop locally with ADK, deploy to Agent Runtime (the managed runtime, formerly Vertex AI Agent Engine) or as a container on Cloud Run or GKE.
- Names in the exam guide: Agent Builder (the build-an-agent tooling, now folded into Gemini Enterprise Agent Platform), Gemini Enterprise (the product where staff find and use agents; it absorbed Agentspace), NotebookLM (a research and summarising assistant grounded in your own documents).
- Guardrails: least-privilege identity and tools for the agent, Model Armor on inputs and outputs, human approval for risky actions (Cymbal Retail wants human-in-the-loop review), evaluation and tracing.
- Customer-service chat and voice bots have their own low-code route (conversational agents, formerly Dialogflow CX), e.g. to replace Cymbal's IVR.
Like what I know: A workflow engine where the LLM picks the next step and which function to call, instead of me hard-coding the sequence.

## Isolate
Pick it when: A task needs several steps, decisions and tool calls that can't be scripted in advance: a support assistant that looks up an order, checks the policy and issues a refund.
Not it when (use a single Gemini call instead): One prompt in, one answer out (summarise, classify, extract). If the steps are fixed and known, a workflow (Workflows, Application Integration) is cheaper and more predictable than an agent.

## Execute
What I built:

## Missed
