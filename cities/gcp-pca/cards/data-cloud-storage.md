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
- Access: IAM inherited project to bucket to object. Uniform bucket-level access (IAM only) is Google's recommended setting; ACLs are for per-object permissions and count as legacy. Encrypted at rest and in transit by default.
- Lifecycle rules (Object Lifecycle Management) archive or delete by age; a new or changed rule can take up to 24 hours to take effect. Autoclass moves objects between classes by access pattern.
- Soft delete is on by default: deleted objects stay recoverable for 7 days.
- Directory synchronization: keep a VM directory in sync with a bucket.
- Location trade-off: region (cheapest, next to the compute), dual-region (two regions you choose, survives losing one; turbo replication for a 15-minute RPO), multi-region (spread over a continent, for serving).
- Deleting or moving an object before its class's minimum duration is charged as if it had stayed the full time.
- Retention policy plus bucket lock makes objects undeletable for a set period (compliance, write once read many). Object holds do it per object.
- Signed URLs give time-limited access to one object without a Google account. Public access prevention stops a bucket being made public by accident.
- CMEK when you must control the key.
- CLI: `gcloud storage` replaces `gsutil` (the exam guide still names gsutil).
- Names: bucket names are global and publicly visible (3 to 63 characters, lowercase, no `goog` prefix, nothing sensitive in them). Object names only have to be unique inside their bucket. Each bucket has a default storage class, set at creation.
- Folders are an illusion: the namespace is flat and a folder is a prefix in the object name. Copying to `gs://bucket/image-folder/` is what creates it. (Hierarchical namespace is the opt-in that makes folders real.)
- Going public, two routes: `allUsers` with Storage Object Viewer on the bucket (uniform access), or an ACL grant on one object (fine-grained access only). Either needs public access prevention off. URL: `https://storage.googleapis.com/BUCKET/OBJECT`.
- A bucket is also an event source: an upload can trigger a Cloud Run function through Eventarc. See `delivery-eventarc`.
- Static website: bucket as a backend bucket behind an Application LB with Cloud CDN.
- Cloud Storage FUSE mounts a bucket like a folder, common for AI training data. It is not a real file system (no locking, slow renames).
Like what I know: Amazon S3. The bucket behind static site hosting and user uploads.

## Isolate
Pick it when: Unstructured objects of any size: media, backups, archives, data lake files, static website assets.
Not it when (use Filestore or Persistent Disk instead): The app needs a mounted file system (Filestore, NFS) or a block disk for a VM (Persistent Disk).

## Execute
What I built: Badge lab, 2026-11-27. Regional bucket `<project-id>-bucket` in us-east4: the upload target and the trigger source for a thumbnail function. Uploaded `map.jpg` to fire it. Runbook: `labs/02-app-dev-environment.md`.

```bash
gcloud storage buckets create gs://$BUCKET --location=$REGION
gcloud storage cp map.jpg gs://$BUCKET/
gcloud storage ls gs://$BUCKET
```

Practice labs (console and CLI), date to add. The same bucket work both ways: upload, download, copy into a folder, list with `-l`, make an object public and take it back, delete.

```bash
gcloud storage cp gs://$BUCKET/ada.jpg gs://$BUCKET/image-folder/
gcloud storage ls -l gs://$BUCKET/ada.jpg
gcloud storage objects update gs://$BUCKET/ada.jpg --add-acl-grant=entity=allUsers,role=READER
gcloud storage objects update gs://$BUCKET/ada.jpg --remove-acl-grant=allUsers
```

- The console lab made the whole bucket public instead: Permissions > Grant access > `allUsers` > Storage Object Viewer, on a bucket created with uniform access and public access prevention off.
- `--location` with one region is what makes a bucket regional. Without it the default is a multi-region.

## Missed
