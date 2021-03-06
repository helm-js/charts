# `@helm-charts/banzaicloud-stable-cadence`

A Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | cadence            |
| Chart Version       | 0.1.5              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for cadence.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

server:
  replicaCount: 1

  image:
    repository: ubercadence/server
    tag: 0.5.2
    pullPolicy: IfNotPresent

  logLevel: 'debug,info'

  nameOverride: ''
  fullnameOverride: ''

  bindOnLocalHost: false

  cassandraVisibilityKeyspace: cadence

  frontend:
    enabled: true
    bindOnIP: '0.0.0.0'
    service:
      type: ClusterIP
      port: 7933

  matching:
    enabled: true
    bindOnIP: '0.0.0.0'
    service:
      type: ClusterIP
      port: 7935

  history:
    enabled: true
    bindOnIP: '0.0.0.0'
    numHistoryShards: 4
    service:
      type: ClusterIP
      port: 7934

  worker:
    enabled: true
    bindOnIP: '0.0.0.0'
    service:
      type: ClusterIP
      port: 7939

  ingress:
    enabled: false
    annotations:
      {}
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"
    paths: []
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

web:
  enabled: true

  replicaCount: 1

  image:
    repository: ubercadence/web
    tag: 3.1.2
    pullPolicy: IfNotPresent

  cadenceTchannelPeers: cadence:7933

  nameOverride: ''
  fullnameOverride: ''

  service:
    type: ClusterIP
    port: 80

  ingress:
    enabled: false
    annotations:
      {}
      #kubernetes.io/ingress.class: traefik
      #ingress.kubernetes.io/ssl-redirect: "false"
      #traefik.frontend.rule.type: PathPrefix
    hosts:
      - '/'
      # - "domain.com/xyz"
      # - "domain.com"
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

cassandra:
  enabled: true
  seeds: cassandra
  consistency: One
  keyspace: cadence
  config:
    cluster_size: 1
```

</details>
