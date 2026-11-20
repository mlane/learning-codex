---
name: Cloud Storage
district: data
threat: 3
threat_source: estimate
lives_at: region, dual-region or multi-region
---

## Baseline
What it is: Object storage (objects, not files and folders or disk blocks) for unstructured data. 11 nines durability. Buckets need a globally unique name and a location: region, dual-region or multi-region, picked near users.
- Classes by how often data is read: Standard (hot), Nearline (about monthly, 30-day minimum), Coldline (at most every 90 days, 90-day minimum), Archive (under once a year, 365-day minimum). Colder means cheaper storage, pricier retrieval, same millisecond access.
- Objects are immutable. Versioning keeps old versions; without it, changes overwrite.
- Access: IAM inherited project to bucket to object; ACLs where needed. Encrypted at rest and in transit by default.
- Lifecycle rules change class or delete by age. Autoclass moves objects between classes by access pattern.
Like what I know:

## Isolate
Pick it when: Unstructured objects of any size: media, backups, archives, data lake files, static website assets.
Not it when (use Filestore or Persistent Disk instead): The app needs a mounted file system (Filestore, NFS) or a block disk for a VM (Persistent Disk).

## Execute
What I built:

## Missed
