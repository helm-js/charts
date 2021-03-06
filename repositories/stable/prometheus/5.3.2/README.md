# `@helm-charts/stable-prometheus`

Prometheus is a monitoring system and time series database.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | prometheus |
| Chart Version       | 5.3.2      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
rbac:
  create: false

alertmanager:
  ## If false, alertmanager will not be installed
  ##
  enabled: true

  # Defines the serviceAccountName to use when `rbac.create=false`
  serviceAccountName: default

  ## alertmanager container name
  ##
  name: alertmanager

  ## alertmanager container image
  ##
  image:
    repository: prom/alertmanager
    tag: v0.13.0
    pullPolicy: IfNotPresent

  ## Additional alertmanager container arguments
  ##
  extraArgs: {}

  ## The URL prefix at which the container can be accessed. Useful in the case the '-web.external-url' includes a slug
  ## so that the various internal URLs are still able to access as they are in the default case.
  ## (Optional)
  prefixURL: ''

  ## External URL which can access alertmanager
  ## Maybe same with Ingress host name
  baseURL: '/'

  ## Additional alertmanager container environment variable
  ## For instance to add a http_proxy
  ##
  extraEnv: {}

  ## ConfigMap override where fullname is {{.Release.Name}}-{{.Values.alertmanager.configMapOverrideName}}
  ## Defining configMapOverrideName will cause templates/alertmanager-configmap.yaml
  ## to NOT generate a ConfigMap resource
  ##
  configMapOverrideName: ''

  ingress:
    ## If true, alertmanager Ingress will be created
    ##
    enabled: false

    ## alertmanager Ingress annotations
    ##
    annotations: {}
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'

    ## alertmanager Ingress hostnames with optinal path
    ## Must be provided if Ingress is enabled
    ##
    hosts: []
    #   - alertmanager.domain.com
    #   - domain.com/alertmanager

    ## alertmanager Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls: []
    #   - secretName: prometheus-alerts-tls
    #     hosts:
    #       - alertmanager.domain.com

  ## Alertmanager Deployment Strategy type
  # strategy:
  #   type: Recreate

  ## Node tolerations for alertmanager scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations:
    []
    # - key: "key"
    #   operator: "Equal|Exists"
    #   value: "value"
    #   effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  ## Node labels for alertmanager pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  persistentVolume:
    ## If true, alertmanager will create/use a Persistent Volume Claim
    ## If false, use emptyDir
    ##
    enabled: true

    ## alertmanager data Persistent Volume access modes
    ## Must match those of existing PV or dynamic provisioner
    ## Ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
    ##
    accessModes:
      - ReadWriteOnce

    ## alertmanager data Persistent Volume Claim annotations
    ##
    annotations: {}

    ## alertmanager data Persistent Volume existing claim name
    ## Requires alertmanager.persistentVolume.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    existingClaim: ''

    ## alertmanager data Persistent Volume mount root path
    ##
    mountPath: /data

    ## alertmanager data Persistent Volume size
    ##
    size: 2Gi

    ## alertmanager data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

    ## Subdirectory of alertmanager data Persistent Volume to mount
    ## Useful if the volume's root directory is not empty
    ##
    subPath: ''

  ## Annotations to be added to alertmanager pods
  ##
  podAnnotations: {}

  replicaCount: 1

  ## alertmanager resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 10m
    #   memory: 32Mi
    # requests:
    #   cpu: 10m
    #   memory: 32Mi

  service:
    annotations: {}
    labels: {}
    clusterIP: ''

    ## Enabling peer mesh service end points for enabling the HA alert manager
    ## Ref: https://github.com/prometheus/alertmanager/blob/master/README.md
    # enableMeshPeer : true

    ## List of IP addresses at which the alertmanager service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 80
    # nodePort: 30000
    type: ClusterIP

## Monitors ConfigMap changes and POSTs to a URL
## Ref: https://github.com/jimmidyson/configmap-reload
##
configmapReload:
  ## configmap-reload container name
  ##
  name: configmap-reload

  ## configmap-reload container image
  ##
  image:
    repository: jimmidyson/configmap-reload
    tag: v0.1
    pullPolicy: IfNotPresent

  ## configmap-reload resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}

initChownData:
  ## initChownData container name
  ##
  name: init-chown-data

  ## initChownData container image
  ##
  image:
    repository: busybox
    tag: latest
    pullPolicy: IfNotPresent

  ## initChownData resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}

kubeStateMetrics:
  ## If false, kube-state-metrics will not be installed
  ##
  enabled: true

  # Defines the serviceAccountName to use when `rbac.create=false`
  serviceAccountName: default

  ## kube-state-metrics container name
  ##
  name: kube-state-metrics

  ## kube-state-metrics container image
  ##
  image:
    repository: k8s.gcr.io/kube-state-metrics
    tag: v1.2.0
    pullPolicy: IfNotPresent

  ## kube-state-metrics container arguments
  ##
  args: {}

  ## Node tolerations for kube-state-metrics scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations:
    []
    # - key: "key"
    #   operator: "Equal|Exists"
    #   value: "value"
    #   effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  ## Node labels for kube-state-metrics pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Annotations to be added to kube-state-metrics pods
  ##
  podAnnotations: {}

  replicaCount: 1

  ## kube-state-metrics resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 10m
    #   memory: 16Mi
    # requests:
    #   cpu: 10m
    #   memory: 16Mi

  service:
    annotations:
      prometheus.io/scrape: 'true'
    labels: {}

    clusterIP: None

    ## List of IP addresses at which the kube-state-metrics service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 80
    type: ClusterIP

