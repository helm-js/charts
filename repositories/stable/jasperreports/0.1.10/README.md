# `@helm-charts/stable-jasperreports`

The JasperReports server can be used as a stand-alone or embedded reporting and BI server that offers web-based reporting, analytic tools and visualization, and a dashboard feature for compiling multiple custom views

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | stable        |
| Chart Name          | jasperreports |
| Chart Version       | 0.1.10        |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami JasperReports image version
## ref: https://hub.docker.com/r/bitnami/jasperreports/tags/
##
image: bitnami/jasperreports:6.4.0-r1

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-jasperreports#configuration
##
jasperreportsUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-jasperreports#configuration
##
# jasperreportsPassword:
#
## Application mail
## ref: https://github.com/bitnami/bitnami-docker-jasperreports#configuration
##
jasperreportsEmail: user@example.com

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-jasperreports#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpEmail:
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

# JasperReports

[JasperReports](http://community.jaspersoft.com/project/jasperreports-server) The JasperReports server can be used as a stand-alone or embedded reporting and BI server that offers web-based reporting, analytic tools and visualization, and a dashboard feature for compiling multiple custom views

## TL;DR;

```console
$ helm install stable/jasperreports
```

## Introduction

This chart bootstraps a [JasperReports](https://github.com/bitnami/bitnami-docker-jasperreports) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the JasperReports application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/jasperreports
```

The command deploys JasperReports on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the JasperReports chart and their default values.

| Parameter                     | Description                                  | Default                                        |
| ----------------------------- | -------------------------------------------- | ---------------------------------------------- |
| `image`                       | JasperReports image                          | `bitnami/jasperreports:{VERSION}`              |
| `imagePullPolicy`             | Image pull policy                            | `IfNotPresent`                                 |
| `jasperreportsUsername`       | User of the application                      | `user`                                         |
| `jasperreportsPassword`       | Application password                         | _random 10 character long alphanumeric string_ |
| `jasperreportsEmail`          | User email                                   | `user@example.com`                             |
| `smtpHost`                    | SMTP host                                    | `nil`                                          |
| `smtpPort`                    | SMTP port                                    | `nil`                                          |
| `smtpEmail`                   | SMTP email                                   | `nil`                                          |
| `smtpUser`                    | SMTP user                                    | `nil`                                          |
| `smtpPassword`                | SMTP password                                | `nil`                                          |
| `smtpProtocol`                | SMTP protocol [`ssl`, `none`]                | `nil`                                          |
| `mariadb.mariadbRootPassword` | MariaDB admin password                       | `nil`                                          |
| `serviceType`                 | Kubernetes Service type                      | `LoadBalancer`                                 |
| `persistence.enabled`         | Enable persistence using PVC                 | `true`                                         |
| `persistence.storageClass`    | PVC Storage Class for JasperReports volume   | `nil` (uses alpha storage annotation)          |
| `persistence.accessMode`      | PVC Access Mode for JasperReports volume     | `ReadWriteOnce`                                |
| `persistence.size`            | PVC Storage Request for JasperReports volume | `8Gi`                                          |
| `resources`                   | CPU/Memory resource requests/limits          | Memory: `512Mi`, CPU: `300m`                   |

The above parameters map to the env variables defined in [bitnami/jasperreports](http://github.com/bitnami/bitnami-docker-jasperreports). For more information please refer to the [bitnami/jasperreports](http://github.com/bitnami/bitnami-docker-jasperreports) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set jasperreportsUsername=admin,jasperreportsPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/jasperreports
```

The above command sets the JasperReports administrator account username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/jasperreports
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami JasperReports](https://github.com/bitnami/bitnami-docker-jasperreports) image stores the JasperReports data and configurations at the `/bitnami/jasperreports` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
