# Fluentd Elasticsearch

-   Installs [Fluentd](https://www.fluentd.org/) log forwarder.

## TL;DR;

```console
$ helm install kiwigrid/fluentd-elasticsearch
```

## Introduction

This chart bootstraps a [Fluentd](https://www.fluentd.org/) daemonset on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.
It's meant to be a drop in replacement for fluentd-gcp on GKE which sends logs to Google's Stackdriver service, but can also be used in other places where logging to ElasticSearch is required.
The used Docker image also contains Google's detect exceptions (for Java multiline stacktraces), Prometheus exporter, Kubernetes metadata filter & Systemd plugins.

## Prerequisites

-   Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release kiwigrid/fluentd-elasticsearch
```

The command deploys fluentd-elasticsearch on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Fluentd elasticsearch chart and their default values.

| Parameter                            | Description                                                                    | Default                                |
| ------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------- |
| `affinity`                           | Optional daemonset affinity                                                    | `{}`                                   |
| `annotations`                        | Optional daemonset annotations                                                 | `NULL`                                 |
| `podAnnotations`                     | Optional daemonset's pods annotations                                          | `NULL`                                 |
| `configMaps`                         | Fluentd configmaps                                                             | `default conf files`                   |
| `elasticsearch.host`                 | Elasticsearch Host                                                             | `elasticsearch-client`                 |
| `elasticsearch.port`                 | Elasticsearch Port                                                             | `9200`                                 |
| `elasticsearch.user`                 | Elasticsearch Auth User                                                        | `""`                                   |
| `elasticsearch.password`             | Elasticsearch Auth Password                                                    | `""`                                   |
| `elasticsearch.logstash_prefix`      | Elasticsearch Logstash prefix                                                  | `logstash`                             |
| `elasticsearch.buffer_chunk_limit`   | Elasticsearch buffer chunk limit                                               | `2M`                                   |
| `elasticsearch.buffer_queue_limit`   | Elasticsearch buffer queue limit                                               | `8`                                    |
| `elasticsearch.scheme`               | Elasticsearch scheme setting                                                   | `http`                                 |
| `env`                                | List of env vars that are added to the fluentd pods                            | `{}`                                   |
| `secret`                             | List of env vars that are set from secrets and added to the fluentd pods       | `[]`                                   |
| `extraVolumeMounts`                  | Mount extra volume, required to mount ssl certificates when ES has tls enabled |                                        |
| `extraVolume`                        | Extra volume                                                                   |                                        |
| `image.repository`                   | Image                                                                          | `gcr.io/fluentd-elasticsearch/fluentd` |
| `image.tag`                          | Image tag                                                                      | `v2.5.0`                               |
| `image.pullPolicy`                   | Image pull policy                                                              | `IfNotPresent`                         |
| `image.pullSecrets`                  | Image pull secrets                                                             |                                        |
| `livenessProbe.enabled`              | Whether to enable livenessProbe                                                | `true`                                 |
| `nodeSelector`                       | Optional daemonset nodeSelector                                                | `{}`                                   |
| `podSecurityPolicy.annotations`      | Specify pod annotations in the pod security policy                             | `{}`                                   |
| `podSecurityPolicy.enabled`          | Specify if a pod security policy must be created                               | `false`                                |
| `priorityClassName`                  | Optional PriorityClass for pods                                                | `""`                                   |
| `prometheusRule`                     | Whether to enable Prometheus prometheusRule                                    | `false`                                |
| `prometheusRule.prometheusNamespace` | Namespace for prometheusRule                                                   | `monitoring`                           |
| `prometheusRule.labels`              | Optional labels for prometheusRule                                             | `{}`                                   |
| `rbac.create`                        | RBAC                                                                           | `true`                                 |
| `resources.limits.cpu`               | CPU limit                                                                      | `100m`                                 |
| `resources.limits.memory`            | Memory limit                                                                   | `500Mi`                                |
| `resources.requests.cpu`             | CPU request                                                                    | `100m`                                 |
| `resources.requests.memory`          | Memory request                                                                 | `200Mi`                                |
| `service`                            | Service definition                                                             | `{}`                                   |
| `service.type`                       | Service type (ClusterIP/NodePort)                                              | Not Set                                |
| `service.ports`                      | List of service ports dict [{name:...}...]                                     | Not Set                                |
| `service.ports[].name`               | One of service ports name                                                      | Not Set                                |
| `service.ports[].port`               | Service port                                                                   | Not Set                                |
| `service.ports[].nodePort`           | NodePort port (when service.type is NodePort)                                  | Not Set                                |
| `service.ports[].protocol`           | Service protocol(optional, can be TCP/UDP)                                     | Not Set                                |
| `serviceAccount.create`              | Specifies whether a service account should be created.                         | `true`                                 |
| `serviceAccount.name`                | Name of the service account.                                                   |                                        |
| `serviceMonitor.enabled`             | Whether to enable Prometheus serviceMonitor                                    | `false`                                |
| `serviceMonitor.interval`            | Interval at which metrics should be scraped                                    | `10s`                                  |
| `serviceMonitor.path`                | Path for Metrics                                                               | `/metrics`                             |
| `serviceMonitor.labels`              | Optional labels for serviceMonitor                                             | `{}`                                   |
| `tolerations`                        | Optional daemonset tolerations                                                 | `{}`                                   |
| `updateStrategy`                     | Optional daemonset update strategy                                             | `type: RollingUpdate`                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release kiwigrid/fluentd-elasticsearch
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml kiwigrid/fluentd-elasticsearch
```

## Upgrading

When you upgrade this chart from a version &lt; 2.0.0 you have to add the "--force" parameter to your helm upgrade command as there have been changes to the lables which makes a normal upgrade impossible.