nodeExporter:
  ## If false, node-exporter will not be installed
  ##
  enabled: true

  # Defines the serviceAccountName to use when `rbac.create=false`
  serviceAccountName: default

  ## node-exporter container name
  ##
  name: node-exporter

  ## node-exporter container image
  ##
  image:
    repository: prom/node-exporter
    tag: v0.15.2
    pullPolicy: IfNotPresent

  ## Custom Update Strategy
  ##
  updateStrategy:
    type: OnDelete

  ## Additional node-exporter container arguments
  ##
  extraArgs: {}

  ## Additional node-exporter hostPath mounts
  ##
  extraHostPathMounts:
    []
    # - name: textfile-dir
    #   mountPath: /srv/txt_collector
    #   hostPath: /var/lib/node-exporter
    #   readOnly: true

  extraConfigmapMounts:
    []
    # - name: certs-configmap
    #   mountPath: /prometheus
    #   configMap: certs-configmap
    #   readOnly: true

  ## Node tolerations for node-exporter scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations:
    []
    # - key: "key"
    #   operator: "Equal|Exists"
    #   value: "value"
    #   effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  ## Node labels for node-exporter pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Annotations to be added to node-exporter pods
  ##
  podAnnotations: {}

  ## node-exporter resource limits & requests
  ## Ref: https://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 200m
    #   memory: 50Mi
    # requests:
    #   cpu: 100m
    #   memory: 30Mi

  ## Security context to be added to node-exporter pods
  ##
  securityContext:
    {}
    # runAsUser: 0

  service:
    annotations:
      prometheus.io/scrape: 'true'
    labels: {}

    clusterIP: None

    ## List of IP addresses at which the node-exporter service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    hostPort: 9100
    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 9100
    type: ClusterIP

server:
  ## Prometheus server container name
  ##
  name: server

  # Defines the serviceAccountName to use when `rbac.create=false`
  serviceAccountName: default

  ## Prometheus server container image
  ##
  image:
    repository: prom/prometheus
    tag: v2.1.0
    pullPolicy: IfNotPresent

  ## The URL prefix at which the container can be accessed. Useful in the case the '-web.external-url' includes a slug
  ## so that the various internal URLs are still able to access as they are in the default case.
  ## (Optional)
  prefixURL: ''

  ## External URL which can access alertmanager
  ## Maybe same with Ingress host name
  baseURL: ''

  ## Additional Prometheus server container arguments
  ##
  extraArgs: {}

  ## Additional Prometheus server hostPath mounts
  ##
  extraHostPathMounts:
    []
    # - name: certs-dir
    #   mountPath: /etc/kubernetes/certs
    #   hostPath: /etc/kubernetes/certs
    #   readOnly: true

  extraConfigmapMounts:
    []
    # - name: certs-configmap
    #   mountPath: /prometheus
    #   configMap: certs-configmap
    #   readOnly: true

  ## ConfigMap override where fullname is {{.Release.Name}}-{{.Values.server.configMapOverrideName}}
  ## Defining configMapOverrideName will cause templates/server-configmap.yaml
  ## to NOT generate a ConfigMap resource
  ##
  configMapOverrideName: ''

  ingress:
    ## If true, Prometheus server Ingress will be created
    ##
    enabled: false

    ## Prometheus server Ingress annotations
    ##
    annotations: {}
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'

    ## Prometheus server Ingress hostnames with optinal path
    ## Must be provided if Ingress is enabled
    ##
    hosts: []
    #   - prometheus.domain.com
    #   - domain.com/prometheus

    ## Prometheus server Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls: []
    #   - secretName: prometheus-server-tls
    #     hosts:
    #       - prometheus.domain.com

  ## Server Deployment Strategy type
  # strategy:
  #   type: Recreate

  ## Node tolerations for server scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations:
    []
    # - key: "key"
    #   operator: "Equal|Exists"
    #   value: "value"
    #   effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  ## Node labels for Prometheus server pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  persistentVolume:
    ## If true, Prometheus server will create/use a Persistent Volume Claim
    ## If false, use emptyDir
    ##
    enabled: true

    ## Prometheus server data Persistent Volume access modes
    ## Must match those of existing PV or dynamic provisioner
    ## Ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
    ##
    accessModes:
      - ReadWriteOnce

    ## Prometheus server data Persistent Volume annotations
    ##
    annotations: {}

    ## Prometheus server data Persistent Volume existing claim name
    ## Requires server.persistentVolume.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    existingClaim: ''

    ## Prometheus server data Persistent Volume mount root path
    ##
    mountPath: /data

    ## Prometheus server data Persistent Volume size
    ##
    size: 8Gi

    ## Prometheus server data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

    ## Subdirectory of Prometheus server data Persistent Volume to mount
    ## Useful if the volume's root directory is not empty
    ##
    subPath: ''

  ## Annotations to be added to Prometheus server pods
  ##
  podAnnotations:
    {}
    # iam.amazonaws.com/role: prometheus

  replicaCount: 1

  ## Prometheus server resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 500m
    #   memory: 512Mi
    # requests:
    #   cpu: 500m
    #   memory: 512Mi

  service:
    annotations: {}
    labels: {}
    clusterIP: ''

    ## List of IP addresses at which the Prometheus server service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 80
    type: ClusterIP

  ## Prometheus server pod termination grace period
  ##
  terminationGracePeriodSeconds: 300

  ## Prometheus data retention period (i.e 360h)
  ##
  retention: ''

