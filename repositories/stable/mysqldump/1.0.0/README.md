# `@helm-charts/stable-mysqldump`

A Helm chart to help backup MySQL databases using mysqldump

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | mysqldump |
| Chart Version       | 1.0.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for mysqldump.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: mysql
  tag: '5.7.21'
  pullPolicy: IfNotPresent

mysql:
  ## Without a host set, this chart will not do anything as it is expected
  ## to be used only when there's an existing database to backup.
  host:
  username: root
  password:
  port: 3306

## set to `now` to get a one time job, or a cronjob schedule like `0 0 * * *`
## to get a cronjob.
schedule: '0/5 * * * *'
# schedule: now

## options to pass to mysqldump
options: '--opt --skip-lock-tables --skip-add-locks --all-databases'

## enable some debug options
debug: false

## cronjob history
successfulJobsHistoryLimit: 5
failedJobsHistoryLimit: 5

## set persistentVolumeClaim to use a PVC that already exists.
## if set will override any settings under `resistence` otherwise
## if not set and `persistence` set to true, will create a PVC.
# persistentVolumeClaim: <existing-PVC>

persistence:
  enabled: true
  size: 8Gi
  accessMode: ReadWriteOnce
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
```

</details>

---

# mysqldump

mysqldump is a tool for creating backups of MySQL databases in the form of a .sql file.

## TL;DR;

```console
$ helm install stable/mysqldump \
  --set mysql.host=mysql;mysql.username=root,mysql.password=password,persistence.enabled=true
```

## Introduction

This chart helps set up a cronjob or one time job to backup a MySQL database with mysqldump into a Persistent Volume. You can specify an existing PVC, or helm will create one for you.

## Prerequisites

- Kubernetes 1.8

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/mysqldump \
  --set mysql.host=mysql,mysql.username=root,mysql.password=password,persistence.enabled=true
```

This command will create a cronjob to run a job once a day to backup the databases found on the host `mysql`

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the mysqldump chart and their default values.

| Parameter                  | Description                                                                    | Default                                                     |
| -------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| image.repository           | Name of MySQL image to use                                                     | mysql                                                       |
| image.tag                  | Version of MySQL image to use                                                  | "5"                                                         |
| image.pullPolicy           | Pull Policy to use for image                                                   | IfNotPresent                                                |
| mysql.host                 | mysql host to backup                                                           | mysql                                                       |
| mysql.username             | mysql username                                                                 | root                                                        |
| mysql.password             | mysql password                                                                 | ""                                                          |
| mysql.port                 | mysql port                                                                     | 3306                                                        |
| schedule                   | crontab schedule to run on. set as `now` to run as a one time job              | "0/5 \* \* \* \*"                                           |
| options                    | options to pass onto MySQL                                                     | "--opt --skip-lock-tables --skip-add-locks --all-databases" |
| debug                      | print some extra debug logs during backup                                      | false                                                       |
| successfulJobsHistoryLimit | number of successful jobs to remember                                          | 5                                                           |
| failedJobsHistoryLimit     | number of failed jobs to remember                                              | 5                                                           |
| persistentVolumeClaim      | existing Persistent Volume Claim to backup to, leave blank to create a new one |
| persistence.enabled        | create new PVC (unless `persistentVolumeClaim` is set)                         | true                                                        |
| persistence.size           | size of PVC to create                                                          | 8Gi                                                         |
| persistence.accessMode     | accessMode to use for PVC                                                      | ReadWriteOnce                                               |
| persistence.storageClass   | storage class to use for PVC                                                   |

```console
$ helm install stable/mysqldump --name my-release \
    --set persistentVolumeClaim=name-of-existing-pvc
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install stable/mysqldump --name my-release -f values.yaml
```
