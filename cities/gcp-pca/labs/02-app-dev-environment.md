# Runbook 02: App dev environment (Cloud Storage, Pub/Sub, Cloud Run functions)

| | |
|---|---|
| Badge | Set Up an App Dev Environment on Google Cloud |
| Done | 2026-11-27, challenge lab passed |
| Built from | Practice labs: Manage Cloud Storage (console, CLI), Monitor a Compute Engine Instance with Cloud Monitoring, Deploy a Cloud Run Function (console, CLI), Manage Pub/Sub (console, CLI, Python). Challenge: GSP315. |
| Cards | `data-cloud-storage`, `data-pubsub`, `compute-cloud-functions`, `delivery-eventarc`, `core-iam`, `core-service-accounts`, `ops-monitoring`, `ops-logging`, `compute-engine`, `delivery-cloud-sdk-tools` |
| Status | Sections 1 to 4 are the challenge lab as run on 2026-11-27. Sections 5 to 8 are the commands from the practice labs. Section 8 was a console build. The sandbox knobs and the teardown are not yet run. |

Private notes. Don't post this file publicly.

## The shape

The challenge is four small things. Only the third has moving parts.

```
Build order
  bucket (regional) -> Pub/Sub topic -> function (2nd gen, Storage trigger) -> upload a test image
  -> remove the previous engineer from the project

What happens on an upload
  image lands in the bucket
    -> Cloud Storage publishes "object created" (through Pub/Sub, as its service agent)
    -> Eventarc trigger picks it up
    -> function runs (it is a Cloud Run service underneath)
    -> saves <name>_64x64_thumbnail.<ext> back into the same bucket
    -> publishes the thumbnail's file name to the topic
```

Bucket and topic come first because the function's code and trigger name both of them.

## 0. Variables

Copy these from the lab page **every time**. Region, bucket, topic, function name and
the second username all change between runs. They only appear after Start Lab; before
that the page shows blanks such as "Bucket Name".

```bash
export REGION=us-east4
export ZONE=us-east4-c
export BUCKET=qwiklabs-gcp-02-0a5c85e1c691-bucket    # Task 1. Was <project id>-bucket
export TOPIC=topic-memories-172                      # Task 2
export FUNCTION=memories-thumbnail-maker             # Task 3. Also the entry point
export USER2=student-01-ffa9db6619a2@qwiklabs.net    # "Username 2", the one to remove

export PROJECT_ID=$(gcloud config get-value project)
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
gcloud config set compute/region $REGION
gcloud config set compute/zone $ZONE

echo $REGION $BUCKET $TOPIC $FUNCTION $USER2 $PROJECT_NUMBER
```

- The `echo` should print six real values. An empty one means a line above didn't run.
- Sign in as Username 1. Username 2 is the account being removed.
- Cloud Shell forgets these on reconnect. Re-run the block if the session drops.

## 1. Bucket

```bash
gcloud storage buckets create gs://$BUCKET --location=$REGION
```

- `--location` with a single region is what makes it a **regional** bucket. Leave it
  off and you get the default multi-region, which fails the check.
- Same region as the function: a Storage trigger has to sit where the bucket is.

## 2. Pub/Sub topic

```bash
gcloud pubsub topics create $TOPIC
```

No subscription is needed for the check. The function only publishes to it.

## 3. Thumbnail function

### 3a. APIs

```bash
gcloud services enable \
  artifactregistry.googleapis.com cloudfunctions.googleapis.com \
  cloudbuild.googleapis.com eventarc.googleapis.com run.googleapis.com \
  logging.googleapis.com pubsub.googleapis.com
```

### 3b. Roles

Four grants, one per account in the chain. In the lab they were already in place; check
before adding anything.

```bash
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:gcp-sa-eventarc OR bindings.members:gs-project-accounts OR bindings.members:gcp-sa-pubsub OR bindings.members:compute@developer" \
  --format="table(bindings.role, bindings.members)"
```

