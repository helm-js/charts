# `@helm-charts/bitnami-phabricator`

Collection of open source web applications that help software companies build better software.

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | bitnami     |
| Chart Name          | phabricator |
| Chart Version       | 3.0.6       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Phabricator image version
## ref: https://hub.docker.com/r/bitnami/phabricator/tags/
##
image:
  registry: docker.io
  repository: bitnami/phabricator
  tag: 2018.40.0-debian-9
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

## Phabricator host to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-phabricator#configuration
##
# phabricatorHost:

## Phabricator alternate domain to upload files
## ref: https://github.com/bitnami/bitnami-docker-phabricator#configuration
##
# phabricatorAlternateFileDomain:

## loadBalancerIP for the Phabricator Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
# phabricatorLoadBalancerIP:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-phabricator#configuration
##
phabricatorUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-phabricator#configuration
##
# phabricatorPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-phabricator#configuration
##
phabricatorEmail: user@example.com

## First name
## ref: https://github.com/bitnami/bitnami-docker-phabricator#environment-variables
##
phabricatorFirstName: First Name

## Last name
## ref: https://github.com/bitnami/bitnami-docker-phabricator#environment-variables
##
phabricatorLastName: Last Name

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-phabricator/#smtp-configuration
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
  ## Disable MariaDB replication
  replication:
    enabled: false

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
  phabricator:
    ## phabricator data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi

ingress:
  enabled: false
  # path: /
  # Used to create an Ingress record.
  # hosts:
  # - chart-example.local
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: "true"
  # tls:
  #   Secrets must be manually created in the namespace.
  #   - secretName: chart-example-tls
  #     hosts:
  #       - chart-example.local

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

# Phabricator

[Phabricator](https://www.phacility.com) is a collection of open source web applications that help software companies build better software. Phabricator is built by developers for developers. Every feature is optimized around developer efficiency for however you like to work. Code Quality starts with an effective collaboration between team members.

## TL;DR;

```console
$ helm install stable/phabricator
```

## Introduction

This chart bootstraps a [Phabricator](https://github.com/bitnami/bitnami-docker-phabricator) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the Phabricator application.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/phabricator
```

The command deploys Phabricator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Phabricator chart and their default values.

| Parameter                              | Description                                  | Default                                                 |
| -------------------------------------- | -------------------------------------------- | ------------------------------------------------------- |
| `image.registry`                       | Phabricator image registry                   | `docker.io`                                             |
| `image.repository`                     | Phabricator image name                       | `bitnami/phabricator`                                   |
| `image.tag`                            | Phabricator image tag                        | `{VERSION}`                                             |
| `image.pullPolicy`                     | Image pull policy                            | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                    | Specify image pull secrets                   | `nil`                                                   |
| `phabricatorHost`                      | Phabricator host to create application URLs  | `nil`                                                   |
| `phabricatorAlternateFileDomain`       | Phabricator alternate domain to upload files | `nil`                                                   |
| `phabricatorLoadBalancerIP`            | `loadBalancerIP` for the Phabricator Service | `nil`                                                   |
| `phabricatorUsername`                  | User of the application                      | `user`                                                  |
| `phabricatorPassword`                  | Application password                         | _random 10 character long alphanumeric string_          |
| `phabricatorEmail`                     | Admin email                                  | `user@example.com`                                      |
| `phabricatorFirstName`                 | First name                                   | `First Name`                                            |
| `phabricatorLastName`                  | Last name                                    | `Last Name`                                             |
| `smtpHost`                             | SMTP host                                    | `nil`                                                   |
| `smtpPort`                             | SMTP port                                    | `nil`                                                   |
| `smtpUser`                             | SMTP user                                    | `nil`                                                   |
| `smtpPassword`                         | SMTP password                                | `nil`                                                   |
| `smtpProtocol`                         | SMTP protocol [`ssl`, `tls`]                 | `nil`                                                   |
| `mariadb.rootUser.password`            | MariaDB admin password                       | `nil`                                                   |
| `serviceType`                          | Kubernetes Service type                      | `LoadBalancer`                                          |
| `persistence.enabled`                  | Enable persistence using PVC                 | `true`                                                  |
| `persistence.apache.storageClass`      | PVC Storage Class for Apache volume          | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`        | PVC Access Mode for Apache volume            | `ReadWriteOnce`                                         |
| `persistence.apache.size`              | PVC Storage Request for Apache volume        | `1Gi`                                                   |
| `persistence.phabricator.storageClass` | PVC Storage Class for Phabricator volume     | `nil` (uses alpha storage class annotation)             |
| `persistence.phabricator.accessMode`   | PVC Access Mode for Phabricator volume       | `ReadWriteOnce`                                         |
| `persistence.phabricator.size`         | PVC Storage Request for Phabricator volume   | `8Gi`                                                   |
| `resources`                            | CPU/Memory resource requests/limits          | Memory: `512Mi`, CPU: `300m`                            |
| `ingress.enabled`                      | enable ingress                               | `false`                                                 |
| `ingress.path`                         | path to expose on ingress                    | `nil`                                                   |
| `ingress.hosts`                        | listss of accepted hostnames                 | `nil`                                                   |
| `ingress.annotations`                  | annotations to use on the ingress            | `nil`                                                   |
| `ingress.tls.secretName`               | tls secret name                              | `nil`                                                   |
| `ingress.tls.hosts`                    | hostnames the secret applies to              | `nil`                                                   |

The above parameters map to the env variables defined in [bitnami/phabricator](http://github.com/bitnami/bitnami-docker-phabricator). For more information please refer to the [bitnami/phabricator](http://github.com/bitnami/bitnami-docker-phabricator) image documentation.

> **Note**:
>
> For Phabricator to function correctly, you should specify the `phabricatorHost` parameter to specify the FQDN (recommended) or the public IP address of the Phabricator service.
>
> Optionally, you can specify the `phabricatorLoadBalancerIP` parameter to assign a reserved IP address to the Phabricator service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create phabricator-public-ip
> ```
>
> The reserved IP address can be associated to the Phabricator service by specifying it as the value of the `phabricatorLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set phabricatorUsername=admin,phabricatorPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/phabricator
```

The above command sets the Phabricator administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/phabricator
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Phabricator](https://github.com/bitnami/bitnami-docker-phabricator) image stores the Phabricator data and configurations at the `/bitnami/phabricator` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Ingress With Reverse Proxy And Kube Lego

You can define a custom ingress following the example config in values.yaml

`helm install stable/phabricator/ --name my-release --set phabricatorHost=example.com`

Everything looks great but requests over https will cause asset requests to fail. Assuming you want to use HTTPS/TLS you will need to set the base-uri to an https schema.

```
export POD_NAME=$(kubectl get pods -l "app=my-release-phabricator" -o jsonpath="{.items[0].metadata.name}")
kubectl exec $POD_NAME /opt/bitnami/phabricator/bin/config set phabricator.base-uri https://example.com
```

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is opencart:

```console
$ kubectl patch deployment opencart-opencart --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/app"}]'
$ kubectl delete statefulset opencart-mariadb --cascade=false
```
