# `@helm-charts/bitnami-jenkins`

The leading open source automation server

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | jenkins |
| Chart Version       | 0.4.67  |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Jenkins image version
## ref: https://hub.docker.com/r/bitnami/jenkins/tags/
##
image:
  registry: docker.io
  repository: bitnami/jenkins
  tag: 2.109.0
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

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-jenkins#configuration
##
jenkinsUser: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-jenkins#configuration
##
# jenkinsPassword:

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

# Jenkins

[Jenkins](https://jenkins.io) is widely recognized as the most feature-rich CI available with easy configuration, continuous delivery and continuous integration support, easily test, build and stage your app, and more. It supports multiple SCM tools including CVS, Subversion and Git. It can execute Apache Ant and Apache Maven-based projects as well as arbitrary scripts.

## TL;DR;

```console
$ helm install bitnami/jenkins
```

## Introduction

This chart bootstraps a [Jenkins](https://github.com/bitnami/bitnami-docker-jenkins) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/jenkins
```

The command deploys Jenkins on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Jenkins chart and their default values.

| Parameter                  | Description                            | Default                                                  |
| -------------------------- | -------------------------------------- | -------------------------------------------------------- |
| `image.registry`           | Jenkins image registry                 | `docker.io`                                              |
| `image.repository`         | Jenkins Image name                     | `bitnami/jenkins`                                        |
| `image.tag`                | Jenkins Image tag                      | `{VERSION}`                                              |
| `image.pullPolicy`         | Jenkins image pull policy              | `Always` if `imageTag` is `latest`, else `IfNotPresent`  |
| `image.pullSecrets`        | Specify image pull secrets             | `nil` (does not add image pull secrets to deployed pods) |
| `jenkinsUser`              | User of the application                | `user`                                                   |
| `jenkinsPassword`          | Application password                   | _random 10 character alphanumeric string_                |
| `serviceType`              | Kubernetes Service type                | `LoadBalancer`                                           |
| `persistence.enabled`      | Enable persistence using PVC           | `true`                                                   |
| `persistence.storageClass` | PVC Storage Class for Jenkins volume   | `nil` (uses alpha storage class annotation)              |
| `persistence.accessMode`   | PVC Access Mode for Jenkins volume     | `ReadWriteOnce`                                          |
| `persistence.size`         | PVC Storage Request for Jenkins volume | `8Gi`                                                    |
| `resources`                | CPU/Memory resource requests/limits    | Memory: `512Mi`, CPU: `300m`                             |

The above parameters map to the env variables defined in [bitnami/jenkins](http://github.com/bitnami/bitnami-docker-jenkins). For more information please refer to the [bitnami/jenkins](http://github.com/bitnami/bitnami-docker-jenkins) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set jenkinsUsername=admin,jenkinsPassword=password \
    bitnami/jenkins
```

The above command sets the Jenkins administrator account username and password to `admin` and `password` respectively.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/jenkins
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Jenkins](https://github.com/bitnami/bitnami-docker-jenkins) image stores the Jenkins data and configurations at the `/bitnami/jenkins` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