| Role | On which account | Why |
|---|---|---|
| Pub/Sub Publisher | Cloud Storage service agent, `service-N@gs-project-accounts...` | Storage announces the upload by publishing a message |
| Eventarc Service Agent | Eventarc service agent, `service-N@gcp-sa-eventarc...` | Lets Eventarc set up and check the trigger |
| Eventarc Event Receiver | Trigger's service account, here the default `N-compute@developer...` | Lets the trigger receive the event |
| Service Account Token Creator | Pub/Sub service agent, `service-N@gcp-sa-pubsub...` | Lets Pub/Sub sign the call to the function |

The function also runs as the default Compute Engine account, which needs Pub/Sub
Publisher (to publish to the topic) and object access on the bucket. Both were there.

Only if one is missing:

```bash
GCS_SA=$(gcloud storage service-agent --project=$PROJECT_ID)

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$GCS_SA" --role="roles/pubsub.publisher" --condition=None

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:service-$PROJECT_NUMBER@gcp-sa-eventarc.iam.gserviceaccount.com" \
  --role="roles/eventarc.serviceAgent" --condition=None

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/eventarc.eventReceiver" --condition=None

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:service-$PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountTokenCreator" --condition=None
```

- `--condition=None` skips the "specify a condition" prompt. The lab's policy has
  conditional bindings, so gcloud asks on every change. At the prompt the answer is
  **None**.
- One of those conditions only lets the student account grant or revoke Viewer, so
  these grants may be refused. That's fine when the check above shows the roles.

### 3c. Source files

Once the lab has started, the code on the lab page already has the function name and
topic filled in. Paste it as is. For my own project, this version takes them from the
variables:

```bash
mkdir -p ~/thumbnail && cd ~/thumbnail

cat > index.js <<'EOF'
const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const { PubSub } = require('@google-cloud/pubsub');
const sharp = require('sharp');

functions.cloudEvent('FUNCTION_NAME', async cloudEvent => {
  const event = cloudEvent.data;

  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Hello ${event.bucket}`);

  const fileName = event.name;
  const bucketName = event.bucket;
  const size = "64x64";
  const bucket = new Storage().bucket(bucketName);
  const topicName = "TOPIC_NAME";
  const pubsub = new PubSub();

  if (fileName.search("64x64_thumbnail") === -1) {
    // doesn't have a thumbnail, get the filename extension
    const filename_split = fileName.split('.');
    const filename_ext = filename_split[filename_split.length - 1].toLowerCase();
    const filename_without_ext = fileName.substring(0, fileName.length - filename_ext.length - 1);

    if (filename_ext === 'png' || filename_ext === 'jpg' || filename_ext === 'jpeg') {
      console.log(`Processing Original: gs://${bucketName}/${fileName}`);
      const gcsObject = bucket.file(fileName);
      const newFilename = `${filename_without_ext}_64x64_thumbnail.${filename_ext}`;
      const gcsNewObject = bucket.file(newFilename);

      try {
        const [buffer] = await gcsObject.download();
        const resizedBuffer = await sharp(buffer)
          .resize(64, 64, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toFormat(filename_ext)
          .toBuffer();

        await gcsNewObject.save(resizedBuffer, {
          metadata: {
            contentType: `image/${filename_ext}`,
          },
        });

        console.log(`Success: ${fileName} → ${newFilename}`);

        await pubsub
          .topic(topicName)
          .publishMessage({ data: Buffer.from(newFilename) });

        console.log(`Message published to ${topicName}`);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    } else {
      console.log(`gs://${bucketName}/${fileName} is not an image I can handle`);
    }
  } else {
    console.log(`gs://${bucketName}/${fileName} already has a thumbnail`);
  }
});
EOF

cat > package.json <<'EOF'
{
 "name": "thumbnails",
 "version": "1.0.0",
 "description": "Create Thumbnail of uploaded image",
 "scripts": {
   "start": "node index.js"
 },
 "dependencies": {
   "@google-cloud/functions-framework": "^3.0.0",
   "@google-cloud/pubsub": "^2.0.0",
   "@google-cloud/storage": "^6.11.0",
   "sharp": "^0.32.1"
 },
 "devDependencies": {},
 "engines": {
   "node": ">=4.3.2"
 }
}
EOF

