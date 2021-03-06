# `@helm-charts/stable-moodle`

Moodle is a learning platform designed to provide educators, administrators and learners with a single robust, secure and integrated system to create personalised learning environments

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | moodle |
| Chart Version       | 0.1.5  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Moodle` image version
## ref: https://hub.docker.com/r/bitnami/moodle/tags/
##
image: bitnami/moodle:3.2.2-r3

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-moodle#configuration
##
moodleUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-moodle#configuration
##
# moodlePassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-moodle#configuration
moodleEmail: user@example.com

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-moodle/#smtp-configuration
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpProtocol:

##
## MariaDB chart configuration
##
mariadb:
  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # mariadbRootPassword:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true
    ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
    ## Default: volume.alpha.kubernetes.io/storage-class: default
    ##
    # storageClass:
    accessMode: ReadWriteOnce
    size: 8Gi

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
serviceType: LoadBalancer

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  apache:
    ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
    ## Default: volume.alpha.kubernetes.io/storage-class: default
    ##
    # storageClass:
    accessMode: ReadWriteOnce
    size: 1Gi
  moodle:
    ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
    ## Default: volume.alpha.kubernetes.io/storage-class: default
    ##
    # storageClass:
    accessMode: ReadWriteOnce
    size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 512Mi
    cpu: 300m
```

</details>

---

# Moodle

[Moodle](https://www.moodle.org) Moodle is a learning platform designed to provide educators, administrators and learners with a single robust, secure and integrated system to create personalised learning environments

## TL;DR;

```console
$ helm install stable/moodle
```

## Introduction

This chart bootstraps a [Moodle](https://github.com/bitnami/bitnami-docker-moodle) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the Moodle application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/moodle
```

The command deploys Moodle on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Moodle chart and their default values.

| Parameter                          | Description                            | Default                                     |
| ---------------------------------- | -------------------------------------- | ------------------------------------------- |
| `image`                            | Moodle image                           | `bitnami/moodle:{VERSION}`                  |
| `imagePullPolicy`                  | Image pull policy                      | `IfNotPresent`                              |
| `moodleUsername`                   | User of the application                | `user`                                      |
| `moodlePassword`                   | Application password                   | _random 10 character alphanumeric string_   |
| `moodleEmail`                      | Admin email                            | `user@example.com`                          |
| `smtpHost`                         | SMTP host                              | `nil`                                       |
| `smtpPort`                         | SMTP port                              | `nil`                                       |
| `smtpProtocol`                     | SMTP Protocol                          | `nil`                                       |
| `smtpUser`                         | SMTP user                              | `nil`                                       |
| `smtpPassword`                     | SMTP password                          | `nil`                                       |
| `serviceType`                      | Kubernetes Service type                | `LoadBalancer`                              |
| `resources`                        | CPU/Memory resource requests/limits    | Memory: `512Mi`, CPU: `300m`                |
| `persistence.enabled`              | Enable persistence using PVC           | `true`                                      |
| `persistence.apache.storageClass`  | PVC Storage Class for Apache volume    | `nil` (uses alpha storage class annotation) |
| `persistence.apache.accessMode`    | PVC Access Mode for Apache volume      | `ReadWriteOnce`                             |
| `persistence.apache.size`          | PVC Storage Request for Apache volume  | `1Gi`                                       |
| `persistence.moodle.storageClass`  | PVC Storage Class for Moodle volume    | `nil` (uses alpha storage class annotation) |
| `persistence.moodle.accessMode`    | PVC Access Mode for Moodle volume      | `ReadWriteOnce`                             |
| `persistence.moodle.size`          | PVC Storage Request for Moodle volume  | `8Gi`                                       |
| `mariadb.mariadbRootPassword`      | MariaDB admin password                 | `nil` (uses alpha storage class annotation) |
| `mariadb.persistence.enabled`      | Enable MariaDB persistence using PVC   | `true`                                      |
| `mariadb.persistence.storageClass` | PVC Storage Class for MariaDB volume   | `generic`                                   |
| `mariadb.persistence.accessMode`   | PVC Access Mode for MariaDB volume     | `ReadWriteOnce`                             |
| `mariadb.persistence.size`         | PVC Storage Request for MariaDB volume | `8Gi`                                       |

The above parameters map to the env variables defined in [bitnami/moodle](http://github.com/bitnami/bitnami-docker-moodle). For more information please refer to the [bitnami/moodle](http://github.com/bitnami/bitnami-docker-moodle) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set moodleUsername=admin,moodlePassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/moodle
```

The above command sets the Moodle administrator account username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/moodle
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Moodle](https://github.com/bitnami/bitnami-docker-moodle) image stores the Moodle data and configurations at the `/bitnami/moodle` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
