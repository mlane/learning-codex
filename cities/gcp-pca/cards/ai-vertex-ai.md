---
name: Vertex AI
district: ai
threat: 2
threat_source: estimate
lives_at: regional
---

## Baseline
What it is: Google Cloud's managed platform for machine learning and generative AI: use foundation models (Gemini), tune them, train and serve your own models, and run the operations around them. Renamed Gemini Enterprise Agent Platform in April 2026; the exam and courses may still say Vertex AI.
- Concepts to recognise at a high level: training, serving, MLOps, prompting, tuning, and retrieval-augmented generation (RAG: answer from your own data).
- Layers: infrastructure (CPUs, GPUs, TPUs), data platform, models, agents.
- Data vocabulary: structured or unstructured, labeled or unlabeled, data quality.
- Trainer: the architect exam stays shallow here.
- Three ways to get a model, least effort first: call a pre-trained API (the exam guide's 'Google AI APIs': Vision, Speech, Translation, Natural Language, Video, Document AI), use or tune a foundation model, or train your own (AutoML with no code, or custom training on GPUs or TPUs).
- Parts by exam guide name: Model Garden (model catalogue), Vertex AI Studio (try prompts; now Agent Studio), Vertex AI Pipelines (the ML lifecycle as repeatable steps: prepare data, train, evaluate, deploy; the MLOps answer), Agent Builder, endpoints for online prediction and batch prediction for bulk work, Model Registry, Feature Store, Vector Search.
- Vertex AI Search (now Agent Search): search and RAG over your own data. The commerce edition does product discovery and recommendations for retail; the Cymbal case calls it Discovery AI.
- BigQuery ML when the data already sits in BigQuery and SQL is the team's language.
- AI Hypercomputer is the infrastructure layer underneath (GPUs, TPUs, fast storage and networking, schedulers). Recognise the name; see `compute-gpus`.
- Securing AI (exam guide 3.1): Model Armor on prompts and responses, Sensitive Data Protection on training data, private endpoints and VPC Service Controls around models and data, least-privilege service accounts, CMEK.
- Serving cost: an online endpoint keeps nodes running and bills while idle; batch prediction is cheaper for work that isn't urgent.
Like what I know: The framework around a UI library: the model API is the library, and this adds the build, deploy and monitoring around it.

## Isolate
Pick it when: The team needs a managed place to build with AI on Google Cloud: call or tune foundation models, train and serve custom ones and automate the lifecycle, without running the infrastructure.
Not it when (use a pre-trained API instead): A ready-made API already does the job (translate text, read a document, transcribe audio), so no model work is needed. If the data and the team live in BigQuery, BigQuery ML.

## Execute
What I built:

## Missed
