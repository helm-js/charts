# `@helm-charts/stable-fluentd`

A Fluentd Elasticsearch Helm chart for Kubernetes.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | fluentd |
| Chart Version       | 1.6.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for fluentd.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
image:
  repository: gcr.io/google-containers/fluentd-elasticsearch
  tag: v2.4.0
  pullPolicy: IfNotPresent
  # pullSecrets:
  #   - secret1
  #   - secret2

output:
  host: elasticsearch-client.default.svc.cluster.local
  port: 9200
  scheme: http
  sslVersion: TLSv1
  buffer_chunk_limit: 2M
  buffer_queue_limit: 8

env: {}

service:
  type: ClusterIP
  # type: nodePort:
  externalPort: 80
  ports:
    - name: 'monitor-agent'
      protocol: TCP
      containerPort: 24220

annotations: {}
#  prometheus.io/scrape: "true"
#  prometheus.io/port: "24231"

ingress:
  enabled: false
  # Used to create an Ingress and Service record.
  # hosts:
  #   - name: "http-input.local"
  #     protocol: TCP
  #     serviceName: http-input
  #     servicePort: 9880
  annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: http-input-tls
    #   hosts:
    #     - http-input.local

configMaps:
  general.conf: |
    # Prevent fluentd from handling records containing its own logs. Otherwise
    # it can lead to an infinite loop, when error in sending one message generates
    # another message which also fails to be sent and so on.
    <match fluentd.**>
      @type null
    </match>

    # Used for health checking
    <source>
      @type http
      port 9880
      bind 0.0.0.0
    </source>

    # Emits internal metrics to every minute, and also exposes them on port
    # 24220. Useful for determining if an output plugin is retryring/erroring,
    # or determining the buffer queue length.
    <source>
      @type monitor_agent
      bind 0.0.0.0
      port 24220
      tag fluentd.monitor.metrics
    </source>
  system.conf: |-
    <system>
      root_dir /tmp/fluentd-buffers/
    </system>
  forward-input.conf: |
    <source>
      @type forward
      port 24224
      bind 0.0.0.0
    </source>
  output.conf: |
    <match **>
      @id elasticsearch
      @type elasticsearch
      @log_level info
      include_tag_key true
      # Replace with the host/port to your Elasticsearch cluster.
      host "#{ENV['OUTPUT_HOST']}"
      port "#{ENV['OUTPUT_PORT']}"
      scheme "#{ENV['OUTPUT_SCHEME']}"
      ssl_version "#{ENV['OUTPUT_SSL_VERSION']}"
      logstash_format true
      <buffer>
        @type file
        path /var/log/fluentd-buffers/kubernetes.system.buffer
        flush_mode interval
        retry_type exponential_backoff
        flush_thread_count 2
        flush_interval 5s
        retry_forever
        retry_max_interval 30
        chunk_limit_size "#{ENV['OUTPUT_BUFFER_CHUNK_LIMIT']}"
        queue_limit_length "#{ENV['OUTPUT_BUFFER_QUEUE_LIMIT']}"
        overflow_action block
      </buffer>
    </match>

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 500m
  #  memory: 200Mi
  # requests:
  #  cpu: 500m
  #  memory: 200Mi

## Persist data to a persistent volume
persistence:
  enabled: false

  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  # annotations: {}
  accessMode: ReadWriteOnce
  size: 10Gi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>

---

# fluentd

[Fluentd](https://www.fluentd.org/) collects events from various data sources and writes them to files, RDBMS, NoSQL, IaaS, SaaS, Hadoop and so on. Fluentd helps you unify your logging infrastructure (Learn more about the Unified Logging Layer).

## TL;DR;

```console
$ helm install stable/fluentd
```

## Introduction

This chart bootstraps an fluentd deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install stable/fluentd --name my-release
```

The command deploys fluentd on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the fluentd chart and their default values.

| Parameter                   | Description                        | Default                                                  |
| --------------------------- | ---------------------------------- | -------------------------------------------------------- |
| `affinity`                  | node/pod affinities                | `{}`                                                     |
| `configMaps`                | Fluentd configuration              | See [values.yaml](values.yaml)                           |
| `output.host`               | output host                        | `elasticsearch-client.default.svc.cluster.local`         |
| `output.port`               | output port                        | `9200`                                                   |
| `output.scheme`             | output port                        | `http`                                                   |
| `output.sslVersion`         | output ssl version                 | `TLSv1`                                                  |
| `output.buffer_chunk_limit` | output buffer chunk limit          | `2M`                                                     |
| `output.buffer_queue_limit` | output buffer queue limit          | `8`                                                      |
| `service.type`              | type of service                    | `ClusterIP`                                              |
| `image.pullPolicy`          | Image pull policy                  | `IfNotPresent`                                           |
| `image.repository`          | Image repository                   | `gcr.io/google-containers/fluentd-elasticsearch`         |
| `image.tag`                 | Image tag                          | `v2.4.0`                                                 |
| `imagePullSecrets`          | Specify image pull secrets         | `nil` (does not add image pull secrets to deployed pods) |
| `ingress.enabled`           | enable ingress                     | `false`                                                  |
| `nodeSelector`              | node labels for pod assignment     | `{}`                                                     |
| `replicaCount`              | desired number of pods             | `1` ???                                                  |
| `resources`                 | pod resource requests & limits     | `{}`                                                     |
| `priorityClassName`         | priorityClassName                  | `nil`                                                    |
| `service.port`              | port for the service               | `80`                                                     |
| `service.type`              | type of service                    | `ClusterIP`                                              |
| `tolerations`               | List of node taints to tolerate    | `[]`                                                     |
| `persistence.enabled`       | Enable buffer persistence          | `false`                                                  |
| `persistence.accessMode`    | Access mode for buffer persistence | `ReadWriteOnce`                                          |
| `persistence.size`          | Volume size for buffer persistence | `10Gi`                                                   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/fluentd --name my-release \
  --set=image.tag=v0.0.2,resources.limits.cpu=200m
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install stable/fluentd --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
