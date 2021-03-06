# `@helm-charts/stable-kubernetes-dashboard`

General-purpose web UI for Kubernetes clusters

| Field               | Value                |
| ------------------- | -------------------- |
| Repository Name     | stable               |
| Chart Name          | kubernetes-dashboard |
| Chart Version       | 0.5.3                |
| NPM Package Version | 0.1.0                |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kubernetes-dashboard
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

image:
  repository: k8s.gcr.io/kubernetes-dashboard-amd64
  tag: v1.8.1
  pullPolicy: IfNotPresent

## Here labels can be added to the kubernets dashboard deployment
##
labels: {}
# kubernetes.io/cluster-service: "true"
# kubernetes.io/name: "Kuberetes Dashboard"

## Additional container arguments
##
# extraArgs:
#   - --enable-insecure-login
#   - --system-banner="Welcome to Kubernetes"

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

service:
  type: ClusterIP
  externalPort: 80

  ## This allows an overide of the heapster service name
  ## Default: {{ .Chart.Name }}
  ##
  # nameOverride:

  ## Kubernetes Dashboard Service annotations
  ##
  annotations: {}
  # foo.io/bar: "true"

  ## Here labels can be added to the Kubernetes Dashboard service
  ##
  labels: {}
  # kubernetes.io/name: "Kubernetes Dashboard"

resources:
  limits:
    cpu: 100m
    memory: 50Mi
  requests:
    cpu: 100m
    memory: 50Mi

ingress:
  ## If true, Kubernetes Dashboard Ingress will be created.
  ##
  enabled: false

  ## Kubernetes Dashboard Ingress annotations
  ##
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: 'true'
  ## Kubernetes Dashboard Ingress hostnames
  ## Must be provided if Ingress is enabled
  ##
  # hosts:
  #   - kubernetes-dashboard.domain.com
  ## Kubernetes Dashboard Ingress TLS configuration
  ## Secrets must be manually created in the namespace
  ##
  # tls:
  #   - secretName: kubernetes-dashboard-tls
  #     hosts:
  #       - kubernetes-dashboard.domain.com

rbac:
  ## If true, create & use RBAC resources
  #
  create: false

  ## Ignored if rbac.create is true
  #
  serviceAccountName: default
```

</details>

---

# kubernetes-dashboard

[Kubernetes Dashboard](https://github.com/kubernetes/dashboard) is a general purpose, web-based UI for Kubernetes clusters. It allows users to manage applications running in the cluster and troubleshoot them, as well as manage the cluster itself.

## TL;DR;

```console
$ helm install stable/kubernetes-dashboard
```

## Introduction

This chart bootstraps a [Kubernetes Dashboard](https://github.com/kubernetes/dashboard) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/kubernetes-dashboard --name my-release
```

The command deploys kubernetes-dashboard on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the kubernetes-dashboard chart and their default values.

| Parameter                 | Description                                                                | Default                                                                  |
| ------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `image.repository`        | Repository for container image                                             | `gcr.io/google_containers/kubernetes-dashboard-amd64`                    |
| `image.tag`               | Image tag                                                                  | `v1.8.1`                                                                 |
| `image.pullPolicy`        | Image pull policy                                                          | `IfNotPresent`                                                           |
| `extraArgs`               | Additional container arguments                                             | `[]`                                                                     |
| `nodeSelector`            | node labels for pod assignment                                             | `{}`                                                                     |
| `service.externalPort`    | Dashboard internal port                                                    | 80                                                                       |
| `service.internalPort`    | Dashboard external port                                                    | 80                                                                       |
| `ingress.annotations`     | Specify ingress class                                                      | `kubernetes.io/ingress.class: nginx`                                     |
| `ingress.enabled`         | Enable ingress controller resource                                         | `false`                                                                  |
| `ingress.hosts`           | Dashboard Hostnames                                                        | `nil`                                                                    |
| `ingress.tls`             | Ingress TLS configuration                                                  | `[]`                                                                     |
| `resources`               | Pod resource requests & limits                                             | `limits: {cpu: 100m, memory: 50Mi}, requests: {cpu: 100m, memory: 50Mi}` |
| `rbac.create`             | Create & use RBAC resources                                                | `false`                                                                  |
| `rbac.serviceAccountName` | ServiceAccount kubernetes-dashboard will use (ignored if rbac.create=true) | `default`                                                                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/kubernetes-dashboard --name my-release \
  --set=service.externalPort=8080,resources.limits.cpu=200m
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install stable/kubernetes-dashboard --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
