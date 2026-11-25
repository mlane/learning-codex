---
name: Cloud KMS and encryption keys
district: security
threat: 2
threat_source: estimate
lives_at: regional, multi-region or global (set per key ring)
---

## Baseline
What it is: Managed service that creates, holds and uses encryption keys. Apps and Google services ask it to encrypt or decrypt; the key itself never leaves. Structure: key ring, then key, then key versions.
- Who controls the key, least to most effort. Google default encryption: everything is encrypted at rest already, nothing to do. CMEK (customer-managed): your key in Cloud KMS; you control rotation and access and can disable it. CSEK (customer-supplied): you send the raw key with each request, only for Cloud Storage and Compute Engine disks. Cloud EKM (external): the key stays in a third-party key manager outside Google.
- Protection levels: software, HSM (hardware security module, multi-tenant or single-tenant), external. It can't be changed after the key is created.
- Autokey creates and assigns CMEK keys automatically as resources are created, following recommended practice (HSM level, yearly rotation, keys kept apart from the resources).
- Rotation: automatic on a schedule for symmetric keys; older versions stay so old data can still be decrypted. Destroying a key version, after a waiting period, makes its data unreadable for good (crypto-shredding).
- Envelope encryption: the data is encrypted with a data key, and that data key is encrypted with the KMS key.
- Separation of duties: keys live in their own project, and whoever administers keys doesn't hold the encrypt and decrypt role.
- A CMEK key must be in the same location as the resource it protects. An org policy can require CMEK on new resources.
Like what I know: A password manager for encryption keys: the service keeps the key and does the encrypting; the app never holds it.

## Isolate
Pick it when: A regulation or policy says you must control the encryption keys: rotate them, revoke access, prove who used them (CMEK). If the keys must stay outside Google, Cloud EKM.
Not it when (use Secret Manager instead): You're storing a secret value such as an API key or a database password, not encrypting data. If nobody requires key control, Google's default encryption already covers it.

## Execute
What I built:

## Missed
