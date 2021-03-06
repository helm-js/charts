# `@helm-charts/incubator-mysqlha`

MySQL cluster with a single master and zero or more slave replicas

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | mysqlha   |
| Chart Version       | 0.1.3     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## mysql image version
## ref: https://hub.docker.com/r/library/mysql/tags/
##
mysqlImage: mysql:5.7.13
xtraBackupImage: gcr.io/google-samples/xtrabackup:1.0

mysqlha:
  replicaCount: 3

  ## Password for MySQL root user
  ##
  # mysqlRootPassword: ## Default: random 10 character string

  ## Username/password for MySQL replication user
  ##
  mysqlReplicationUser: repl
  # mysqlReplicationPassword:
  ## Create a database user
  ##
  # mysqlUser:
  # mysqlPassword: ## Default: random 10 character string
  ## Allow unauthenticated access, uncomment to enable
  ##
  # mysqlAllowEmptyPassword: true
  ## Create database with name and grant all permissions to user on startup, if needed
  # mysqlDatabase:

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
  ##
  accessMode: ReadWriteOnce
  size: 10Gi

resources:
  requests:
    cpu: 100m
    memory: 128Mi
```

</details>

---

# MySQL - Single Master, Multiple Slaves

[MySQL](https://MySQL.org) is one of the most popular database servers in the world. Notable users include Wikipedia, Facebook and Google.

## Introduction

This chart bootstraps a single master and multiple slave MySQL deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager. Largely inspired by this [tutorial](https://kubernetes.io/docs/tutorials/stateful-application/run-replicated-stateful-application/), further work was made to 'production-ize' the example.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release incubator/mysqlha
```

The command deploys MySQL cluster on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

### Uninstall

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

## Configuration

The following table lists the configurable parameters of the MySQL chart and their default values.

| Parameter                  | Description                         | Default                                |
| -------------------------- | ----------------------------------- | -------------------------------------- |
| `mysqlImage`               | `mysql` image and tag.              | `mysql:5.7.13`                         |
| `xtraBackupImage`          | `xtrabackup` image and tag.         | `gcr.io/google-samples/xtrabackup:1.0` |
| `replicaCount`             | Number of MySQL replicas            | 3                                      |
| `mysqlRootPassword`        | Password for the `root` user.       | Randomly generated                     |
| `mysqlUser`                | Username of new user to create.     | `nil`                                  |
| `mysqlPassword`            | Password for the new user.          | Randomly generated                     |
| `mysqlReplicationUser`     | Username for replication user       | `repl`                                 |
| `mysqlReplicationPassword` | Password for replication user.      | Randomly generated                     |
| `mysqlDatabase`            | Name of the new Database to create  | `nil`                                  |
| `persistence.enabled`      | Create a volume to store data       | true                                   |
| `persistence.size`         | Size of persistent volume claim     | 10Gi                                   |
| `persistence.storageClass` | Type of persistent volume claim     | `nil`                                  |
| `persistence.accessMode`   | ReadWriteOnce or ReadOnly           | ReadWriteOnce                          |
| `resources`                | CPU/Memory resource requests/limits | Memory: `128Mi`, CPU: `100m`           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

## Persistence

The [MySQL](https://hub.docker.com/_/mysql/) image stores the MySQL data and configurations at the `/var/lib/mysql` path of the container.

By default persistence is enabled, and a PersistentVolumeClaim is created and mounted in that directory. As a result, a persistent volume will need to be defined:

```
# https://kubernetes.io/docs/user-guide/persistent-volumes/#azure-disk
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: fast
provisioner: kubernetes.io/azure-disk
parameters:
  skuName: Premium_LRS
  location: westus
```

In order to disable this functionality you can change the values.yaml to disable persistence and use an emptyDir instead.
