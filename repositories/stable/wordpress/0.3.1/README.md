# `@helm-charts/stable-wordpress`

Web publishing platform for building blogs and websites.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | wordpress |
| Chart Version       | 0.3.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami WordPress image version
## ref: https://hub.docker.com/r/bitnami/wordpress/tags/
##
image: bitnami/wordpress:4.6.1-r2

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressUsername: user

## Application password
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressPassword: bitnami

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressEmail: user@example.com

## First name
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressFirstName: FirstName

## Last name
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressLastName: LastName

## Blog name
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressBlogName: User's Blog!

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-wordpress/#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpUsername:
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
  wordpress:
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

# WordPress

[WordPress](https://wordpress.org/) is one of the most versatile open source content management systems on the market. A publishing platform for building blogs and websites.

## TL;DR;

```console
$ helm install stable/wordpress
```

## Introduction

This chart bootstraps a [WordPress](https://github.com/bitnami/bitnami-docker-wordpress) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the Bitnami MariaDB chart which is required for bootstrapping a MariaDB deployment for the database requirements of the WordPress application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Get this chart

Download the latest release of the chart from the [releases](../../../releases) page.

Alternatively, clone the repo if you wish to use the development snapshot:

```console
$ git clone https://github.com/kubernetes/charts.git
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/wordpress
```

_Replace the `x.x.x` placeholder with the chart release version._

The command deploys WordPress on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the WordPress chart and their default values.

| Parameter                            | Description                              | Default                                                  |
| ------------------------------------ | ---------------------------------------- | -------------------------------------------------------- |
| `image`                              | WordPress image                          | `bitnami/wordpress:{VERSION}`                            |
| `imagePullPolicy`                    | Image pull policy                        | `Always` if `image` tag is `latest`, else `IfNotPresent` |
| `wordpressUsername`                  | User of the application                  | `user`                                                   |
| `wordpressPassword`                  | Application password                     | `bitnami`                                                |
| `wordpressEmail`                     | Admin email                              | `user@example.com`                                       |
| `wordpressFirstName`                 | First name                               | `FirstName`                                              |
| `wordpressLastName`                  | Last name                                | `LastName`                                               |
| `wordpressBlogName`                  | Blog name                                | `User's Blog!`                                           |
| `smtpHost`                           | SMTP host                                | `nil`                                                    |
| `smtpPort`                           | SMTP port                                | `nil`                                                    |
| `smtpUser`                           | SMTP user                                | `nil`                                                    |
| `smtpPassword`                       | SMTP password                            | `nil`                                                    |
| `smtpUsername`                       | User name for SMTP emails                | `nil`                                                    |
| `smtpProtocol`                       | SMTP protocol [`tls`, `ssl`]             | `nil`                                                    |
| `mariadb.mariadbRootPassword`        | MariaDB admin password                   | `nil`                                                    |
| `serviceType`                        | Kubernetes Service type                  | `LoadBalancer`                                           |
| `persistence.enabled`                | Enable persistence using PVC             | `true`                                                   |
| `persistence.apache.storageClass`    | PVC Storage Class for Apache volume      | `generic`                                                |
| `persistence.apache.accessMode`      | PVC Access Mode for Apache volume        | `ReadWriteOnce`                                          |
| `persistence.apache.size`            | PVC Storage Request for Apache volume    | `1Gi`                                                    |
| `persistence.wordpress.storageClass` | PVC Storage Class for WordPress volume   | `generic`                                                |
| `persistence.wordpress.accessMode`   | PVC Access Mode for WordPress volume     | `ReadWriteOnce`                                          |
| `persistence.wordpress.size`         | PVC Storage Request for WordPress volume | `8Gi`                                                    |

The above parameters map to the env variables defined in [bitnami/wordpress](http://github.com/bitnami/bitnami-docker-wordpress). For more information please refer to the [bitnami/wordpress](http://github.com/bitnami/bitnami-docker-wordpress) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set wordpressUsername=admin,wordpressPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/wordpress
```

The above command sets the WordPress application username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/wordpress
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami WordPress](https://github.com/bitnami/bitnami-docker-wordpress) image stores the WordPress data and configurations at the `/bitnami/wordpress` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
