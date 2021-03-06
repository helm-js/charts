# `@helm-charts/stable-prestashop`

A popular open source ecommerce solution. Professional tools are easily accessible to increase online sales including instant guest checkout, abandoned cart reminders and automated Email marketing.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | prestashop |
| Chart Version       | 1.0.5      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami PrestaShop image version
## ref: https://hub.docker.com/r/bitnami/prestashop/tags/
##
image:
  registry: docker.io
  repository: bitnami/prestashop
  tag: 1.7.3-2
  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: IfNotPresent
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

## PrestaShop host to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
# prestashopHost:

## loadBalancerIP for the PrestaShop Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
# prestashopLoadBalancerIP:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopUsername: user@example.com

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
# prestashopPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopEmail: user@example.com

## First Name
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopFirstName: Bitnami

## Last Name
## ref: https://github.com/bitnami/bitnami-docker-prestashop#configuration
##
prestashopLastName: User

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-prestashop#environment-variables
allowEmptyPassword: 'yes'

##
## External database configuration
##
externalDatabase:
  ## Database host
  host:

  ## Database host
  port: 3306

  ## Database user
  user: bn_jasperreports

  ## Database password
  password:

  ## Database name
  database: bitnami_prestashop

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-prestashop/#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpProtocol:

##
## MariaDB chart configuration
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true

  ## Create a database
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-on-first-run
  ##
  mariadbDatabase: bitnami_prestashop

  ## Create a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  mariadbUser: bn_prestashop

  ## Password for mariadbUser
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  # mariadbPassword:

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
  prestashop:
    ## prestashop data Persistent Volume Storage Class
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

# PrestaShop

[PrestaShop](https://prestashop.com/) is a popular open source e-commerce solution. Professional tools are easily accessible to increase online sales including instant guest checkout, abandoned cart reminders and automated Email marketing.

## TL;DR;

```console
$ helm install stable/prestashop
```

## Introduction

This chart bootstraps a [PrestaShop](https://github.com/bitnami/bitnami-docker-prestashop) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the PrestaShop application.

## Prerequisites

- Kubernetes 1.5+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/prestashop
```

The command deploys PrestaShop on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the PrestaShop chart and their default values.

| Parameter                             | Description                                 | Default                                                 |
| ------------------------------------- | ------------------------------------------- | ------------------------------------------------------- |
| `image.registry`                      | PrestaShop image registry                   | `docker.io`                                             |
| `image.repository`                    | PrestaShop image name                       | `bitnami/prestashop`                                    |
| `image.tag`                           | PrestaShop image tag                        | `{VERSION}`                                             |
| `image.pullPolicy`                    | Image pull policy                           | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                   | Specify image pull secrets                  | `nil`                                                   |
| `prestashopHost`                      | PrestaShop host to create application URLs  | `nil`                                                   |
| `prestashopLoadBalancerIP`            | `loadBalancerIP` for the PrestaShop Service | `nil`                                                   |
| `prestashopUsername`                  | User of the application                     | `user@example.com`                                      |
| `prestashopPassword`                  | Application password                        | _random 10 character long alphanumeric string_          |
| `prestashopEmail`                     | Admin email                                 | `user@example.com`                                      |
| `prestashopFirstName`                 | First Name                                  | `Bitnami`                                               |
| `prestashopLastName`                  | Last Name                                   | `Name`                                                  |
| `smtpHost`                            | SMTP host                                   | `nil`                                                   |
| `smtpPort`                            | SMTP port                                   | `nil`                                                   |
| `smtpUser`                            | SMTP user                                   | `nil`                                                   |
| `smtpPassword`                        | SMTP password                               | `nil`                                                   |
| `smtpProtocol`                        | SMTP protocol [`ssl`, `tls`]                | `nil`                                                   |
| `allowEmptyPassword`                  | Allow DB blank passwords                    | `yes`                                                   |
| `externalDatabase.host`               | Host of the external database               | `nil`                                                   |
| `externalDatabase.port`               | SMTP protocol [`ssl`, `none`]               | `3306`                                                  |
| `externalDatabase.user`               | Existing username in the external db        | `bn_prestashop`                                         |
| `externalDatabase.password`           | Password for the above username             | `nil`                                                   |
| `externalDatabase.database`           | Name of the existing database               | `bitnami_prestashop`                                    |
| `mariadb.enabled`                     | Whether to use the MariaDB chart            | `true`                                                  |
| `mariadb.mariadbDatabase`             | Database name to create                     | `bitnami_prestashop`                                    |
| `mariadb.mariadbUser`                 | Database user to create                     | `bn_prestashop`                                         |
| `mariadb.mariadbPassword`             | Password for the database                   | `nil`                                                   |
| `mariadb.mariadbRootPassword`         | MariaDB admin password                      | `nil`                                                   |
| `serviceType`                         | Kubernetes Service type                     | `LoadBalancer`                                          |
| `persistence.enabled`                 | Enable persistence using PVC                | `true`                                                  |
| `persistence.apache.storageClass`     | PVC Storage Class for Apache volume         | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`       | PVC Access Mode for Apache volume           | `ReadWriteOnce`                                         |
| `persistence.apache.size`             | PVC Storage Request for Apache volume       | `1Gi`                                                   |
| `persistence.prestashop.storageClass` | PVC Storage Class for PrestaShop volume     | `nil` (uses alpha storage class annotation)             |
| `persistence.prestashop.accessMode`   | PVC Access Mode for PrestaShop volume       | `ReadWriteOnce`                                         |
| `persistence.prestashop.size`         | PVC Storage Request for PrestaShop volume   | `8Gi`                                                   |
| `resources`                           | CPU/Memory resource requests/limits         | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/prestashop](http://github.com/bitnami/bitnami-docker-prestashop). For more information please refer to the [bitnami/prestashop](http://github.com/bitnami/bitnami-docker-prestashop) image documentation.

> **Note**:
>
> For PrestaShop to function correctly, you should specify the `prestashopHost` parameter to specify the FQDN (recommended) or the public IP address of the PrestaShop service.
>
> Optionally, you can specify the `prestashopLoadBalancerIP` parameter to assign a reserved IP address to the PrestaShop service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create prestashop-public-ip
> ```
>
> The reserved IP address can be associated to the PrestaShop service by specifying it as the value of the `prestashopLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set prestashopUsername=admin,prestashopPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/prestashop
```

The above command sets the PrestaShop administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prestashop
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami PrestaShop](https://github.com/bitnami/bitnami-docker-prestashop) image stores the PrestaShop data and configurations at the `/bitnami/prestashop` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
