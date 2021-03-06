# `@helm-charts/stable-node-problem-detector`

Installs the node-problem-detector daemonset for monitoring extra attributes on nodes

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | stable                |
| Chart Name          | node-problem-detector |
| Chart Version       | 1.1.2                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
settings:
  log_monitors:
    - kernel-monitor.json
    - docker-monitor.json

hostpath:
  logdir: /var/log/

image:
  repository: k8s.gcr.io/node-problem-detector
  tag: v0.6.1
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

rbac:
  create: true

resources: {}

annotations: {}

tolerations: []

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

affinity: {}
```

</details>

---

# Kubernetes Node Problem Detector

This chart installs a [node-problem-detector](https://github.com/kubernetes/node-problem-detector) daemonset. This tool aims to make various node problems visible to the upstream layers in cluster management stack. It is a daemon which runs on each node, detects node problems and reports them to apiserver.

## TL;DR;

```console
$ helm install stable/node-problem-detector
```

## Prerequisites

- Kubernetes 1.9+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release` and default configuration:

```console
$ helm install --name my-release stable/node-problem-detector
```

## Uninstalling the Chart

To delete the chart:

```console
$ helm delete my-release
```

## Configuration

Custom System log monitor config files can be created, see [here](https://github.com/kubernetes/node-problem-detector/tree/master/config) for examples.

The following table lists the configurable parameters for this chart and their default values.

| Parameter               | Description                                | Default                                                      |
| ----------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| `affinity`              | Map of node/pod affinities                 | `{}`                                                         |
| `annotations`           | Optional daemonset annotations             | `{}`                                                         |
| `fullnameOverride`      | Override the fullname of the chart         | `nil`                                                        |
| `image.pullPolicy`      | Image pull policy                          | `IfNotPresent`                                               |
| `image.repository`      | Image                                      | `k8s.gcr.io/node-problem-detector`                           |
| `image.tag`             | Image tag                                  | `v0.6.1`                                                     |
| `nameOverride`          | Override the name of the chart             | `nil`                                                        |
| `rbac.create`           | RBAC                                       | `true`                                                       |
| `resources`             | Pod resource requests and limits           | `{}`                                                         |
| `settings.log_monitors` | System log monitor config files            | `/config/kernel-monitor.json`, `/config/docker-monitor.json` |
| `serviceAccount.create` | Whether a ServiceAccount should be created | `true`                                                       |
| `serviceAccount.name`   | Name of the ServiceAccount to create       | Generated value from template                                |
| `tolerations`           | Optional daemonset tolerations             | `[]`                                                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install` or provide a YAML file containing the values for the above parameters:

```console
$ helm install --name my-release stable/node-problem-detector --values values.yaml
```
