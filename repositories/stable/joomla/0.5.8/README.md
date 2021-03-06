# `@helm-charts/stable-joomla`

PHP content management system (CMS) for publishing web content

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | joomla |
| Chart Version       | 0.5.8  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Joomla! image version
## ref: https://hub.docker.com/r/bitnami/joomla/tags/
##
image: bitnami/joomla:3.8.5-r2

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-joomla#environment-variables
##
joomlaUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-joomla#environment-variables
##
# joomlaPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-joomla#environment-variables
##
joomlaEmail: user@example.com

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-joomla/#smtp-configuration
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
    ## mariadb data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
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
    ## apache data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 1Gi
  joomla:
    ## joomla data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
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

# Joomla!

[Joomla!](http://www.joomla.org/) is a PHP content management system (CMS) for publishing web content. It includes features such as page caching, RSS feeds, printable versions of pages, news flashes, blogs, search, and support for language international.

## TL;DR;

```console
$ helm install stable/joomla
```

## Introduction

This chart bootstraps a [Joomla!](https://github.com/bitnami/bitnami-docker-joomla) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the Joomla! application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/joomla
```

The command deploys Joomla! on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Joomla! chart and their default values.

| Parameter                         | Description                            | Default                                                  |
| --------------------------------- | -------------------------------------- | -------------------------------------------------------- |
| `image`                           | Joomla! image                          | `bitnami/joomla:{VERSION}`                               |
| `imagePullPolicy`                 | Image pull policy                      | `Always` if `image` tag is `latest`, else `IfNotPresent` |
| `joomlaUsername`                  | User of the application                | `user`                                                   |
| `joomlaPassword`                  | Application password                   | Randomly generated                                       |
| `joomlaEmail`                     | Admin email                            | `user@example.com`                                       |
| `smtpHost`                        | SMTP host                              | `nil`                                                    |
| `smtpPort`                        | SMTP port                              | `nil`                                                    |
| `smtpUser`                        | SMTP user                              | `nil`                                                    |
| `smtpPassword`                    | SMTP password                          | `nil`                                                    |
| `smtpUsername`                    | User name for SMTP emails              | `nil`                                                    |
| `smtpProtocol`                    | SMTP protocol [`tls`, `ssl`]           | `nil`                                                    |
| `mariadb.mariadbRootPassword`     | MariaDB admin password                 | `nil`                                                    |
| `serviceType`                     | Kubernetes Service type                | `LoadBalancer`                                           |
| `persistence.enabled`             | Enable persistence using PVC           | `true`                                                   |
| `persistence.apache.storageClass` | PVC Storage Class for Apache volume    | `nil` (uses alpha storage annotation)                    |
| `persistence.apache.accessMode`   | PVC Access Mode for Apache volume      | `ReadWriteOnce`                                          |
| `persistence.apache.size`         | PVC Storage Request for Apache volume  | `1Gi`                                                    |
| `persistence.joomla.storageClass` | PVC Storage Class for Joomla! volume   | `nil` (uses alpha storage annotation)                    |
| `persistence.joomla.accessMode`   | PVC Access Mode for Joomla! volume     | `ReadWriteOnce`                                          |
| `persistence.joomla.size`         | PVC Storage Request for Joomla! volume | `8Gi`                                                    |
| `resources`                       | CPU/Memory resource requests/limits    | Memory: `512Mi`, CPU: `300m`                             |

The above parameters map to the env variables defined in [bitnami/joomla](http://github.com/bitnami/bitnami-docker-joomla). For more information please refer to the [bitnami/joomla](http://github.com/bitnami/bitnami-docker-joomla) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set joomlaUsername=admin,joomlaPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/joomla
```

The above command sets the Joomla! administrator account username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/joomla
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Joomla!](https://github.com/bitnami/bitnami-docker-joomla) image stores the Joomla! data and configurations at the `/bitnami/joomla` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
