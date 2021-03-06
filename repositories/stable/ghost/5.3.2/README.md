# `@helm-charts/stable-ghost`

A simple, powerful publishing platform that allows you to share your stories with the world

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | ghost  |
| Chart Version       | 5.3.2  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami Ghost image version
## ref: https://hub.docker.com/r/bitnami/ghost/tags/
##
image:
  registry: docker.io
  repository: bitnami/ghost
  tag: 2.2.3-debian-9
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

## Busybox image used to configure volume permissions
##
volumePermissions:
  image:
    name: busybox
    tag: 1.28.3
#    pullPolicy:

## Ghost host and path to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
# ghostHost:
ghostPath: /

## Ghost port to create application URLs along with host.
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
ghostPort: 80

## loadBalancerIP for the Ghost Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
ghostLoadBalancerIP: ''

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
ghostUsername: user@example.com

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
# ghostPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-ghost#configuration
##
ghostEmail: user@example.com

## Ghost Blog name
## ref: https://github.com/bitnami/bitnami-docker-ghost#environment-variables
##
ghostBlogTitle: User's Blog

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-wordpress#environment-variables
allowEmptyPassword: 'yes'

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-redmine/#smtp-configuration
##
# smtpHost:
# smtpPort:
# smtpUser:
# smtpPassword:
# smtpService:

##
## External database configuration
##
externalDatabase:
  ## Database host
  # host:
  ## Database port
  # port:
  ## Database user
  # user: bn_ghost
  ## Database password
  # password:
  ## Database name
  # database: bitnami_ghost

##
## MariaDB chart configuration
##
## https://github.com/helm/charts/blob/master/stable/mariadb/values.yaml
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true
  ## Disable MariaDB replication
  replication:
    enabled: false

  ## Create a database and a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  db:
    name: bitnami_ghost
    user: bn_ghost
    ## If the password is not specified, mariadb will generates a random password
    ##
    # password:

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # rootUser:
  #   password:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  master:
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

## Pod Security Context
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## ghost data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi
  path: /bitnami

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 512Mi
    cpu: 300m

## Configure the ingress resource that allows you to access the
## Ghost installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  hosts:
    - name: ghost.local

      ## Set this to true in order to enable TLS on the ingress record
      ## A side effect of this will be that the backend ghost service will be connected at port 443
      tls: false

      ## Set this to true in order to add the corresponding annotations for cert-manager
      certManager: false

      ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
      tlsSecret: ghost.local-tls

      ## Ingress annotations done as key:value pairs
      ## For a full list of possible ingress annotations, please see
      ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
      ##
      ## If tls is set to true, annotation ingress.kubernetes.io/secure-backends: "true" will automatically be set
      annotations:
      #  kubernetes.io/ingress.class: nginx

  secrets:
  ## If you're providing your own certificates, please use this to add the certificates as secrets
  ## key and certificate should start with -----BEGIN CERTIFICATE----- or
  ## -----BEGIN RSA PRIVATE KEY-----
  ##
  ## name should line up with a tlsSecret set further up
  ## If you're using cert-manager, this is unneeded, as it will create the secret for you if it is not set
  ##
  ## It is also possible to create and manage the certificates outside of this helm chart
  ## Please see README.md for more information
  # - name: ghost.local-tls
  #   key:
  #   certificate:
```

</details>

---

# Ghost

[Ghost](https://ghost.org/) is one of the most versatile open source content management systems on the market.

## TL;DR;

```console
$ helm install stable/ghost
```

## Introduction

This chart bootstraps a [Ghost](https://github.com/bitnami/bitnami-docker-ghost) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the Ghost application.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/ghost
```

The command deploys Ghost on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Ghost chart and their default values.

