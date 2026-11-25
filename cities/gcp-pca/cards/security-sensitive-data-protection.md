---
name: Sensitive Data Protection (DLP)
district: security
threat: 2
threat_source: estimate
lives_at: global or regional
---

## Baseline
What it is: Finds, classifies and de-identifies sensitive data: PII, card numbers, health records. Formerly Cloud DLP (Data Loss Prevention); the API is still the DLP API, and the trainer and exam may use either name.
- Discovery and inspection across Cloud Storage, BigQuery and other stores, using built-in detectors (infoTypes).
- De-identification: masking, redaction, tokenization.
- The discovery service profiles BigQuery, Cloud SQL and Cloud Storage across the organization continuously and reports where sensitive data sits and how risky it is.
- De-identification choices: redaction (remove it), masking (replace characters), tokenization or format-preserving encryption (reversible with a key), bucketing and date shifting (keep the data useful for analysis).
- Typical pipeline: a file lands in a bucket, a function calls the DLP API, clean data goes on and sensitive data goes to a quarantine bucket.
- AI use: strip personal data from prompts and training data. Model Armor's sensitive data filter uses it. The exam guide lists it under AI security.
- Custom infoTypes (regular expressions, dictionaries) cover your own identifiers.
Like what I know: A linter that scans data for personal information instead of code for bugs, with an auto-fix that redacts.

## Isolate
Pick it when: You need to know where sensitive data is, or to mask it before sharing or analysing it.
Not it when (use Cloud KMS instead): The data needs encrypting with keys you control. To stop data leaving a boundary, VPC Service Controls.

## Execute
What I built:

## Missed
