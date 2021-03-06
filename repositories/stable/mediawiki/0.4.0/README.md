# `@helm-charts/stable-mediawiki`

Extremely powerful, scalable software and a feature-rich wiki implementation that uses PHP to process and display data stored in a database.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | mediawiki |
| Chart Version       | 0.4.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami MediaWiki image version
## ref: https://hub.docker.com/r/bitnami/mediawiki/tags/
##
image: bitnami/mediawiki:1.27.1-r1

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
mediawikiUser: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
# mediawikiPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
mediawikiEmail: user@example.com

## Name for the wiki
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#environment-variables
##
mediawikiName: My Wiki

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-mediawiki#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpHostID:
# smtpUser:
# smtpPassword:

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
    storageClass: generic
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
    storageClass: generic
    accessMode: ReadWriteOnce
    size: 1Gi
  mediawiki:
    storageClass: generic
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

# MediaWiki

[MediaWiki](https://www.mediawiki.org) is an extremely powerful, scalable software and a feature-rich wiki implementation that uses PHP to process and display data stored in a database, such as MySQL.

## TL;DR;

```console
$ helm install stable/mediawiki
```

## Introduction

This chart bootstraps a [MediaWiki](https://github.com/bitnami/bitnami-docker-mediawiki) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the MediaWiki application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/mediawiki
```

The command deploys MediaWiki on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the MediaWiki chart and their default values.

| Parameter                            | Description                              | Default                                                 |
| ------------------------------------ | ---------------------------------------- | ------------------------------------------------------- |
| `image`                              | MediaWiki image                          | `bitnami/mediawiki:{VERSION}`                           |
| `imagePullPolicy`                    | Image pull policy                        | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `mediawikiUser`                      | User of the application                  | `user`                                                  |
| `mediawikiPassword`                  | Application password                     | _random 10 character long alphanumeric string_          |
| `mediawikiEmail`                     | Admin email                              | `user@example.com`                                      |
| `mediawikiName`                      | Name for the wiki                        | `Bitnami MediaWiki`                                     |
| `smtpHost`                           | SMTP host                                | `nil`                                                   |
| `smtpPort`                           | SMTP port                                | `nil`                                                   |
| `smtpHostID`                         | SMTP host ID                             | `nil`                                                   |
| `smtpUser`                           | SMTP user                                | `nil`                                                   |
| `smtpPassword`                       | SMTP password                            | `nil`                                                   |
| `mariadb.mariadbRootPassword`        | MariaDB admin password                   | `nil`                                                   |
| `serviceType`                        | Kubernetes Service type                  | `LoadBalancer`                                          |
| `persistence.enabled`                | Enable persistence using PVC             | `true`                                                  |
| `persistence.apache.storageClass`    | PVC Storage Class for Apache volume      | `generic`                                               |
| `persistence.apache.accessMode`      | PVC Access Mode for Apache volume        | `ReadWriteOnce`                                         |
| `persistence.apache.size`            | PVC Storage Request for Apache volume    | `1Gi`                                                   |
| `persistence.mediawiki.storageClass` | PVC Storage Class for MediaWiki volume   | `generic`                                               |
| `persistence.mediawiki.accessMode`   | PVC Access Mode for MediaWiki volume     | `ReadWriteOnce`                                         |
| `persistence.mediawiki.size`         | PVC Storage Request for MediaWiki volume | `8Gi`                                                   |
| `resources`                          | CPU/Memory resource requests/limits      | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/mediawiki](http://github.com/bitnami/bitnami-docker-mediawiki). For more information please refer to the [bitnami/mediawiki](http://github.com/bitnami/bitnami-docker-mediawiki) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set mediawikiUser=admin,mediawikiPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/mediawiki
```

The above command sets the MediaWiki administrator account username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/mediawiki
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami MediaWiki](https://github.com/bitnami/bitnami-docker-mediawiki) image stores the MediaWiki data and configurations at the `/bitnami/mediawiki` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