| Parameter                        | Description                                                   | Default                                                 |
| -------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| `global.imageRegistry`           | Global Docker image registry                                  | `nil`                                                   |
| `image.registry`                 | Ghost image registry                                          | `docker.io`                                             |
| `image.repository`               | Ghost Image name                                              | `bitnami/ghost`                                         |
| `image.tag`                      | Ghost Image tag                                               | `{VERSION}`                                             |
| `image.pullPolicy`               | Image pull policy                                             | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`              | Specify image pull secrets                                    | `nil`                                                   |
| `ghostHost`                      | Ghost host to create application URLs                         | `nil`                                                   |
| `ghostPath`                      | Ghost path to create application URLs                         | `nil`                                                   |
| `ghostPort`                      | Ghost port to create application URLs along with host         | `80`                                                    |
| `ghostLoadBalancerIP`            | `loadBalancerIP` for the Ghost Service                        | `nil`                                                   |
| `ghostUsername`                  | User of the application                                       | `user@example.com`                                      |
| `ghostPassword`                  | Application password                                          | Randomly generated                                      |
| `ghostEmail`                     | Admin email                                                   | `user@example.com`                                      |
| `ghostBlogTitle`                 | Ghost Blog name                                               | `User's Blog`                                           |
| `allowEmptyPassword`             | Allow DB blank passwords                                      | `yes`                                                   |
| `serviceType`                    | Kubernetes Service type                                       | `LoadBalancer`                                          |
| `securityContext.enabled`        | Enable security context                                       | `true`                                                  |
| `securityContext.fsGroup`        | Group ID for the container                                    | `1001`                                                  |
| `securityContext.runAsUser`      | User ID for the container                                     | `1001`                                                  |
| `ingress.enabled`                | Enable ingress controller resource                            | `false`                                                 |
| `ingress.hosts[0].name`          | Hostname to your Ghost installation                           | `ghost.local`                                           |
| `ingress.hosts[0].path`          | Path within the url structure                                 | `/`                                                     |
| `ingress.hosts[0].tls`           | Utilize TLS backend in ingress                                | `false`                                                 |
| `ingress.hosts[0].certManager`   | Add annotations for cert-manager                              | `false`                                                 |
| `ingress.hosts[0].tlsSecret`     | TLS Secret (certificates)                                     | `ghost.local-tls-secret`                                |
| `ingress.hosts[0].annotations`   | Annotations for this host's ingress record                    | `[]`                                                    |
| `ingress.secrets[0].name`        | TLS Secret Name                                               | `nil`                                                   |
| `ingress.secrets[0].certificate` | TLS Secret Certificate                                        | `nil`                                                   |
| `ingress.secrets[0].key`         | TLS Secret Key                                                | `nil`                                                   |
| `externalDatabase.host`          | Host of the external database                                 | `nil`                                                   |
| `externalDatabase.port`          | Port of the external database                                 | `nil`                                                   |
| `externalDatabase.user`          | Existing username in the external db                          | `bn_ghost`                                              |
| `externalDatabase.password`      | Password for the above username                               | `nil`                                                   |
| `externalDatabase.database`      | Name of the existing database                                 | `bitnami_ghost`                                         |
| `mariadb.enabled`                | Whether or not to install MariaDB (disable if using external) | `true`                                                  |
| `mariadb.rootUser.password`      | MariaDB admin password                                        | `nil`                                                   |
| `mariadb.db.name`                | MariaDB Database name to create                               | `bitnami_ghost`                                         |
| `mariadb.db.user`                | MariaDB Database user to create                               | `bn_ghost`                                              |
| `mariadb.db.password`            | MariaDB Password for user                                     | _random 10 character long alphanumeric string_          |
| `persistence.enabled`            | Enable persistence using PVC                                  | `true`                                                  |
| `persistence.storageClass`       | PVC Storage Class for Ghost volume                            | `nil` (uses alpha storage annotation)                   |
| `persistence.accessMode`         | PVC Access Mode for Ghost volume                              | `ReadWriteOnce`                                         |
| `persistence.size`               | PVC Storage Request for Ghost volume                          | `8Gi`                                                   |
| `persistence.path`               | Path to mount the volume at, to use other images              | `/bitnami`                                              |
| `resources`                      | CPU/Memory resource requests/limits                           | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/ghost](http://github.com/bitnami/bitnami-docker-ghost). For more information please refer to the [bitnami/ghost](http://github.com/bitnami/bitnami-docker-ghost) image documentation.

> **Note**:
>
> For the Ghost application function correctly, you should specify the `ghostHost` parameter to specify the FQDN (recommended) or the public IP address of the Ghost service.
>
> Optionally, you can specify the `ghostLoadBalancerIP` parameter to assign a reserved IP address to the Ghost service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create ghost-public-ip
> ```
>
> The reserved IP address can be assigned to the Ghost service by specifying it as the value of the `ghostLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set ghostUsername=admin,ghostPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/ghost
```

The above command sets the Ghost administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/ghost
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Using an existing database

Sometimes you may want to have Ghost connect to an external database rather than installing one inside your cluster, e.g. to use a managed database service, or use run a single database server for all your applications. To do this, the chart allows you to specify credentials for an external database under the [`externalDatabase` parameter](#configuration). You should also disable the MariaDB installation with the `mariadb.enabled` option. For example:

```console
$ helm install stable/ghost \
    --set mariadb.enabled=false,externalDatabase.host=myexternalhost,externalDatabase.user=myuser,externalDatabase.password=mypassword,externalDatabase.database=mydatabase
```

## Persistence

The [Bitnami Ghost](https://github.com/bitnami/bitnami-docker-ghost) image stores the Ghost data and configurations at the `/bitnami/ghost` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 5.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 5.0.0. The following example assumes that the release name is ghost:

```console
$ kubectl patch deployment ghost-ghost --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl delete statefulset ghost-mariadb --cascade=false
```