pushgateway:
  ## If false, pushgateway will not be installed
  ##
  enabled: true

  ## pushgateway container name
  ##
  name: pushgateway

  ## pushgateway container image
  ##
  image:
    repository: prom/pushgateway
    tag: v0.4.0
    pullPolicy: IfNotPresent

  ## Additional pushgateway container arguments
  ##
  extraArgs: {}

  ingress:
    ## If true, pushgateway Ingress will be created
    ##
    enabled: false

    ## pushgateway Ingress annotations
    ##
    annotations: {}
    #   kubernetes.io/ingress.class: nginx
    #   kubernetes.io/tls-acme: 'true'

    ## pushgateway Ingress hostnames with optinal path
    ## Must be provided if Ingress is enabled
    ##
    hosts: []
    #   - pushgateway.domain.com
    #   - domain.com/pushgateway

    ## pushgateway Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls: []
    #   - secretName: prometheus-alerts-tls
    #     hosts:
    #       - pushgateway.domain.com

  ## Node tolerations for pushgateway scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations:
    []
    # - key: "key"
    #   operator: "Equal|Exists"
    #   value: "value"
    #   effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  ## Node labels for pushgateway pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Annotations to be added to pushgateway pods
  ##
  podAnnotations: {}

  replicaCount: 1

  ## pushgateway resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 10m
    #   memory: 32Mi
    # requests:
    #   cpu: 10m
    #   memory: 32Mi

  service:
    annotations:
      prometheus.io/probe: pushgateway
    labels: {}
    clusterIP: ''

    ## List of IP addresses at which the pushgateway service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 9091
    type: ClusterIP

## alertmanager ConfigMap entries
##
alertmanagerFiles:
  alertmanager.yml: |-
    global:
      # slack_api_url: ''

    receivers:
      - name: default-receiver
        # slack_configs:
        #  - channel: '@you'
        #    send_resolved: true

    route:
      group_wait: 10s
      group_interval: 5m
      receiver: default-receiver
      repeat_interval: 3h

