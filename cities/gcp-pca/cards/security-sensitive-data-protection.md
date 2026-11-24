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
Like what I know:

## Isolate
Pick it when: You need to know where sensitive data is, or to mask it before sharing or analysing it.
Not it when (use Cloud KMS instead): The data needs encrypting with keys you control. To stop data leaving a boundary, VPC Service Controls.

## Execute
What I built:

## Missed
