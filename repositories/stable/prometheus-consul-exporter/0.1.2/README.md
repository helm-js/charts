# `@helm-charts/stable-prometheus-consul-exporter`

A Helm chart for the Prometheus Consul Exporter

| Field               | Value                      |
| ------------------- | -------------------------- |
| Repository Name     | stable                     |
| Chart Name          | prometheus-consul-exporter |
| Chart Version       | 0.1.2                      |
| NPM Package Version | 0.1.0                      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for consul-exporter.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

rbac:
  # Specifies whether RBAC resources should be created
  create: true
  pspEnabled: true
serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

image:
  repository: prom/consul-exporter
  tag: v0.4.0
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

# Add your consul server details here
consulServer: host:port

# Flags - for a list visit https://github.com/prometheus/consul_exporter#flags
options: {}

service:
  type: ClusterIP
  port: 9107
  annotations: {}

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
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

# Consul Exporter

Prometheus exporter for Consul metrics.
Learn more: https://github.com/prometheus/consul_exporter

## TL:DR

```bash
$ helm install stable/consul-exporter
```

```bash
$ helm install stable/consul-exporter --set consulServer=my.consul.com:8500
```

## Introduction

This chart creates a Consul-Exporter deployment on a
[Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/consul-exporter
```

```bash
$ helm install --name my-release stable/consul-exporter --set consulServer=my.consul.com --set consulPort=8500
```

The command deploys Consul-Exporter on the Kubernetes cluster using the
default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

Check the [Flags](https://github.com/prometheus/consul_exporter#flags) list and add to the options block in your value overrides.

Specify each parameter using the `--set key=value[,key=value]` argument to
`helm install`. For example,

```bash
$ helm install --name my-release \
    --set key_1=value_1,key_2=value_2 \
    stable/consul-exporter
```

Alternatively, a YAML file that specifies the values for the parameters can be
provided while installing the chart. For example,

```bash
# example for staging
$ helm install --name my-release -f values.yaml stable/consul-exporter
```