## Prometheus server ConfigMap entries
##
serverFiles:
  alerts: {}
  rules: {}

  prometheus.yml:
    rule_files:
      - /etc/config/rules
      - /etc/config/alerts

    scrape_configs:
      - job_name: prometheus
        static_configs:
          - targets:
              - localhost:9090

      # A scrape configuration for running Prometheus on a Kubernetes cluster.
      # This uses separate scrape configs for cluster components (i.e. API server, node)
      # and services to allow each to use different authentication configs.
      #
      # Kubernetes labels will be added as Prometheus labels on metrics via the
      # `labelmap` relabeling action.

      # Scrape config for API servers.
      #
      # Kubernetes exposes API servers as endpoints to the default/kubernetes
      # service so this uses `endpoints` role and uses relabelling to only keep
      # the endpoints associated with the default/kubernetes service using the
      # default named port `https`. This works for single API server deployments as
      # well as HA API server deployments.
      - job_name: 'kubernetes-apiservers'

        kubernetes_sd_configs:
          - role: endpoints

        # Default to scraping over https. If required, just disable this or change to
        # `http`.
        scheme: https

        # This TLS & bearer token file config is used to connect to the actual scrape
        # endpoints for cluster components. This is separate to discovery auth
        # configuration because discovery & scraping are two separate concerns in
        # Prometheus. The discovery auth config is automatic if Prometheus runs inside
        # the cluster. Otherwise, more config options have to be provided within the
        # <kubernetes_sd_config>.
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
          # If your node certificates are self-signed or use a different CA to the
          # master CA, then disable certificate verification below. Note that
          # certificate verification is an integral part of a secure infrastructure
          # so this should only be disabled in a controlled environment. You can
          # disable certificate verification by uncommenting the line below.
          #
          insecure_skip_verify: true
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        # Keep only the default/kubernetes service endpoints for the https port. This
        # will add targets for each API server which Kubernetes adds an endpoint to
        # the default/kubernetes service.
        relabel_configs:
          - source_labels:
              [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
            action: keep
            regex: default;kubernetes;https

      - job_name: 'kubernetes-nodes'

        # Default to scraping over https. If required, just disable this or change to
        # `http`.
        scheme: https

        # This TLS & bearer token file config is used to connect to the actual scrape
        # endpoints for cluster components. This is separate to discovery auth
        # configuration because discovery & scraping are two separate concerns in
        # Prometheus. The discovery auth config is automatic if Prometheus runs inside
        # the cluster. Otherwise, more config options have to be provided within the
        # <kubernetes_sd_config>.
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
          # If your node certificates are self-signed or use a different CA to the
          # master CA, then disable certificate verification below. Note that
          # certificate verification is an integral part of a secure infrastructure
          # so this should only be disabled in a controlled environment. You can
          # disable certificate verification by uncommenting the line below.
          #
          insecure_skip_verify: true
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        kubernetes_sd_configs:
          - role: node

        relabel_configs:
          - action: labelmap
            regex: __meta_kubernetes_node_label_(.+)
          - target_label: __address__
            replacement: kubernetes.default.svc:443
          - source_labels: [__meta_kubernetes_node_name]
            regex: (.+)
            target_label: __metrics_path__
            replacement: /api/v1/nodes/${1}/proxy/metrics

      - job_name: 'kubernetes-nodes-cadvisor'

        # Default to scraping over https. If required, just disable this or change to
        # `http`.
        scheme: https

        # This TLS & bearer token file config is used to connect to the actual scrape
        # endpoints for cluster components. This is separate to discovery auth
        # configuration because discovery & scraping are two separate concerns in
        # Prometheus. The discovery auth config is automatic if Prometheus runs inside
        # the cluster. Otherwise, more config options have to be provided within the
        # <kubernetes_sd_config>.
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
          # If your node certificates are self-signed or use a different CA to the
          # master CA, then disable certificate verification below. Note that
          # certificate verification is an integral part of a secure infrastructure
          # so this should only be disabled in a controlled environment. You can
          # disable certificate verification by uncommenting the line below.
          #
          insecure_skip_verify: true
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        kubernetes_sd_configs:
          - role: node

        # This configuration will work only on kubelet 1.7.3+
        # As the scrape endpoints for cAdvisor have changed
        # if you are using older version you need to change the replacement to
        # replacement: /api/v1/nodes/${1}:4194/proxy/metrics
        # more info here https://github.com/coreos/prometheus-operator/issues/633
        relabel_configs:
          - action: labelmap
            regex: __meta_kubernetes_node_label_(.+)
          - target_label: __address__
            replacement: kubernetes.default.svc:443
          - source_labels: [__meta_kubernetes_node_name]
            regex: (.+)
            target_label: __metrics_path__
            replacement: /api/v1/nodes/${1}/proxy/metrics/cadvisor

      # Scrape config for service endpoints.
      #
      # The relabeling allows the actual service scrape endpoint to be configured
      # via the following annotations:
      #
      # * `prometheus.io/scrape`: Only scrape services that have a value of `true`
      # * `prometheus.io/scheme`: If the metrics endpoint is secured then you will need
      # to set this to `https` & most likely set the `tls_config` of the scrape config.
      # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.
      # * `prometheus.io/port`: If the metrics are exposed on a different port to the
      # service then set this appropriately.
      - job_name: 'kubernetes-service-endpoints'

        kubernetes_sd_configs:
          - role: endpoints

        relabel_configs:
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]
            action: replace
            target_label: __scheme__
            regex: (https?)
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
          - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
            action: replace
            target_label: __address__
            regex: (.+)(?::\d+);(\d+)
            replacement: $1:$2
          - action: labelmap
            regex: __meta_kubernetes_service_label_(.+)
          - source_labels: [__meta_kubernetes_namespace]
            action: replace
            target_label: kubernetes_namespace
          - source_labels: [__meta_kubernetes_service_name]
            action: replace
            target_label: kubernetes_name

      - job_name: 'prometheus-pushgateway'
        honor_labels: true

        kubernetes_sd_configs:
          - role: service

        relabel_configs:
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]
            action: keep
            regex: pushgateway

      # Example scrape config for probing services via the Blackbox Exporter.
      #
      # The relabeling allows the actual service scrape endpoint to be configured
      # via the following annotations:
      #
      # * `prometheus.io/probe`: Only probe services that have a value of `true`
      - job_name: 'kubernetes-services'

        metrics_path: /probe
        params:
          module: [http_2xx]

        kubernetes_sd_configs:
          - role: service

        relabel_configs:
          - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]
            action: keep
            regex: true
          - source_labels: [__address__]
            target_label: __param_target
          - target_label: __address__
            replacement: blackbox
          - source_labels: [__param_target]
            target_label: instance
          - action: labelmap
            regex: __meta_kubernetes_service_label_(.+)
          - source_labels: [__meta_kubernetes_namespace]
            target_label: kubernetes_namespace
          - source_labels: [__meta_kubernetes_service_name]
            target_label: kubernetes_name

      # Example scrape config for pods
      #
      # The relabeling allows the actual pod scrape endpoint to be configured via the
      # following annotations:
      #
      # * `prometheus.io/scrape`: Only scrape pods that have a value of `true`
      # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.
      # * `prometheus.io/port`: Scrape the pod on the indicated port instead of the default of `9102`.
      - job_name: 'kubernetes-pods'

        kubernetes_sd_configs:
          - role: pod

        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
          - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
            action: replace
            regex: (.+):(?:\d+);(\d+)
            replacement: ${1}:${2}
            target_label: __address__
          - action: labelmap
            regex: __meta_kubernetes_pod_label_(.+)
          - source_labels: [__meta_kubernetes_namespace]
            action: replace
            target_label: kubernetes_namespace
          - source_labels: [__meta_kubernetes_pod_name]
            action: replace
            target_label: kubernetes_pod_name

networkPolicy:
  ## Enable creation of NetworkPolicy resources.
  ##
  enabled: false
```

</details>

---

# Prometheus

[Prometheus](https://prometheus.io/), a [Cloud Native Computing Foundation](https://cncf.io/) project, is a systems and service monitoring system. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts if some condition is observed to be true.

## TL;DR;

```console
$ helm install stable/prometheus
```

## Introduction

This chart bootstraps a [Prometheus](https://prometheus.io/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.3+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/prometheus
```

The command deploys Prometheus on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Prometheus 2.x

