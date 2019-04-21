# `@helm-charts/flagger-loadtester`

Flagger's load testing services based on rakyll/hey that generates traffic during canary analysis when configured as a webhook.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | flagger    |
| Chart Name          | loadtester |
| Chart Version       | 0.1.0      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1

image:
  repository: quay.io/stefanprodan/flagger-loadtester
  tag: 0.1.0
  pullPolicy: IfNotPresent

logLevel: info
cmd:
  logOutput: true
  timeout: 1h

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 80

resources:
  requests:
    cpu: 10m
    memory: 64Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# Flagger load testing service

[Flagger's](https://github.com/stefanprodan/flagger) load testing service is based on
[rakyll/hey](https://github.com/rakyll/hey)
and can be used to generates traffic during canary analysis when configured as a webhook.

## Prerequisites

- Kubernetes >= 1.11
- Istio >= 1.0

## Installing the Chart

Add Flagger Helm repository:

```console
helm repo add flagger https://flagger.app
```

To install the chart with the release name `flagger-loadtester`:

```console
helm upgrade -i flagger-loadtester flagger/loadtester
```

The command deploys Grafana on the Kubernetes cluster in the default namespace.

> **Tip**: Note that the namespace where you deploy the load tester should have the Istio sidecar injection enabled

The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `flagger-loadtester` deployment:

```console
helm delete --purge flagger-loadtester
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the load tester chart and their default values.

| Parameter                   | Description                                           | Default                                   |
| --------------------------- | ----------------------------------------------------- | ----------------------------------------- |
| `image.repository`          | Image repository                                      | `quay.io/stefanprodan/flagger-loadtester` |
| `image.pullPolicy`          | Image pull policy                                     | `IfNotPresent`                            |
| `image.tag`                 | Image tag                                             | `<VERSION>`                               |
| `replicaCount`              | desired number of pods                                | `1`                                       |
| `resources.requests.cpu`    | CPU requests                                          | `10m`                                     |
| `resources.requests.memory` | memory requests                                       | `64Mi`                                    |
| `tolerations`               | List of node taints to tolerate                       | `[]`                                      |
| `affinity`                  | node/pod affinities                                   | `node`                                    |
| `nodeSelector`              | node labels for pod assignment                        | `{}`                                      |
| `service.type`              | type of service                                       | `ClusterIP`                               |
| `service.port`              | ClusterIP port                                        | `80`                                      |
| `cmd.logOutput`             | Log the command output to stderr                      | `true`                                    |
| `cmd.timeout`               | Command execution timeout                             | `1h`                                      |
| `logLevel`                  | Log level can be debug, info, warning, error or panic | `info`                                    |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
helm install flagger/loadtester --name flagger-loadtester \
--set cmd.logOutput=false
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
helm install flagger/loadtester --name flagger-loadtester -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
