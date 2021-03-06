# `@helm-charts/stable-hoard`

Hoard is a stateless, deterministically encrypted, content-addressed object store

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | hoard  |
| Chart Version       | 0.6.2  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1

image:
  repository: quay.io/monax/hoard
  tag: 2.0.0
  pullPolicy: IfNotPresent

storage:
  # aws | azure | filesystem | gcp | ipfs
  type: filesystem
  remote: ''
  bucket: ''
  prefix: ''
  region: ''
  credentialsSecret: ''
  encoding: base64

logging:
  type: json
  channels:
    - info
    - trace

# only filesystem
persistence:
  size: 10Gi
  storageClass: standard
  accessMode: ReadWriteOnce
  persistentVolumeReclaimPolicy: 'Retain'
  annotations:
    'helm.sh/resource-policy': keep

service:
  type: ClusterIP
  port: 53431

ingress:
  enabled: false
  annotations: {}
  path: /
  hosts:
    - hoard.local
  tls: []
  #  - secretName: hoard-tls
  #    hosts:
  #      - hoard.local

resources: {}
#   limits:
#     cpu: 500m
#     memory: 1Gi
#   requests:
#     cpu: 100m
#     memory: 256Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Hoard

[Hoard](https://github.com/monax/hoard) is a stateless, deterministically encrypted, content-addressed object store. It currently supports local persistent storage, [S3](https://aws.amazon.com/s3/), [GCS](https://cloud.google.com/storage/), [Azure](https://azure.microsoft.com/en-gb/services/storage/) and [IPFS](https://ipfs.io) backends. Files that are sent to Hoard are symmetrically encrypted, where the secret is the hash of the plaintext file, and then stored in the configured backend - this enables any party with knowledge of the hash or original file to retrieve it from the store.

## Introduction

This chart bootstraps a hoard daemon on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installation

To install the chart with the release name `my-release`, run:

```bash
helm install --name my-release stable/hoard
```

This installation defaults to persistent volume storage. The [configuration](#configuration) section below lists all possible parameters that can be configured.

## Uninstall

To uninstall/delete the `my-release` deployment:

```bash
helm delete my-release
```

## Configuration

The following table lists the configurable parameters of the Hoard chart and its default values.

| Parameter                                           | Description                                              | Default                 |
| --------------------------------------------------- | -------------------------------------------------------- | ----------------------- |
| `replicaCount`                                      | number of daemons                                        | `1`                     |
| `image.repository`                                  | docker image                                             | `"quay.io/monax/hoard"` |
| `image.tag`                                         | version                                                  | `"2.0.0"`               |
| `image.pullPolicy`                                  | pull policy                                              | `"IfNotPresent"`        |
| `storage.type`                                      | backend object store (aws, azure, filesystem, gcp, ipfs) | `"filesystem"`          |
| `storage.remote`                                    | remote api location (ipfs only)                          | `""`                    |
| `storage.region`                                    | object store location (cloud only)                       | `""`                    |
| `storage.bucket`                                    | object storage container (cloud only)                    | `""`                    |
| `storage.prefix`                                    | bucket folder (cloud only)                               | `""`                    |
| `storage.credentialsSecret`                         | required secret for cloud providers                      | `""`                    |
| `persistence.size`                                  | size of local store                                      | `"10Gi"`                |
| `persistence.storageClass`                          | pvc type                                                 | `"standard"`            |
| `persistence.accessMode`                            | pvc access                                               | `"ReadWriteOnce"`       |
| `persistence.persistentVolumeReclaimPolicy`         | pvc policy                                               | `"Retain"`              |
| `persistence.annotations`                           | optional annotations                                     | `{}`                    |
| `persistence.annotations."helm.sh/resource-policy"` | keep pvc                                                 | `keep`                  |
| `service.type`                                      | type of service                                          | `"ClusterIP"`           |
| `service.port`                                      | default listening port                                   | `53431`                 |
| `ingress`                                           | settings for ingress                                     | `{}`                    |
| `resources`                                         | pod resources                                            | `{}`                    |
| `nodeSelector`                                      | optional settings                                        | `{}`                    |
| `tolerations`                                       | optional settings                                        | `[]`                    |
| `affinity`                                          | session affinity                                         | `{}`                    |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release stable/hoard
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/hoard
```

## Cloud Examples

For each of the supported cloud back-ends, please ensure you have the appropriate credentials as identified by the corresponding environment variables.

### [AWS](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html)

```bash
kubectl create secret generic cloud-credentials --from-literal access-key-id=${AWS_ACCESS_KEY_ID} --from-literal secret-access-key=${AWS_SECRET_ACCESS_KEY}
helm install --name my-release stable/hoard --set storage.type=aws,storage.region="eu-central-1",storage.bucket="my-bucket",storage.prefix="folder",storage.credentialsSecret="cloud-credentials"
```

### [Azure](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-manage)

```bash
kubectl create secret generic cloud-credentials --from-literal storage-account-name=${AZURE_STORAGE_ACCOUNT_NAME} --from-literal storage-account-key=${AZURE_STORAGE_ACCOUNT_KEY}
helm install --name my-release stable/hoard --set storage.type=azure,storage.bucket="my-bucket",storage.prefix="folder",storage.credentialsSecret="cloud-credentials"
```

### [GCP](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)

```bash
kubectl create secret generic cloud-credentials --from-literal service-key=${GCLOUD_SERVICE_KEY}
helm install --name my-release stable/hoard --set storage.type=gcp,storage.bucket="my-bucket",storage.prefix="folder",storage.credentialsSecret="cloud-credentials"
```
