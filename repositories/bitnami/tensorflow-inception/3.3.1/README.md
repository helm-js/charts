# `@helm-charts/bitnami-tensorflow-inception`

Open-source software library for serving machine learning models

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | bitnami              |
| Chart Name          | tensorflow-inception |
| Chart Version       | 3.3.1                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image parameters
## Please, note that this will override the image parameters, including dependencies, configured to use the global value
## Current available global Docker image parameters: imageRegistry and imagePullSecrets
##
# global:
#   imageRegistry: myRegistryName
#   imagePullSecrets:
#     - myRegistryKeySecretName

replicaCount: 1

## TensorFlow Serving server image version
## ref: https://hub.docker.com/r/bitnami/tensorflow-serving/tags/
##
server:
  image:
    registry: docker.io
    repository: bitnami/tensorflow-serving
    tag: 1.13.0
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
    #   - myRegistryKeySecretName
  port: 8500

## TensorFlow Inception image version
## ref: https://hub.docker.com/r/bitnami/tensorflow-inception/tags/
##
client:
  image:
    registry: docker.io
    repository: bitnami/tensorflow-inception
    tag: 1.11.1
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
    #   - myRegistryKeySecretName

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Tensorflow Serving Pod Security Context
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
##
securityContext:
  enabled: true
  fsGroup: 1001
  runAsUser: 1001

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
serviceType: LoadBalancer

## Pod annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
##
podAnnotations: {}

## Prometheus Exporter / Metrics
##
metrics:
  enabled: false
  image:
    registry: docker.io
    repository: ynqa/tensorflow-serving-exporter
    tag: latest
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistryKeySecretName
  ## Metrics exporter pod Annotation and Labels
  podAnnotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9118'
    ## Metrics exporter resource requests and limits
    ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
    ##
  # resources: {}
```

</details>

---

# TensorFlow Serving Inception v3

TensorFlow Serving is an open-source software library for serving machine learning models. This chart will specifically serve the Inception v3 model with already trained data.

## TL;DR;

```console
$ helm install bitnami/tensorflow-inception
```

## Introduction

This chart bootstraps a TensorFlow Serving Inception v3 pod on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters. This Helm chart has been tested on top of [Bitnami Kubernetes Production Runtime](https://kubeprod.io/) (BKPR). Deploy BKPR to get automated TLS certificates, logging and monitoring for your applications.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Get this chart

Download the latest release of the chart from the [releases](../../../releases) page.

Alternatively, clone the repo if you wish to use the development snapshot:

```console
$ git clone https://github.com/bitnami/charts.git
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/tensorflow-inception
```

The command deploys Tensorflow Serving Inception v3 model on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

You can check your releases with:

```console
$ helm list
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the TensorFlow Inception chart and their default values.

| Parameter                   | Description                                      | Default                                                      |
| --------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `global.imageRegistry`      | Global Docker image registry                     | `nil`                                                        |
| `global.imagePullSecrets`   | Global Docker registry secret names as an array  | `[]` (does not add image pull secrets to deployed pods)      |
| `replicaCount`              | desired number of pods                           | `1`                                                          |
| `server.image.registry`     | TensorFlow Serving image registry                | `docker.io`                                                  |
| `server.image.repository`   | TensorFlow Serving Image name                    | `bitnami/tensorflow-serving`                                 |
| `server.image.tag`          | TensorFlow Serving Image tag                     | `{VERSION}`                                                  |
| `server.image.pullPolicy`   | TensorFlow Serving image pull policy             | `Always` if `imageTag` is `latest`, else `IfNotPresent`      |
| `server.image.pullSecrets`  | Specify docker-registry secret names as an array | `[]` (does not add image pull secrets to deployed pods)      |
| `server.port`               | Tensorflow server port                           | `8500`                                                       |
| `client.image.registry`     | TensorFlow Inception image registry              | `docker.io`                                                  |
| `client.image.repository`   | TensorFlow Inception Image name                  | `bitnami/tensorflow-inception`                               |
| `client.image.tag`          | TensorFlow Inception Image tag                   | `{VERSION}`                                                  |
| `client.image.pullPolicy`   | TensorFlow Inception image pull policy           | `Always` if `imageTag` is `latest`, else `IfNotPresent`      |
| `client.image.pullSecrets`  | Specify docker-registry secret names as an array | `[]` (does not add image pull secrets to deployed pods)      |
| `securityContext.enabled`   | Enable security context for TensorFlow Serving   | `true`                                                       |
| `securityContext.fsGroup`   | Group ID for TensorFlow Serving container        | `1001`                                                       |
| `securityContext.runAsUser` | User ID for TensorFlow Serving container         | `1001`                                                       |
| `imagePullPolicy`           | Image pull policy                                | `Always` if `image` tag is `latest`, else `IfNotPresent`     |
| `podAnnotations`            | Pod annotations                                  | `{}`                                                         |
| `metrics.enabled`           | Start a side-car Tensorflow prometheus exporter  | `false`                                                      |
| `metrics.image.registry`    | Tensorflow exporter image registry               | `docker.io`                                                  |
| `metrics.image.repository`  | Tensorflow exporter image name                   | `ynqa/tensorflow-serving-exporter`                           |
| `metrics.image.tag`         | Tensorflow exporter image tag                    | `latest`                                                     |
| `metrics.image.pullPolicy`  | Image pull policy                                | `IfNotPresent`                                               |
| `metrics.image.pullSecrets` | Specify docker-registry secret names as an array | `[]` (does not add image pull secrets to deployed pods)      |
| `metrics.podAnnotations`    | Additional annotations for Metrics exporter pod  | `{prometheus.io/scrape: "true", prometheus.io/port: "9118"}` |
| `metrics.resources`         | Exporter resource requests/limit                 | Memory: `256Mi`, CPU: `100m`                                 |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release bitnami/tensorflow-inception --set imagePullPolicy=Always
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/tensorflow-inception
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Upgrading

### To 3.2.0

Tensorflow Serving container was moved to a non-root approach. There shouldn't be any issue when upgrading since the corresponding `securityContext` is enabled by default. Both container image and chart can be upgraded by running the command below:

```
$ helm upgrade my-release stable/tensorflow-inception
```

If you use a previous container image (previous to **1.12.0-r34**), disable the `securityContext` by running the command below:

```
$ helm upgrade my-release stable/tensorflow-inception --set securityContext.enabled=fase,server.image.tag=XXX
```

### To 1.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 1.0.0. The following example assumes that the release name is tensorflow-inception:

```console
$ kubectl patch deployment tensorflow-inception --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
```