sed -i "s/FUNCTION_NAME/$FUNCTION/; s/TOPIC_NAME/$TOPIC/" index.js
grep -n "cloudEvent(\|topicName =" index.js
```

- `<<'EOF'` with the quotes stops the shell from touching the `${...}` in the
  JavaScript. Without the quotes Bash would try to expand them.
- The `grep` should show the real function name and the real topic name.
- The `64x64_thumbnail` test at the top is a loop guard. The function writes into the
  bucket that triggers it, so every thumbnail fires the function again; the guard makes
  that second run do nothing.

### 3d. Deploy

```bash
cd ~/thumbnail
gcloud functions deploy $FUNCTION \
  --gen2 \
  --runtime=nodejs22 \
  --region=$REGION \
  --source=. \
  --entry-point=$FUNCTION \
  --trigger-bucket=$BUCKET
```

- `--gen2` is the "Cloud Run function" environment the task asks for.
- `--entry-point` must equal the name inside `functions.cloudEvent('...')`. In this lab
  both are the function's own name.
- `--trigger-bucket` builds the Eventarc trigger for "object created" on that bucket.
- No `--allow-unauthenticated`: only the trigger calls it, nobody on the internet.
- Takes a few minutes. Done when the output shows `state: ACTIVE`.
- "Permission denied while using the Eventarc Service Agent" on the first tries is
  propagation, not a missing role. It failed twice here, then worked a few minutes
  later with no change.

### 3e. Test

```bash
curl -o map.jpg https://storage.googleapis.com/cloud-training/gsp315/map.jpg
gcloud storage cp map.jpg gs://$BUCKET/
gcloud storage ls gs://$BUCKET
```

The checker only needs the upload. The thumbnail, `map_64x64_thumbnail.jpg`, follows
within a minute or so.

## 4. Remove the previous engineer

```bash
gcloud projects remove-iam-policy-binding $PROJECT_ID \
  --member="user:$USER2" --role="roles/viewer" --all
```

- `user:` prefix for a person, `serviceAccount:` for a service account.
- `--all` removes the binding whatever condition it carries, so there's no prompt.

## 5. Practice: objects in a bucket

```bash
gcloud storage cp ada.jpg gs://$BUCKET                              # upload
gcloud storage cp -r gs://$BUCKET/ada.jpg .                         # download
gcloud storage cp gs://$BUCKET/ada.jpg gs://$BUCKET/image-folder/   # copy into a "folder"
gcloud storage ls gs://$BUCKET                                      # list
gcloud storage ls -l gs://$BUCKET/ada.jpg                           # size and date
gcloud storage rm gs://$BUCKET/ada.jpg                              # delete
```

Making things public, two ways:

```bash
# One object, with an ACL. Needs fine-grained access control on the bucket.
gcloud storage objects update gs://$BUCKET/ada.jpg --add-acl-grant=entity=allUsers,role=READER
gcloud storage objects update gs://$BUCKET/ada.jpg --remove-acl-grant=allUsers
```

Whole bucket, with IAM (what the console lab did): Permissions > Grant access >
principal `allUsers` > role Storage Object Viewer. The bucket was created with uniform
access and public access prevention switched off.

- Public URL: `https://storage.googleapis.com/BUCKET/OBJECT`.
- The folder didn't exist before the copy. The trailing slash in the destination made it.

## 6. Practice: Pub/Sub from the CLI

```bash
gcloud pubsub topics create myTopic
gcloud pubsub topics list
gcloud pubsub subscriptions create --topic myTopic mySubscription
gcloud pubsub topics list-subscriptions myTopic

gcloud pubsub topics publish myTopic --message "Hello"
gcloud pubsub subscriptions pull mySubscription --auto-ack            # one message
gcloud pubsub subscriptions pull mySubscription --auto-ack --limit=3  # up to three

gcloud pubsub subscriptions delete mySubscription
gcloud pubsub topics delete myTopic
```

