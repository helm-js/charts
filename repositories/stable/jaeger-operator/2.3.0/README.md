# `@helm-charts/stable-jaeger-operator`

jaeger-operator Helm chart for Kubernetes

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | stable          |
| Chart Name          | jaeger-operator |
| Chart Version       | 2.3.0           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for jaeger-operator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: jaegertracing/jaeger-operator
  tag: 1.10.0
  pullPolicy: IfNotPresent

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

resources:
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# jaeger-operator

[jaeger-operator](https://github.com/jaegertracing/jaeger-operator) is a Kubernetes operator.

## Install

```console
$ helm install stable/jaeger-operator
```

## Introduction

This chart bootstraps a jaeger-operator deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/jaeger-operator
```

The command deploys jaeger-operator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the jaeger-operator chart and their default values.

| Parameter               | Description                                                                                                 | Default                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `image.repository`      | Controller container image repository                                                                       | `jaegertracing/jaeger-operator` |
| `image.tag`             | Controller container image tag                                                                              | `1.10.0`                        |
| `image.pullPolicy`      | Controller container image pull policy                                                                      | `IfNotPresent`                  |
| `rbac.create`           | All required roles and rolebindings will be created                                                         | `true`                          |
| `serviceAccount.create` | Service account to use                                                                                      | `true`                          |
| `serviceAccount.name`   | Service account name to use. If not set and create is true, a name is generated using the fullname template | ``                              |
| `resources`             | K8s pod resorces                                                                                            | `None`                          |
| `nodeSelector`          | Node labels for pod assignment                                                                              | `{}`                            |
| `tolerations`           | Toleration labels for pod assignment                                                                        | `[]`                            |
| `affinity`              | Affinity settings for pod assignment                                                                        | `{}`                            |

Specify each parameter you'd like to override using a YAML file as described above in the [installation](#installing-the-chart) section.

You can also specify any non-array parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/jaeger-operator --name my-release \
    --set rbac.create=false
```

## After the Helm Installation

### Creating a new Jaeger instance

The simplest possible way to install is by creating a YAML file like the following:

```YAML
apiVersion: io.jaegertracing/v1alpha1
kind: Jaeger
metadata:
  name: simplest
```

The YAML file can then be used with `kubectl`:

```console
$ kubectl apply -f simplest.yaml
```

### Creating a new Jaeger with ElasticSearch

To do that you need to have an ElasticSearch installed in your Kubernetes cluster or install one using the [Helm Chart](https://github.com/helm/charts/tree/master/incubator/elasticsearch) available for that.

After that just deploy the following manifest:

```YAML
# setup an elasticsearch with `make es`
apiVersion: io.jaegertracing/v1alpha1
kind: Jaeger
metadata:
  name: simple-prod
spec:
  strategy: production
  storage:
    type: elasticsearch
    options:
      es:
        server-urls: http://elasticsearch:9200
        username: elastic
        password: changeme
```

The YAML file can then be used with `kubectl`:

```console
$ kubectl apply -f simple-prod.yaml
```
