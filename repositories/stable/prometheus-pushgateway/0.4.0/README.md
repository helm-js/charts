# `@helm-charts/stable-prometheus-pushgateway`

A Helm chart for prometheus pushgateway

| Field               | Value                  |
| ------------------- | ---------------------- |
| Repository Name     | stable                 |
| Chart Name          | prometheus-pushgateway |
| Chart Version       | 0.4.0                  |
| NPM Package Version | 0.1.0                  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for prometheus-pushgateway.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: prom/pushgateway
  tag: v0.8.0
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 9091
  targetPort: 9091

# Optional pod annotations
podAnnotations: {}

# Optional pod labels
podLabels: {}

# Optional service labels
serviceLabels: {}

# Optional serviceAccount labels
serviceAccountLabels: {}

# Optional additional arguments
extraArgs: []

# Optional additional environment variables
extraVars: []

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 200m
  #    memory: 50Mi
  # requests:
  #   cpu: 100m
  #   memory: 30Mi

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

## Configure ingress resource that allow you to access the
## pushgateway installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Enable Ingress.
  ##
  enabled:
    false
    ## Annotations.
    ##
    # annotations:
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'
    ## Hostnames.
    ## Must be provided if Ingress is enabled.
    ##
    # hosts:
    #   - pushgateway.domain.com
    ## TLS configuration.
    ## Secrets must be manually created in the namespace.
    ##
    # tls:
    #   - secretName: pushgateway-tls
    #     hosts:
    #       - pushgateway.domain.com

tolerations:
  {}
  # - effect: NoSchedule
  #   operator: Exists

## Node labels for pushgateway pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

replicaCount: 1

## Affinity for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
affinity: {}

# Enable this if you're using https://github.com/coreos/prometheus-operator
serviceMonitor:
  enabled: false
  namespace: monitoring
  # fallback to the prometheus default unless specified
  # interval: 10s
  ## Defaults to what's used if you follow CoreOS [Prometheus Install Instructions](https://github.com/helm/charts/tree/master/stable/prometheus-operator#tldr)
  ## [Prometheus Selector Label](https://github.com/helm/charts/tree/master/stable/prometheus-operator#prometheus-operator-1)
  ## [Kube Prometheus Selector Label](https://github.com/helm/charts/tree/master/stable/prometheus-operator#exporters)
  selector:
    prometheus: kube-prometheus
  # Retain the job and instance labels of the metrics pushed to the Pushgateway
  # [Scraping Pushgateway](https://github.com/prometheus/pushgateway#configure-the-pushgateway-as-a-target-to-scrape)
  honorLabels: true
```

</details>

---

# Prometheus Pushgateway

- Installs prometheus [pushgateway](https://github.com/prometheus/pushgateway)

## TL;DR;

```console
$ helm install stable/prometheus-pushgateway
```

## Introduction

This chart bootstraps a prometheus [pushgateway](http://github.com/prometheus/pushgateway) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

An optional prometheus `ServiceMonitor` can be enabled, should you wish to use this gateway with a [Prometheus Operator](https://github.com/coreos/prometheus-operator).

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/prometheus-pushgateway
```

The command deploys pushgateway on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the pushgateway chart and their default values.

| Parameter                    | Description                                                                                                                   | Default                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `affinity`                   | Affinity settings for pod assignment                                                                                          | `{}`                              |
| `extraArgs`                  | Optional flags for pushgateway                                                                                                | `[]`                              |
| `extraVars`                  | Optional environment variables for pushgateway                                                                                | `[]`                              |
| `image.repository`           | Image repository                                                                                                              | `prom/pushgateway`                |
| `image.tag`                  | Image tag                                                                                                                     | `v0.8.0`                          |
| `image.pullPolicy`           | Image pull policy                                                                                                             | `IfNotPresent`                    |
| `ingress.enabled`            | Enables Ingress for pushgateway                                                                                               | `false`                           |
| `ingress.annotations`        | Ingress annotations                                                                                                           | `{}`                              |
| `ingress.hosts`              | Ingress accepted hostnames                                                                                                    | `nil`                             |
| `ingress.tls`                | Ingress TLS configuration                                                                                                     | `[]`                              |
| `resources`                  | CPU/Memory resource requests/limits                                                                                           | `{}`                              |
| `replicaCount`               | Number of replicas                                                                                                            | `1`                               |
| `service.type`               | Service type                                                                                                                  | `ClusterIP`                       |
| `service.port`               | The service port                                                                                                              | `9091`                            |
| `service.targetPort`         | The target port of the container                                                                                              | `9091`                            |
| `serviceLabels`              | Labels for service                                                                                                            | `{}`                              |
| `serviceAccount.create`      | Specifies whether a service account should be created.                                                                        | `true`                            |
| `serviceAccount.name`        | Service account to be used. If not set and `serviceAccount.create` is `true`, a name is generated using the fullname template |                                   |
| `tolerations`                | List of node taints to tolerate                                                                                               | `{}`                              |
| `nodeSelector`               | Node labels for pod assignment                                                                                                | `{}`                              |
| `podAnnotations`             | Annotations for pod                                                                                                           | `{}`                              |
| `podLabels`                  | Labels for pod                                                                                                                | `{}`                              |
| `serviceAccountLabels`       | Labels for service account                                                                                                    | `{}`                              |
| `serviceMonitor.enabled`     | if `true`, creates a Prometheus Operator ServiceMonitor (also requires `metrics.enabled` to be `true`)                        | `false`                           |
| `serviceMonitor.namespace`   | Namespace which Prometheus is running in                                                                                      | `monitoring`                      |
| `serviceMonitor.interval`    | How frequently to scrape metrics (use by default, falling back to Prometheus' default)                                        | `nil`                             |
| `serviceMonitor.selector`    | Default to kube-prometheus install (CoreOS recommended), but should be set according to Prometheus install                    | `{ prometheus: kube-prometheus }` |
| `serviceMonitor.honorLabels` | if `true`, label conflicts are resolved by keeping label values from the scraped data                                         | `true`                            |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set serviceAccount.name=pushgateway  \
    stable/prometheus-pushgateway
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/prometheus-pushgateway
```
