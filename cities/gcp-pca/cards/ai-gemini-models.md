---
name: Gemini models on Vertex AI
district: ai
threat: 2
threat_source: estimate
lives_at:
---

## Baseline
What it is: Google's family of multimodal generative AI models (text, images, audio, video, code), used through Vertex AI. An LLM is pre-trained on a huge dataset, then can be tuned for a purpose with a much smaller one.
- Prompt types: zero-shot, one-shot, few-shot, role. Few-shot with output examples forces a structure such as custom JSON.
- Good prompts: clear, concise, direct, with a persona and constraints.
- Hallucinations (confident wrong output) come from missing context, too little data or dirty data. Reduce with grounding (Google Search or your own data), constraints and curated data.
Like what I know:

## Isolate
Pick it when: Generating or understanding content (summarize, classify, extract, chat, code) with a managed foundation model instead of training your own.
Not it when (use a custom model on Vertex AI instead): A narrow prediction on your own structured data (fraud score, demand forecast) where classic ML fits better.

## Execute
What I built:

## Missed