- `pull` hands back **one** message unless `--limit` says otherwise.
- `--auto-ack` acknowledges what it pulled, so those messages are gone. The lab text
  says it formats the output as a table; the table is the default, the flag is the ack.
- "Listed 0 items" means nothing is waiting, not that something broke.

Same thing with the Python client library, from the `python-pubsub` samples:

```bash
python3 -m venv venv && source venv/bin/activate
pip install --upgrade google-cloud-pubsub
git clone https://github.com/googleapis/python-pubsub.git
cd python-pubsub/samples/snippets

python publisher.py $GOOGLE_CLOUD_PROJECT create MyTopic
python publisher.py $GOOGLE_CLOUD_PROJECT list
python subscriber.py $GOOGLE_CLOUD_PROJECT create MyTopic MySub
python subscriber.py $GOOGLE_CLOUD_PROJECT list-in-project
python subscriber.py $GOOGLE_CLOUD_PROJECT receive MySub     # Ctrl+C to stop
```

## 7. Practice: the other two function triggers

**HTTP, from the console.** Cloud Run > Services > Write a function. Service name
`gcfunction`, allow public access, 2nd gen execution environment, maximum 5 instances,
default `helloHttp` code in the inline editor, Save and redeploy. The Test button
produces a curl command to run in Cloud Shell.

**Pub/Sub topic, from Cloud Shell.** `index.js` registers `helloPubSub` with
`functions.cloudEvent` and logs the decoded message.

```bash
gcloud functions deploy nodejs-pubsub-function \
  --gen2 \
  --runtime=nodejs22 \
  --region=$REGION \
  --source=. \
  --entry-point=helloPubSub \
  --trigger-topic cf-demo \
  --stage-bucket $PROJECT_ID-bucket \
  --service-account cloudfunctionsa@$PROJECT_ID.iam.gserviceaccount.com \
  --allow-unauthenticated

gcloud functions describe nodejs-pubsub-function --region=$REGION     # State: ACTIVE
gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
gcloud functions logs read nodejs-pubsub-function --region=$REGION
```

- The runtime, stage bucket and service account are named by that lab. Copy them from
  its page.
- The message body reaches the function base64-encoded, at
  `cloudEvent.data.message.data`. The code decodes it before logging.
- Logs can take several minutes to show up.
- Three trigger flags to remember: `--trigger-http`, `--trigger-topic`, `--trigger-bucket`.

## 8. Practice: monitoring a VM

Console build, apart from the commands run over SSH.

1. VM `lamp-1-vm`: E2, e2-medium, firewall "Allow HTTP traffic".
2. SSH in and install Apache, then open the VM's external IP to see the default page.

   ```bash
   sudo apt-get update
   sudo apt-get install apache2 php
   sudo service apache2 restart
   ```

3. Open Monitoring once so the project gets its metrics scope.
4. Install the Ops Agent on the VM.

   ```bash
   curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
   sudo bash add-google-cloud-ops-agent-repo.sh --also-install
   sudo systemctl status google-cloud-ops-agent"*"     # q to exit
   ```

5. Uptime check `Lamp Uptime Check`: HTTP, resource type URL, hostname is the VM's
   external IP, every 1 minute. Use Test before Create.
6. Alerting policy `Inbound Traffic Alert`: metric VM instance > Interface > Network
   traffic (`agent.googleapis.com/interface/traffic`), above threshold 500, retest
   window 1 minute, email notification channel.
7. Dashboard with two line charts: CPU load (1m), and Received packets.
8. Logs Explorer filtered to VM Instance > `lamp-1-vm`. Stop and start the VM and
   watch the entries arrive.

- Untick "Active" in the metric picker or metrics with no recent data stay hidden.
- After a restart the uptime check shows every region failed for up to 5 minutes.
- Take the email channel off the alerting policy when done. The lab's resources live
  on for a while and keep sending mail.

## Debug: is it there, and is it healthy?