Prometheus version 2.x has made changes to alertmanager, storage and recording rules. Check out the migration guide [here](https://prometheus.io/docs/prometheus/2.0/migration/)

Users of this chart will need to update their alerting rules to the new format before they can upgrade.

## Upgrading from previous chart versions.

As of version 5.0, this chart uses Prometheus 2.1. This version of prometheus introduces a new data format and is not compatible with prometheus 1.x. It is recommended to install this as a new release, as updating existing releases will not work. See the [prometheus docs](https://prometheus.io/docs/prometheus/latest/migration/#storage) for instructions on retaining your old data.

### Example migration

Assuming you have an existing release of the prometheus chart, named `prometheus-old`. In order to update to prometheus 2.1 while keeping your old data do the following:

1. Update the `prometheus-old` release. Disable scraping on every component besides the prometheus server, similar to the configuration below:

   ```
   alertmanager:
     enabled: false
   alertmanagerFiles:
     alertmanager.yml: ""
   kubeStateMetrics:
     enabled: false
   nodeExporter:
     enabled: false
   pushgateway:
     enabled: false
   server:
     extraArgs:
       storage.local.retention: 720h
   serverFiles:
     alerts: ""
     prometheus.yml: ""
     rules: ""
   ```

1. Deploy a new release of the chart with version 5.0+ using prometheus 2.x. In the values.yaml set the scrape config as usual, and also add the `prometheus-old` instance as a remote-read target.

   ```
   |
   .
   :
   d
   .
   ```

   Old data will be available when you query the new prometheus instance.

## Configuration

The following tables lists the configurable parameters of the Prometheus chart and their default values.

| Parameter                                           | Description                                                                                                                                                                                                                  | Default                          |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `alertmanager.enabled`                              | If true, create alertmanager                                                                                                                                                                                                 | `true`                           |
| `alertmanager.name`                                 | alertmanager container name                                                                                                                                                                                                  | `alertmanager`                   |
| `alertmanager.image.repository`                     | alertmanager container image repository                                                                                                                                                                                      | `prom/alertmanager`              |
| `alertmanager.image.tag`                            | alertmanager container image tag                                                                                                                                                                                             | `v0.13.0`                        |
| `alertmanager.image.pullPolicy`                     | alertmanager container image pull policy                                                                                                                                                                                     | `IfNotPresent`                   |
| `alertmanager.prefixURL`                            | The prefix slug at which the server can be accessed                                                                                                                                                                          | ``                               |
| `alertmanager.baseURL`                              | The external url at which the server can be accessed                                                                                                                                                                         | `/`                              |
| `alertmanager.extraArgs`                            | Additional alertmanager container arguments                                                                                                                                                                                  | `{}`                             |
| `alertmanager.configMapOverrideName`                | Prometheus alertmanager ConfigMap override where full-name is `{{.Release.Name}}-{{.Values.alertmanager.configMapOverrideName}}` and setting this value will prevent the default alertmanager ConfigMap from being generated | `""`                             |
| `alertmanager.ingress.enabled`                      | If true, alertmanager Ingress will be created                                                                                                                                                                                | `false`                          |
| `alertmanager.ingress.annotations`                  | alertmanager Ingress annotations                                                                                                                                                                                             | `{}`                             |
| `alertmanager.ingress.hosts`                        | alertmanager Ingress hostnames                                                                                                                                                                                               | `[]`                             |
| `alertmanager.ingress.tls`                          | alertmanager Ingress TLS configuration (YAML)                                                                                                                                                                                | `[]`                             |
| `alertmanager.nodeSelector`                         | node labels for alertmanager pod assignment                                                                                                                                                                                  | `{}`                             |
| `alertmanager.tolerations`                          | node taints to tolerate (requires Kubernetes >=1.6)                                                                                                                                                                          | `[]`                             |
| `alertmanager.persistentVolume.enabled`             | If true, alertmanager will create a Persistent Volume Claim                                                                                                                                                                  | `true`                           |
| `alertmanager.persistentVolume.accessModes`         | alertmanager data Persistent Volume access modes                                                                                                                                                                             | `[ReadWriteOnce]`                |
| `alertmanager.persistentVolume.annotations`         | Annotations for alertmanager Persistent Volume Claim`|`{}`                                                                                                                                                                   |
| `alertmanager.persistentVolume.existingClaim`       | alertmanager data Persistent Volume existing claim name                                                                                                                                                                      | `""`                             |
| `alertmanager.persistentVolume.mountPath`           | alertmanager data Persistent Volume mount root path                                                                                                                                                                          | `/data`                          |
| `alertmanager.persistentVolume.size`                | alertmanager data Persistent Volume size                                                                                                                                                                                     | `2Gi`                            |
| `alertmanager.persistentVolume.storageClass`        | alertmanager data Persistent Volume Storage Class                                                                                                                                                                            | `unset`                          |
| `alertmanager.persistentVolume.subPath`             | Subdirectory of alertmanager data Persistent Volume to mount                                                                                                                                                                 | `""`                             |
| `alertmanager.podAnnotations`                       | annotations to be added to alertmanager pods                                                                                                                                                                                 | `{}`                             |
| `alertmanager.replicaCount`                         | desired number of alertmanager pods                                                                                                                                                                                          | `1`                              |
| `alertmanager.resources`                            | alertmanager pod resource requests & limits                                                                                                                                                                                  | `{}`                             |
| `alertmanager.serviceAccountName`                   | service account name for alertmanager to use (ignored if rbac.create=true)                                                                                                                                                   | `default`                        |
| `alertmanager.service.annotations`                  | annotations for alertmanager service                                                                                                                                                                                         | `{}`                             |
| `alertmanager.service.clusterIP`                    | internal alertmanager cluster service IP                                                                                                                                                                                     | `""`                             |
| `alertmanager.service.externalIPs`                  | alertmanager service external IP addresses                                                                                                                                                                                   | `[]`                             |
| `alertmanager.service.loadBalancerIP`               | IP address to assign to load balancer (if supported)                                                                                                                                                                         | `""`                             |
| `alertmanager.service.loadBalancerSourceRanges`     | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                              | `[]`                             |
| `alertmanager.service.servicePort`                  | alertmanager service port                                                                                                                                                                                                    | `80`                             |
| `alertmanager.service.type`                         | type of alertmanager service to create                                                                                                                                                                                       | `ClusterIP`                      |
| `alertmanagerFiles`                                 | alertmanager ConfigMap entries                                                                                                                                                                                               | `alertmanager.yml`               |
| `configmapReload.name`                              | configmap-reload container name                                                                                                                                                                                              | `configmap-reload`               |
| `configmapReload.image.repository`                  | configmap-reload container image repository                                                                                                                                                                                  | `jimmidyson/configmap-reload`    |
| `configmapReload.image.tag`                         | configmap-reload container image tag                                                                                                                                                                                         | `v0.1`                           |
| `configmapReload.image.pullPolicy`                  | configmap-reload container image pull policy                                                                                                                                                                                 | `IfNotPresent`                   |
| `configmapReload.resources`                         | configmap-reload pod resource requests & limits                                                                                                                                                                              | `{}`                             |
| `initChownData.name`                                | init-chown-data container name                                                                                                                                                                                               | `init-chown-data`                |
| `initChownData.image.repository`                    | init-chown-data container image repository                                                                                                                                                                                   | `busybox`                        |
| `initChownData.image.tag`                           | init-chown-data container image tag                                                                                                                                                                                          | `latest`                         |
| `initChownData.image.pullPolicy`                    | init-chown-data container image pull policy                                                                                                                                                                                  | `IfNotPresent`                   |
| `initChownData.resources`                           | init-chown-data pod resource requests & limits                                                                                                                                                                               | `{}`                             |
| `kubeStateMetrics.enabled`                          | If true, create kube-state-metrics                                                                                                                                                                                           | `true`                           |
| `kubeStateMetrics.name`                             | kube-state-metrics container name                                                                                                                                                                                            | `kube-state-metrics`             |
| `kubeStateMetrics.image.repository`                 | kube-state-metrics container image repository                                                                                                                                                                                | `k8s.gcr.io/kube-state-metrics`  |
| `kubeStateMetrics.image.tag`                        | kube-state-metrics container image tag                                                                                                                                                                                       | `v1.1.0`                         |
| `kubeStateMetrics.image.pullPolicy`                 | kube-state-metrics container image pull policy                                                                                                                                                                               | `IfNotPresent`                   |
| `kubeStateMetrics.args`                             | kube-state-metrics container arguments                                                                                                                                                                                       | `{}`                             |
| `kubeStateMetrics.nodeSelector`                     | node labels for kube-state-metrics pod assignment                                                                                                                                                                            | `{}`                             |
| `kubeStateMetrics.podAnnotations`                   | annotations to be added to kube-state-metrics pods                                                                                                                                                                           | `{}`                             |
| `kubeStateMetrics.tolerations`                      | node taints to tolerate (requires Kubernetes >=1.6)                                                                                                                                                                          | `[]`                             |
| `kubeStateMetrics.replicaCount`                     | desired number of kube-state-metrics pods                                                                                                                                                                                    | `1`                              |
| `kubeStateMetrics.resources`                        | kube-state-metrics resource requests and limits (YAML)                                                                                                                                                                       | `{}`                             |
| `kubeStateMetrics.serviceAccountName`               | service account name for kube-state-metrics to use (ignored if rbac.create=true)                                                                                                                                             | `default`                        |
| `kubeStateMetrics.service.annotations`              | annotations for kube-state-metrics service                                                                                                                                                                                   | `{prometheus.io/scrape: "true"}` |
| `kubeStateMetrics.service.clusterIP`                | internal kube-state-metrics cluster service IP                                                                                                                                                                               | `None`                           |
| `kubeStateMetrics.service.externalIPs`              | kube-state-metrics service external IP addresses                                                                                                                                                                             | `[]`                             |
| `kubeStateMetrics.service.loadBalancerIP`           | IP address to assign to load balancer (if supported)                                                                                                                                                                         | `""`                             |
| `kubeStateMetrics.service.loadBalancerSourceRanges` | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                              | `[]`                             |
| `kubeStateMetrics.service.servicePort`              | kube-state-metrics service port                                                                                                                                                                                              | `80`                             |
| `kubeStateMetrics.service.type`                     | type of kube-state-metrics service to create                                                                                                                                                                                 | `ClusterIP`                      |
| `nodeExporter.enabled`                              | If true, create node-exporter                                                                                                                                                                                                | `true`                           |
| `nodeExporter.name`                                 | node-exporter container name                                                                                                                                                                                                 | `node-exporter`                  |
| `nodeExporter.image.repository`                     | node-exporter container image repository                                                                                                                                                                                     | `prom/node-exporter`             |
| `nodeExporter.image.tag`                            | node-exporter container image tag                                                                                                                                                                                            | `v0.15.2`                        |
| `nodeExporter.image.pullPolicy`                     | node-exporter container image pull policy                                                                                                                                                                                    | `IfNotPresent`                   |
| `nodeExporter.extraArgs`                            | Additional node-exporter container arguments                                                                                                                                                                                 | `{}`                             |
| `nodeExporter.extraHostPathMounts`                  | Additional node-exporter hostPath mounts                                                                                                                                                                                     | `[]`                             |
| `nodeExporter.extraConfigmapMounts`                 | Additional node-exporter configMap mounts                                                                                                                                                                                    | `[]`                             |
| `nodeExporter.nodeSelector`                         | node labels for node-exporter pod assignment                                                                                                                                                                                 | `{}`                             |
| `nodeExporter.podAnnotations`                       | annotations to be added to node-exporter pods                                                                                                                                                                                | `{}`                             |
| `nodeExporter.tolerations`                          | node taints to tolerate (requires Kubernetes >=1.6)                                                                                                                                                                          | `[]`                             |
| `nodeExporter.resources`                            | node-exporter resource requests and limits (YAML)                                                                                                                                                                            | `{}`                             |
| `nodeExporter.securityContext`                      | securityContext for containers in pod                                                                                                                                                                                        | `{}`                             |
| `nodeExporter.serviceAccountName`                   | service account name for node-exporter to use (ignored if rbac.create=true)                                                                                                                                                  | `default`                        |
| `nodeExporter.service.annotations`                  | annotations for node-exporter service                                                                                                                                                                                        | `{prometheus.io/scrape: "true"}` |
| `nodeExporter.service.clusterIP`                    | internal node-exporter cluster service IP                                                                                                                                                                                    | `None`                           |
| `nodeExporter.service.externalIPs`                  | node-exporter service external IP addresses                                                                                                                                                                                  | `[]`                             |
| `nodeExporter.service.loadBalancerIP`               | IP address to assign to load balancer (if supported)                                                                                                                                                                         | `""`                             |
| `nodeExporter.service.loadBalancerSourceRanges`     | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                              | `[]`                             |
| `nodeExporter.service.servicePort`                  | node-exporter service port                                                                                                                                                                                                   | `9100`                           |
| `nodeExporter.service.type`                         | type of node-exporter service to create                                                                                                                                                                                      | `ClusterIP`                      |
| `pushgateway.enabled`                               | If true, create pushgateway                                                                                                                                                                                                  | `true`                           |
| `pushgateway.name`                                  | pushgateway container name                                                                                                                                                                                                   | `pushgateway`                    |
| `pushgateway.image.repository`                      | pushgateway container image repository                                                                                                                                                                                       | `prom/pushgateway`               |
| `pushgateway.image.tag`                             | pushgateway container image tag                                                                                                                                                                                              | `v0.4.0`                         |
| `pushgateway.image.pullPolicy`                      | pushgateway container image pull policy                                                                                                                                                                                      | `IfNotPresent`                   |
| `pushgateway.extraArgs`                             | Additional pushgateway container arguments                                                                                                                                                                                   | `{}`                             |
| `pushgateway.ingress.enabled`                       | If true, pushgateway Ingress will be created                                                                                                                                                                                 | `false`                          |
| `pushgateway.ingress.annotations`                   | pushgateway Ingress annotations                                                                                                                                                                                              | `{}`                             |
| `pushgateway.ingress.hosts`                         | pushgateway Ingress hostnames                                                                                                                                                                                                | `[]`                             |
| `pushgateway.ingress.tls`                           | pushgateway Ingress TLS configuration (YAML)                                                                                                                                                                                 | `[]`                             |
| `pushgateway.nodeSelector`                          | node labels for pushgateway pod assignment                                                                                                                                                                                   | `{}`                             |
| `pushgateway.podAnnotations`                        | annotations to be added to pushgateway pods                                                                                                                                                                                  | `{}`                             |
| `pushgateway.tolerations`                           | node taints to tolerate (requires Kubernetes >=1.6)                                                                                                                                                                          | `[]`                             |
| `pushgateway.replicaCount`                          | desired number of pushgateway pods                                                                                                                                                                                           | `1`                              |
| `pushgateway.resources`                             | pushgateway pod resource requests & limits                                                                                                                                                                                   | `{}`                             |
| `pushgateway.service.annotations`                   | annotations for pushgateway service                                                                                                                                                                                          | `{}`                             |
| `pushgateway.service.clusterIP`                     | internal pushgateway cluster service IP                                                                                                                                                                                      | `""`                             |
| `pushgateway.service.externalIPs`                   | pushgateway service external IP addresses                                                                                                                                                                                    | `[]`                             |
| `pushgateway.service.loadBalancerIP`                | IP address to assign to load balancer (if supported)                                                                                                                                                                         | `""`                             |
| `pushgateway.service.loadBalancerSourceRanges`      | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                              | `[]`                             |
| `pushgateway.service.servicePort`                   | pushgateway service port                                                                                                                                                                                                     | `9091`                           |
| `pushgateway.service.type`                          | type of pushgateway service to create                                                                                                                                                                                        | `ClusterIP`                      |
| `rbac.create`                                       | If true, create & use RBAC resources                                                                                                                                                                                         | `false`                          |
| `server.name`                                       | Prometheus server container name                                                                                                                                                                                             | `server`                         |
| `server.image.repository`                           | Prometheus server container image repository                                                                                                                                                                                 | `prom/prometheus`                |
| `server.image.tag`                                  | Prometheus server container image tag                                                                                                                                                                                        | `v2.1.0`                         |
| `server.image.pullPolicy`                           | Prometheus server container image pull policy                                                                                                                                                                                | `IfNotPresent`                   |
| `server.extraArgs`                                  | Additional Prometheus server container arguments                                                                                                                                                                             | `{}`                             |
| `server.prefixURL`                                  | The prefix slug at which the server can be accessed                                                                                                                                                                          | ``                               |
| `server.baseURL`                                    | The external url at which the server can be accessed                                                                                                                                                                         | ``                               |
| `server.extraHostPathMounts`                        | Additional Prometheus server hostPath mounts                                                                                                                                                                                 | `[]`                             |
| `server.extraConfigmapMounts`                       | Additional Prometheus server configMap mounts                                                                                                                                                                                | `[]`                             |
| `server.configMapOverrideName`                      | Prometheus server ConfigMap override where full-name is `{{.Release.Name}}-{{.Values.server.configMapOverrideName}}` and setting this value will prevent the default server ConfigMap from being generated                   | `""`                             |
| `server.ingress.enabled`                            | If true, Prometheus server Ingress will be created                                                                                                                                                                           | `false`                          |
| `server.ingress.annotations`                        | Prometheus server Ingress annotations                                                                                                                                                                                        | `[]`                             |
| `server.ingress.hosts`                              | Prometheus server Ingress hostnames                                                                                                                                                                                          | `[]`                             |
| `server.ingress.tls`                                | Prometheus server Ingress TLS configuration (YAML)                                                                                                                                                                           | `[]`                             |
| `server.nodeSelector`                               | node labels for Prometheus server pod assignment                                                                                                                                                                             | `{}`                             |
| `server.tolerations`                                | node taints to tolerate (requires Kubernetes >=1.6)                                                                                                                                                                          | `[]`                             |
| `server.persistentVolume.enabled`                   | If true, Prometheus server will create a Persistent Volume Claim                                                                                                                                                             | `true`                           |
| `server.persistentVolume.accessModes`               | Prometheus server data Persistent Volume access modes                                                                                                                                                                        | `[ReadWriteOnce]`                |
| `server.persistentVolume.annotations`               | Prometheus server data Persistent Volume annotations                                                                                                                                                                         | `{}`                             |
| `server.persistentVolume.existingClaim`             | Prometheus server data Persistent Volume existing claim name                                                                                                                                                                 | `""`                             |
| `server.persistentVolume.mountPath`                 | Prometheus server data Persistent Volume mount root path                                                                                                                                                                     | `/data`                          |
| `server.persistentVolume.size`                      | Prometheus server data Persistent Volume size                                                                                                                                                                                | `8Gi`                            |
| `server.persistentVolume.storageClass`              | Prometheus server data Persistent Volume Storage Class                                                                                                                                                                       | `unset`                          |
| `server.persistentVolume.subPath`                   | Subdirectory of Prometheus server data Persistent Volume to mount                                                                                                                                                            | `""`                             |
| `server.podAnnotations`                             | annotations to be added to Prometheus server pods                                                                                                                                                                            | `{}`                             |
| `server.replicaCount`                               | desired number of Prometheus server pods                                                                                                                                                                                     | `1`                              |
| `server.resources`                                  | Prometheus server resource requests and limits                                                                                                                                                                               | `{}`                             |
| `server.serviceAccountName`                         | service account name for server to use (ignored if rbac.create=true)                                                                                                                                                         | `default`                        |
| `server.service.annotations`                        | annotations for Prometheus server service                                                                                                                                                                                    | `{}`                             |
| `server.service.clusterIP`                          | internal Prometheus server cluster service IP                                                                                                                                                                                | `""`                             |
| `server.service.externalIPs`                        | Prometheus server service external IP addresses                                                                                                                                                                              | `[]`                             |
| `server.service.loadBalancerIP`                     | IP address to assign to load balancer (if supported)                                                                                                                                                                         | `""`                             |
| `server.service.loadBalancerSourceRanges`           | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                              | `[]`                             |
| `server.service.nodePort`                           | Port to be used as the service NodePort (ignored if `server.service.type` is not `NodePort`)                                                                                                                                 | `0`                              |
| `server.service.servicePort`                        | Prometheus server service port                                                                                                                                                                                               | `80`                             |
| `server.service.type`                               | type of Prometheus server service to create                                                                                                                                                                                  | `ClusterIP`                      |
| `server.terminationGracePeriodSeconds`              | Prometheus server Pod termination grace period                                                                                                                                                                               | `300`                            |
| `server.retention`                                  | (optional) Prometheus data retention                                                                                                                                                                                         | `""`                             |
| `serverFiles.alerts`                                | Prometheus server alerts configuration                                                                                                                                                                                       | `{}`                             |
| `serverFiles.rules`                                 | Prometheus server rules configuration                                                                                                                                                                                        | `{}`                             |
| `serverFiles.prometheus.yml`                        | Prometheus server scrape configuration                                                                                                                                                                                       | example configuration            |
| `networkPolicy.enabled`                             | Enable NetworkPolicy                                                                                                                                                                                                         | `false`                          |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install stable/prometheus --name my-release \
    --set server.terminationGracePeriodSeconds=360
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install stable/prometheus --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### ConfigMap Files

AlertManager is configured through [alertmanager.yml](https://prometheus.io/docs/alerting/configuration/). This file (and any others listed in `alertmanagerFiles`) will be mounted into the `alertmanager` pod.

Prometheus is configured through [prometheus.yml](https://prometheus.io/docs/operating/configuration/). This file (and any others listed in `serverFiles`) will be mounted into the `server` pod.

### Ingress TLS

If your cluster allows automatic creation/retrieval of TLS certificates (e.g. [kube-lego](https://github.com/jetstack/kube-lego)), please refer to the documentation for that mechanism.

To manually configure TLS, first create/retrieve a key & certificate pair for the address(es) you wish to protect. Then create a TLS secret in the namespace:

```console
kubectl create secret tls prometheus-server-tls --cert=path/to/tls.cert --key=path/to/tls.key
```

Include the secret's name, along with the desired hostnames, in the alertmanager/server Ingress TLS section of your custom `values.yaml` file:

```
server:
  ingress:
    ## If true, Prometheus server Ingress will be created
    ##
    enabled: true

    ## Prometheus server Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    hosts:
      - prometheus.domain.com

    ## Prometheus server Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls:
      - secretName: prometheus-server-tls
        hosts:
          - prometheus.domain.com
```

### NetworkPolicy

Enabling Network Policy for Prometheus will secure connections to Alert Manager
and Kube State Metrics by only accepting connections from Prometheus Server.
All inbound connections to Prometheus Server are still allowed.

To enable network policy for Prometheus, install a networking plugin that
implements the Kubernetes NetworkPolicy spec, and set `networkPolicy.enabled` to true.

If NetworkPolicy is enabled for Prometheus' scrape targets, you may also need
to manually create a networkpolicy which allows it.
