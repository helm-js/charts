# `@helm-charts/stable-envoy`

Envoy is an open source edge and service proxy, designed for cloud-native applications.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | envoy  |
| Chart Version       | 1.3.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 2

podDisruptionBudget: |
  maxUnavailable: 1

## ref: https://pracucci.com/graceful-shutdown-of-kubernetes-pods.html
terminationGracePeriodSeconds: 30

strategy: |
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 2
    maxUnavailable: 1

image:
  repository: envoyproxy/envoy-alpine
  tag: d920944aed67425f91fc203774aebce9609e5d9a
  ## ^ ref: https://github.com/envoyproxy/envoy/commit/d920944aed67425f91fc203774aebce9609e5d9a
  pullPolicy: IfNotPresent

command:
  - /usr/bin/dumb-init
  - --
args:
  - /usr/local/bin/envoy
  - --v2-config-only
  - -l
  - $loglevel
  - -c
  - /config/envoy.yaml

## Client service.
service:
  enabled: true
  ## Service name is user-configurable for maximum service discovery flexibility.
  name: envoy
  type: ClusterIP
  annotations:
    {}
    ## AWS example for use with LoadBalancer service type.
    # external-dns.alpha.kubernetes.io/hostname: envoy.cluster.local
    # service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
    # service.beta.kubernetes.io/aws-load-balancer-internal: "true"
  ports:
    n0:
      port: 10000
      targetPort: n0
      protocol: TCP

ports:
  admin:
    containerPort: 9901
    protocol: TCP
  n0:
    containerPort: 10000
    protocol: TCP

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

priorityClassName: ''

nodeSelector: {}

tolerations: []

affinity:
  {}
  # podAntiAffinity:
  #   preferredDuringSchedulingIgnoredDuringExecution:
  #     - weight: 50
  #       podAffinityTerm:
  #         topologyKey: failure-domain.beta.kubernetes.io/zone
  #         labelSelector:
  #           matchLabels:
  #             release: envoy
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - weight: 40
  #       topologyKey: "kubernetes.io/hostname"
  #       labelSelector:
  #         matchLabels:
  #           release: envoy

## ref: https://github.com/envoyproxy/envoy/pull/2896
podAnnotations:
  {}
  # prometheus.io/scrape: "true"
  # prometheus.io/path: "/stats/prometheus"
  # prometheus.io/port: "9901"

podLabels:
  {}
  # team: "developers"
  # service: "envoy"

livenessProbe:
  tcpSocket:
    port: admin
  initialDelaySeconds: 30
  # periodSeconds: 10
  # timeoutSeconds: 5
  # failureThreshold: 3
  # successThreshold: 1

readinessProbe:
  tcpSocket:
    port: admin
  initialDelaySeconds: 30
  # periodSeconds: 10
  # timeoutSeconds: 5
  # failureThreshold: 3
  # successThreshold: 1

securityContext: {}

env: {}

## Create secrets out-of-band from Helm like this:
##
## $ kubectl create secret generic envoy --from-file=./some-secret.txt
##
secretMounts:
  {}
  # secret:
  #   secretName: envoy
  #   mountPath: /secret
  #   defaultMode: 256  # 256 in base10 == 0400 in octal

files:
  envoy.yaml: |-
    ## refs:
    ## - https://www.envoyproxy.io/docs/envoy/latest/start/start#quick-start-to-run-simple-example
    ## - https://raw.githubusercontent.com/envoyproxy/envoy/master/configs/google_com_proxy.v2.yaml
    admin:
      access_log_path: /dev/stdout
      address:
        socket_address:
          address: 0.0.0.0
          port_value: 9901

    static_resources:
      listeners:
      - name: listener_0
        address:
          socket_address:
            address: 0.0.0.0
            port_value: 10000
        filter_chains:
        - filters:
          - name: envoy.http_connection_manager
            config:
              access_log:
              - name: envoy.file_access_log
                config:
                  path: /dev/stdout
              stat_prefix: ingress_http
              route_config:
                name: local_route
                virtual_hosts:
                - name: local_service
                  domains: ["*"]
                  routes:
                  - match:
                      prefix: "/"
                    route:
                      host_rewrite: www.google.com
                      cluster: service_google
              http_filters:
              - name: envoy.router
      clusters:
      - name: service_google
        connect_timeout: 0.25s
        type: LOGICAL_DNS
        dns_lookup_family: V4_ONLY
        lb_policy: ROUND_ROBIN
        hosts:
          - socket_address:
              address: google.com
              port_value: 443
        tls_context:
          sni: www.google.com
```

</details>

---

# stable/envoy

[Envoy](https://www.envoyproxy.io/) is an open source edge and service proxy, designed for cloud-native applications.

All user-configurable settings, default values and some commentary about them can be found in [values.yaml](values.yaml).