```bash
gcloud storage ls
gcloud storage buckets describe gs://$BUCKET --format="value(location,locationType)"
gcloud pubsub topics list
gcloud functions describe $FUNCTION --region=$REGION --format="value(state)"
gcloud functions logs read $FUNCTION --region=$REGION --limit=20
gcloud eventarc triggers list --location=$REGION
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" --format="table(bindings.role, bindings.members)"
```

| Symptom | Usual cause |
|---|---|
| `unrecognized arguments: lab page>` | A placeholder such as `<from lab page>` was pasted in as a value. Put the real value in the export line. |
| "The policy contains bindings with conditions... specify a condition" | The project policy has conditional bindings. Choose **None**, or add `--condition=None`. |
| `Service account service-N@gs-project-accounts... does not exist` | The Cloud Storage service agent hadn't been created yet. Carry on; minutes later it was in the policy with the role. |
| "Permission denied while using the Eventarc Service Agent" on deploy | Roles still propagating. Confirm them with the check in 3b, wait a few minutes, deploy again. |
| `409 ... already exists` on the bucket | Name taken, by me or anyone. Bucket names are global. |
| `ls: cannot access ~/thumbnail` | The block that makes the folder never ran. Paste one block at a time and wait for the prompt. |
| Two commands mashed together on one line | Pasted the next block before the last one finished. Ctrl+C and paste again. |
| Deploys, but no thumbnail | Read the function's logs. Then check the trigger exists and that bucket and function share a region. |
| Function runs but logs "not an image I can handle" | The file isn't png, jpg or jpeg. |
| `pull` shows one message when several were published | Default limit is 1. Add `--limit`. |
| Progress check fails but everything exists | Wrong region, or the bucket isn't regional, or a typo in a name. |

## Sandbox knobs

What to change when practising in my own project. None of these are run yet.

| Knob | Where | Try |
|---|---|---|
| See what the function publishes | A subscription on `$TOPIC`, created **before** the upload | `gcloud pubsub subscriptions create thumb-sub --topic $TOPIC`, upload, then pull with `--auto-ack` |
| Unsupported file | Upload a `.gif` or `.txt` | Read the logs for "not an image I can handle" |
| Prove the loop guard | Logs after one upload | Two runs: the original, then "already has a thumbnail" |
| Thumbnail size | `.resize(64, 64, ...)` in `index.js` | 128, then redeploy; the trigger stays as it was |
| Cap the scaling | `--max-instances` on deploy | 1, then upload ten images at once |
| Fan-out | A second subscription on the same topic | Both subscriptions receive every message |
| Storage class by age | A lifecycle rule on the bucket | Move objects to Nearline after 30 days |

## Teardown (own project only)

A Skills lab cleans up when it ends. In my own project, reverse order of creation.
Not yet run.

```bash
gcloud functions delete $FUNCTION --region=$REGION --gen2 --quiet
gcloud pubsub topics delete $TOPIC --quiet
gcloud storage rm -r gs://$BUCKET
```

Deploying a function leaves helpers behind: source buckets whose names start with
`gcf-v2-` and an Artifact Registry repository called `gcf-artifacts`. Look for them:

```bash
gcloud storage ls
gcloud artifacts repositories list
gcloud functions list
gcloud pubsub topics list
gcloud pubsub subscriptions list
```

## What this taught me

- The values are the whole lab. Region, bucket, topic and function name come from the
  page after Start Lab, and a placeholder pasted as a value fails straight away.
- A Storage-triggered function is four services in a row: Cloud Storage, Pub/Sub,
  Eventarc, Cloud Run. Each one acts as its own service account and each needs one role.
- Check before fixing. Listing the policy showed every role was already there, so the
  deploy error was a wait, not a missing grant.
- "Permission denied" right after enabling an API or granting a role is often
  propagation. Retry after a few minutes before changing anything.
- When a project's policy has conditions, gcloud asks about a condition on every
  binding change: `--condition=None` to add, `--all` to remove.
- A function is a Cloud Run service underneath. The lab's own IAM condition named it
  as `run.googleapis.com/Service`.
- A function that writes into its own trigger bucket needs a guard or it loops.
