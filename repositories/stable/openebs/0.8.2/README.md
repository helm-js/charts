# `@helm-charts/stable-openebs`

Containerized Storage for Containers

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | openebs |
| Chart Version       | 0.8.2   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for openebs.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  create: true
  name:

image:
  pullPolicy: IfNotPresent

apiserver:
  image: 'quay.io/openebs/m-apiserver'
  imageTag: '0.8.1'
  replicas: 1
  ports:
    externalPort: 5656
    internalPort: 5656
  nodeSelector: {}
  tolerations: []
  affinity: {}
  healthCheck:
    initialDelaySeconds: 30
    periodSeconds: 60

provisioner:
  image: 'quay.io/openebs/openebs-k8s-provisioner'
  imageTag: '0.8.1'
  replicas: 1
  nodeSelector: {}
  tolerations: []
  affinity: {}
  healthCheck:
    initialDelaySeconds: 30
    periodSeconds: 60

snapshotOperator:
  controller:
    image: 'quay.io/openebs/snapshot-controller'
    imageTag: '0.8.1'
  provisioner:
    image: 'quay.io/openebs/snapshot-provisioner'
    imageTag: '0.8.1'
  replicas: 1
  upgradeStrategy: 'Recreate'
  nodeSelector: {}
  tolerations: []
  affinity: {}
  healthCheck:
    initialDelaySeconds: 30
    periodSeconds: 60

ndm:
  image: 'quay.io/openebs/node-disk-manager-amd64'
  imageTag: 'v0.3.0'
  sparse:
    enabled: 'true'
    path: '/var/openebs/sparse'
    size: '10737418240'
    count: '1'
  filters:
    excludeVendors: 'CLOUDBYT,OpenEBS'
    excludePaths: 'loop,fd0,sr0,/dev/ram,/dev/dm-,/dev/md'
  nodeSelector: {}
  healthCheck:
    initialDelaySeconds: 30
    periodSeconds: 60

jiva:
  image: 'quay.io/openebs/jiva'
  imageTag: '0.8.1'
  replicas: 3

cstor:
  pool:
    image: 'quay.io/openebs/cstor-pool'
    imageTag: '0.8.1'
  poolMgmt:
    image: 'quay.io/openebs/cstor-pool-mgmt'
    imageTag: '0.8.1'
  target:
    image: 'quay.io/openebs/cstor-istgt'
    imageTag: '0.8.1'
  volumeMgmt:
    image: 'quay.io/openebs/cstor-volume-mgmt'
    imageTag: '0.8.1'

policies:
  monitoring:
    enabled: true
    image: 'quay.io/openebs/m-exporter'
    imageTag: '0.8.1'

analytics:
  enabled: true
  # Specify in hours the duration after which a ping event needs to be sent.
  pingInterval: '24h'
