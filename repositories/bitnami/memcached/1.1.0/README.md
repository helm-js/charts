# `@helm-charts/bitnami-memcached`

Chart for Memcached

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | bitnami   |
| Chart Name          | memcached |
| Chart Version       | 1.1.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Memcached image version
## ref: https://hub.docker.com/r/bitnami/memcached/tags/
##
image:
  registry: docker.io
  repository: bitnami/memcached
  tag: 1.5.11-debian-9
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

## Pod Security Context
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Memcached admin user
## ref: https://github.com/bitnami/bitnami-docker-memcached#creating-the-memcached-admin-user
##
# memcachedUsername:

## Memcached admin password
## ref: https://github.com/bitnami/bitnami-docker-memcached#creating-the-memcached-admin-user
##
# memcachedPassword:

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
serviceType: ClusterIP

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 250m
```

</details>

---

# Memcached

> [Memcached](https://memcached.org/) is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.

## TL;DR;

```console
$ helm install bitnami/memcached
```

## Introduction

This chart bootstraps a [Memcached](https://github.com/bitnami/bitnami-docker-memcached) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/memcached
```

The command deploys Memcached on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Memcached chart and their default values.

| Parameter                   | Description                         | Default                                                  |
| --------------------------- | ----------------------------------- | -------------------------------------------------------- |
| `image.registry`            | Memcached image registry            | `docker.io`                                              |
| `image.repository`          | Memcached Image name                | `bitnami/memcached`                                      |
| `image.tag`                 | Memcached Image tag                 | `{VERSION}`                                              |
| `image.pullPolicy`          | Memcached image pull policy         | `Always` if `imageTag` is `latest`, else `IfNotPresent`  |
| `image.pullSecrets`         | Specify image pull secrets          | `nil` (does not add image pull secrets to deployed pods) |
| `securityContext.enabled`   | Enable security context             | `true`                                                   |
| `securityContext.fsGroup`   | Group ID for the container          | `1001`                                                   |
| `securityContext.runAsUser` | User ID for the container           | `1001`                                                   |
| `memcachedUsername`         | Memcached admin user                | `nil`                                                    |
| `memcachedPassword`         | Memcached admin password            | `nil`                                                    |
| `serviceType`               | Kubernetes Service type             | `ClusterIP`                                              |
| `resources`                 | CPU/Memory resource requests/limits | Memory: `256Mi`, CPU: `250m`                             |

The above parameters map to the env variables defined in [bitnami/memcached](http://github.com/bitnami/bitnami-docker-memcached). For more information please refer to the [bitnami/memcached](http://github.com/bitnami/bitnami-docker-memcached) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release --set memcachedUser=user,memcachedPassword=password bitnami/memcached
```

The above command sets the Memcached admin account username and password to `user` and `password` respectively.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/memcached
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Upgrading

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 1.0.0. The following example assumes that the release name is memcached:

```console
$ kubectl patch deployment memcached --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
