# `@helm-charts/stable-wordpress`

Web publishing platform for building blogs and websites.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | wordpress |
| Chart Version       | 0.5.2     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami WordPress image version
## ref: https://hub.docker.com/r/bitnami/wordpress/tags/
##
image: bitnami/wordpress:4.7.3-r2

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
wordpressUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
##
# wordpressPassword:

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

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
allowEmptyPassword: yes

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

  ## Create a database
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-on-first-run
  ##
  mariadbDatabase: bitnami_wordpress

  ## Create a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  mariadbUser: bn_wordpress

  ## Password for mariadbUser
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  # mariadbPassword:

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

## Configure ingress resource that allow you to access the
## Wordpress instalation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  enabled: false
  hostname: wordpress.local

  ## Ingress annotations
  ##
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  ## Ingress TLS configuration
  ## Secrets must be manually created in the namespace
  ##
  # tls:
  #   - secretName: wordpress.local-tls
  #     hosts:
  #       - wordpress.local

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
  wordpress:
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

# WordPress

[WordPress](https://wordpress.org/) is one of the most versatile open source content management systems on the market. A publishing platform for building blogs and websites.

## TL;DR;

```console
$ helm install stable/wordpress
```

## Introduction

This chart bootstraps a [WordPress](https://github.com/bitnami/bitnami-docker-wordpress) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the WordPress application.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/wordpress
```

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

| Parameter                            | Description                                | Default                                        |
| ------------------------------------ | ------------------------------------------ | ---------------------------------------------- |
| `image`                              | WordPress image                            | `bitnami/wordpress:{VERSION}`                  |
| `imagePullPolicy`                    | Image pull policy                          | `IfNotPresent`                                 |
| `wordpressUsername`                  | User of the application                    | `user`                                         |
| `wordpressPassword`                  | Application password                       | _random 10 character long alphanumeric string_ |
| `wordpressEmail`                     | Admin email                                | `user@example.com`                             |
| `wordpressFirstName`                 | First name                                 | `FirstName`                                    |
| `wordpressLastName`                  | Last name                                  | `LastName`                                     |
| `wordpressBlogName`                  | Blog name                                  | `User's Blog!`                                 |
| `allowEmptyPassword`                 | Allow DB blank passwords                   | `yes`                                          |
| `smtpHost`                           | SMTP host                                  | `nil`                                          |
| `smtpPort`                           | SMTP port                                  | `nil`                                          |
| `smtpUser`                           | SMTP user                                  | `nil`                                          |
| `smtpPassword`                       | SMTP password                              | `nil`                                          |
| `smtpUsername`                       | User name for SMTP emails                  | `nil`                                          |
| `smtpProtocol`                       | SMTP protocol [`tls`, `ssl`]               | `nil`                                          |
| `mariadb.mariadbRootPassword`        | MariaDB admin password                     | `nil`                                          |
| `mariadb.mariadbDatabase`            | Database name to create                    | `bitnami_wordpress`                            |
| `mariadb.mariadbUser`                | Database user to create                    | `bn_wordpress`                                 |
| `mariadb.mariadbPassword`            | Password for the database                  | _random 10 character long alphanumeric string_ |
| `serviceType`                        | Kubernetes Service type                    | `LoadBalancer`                                 |
| `ingress.enabled`                    | Enable ingress controller resource         | `false`                                        |
| `ingress.hostname`                   | URL to address your WordPress installation | `wordpress.local`                              |
| `ingress.tls`                        | Ingress TLS configuration                  | `[]`                                           |
| `persistence.enabled`                | Enable persistence using PVC               | `true`                                         |
| `persistence.apache.storageClass`    | PVC Storage Class for Apache volume        | `nil` (uses alpha storage class annotation)    |
| `persistence.apache.accessMode`      | PVC Access Mode for Apache volume          | `ReadWriteOnce`                                |
| `persistence.apache.size`            | PVC Storage Request for Apache volume      | `1Gi`                                          |
| `persistence.wordpress.storageClass` | PVC Storage Class for WordPress volume     | `nil` (uses alpha storage class annotation)    |
| `persistence.wordpress.accessMode`   | PVC Access Mode for WordPress volume       | `ReadWriteOnce`                                |
| `persistence.wordpress.size`         | PVC Storage Request for WordPress volume   | `8Gi`                                          |

The above parameters map to the env variables defined in [bitnami/wordpress](http://github.com/bitnami/bitnami-docker-wordpress). For more information please refer to the [bitnami/wordpress](http://github.com/bitnami/bitnami-docker-wordpress) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set wordpressUsername=admin,wordpressPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/wordpress
```

The above command sets the WordPress administrator account username and password to `admin` and `password` respectively. Additionally it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/wordpress
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami WordPress](https://github.com/bitnami/bitnami-docker-wordpress) image stores the WordPress data and configurations at the `/bitnami/wordpress` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Ingress

This chart provides support for Ingress resource. If you have available an Ingress Controller such as Nginx or Traefik you maybe want to set up `ingress.enabled` to true and choose a `ingress.hostname` for the URL. Then, you should be able to access the installation using that address.
