# `@helm-charts/flagger-flagger`

Flagger is a Kubernetes operator that automates the promotion of canary deployments using Istio routing for traffic shifting and Prometheus metrics for canary analysis.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | flagger |
| Chart Name          | flagger |
| Chart Version       | 0.1.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for flagger.

image:
  repository: quay.io/stefanprodan/flagger
  tag: 0.1.0
  pullPolicy: IfNotPresent

controlLoopInterval: '10s'
metricsServer: 'http://prometheus.istio-system.svc.cluster.local:9090'

slack:
  user: flagger
  channel:
  # incoming webhook https://api.slack.com/incoming-webhooks
  url:

crd:
  create: true

rbac:
  create: true

nameOverride: ''
fullnameOverride: ''

resources:
  limits:
    memory: '512Mi'
    cpu: '1000m'
  requests:
    memory: '32Mi'
    cpu: '10m'

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Flagger

[Flagger](https://flagger.app) is a Kubernetes operator that automates the promotion of canary deployments
using Istio routing for traffic shifting and Prometheus metrics for canary analysis.

## Installing the Chart

Add Flagger Hel repository:

```console
helm repo add flagger https://flagger.app
```

To install the chart with the release name `flagger`:

```console
$ helm install --name flagger --namespace istio-system flagger/flagger
```

The command deploys Flagger on the Kubernetes cluster in the istio-system namespace.
The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `flagger` deployment:

```console
$ helm delete --purge flagger
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Flagger chart and their default values.

| Parameter                   | Description                              | Default                               |
| --------------------------- | ---------------------------------------- | ------------------------------------- |
| `image.repository`          | image repository                         | `quay.io/stefanprodan/flagger`        |
| `image.tag`                 | image tag                                | `<VERSION>`                           |
| `image.pullPolicy`          | image pull policy                        | `IfNotPresent`                        |
| `controlLoopInterval`       | wait interval between checks             | `10s`                                 |
| `metricsServer`             | Prometheus URL                           | `http://prometheus.istio-system:9090` |
| `slack.url`                 | Slack incoming webhook                   | None                                  |
| `slack.channel`             | Slack channel                            | None                                  |
| `slack.user`                | Slack username                           | `flagger`                             |
| `rbac.create`               | if `true`, create and use RBAC resources | `true`                                |
| `crd.create`                | if `true`, create Flagger's CRDs         | `true`                                |
| `resources.requests/cpu`    | pod CPU request                          | `10m`                                 |
| `resources.requests/memory` | pod memory request                       | `32Mi`                                |
| `resources.limits/cpu`      | pod CPU limit                            | `1000m`                               |
| `resources.limits/memory`   | pod memory limit                         | `512Mi`                               |
| `affinity`                  | node/pod affinities                      | None                                  |
| `nodeSelector`              | node labels for pod assignment           | `{}`                                  |
| `tolerations`               | list of node taints to tolerate          | `[]`                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm upgrade`. For example,

```console
$ helm upgrade -i flagger flagger/flagger \
  --namespace istio-system \
  --set controlLoopInterval=1m
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm upgrade -i flagger flagger/flagger \
  --namespace istio-system \
  -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)

```

```