```

</details>

---

# OpenEBS

[OpenEBS](https://github.com/openebs/openebs) is an open source storage platform that provides persistent and containerized block storage for DevOps and container environments.

OpenEBS can be deployed on any Kubernetes cluster - either in cloud, on-premise or developer laptop (minikube). OpenEBS itself is deployed as just another container on your cluster, and enables storage services that can be designated on a per pod, application, cluster or container level.

## Introduction

This chart bootstraps OpenEBS deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7.5+ with RBAC enabled
- iSCSI PV support in the underlying infrastructure

## Installing OpenEBS

```
helm install --namespace openebs stable/openebs
```

## Installing OpenEBS with the release name `my-release`:

```
helm install --name `my-release` --namespace openebs stable/openebs
```

## To uninstall/delete the `my-release` deployment:

```
helm ls --all
helm delete `my-release`
```

## Configuration

The following table lists the configurable parameters of the OpenEBS chart and their default values.

| Parameter                               | Description                                  | Default                                           |
| --------------------------------------- | -------------------------------------------- | ------------------------------------------------- |
| `rbac.create`                           | Enable RBAC Resources                        | `true`                                            |
| `image.pullPolicy`                      | Container pull policy                        | `IfNotPresent`                                    |
| `apiserver.image`                       | Image for API Server                         | `quay.io/openebs/m-apiserver`                     |
| `apiserver.imageTag`                    | Image Tag for API Server                     | `0.8.1`                                           |
| `apiserver.replicas`                    | Number of API Server Replicas                | `1`                                               |
| `provisioner.image`                     | Image for Provisioner                        | `quay.io/openebs/openebs-k8s-provisioner`         |
| `provisioner.imageTag`                  | Image Tag for Provisioner                    | `0.8.1`                                           |
| `provisioner.replicas`                  | Number of Provisioner Replicas               | `1`                                               |
| `snapshotOperator.provisioner.image`    | Image for Snapshot Provisioner               | `quay.io/openebs/snapshot-provisioner`            |
| `snapshotOperator.provisioner.imageTag` | Image Tag for Snapshot Provisioner           | `0.8.1`                                           |
| `snapshotOperator.controller.image`     | Image for Snapshot Controller                | `quay.io/openebs/snapshot-controller`             |
| `snapshotOperator.controller.imageTag`  | Image Tag for Snapshot Controller            | `0.8.1`                                           |
| `snapshotOperator.replicas`             | Number of Snapshot Operator Replicas         | `1`                                               |
| `ndm.image`                             | Image for Node Disk Manager                  | `quay.io/openebs/openebs/node-disk-manager-amd64` |
| `ndm.imageTag`                          | Image Tag for Node Disk Manager              | `v0.3.0`                                          |
| `ndm.sparse.enabled`                    | Create Sparse files and cStor Sparse Pool    | `true`                                            |
| `ndm.sparse.path`                       | Directory where Sparse files are created     | `/var/openebs/sparse`                             |
| `ndm.sparse.size`                       | Size of the sparse file in bytes             | `10737418240`                                     |
| `ndm.sparse.count`                      | Number of sparse files to be created         | `1`                                               |
| `ndm.filters.excludeVendors`            | Exclude devices with specified vendor        | `CLOUDBYT,OpenEBS`                                |
| `ndm.filters.excludePaths`              | Exclude devices with specified path patterns | `loop,fd0,sr0,/dev/ram,/dev/dm-,/dev/md`          |
| `jiva.image`                            | Image for Jiva                               | `quay.io/openebs/jiva`                            |
| `jiva.imageTag`                         | Image Tag for Jiva                           | `0.8.1`                                           |
| `jiva.replicas`                         | Number of Jiva Replicas                      | `3`                                               |
| `cstor.pool.image`                      | Image for cStor Pool                         | `quay.io/openebs/cstor-pool`                      |
| `cstor.pool.imageTag`                   | Image Tag for cStor Pool                     | `0.8.1`                                           |
| `cstor.poolMgmt.image`                  | Image for cStor Pool Management              | `quay.io/openebs/cstor-pool-mgmt`                 |
| `cstor.poolMgmt.imageTag`               | Image Tag for cStor Pool Management          | `0.8.1`                                           |
| `cstor.target.image`                    | Image for cStor Target                       | `quay.io/openebs/cstor-istgt`                     |
| `cstor.target.imageTag`                 | Image Tag for cStor Target                   | `0.8.1`                                           |
| `cstor.volumeMgmt.image`                | Image for cStor Volume Management            | `quay.io/openebs/cstor-volume-mgmt`               |
| `cstor.volumeMgmt.imageTag`             | Image Tag for cStor Volume Management        | `0.8.1`                                           |
| `policies.monitoring.image`             | Image for Prometheus Exporter                | `quay.io/openebs/m-exporter`                      |
| `policies.monitoring.imageTag`          | Image Tag for Prometheus Exporter            | `0.8.1`                                           |
| `analytics.enabled`                     | Enable sending stats to Google Analytics     | `true`                                            |
| `analytics.pingInterval`                | Duration(hours) between sending ping stat    | `24h`                                             |
| `HealthCheck.initialDelaySeconds`       | Delay before liveness probe is initiated     | `30`                                              |  | 30 |
| `HealthCheck.periodSeconds`             | How often to perform the liveness probe      | `60`                                              |  | 10 |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```shell
helm install --name `my-release` -f values.yaml stable/openebs
```

> **Tip**: You can use the default [values.yaml](values.yaml)
