# `@helm-charts/stable-nginx-ingress`

An nginx Ingress controller that uses ConfigMap to store the nginx configuration.

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | stable        |
| Chart Name          | nginx-ingress |
| Chart Version       | 0.9.3         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## nginx configuration
## Ref: https://github.com/kubernetes/ingress/blob/master/controllers/nginx/configuration.md
##
controller:
  name: controller
  image:
    repository: quay.io/kubernetes-ingress-controller/nginx-ingress-controller
    tag: '0.10.2'
    pullPolicy: IfNotPresent

  config: {}
  # Will add custom header to Nginx https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples/customization/custom-headers
  headers: {}

  # Required for use with CNI based kubernetes installations (such as ones set up by kubeadm),
  # since CNI and hostport don't mix yet. Can be deprecated once https://github.com/kubernetes/kubernetes/issues/23920
  # is merged
  hostNetwork: false

  ## Use host ports 80 and 443
  daemonset:
    useHostPort: false

  ## Required only if defaultBackend.enabled = false
  ## Must be <namespace>/<service_name>
  ##
  defaultBackendService: ''

  ## Election ID to use for status update
  ##
  electionID: ingress-controller-leader

  ## Name of the ingress class to route through this controller
  ##
  ingressClass: nginx

  # labels to add to the pod container metadata
  podLabels: {}
  #  key: value

  ## Allows customization of the external service
  ## the ingress will be bound to via DNS
  publishService:
    enabled: false
    ## Allows overriding of the publish service to bind to
    ## Must be <namespace>/<service_name>
    ##
    pathOverride: ''

  ## Limit the scope of the controller
  ##
  scope:
    enabled: false
    namespace: '' # defaults to .Release.Namespace

  ## Additional command line arguments to pass to nginx-ingress-controller
  ## E.g. to specify the default SSL certificate you can use
  ## extraArgs:
  ##   default-ssl-certificate: "<namespace>/<secret_name>"
  extraArgs: {}

  ## Additional environment variables to set
  ##
  extraEnvs: {}

  ## DaemonSet or Deployment
  ##
  kind: Deployment

  # The update strategy to apply to the Deployment or DaemonSet
  ##
  updateStrategy: {}
  #  rollingUpdate:
  #    maxUnavailable: 1
  #  type: RollingUpdate

  # minReadySeconds to avoid killing pods before we are ready
  ##
  minReadySeconds: 0

  ## Node tolerations for server scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations: []
  #  - key: "key"
  #    operator: "Equal|Exists"
  #    value: "value"
  #    effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  ## Node labels for controller pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Liveness and readiness probe values
  ## Ref: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes
  ##
  livenessProbe:
    failureThreshold: 3
    initialDelaySeconds: 10
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1
  readinessProbe:
    failureThreshold: 3
    initialDelaySeconds: 10
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1

  ## Annotations to be added to controller pods
  ##
  podAnnotations: {}

  replicaCount: 1

  resources: {}
  #  limits:
  #    cpu: 100m
  #    memory: 64Mi
  #  requests:
  #    cpu: 100m
  #    memory: 64Mi

  autoscaling:
    enabled: false
  #  minReplicas: 1
  #  maxReplicas: 11
  #  targetCPUUtilizationPercentage: 50

  ## Override NGINX template
  customTemplate:
    configMapName: ''
    configMapKey: ''

  service:
    annotations: {}
    clusterIP: ''

    ## List of IP addresses at which the controller services are available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []

    ## Set external traffic policy to: "Local" to preserve source IP on
    ## providers supporting it
    ## Ref: https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typeloadbalancer
    externalTrafficPolicy: ''

    healthCheckNodePort: 0

    targetPorts:
      http: 80
      https: 443

    type: LoadBalancer

    # type: NodePort
    # nodePorts:
    #   http: 32080
    #   https: 32443
    nodePorts:
      http: ''
      https: ''

  stats:
    enabled: false

    service:
      annotations: {}
      clusterIP: ''

      ## List of IP addresses at which the stats service is available
      ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
      ##
      externalIPs: []

      loadBalancerIP: ''
      loadBalancerSourceRanges: []
      servicePort: 18080
      type: ClusterIP

  lifecycle: {}

## Rollback limit
##
revisionHistoryLimit: 10

## Default 404 backend
##
defaultBackend:
  ## If false, controller.defaultBackendService must be provided
  ##
  enabled: true

  name: default-backend
  image:
    repository: k8s.gcr.io/defaultbackend
    tag: '1.3'
    pullPolicy: IfNotPresent

  extraArgs: {}

  ## Node tolerations for server scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations: []
  #  - key: "key"
  #    operator: "Equal|Exists"
  #    value: "value"
  #    effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  # labels to add to the pod container metadata
  podLabels: {}
  #  key: value

  ## Node labels for default backend pod assignment
  ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
  ##
  nodeSelector: {}

  ## Annotations to be added to default backend pods
  ##
  podAnnotations: {}

  replicaCount: 1

  resources: {}
  # limits:
  #   cpu: 10m
  #   memory: 20Mi
  # requests:
  #   cpu: 10m
  #   memory: 20Mi

  service:
    annotations: {}
    clusterIP: ''

    ## List of IP addresses at which the default backend service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 80
    type: ClusterIP

## Enable RBAC as per https://github.com/kubernetes/ingress/tree/master/examples/rbac/nginx and https://github.com/kubernetes/ingress/issues/266
rbac:
  create: false
  serviceAccountName: default

## If controller.stats.enabled = true, Prometheus metrics will be exported
## Ref: https://github.com/hnlq715/nginx-vts-exporter
##
statsExporter:
  name: stats-exporter
  image:
    repository: sophos/nginx-vts-exporter
    tag: v0.6
    pullPolicy: IfNotPresent

  endpoint: /metrics
  extraArgs: {}
  metricsNamespace: nginx
  statusPage: http://localhost:18080/nginx_status/format/json

  resources: {}
  # limits:
  #   cpu: 10m
  #   memory: 20Mi
  # requests:
  #   cpu: 10m
  #   memory: 20Mi

  service:
    annotations: {}
    clusterIP: ''

    ## List of IP addresses at which the stats-exporter service is available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []
    servicePort: 9913
    targetPort: 9913
    type: ClusterIP

# TCP service key:value pairs
# Ref: https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx/examples/tcp
##
tcp: {}
#  8080: "default/example-tcp-svc:9000"

# UDP service key:value pairs
# Ref: https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx/examples/udp
##
udp: {}
#  53: "kube-system/kube-dns:53"
```

</details>

---

# nginx-ingress

[nginx-ingress](https://github.com/kubernetes/ingress-nginx) is an Ingress controller that uses ConfigMap to store the nginx configuration.

To use, add the `kubernetes.io/ingress.class: nginx` annotation to your Ingress resources.

## TL;DR;

```console
$ helm install stable/nginx-ingress
```

## Introduction

This chart bootstraps an nginx-ingress deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/nginx-ingress
```

The command deploys nginx-ingress on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the nginx-ingress chart and their default values.

| Parameter                                           | Description                                                                                                                                                                                                                                                                                                                                                                | Default                                                          |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `controller.name`                                   | name of the controller component                                                                                                                                                                                                                                                                                                                                           | `controller`                                                     |
| `controller.image.repository`                       | controller container image repository                                                                                                                                                                                                                                                                                                                                      | `quay.io/kubernetes-ingress-controller/nginx-ingress-controller` |
| `controller.image.tag`                              | controller container image tag                                                                                                                                                                                                                                                                                                                                             | `0.10.2`                                                         |
| `controller.image.pullPolicy`                       | controller container image pull policy                                                                                                                                                                                                                                                                                                                                     | `IfNotPresent`                                                   |
| `controller.config`                                 | nginx ConfigMap entries                                                                                                                                                                                                                                                                                                                                                    | none                                                             |
| `controller.hostNetwork`                            | If the nginx deployment / daemonset should run on the host's network namespace. Do not set this when `controller.service.externalIPs` is set and `kube-proxy` is used as there will be a port-conflict for port `80`                                                                                                                                                       | false                                                            |
| `controller.defaultBackendService`                  | default 404 backend service; required only if `defaultBackend.enabled = false`                                                                                                                                                                                                                                                                                             | `""`                                                             |
| `controller.electionID`                             | election ID to use for the status update                                                                                                                                                                                                                                                                                                                                   | `ingress-controller-leader`                                      |
| `controller.extraEnvs`                              | any additional environment variables to set in the pods                                                                                                                                                                                                                                                                                                                    | `{}`                                                             |
| `controller.ingressClass`                           | name of the ingress class to route through this controller                                                                                                                                                                                                                                                                                                                 | `nginx`                                                          |
| `controller.scope.enabled`                          | limit the scope of the ingress controller                                                                                                                                                                                                                                                                                                                                  | `false` (watch all namespaces)                                   |
| `controller.scope.namespace`                        | namespace to watch for ingress                                                                                                                                                                                                                                                                                                                                             | `""` (use the release namespace)                                 |
| `controller.extraArgs`                              | Additional controller container arguments                                                                                                                                                                                                                                                                                                                                  | `{}`                                                             |
| `controller.kind`                                   | install as Deployment or DaemonSet                                                                                                                                                                                                                                                                                                                                         | `Deployment`                                                     |
| `controller.tolerations`                            | node taints to tolerate (requires Kubernetes >=1.6)                                                                                                                                                                                                                                                                                                                        | `[]`                                                             |
| `controller.minReadySeconds`                        | how many seconds a pod needs to be ready before killing the next, during update                                                                                                                                                                                                                                                                                            | `0`                                                              |
| `controller.nodeSelector`                           | node labels for pod assignment                                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `controller.podAnnotations`                         | annotations to be added to pods                                                                                                                                                                                                                                                                                                                                            | `{}`                                                             |
| `controller.replicaCount`                           | desired number of controller pods                                                                                                                                                                                                                                                                                                                                          | `1`                                                              |
| `controller.resources`                              | controller pod resource requests & limits                                                                                                                                                                                                                                                                                                                                  | `{}`                                                             |
| `controller.lifecycle`                              | controller pod lifecycle hooks                                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `controller.service.annotations`                    | annotations for controller service                                                                                                                                                                                                                                                                                                                                         | `{}`                                                             |
| `controller.publishService.enabled`                 | if true, the controller will set the endpoint records on the ingress objects to reflect those on the service                                                                                                                                                                                                                                                               | `false`                                                          |
| `controller.publishService.pathOverride`            | override of the default publish-service name                                                                                                                                                                                                                                                                                                                               | `""`                                                             |
| `controller.service.clusterIP`                      | internal controller cluster service IP                                                                                                                                                                                                                                                                                                                                     | `""`                                                             |
| `controller.service.externalIPs`                    | controller service external IP addresses. Do not set this when `controller.hostNetwork` is set to `true` and `kube-proxy` is used as there will be a port-conflict for port `80`                                                                                                                                                                                           | `[]`                                                             |
| `controller.service.externalTrafficPolicy`          | If `controller.service.type` is `NodePort` or `LoadBalancer`, set this to `Local` to enable [source IP preservation](https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typenodeport)                                                                                                                                                    | `"Cluster"`                                                      |
| `controller.service.healthCheckNodePort`            | If `controller.service.type` is `NodePort` or `LoadBalancer` and `controller.service.externalTrafficPolicy` is set to `Local`, set this to [the managed health-check port the kube-proxy will expose](https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typenodeport). If blank, a random port in the `NodePort` range will be assigned | `""`                                                             |
| `controller.service.loadBalancerIP`                 | IP address to assign to load balancer (if supported)                                                                                                                                                                                                                                                                                                                       | `""`                                                             |
| `controller.service.loadBalancerSourceRanges`       | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                                                                                                                                                                            | `[]`                                                             |
| `controller.service.targetPorts.http`               | Sets the targetPort that maps to the Ingress' port 80                                                                                                                                                                                                                                                                                                                      | `80`                                                             |
| `controller.service.targetPorts.https`              | Sets the targetPort that maps to the Ingress' port 443                                                                                                                                                                                                                                                                                                                     | `443`                                                            |
| `controller.service.type`                           | type of controller service to create                                                                                                                                                                                                                                                                                                                                       | `LoadBalancer`                                                   |
| `controller.service.nodePorts.http`                 | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 80                                                                                                                                                                                                                                                   | `""`                                                             |
| `controller.service.nodePorts.https`                | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 443                                                                                                                                                                                                                                                  | `""`                                                             |
| `controller.livenessProbe.initialDelaySeconds`      | Delay before liveness probe is initiated                                                                                                                                                                                                                                                                                                                                   | 10                                                               |
| `controller.livenessProbe.periodSeconds`            | How often to perform the probe                                                                                                                                                                                                                                                                                                                                             | 10                                                               |
| `controller.livenessProbe.timeoutSeconds`           | When the probe times out                                                                                                                                                                                                                                                                                                                                                   | 5                                                                |
| `controller.livenessProbe.successThreshold`         | Minimum consecutive successes for the probe to be considered successful after having failed.                                                                                                                                                                                                                                                                               | 1                                                                |
| `controller.livenessProbe.failureThreshold`         | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                                                                                                                                                                                                                                                 | 3                                                                |
| `controller.readinessProbe.initialDelaySeconds`     | Delay before readiness probe is initiated                                                                                                                                                                                                                                                                                                                                  | 10                                                               |
| `controller.readinessProbe.periodSeconds`           | How often to perform the probe                                                                                                                                                                                                                                                                                                                                             | 10                                                               |
| `controller.readinessProbe.timeoutSeconds`          | When the probe times out                                                                                                                                                                                                                                                                                                                                                   | 1                                                                |
| `controller.readinessProbe.successThreshold`        | Minimum consecutive successes for the probe to be considered successful after having failed.                                                                                                                                                                                                                                                                               | 1                                                                |
| `controller.readinessProbe.failureThreshold`        | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                                                                                                                                                                                                                                                 | 3                                                                |
| `controller.stats.enabled`                          | if true, enable "vts-status" page & Prometheus metrics                                                                                                                                                                                                                                                                                                                     | `false`                                                          |
| `controller.stats.service.annotations`              | annotations for controller stats service                                                                                                                                                                                                                                                                                                                                   | `{}`                                                             |
| `controller.stats.service.clusterIP`                | internal controller stats cluster service IP                                                                                                                                                                                                                                                                                                                               | `""`                                                             |
| `controller.stats.service.externalIPs`              | controller service stats external IP addresses                                                                                                                                                                                                                                                                                                                             | `[]`                                                             |
| `controller.stats.service.loadBalancerIP`           | IP address to assign to load balancer (if supported)                                                                                                                                                                                                                                                                                                                       | `""`                                                             |
| `controller.stats.service.loadBalancerSourceRanges` | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                                                                                                                                                                            | `[]`                                                             |
| `controller.stats.service.type`                     | type of controller stats service to create                                                                                                                                                                                                                                                                                                                                 | `ClusterIP`                                                      |
| `controller.customTemplate.configMapName`           | configMap containing a custom nginx template                                                                                                                                                                                                                                                                                                                               | `""`                                                             |
| `controller.customTemplate.configMapKey`            | configMap key containing the nginx template                                                                                                                                                                                                                                                                                                                                | `""`                                                             |
| `controller.headers`                                | configMap key:value pairs containing the [custom headers](https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples/customization/custom-headers) for Nginx                                                                                                                                                                                                    | `{}`                                                             |
| `controller.updateStrategy`                         | allows setting of RollingUpdate strategy                                                                                                                                                                                                                                                                                                                                   | `{}`                                                             |
| `defaultBackend.name`                               | name of the default backend component                                                                                                                                                                                                                                                                                                                                      | `default-backend`                                                |
| `defaultBackend.image.repository`                   | default backend container image repository                                                                                                                                                                                                                                                                                                                                 | `k8s.gcr.io/defaultbackend`                                      |
| `defaultBackend.image.tag`                          | default backend container image tag                                                                                                                                                                                                                                                                                                                                        | `1.3`                                                            |
| `defaultBackend.image.pullPolicy`                   | default backend container image pull policy                                                                                                                                                                                                                                                                                                                                | `IfNotPresent`                                                   |
| `defaultBackend.extraArgs`                          | Additional default backend container arguments                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `defaultBackend.tolerations`                        | node taints to tolerate (requires Kubernetes >=1.6)                                                                                                                                                                                                                                                                                                                        | `[]`                                                             |
| `defaultBackend.nodeSelector`                       | node labels for pod assignment                                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `defaultBackend.podAnnotations`                     | annotations to be added to pods                                                                                                                                                                                                                                                                                                                                            | `{}`                                                             |
| `defaultBackend.replicaCount`                       | desired number of default backend pods                                                                                                                                                                                                                                                                                                                                     | `1`                                                              |
| `defaultBackend.resources`                          | default backend pod resource requests & limits                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `defaultBackend.service.annotations`                | annotations for default backend service                                                                                                                                                                                                                                                                                                                                    | `{}`                                                             |
| `defaultBackend.service.clusterIP`                  | internal default backend cluster service IP                                                                                                                                                                                                                                                                                                                                | `""`                                                             |
| `defaultBackend.service.externalIPs`                | default backend service external IP addresses                                                                                                                                                                                                                                                                                                                              | `[]`                                                             |
| `defaultBackend.service.loadBalancerIP`             | IP address to assign to load balancer (if supported)                                                                                                                                                                                                                                                                                                                       | `""`                                                             |
| `defaultBackend.service.loadBalancerSourceRanges`   | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                                                                                                                                                                            | `[]`                                                             |
| `defaultBackend.service.type`                       | type of default backend service to create                                                                                                                                                                                                                                                                                                                                  | `ClusterIP`                                                      |
| `rbac.create`                                       | If true, create & use RBAC resources                                                                                                                                                                                                                                                                                                                                       | `false`                                                          |
| `rbac.serviceAccountName`                           | ServiceAccount to be used (ignored if rbac.create=true)                                                                                                                                                                                                                                                                                                                    | `default`                                                        |
| `revisionHistoryLimit`                              | The number of old history to retain to allow rollback.                                                                                                                                                                                                                                                                                                                     | `10`                                                             |
| `statsExporter.name`                                | name of the Prometheus metrics exporter component                                                                                                                                                                                                                                                                                                                          | `stats-exporter`                                                 |
| `statsExporter.image.repository`                    | Prometheus metrics exporter container image repository                                                                                                                                                                                                                                                                                                                     | `sophos/nginx-vts-exporter`                                      |
| `statsExporter.image.tag`                           | Prometheus metrics exporter image tag                                                                                                                                                                                                                                                                                                                                      | `v0.6`                                                           |
| `statsExporter.image.pullPolicy`                    | Prometheus metrics exporter image pull policy                                                                                                                                                                                                                                                                                                                              | `IfNotPresent`                                                   |
| `statsExporter.endpoint`                            | path at which Prometheus metrics are exposed                                                                                                                                                                                                                                                                                                                               | `/metrics`                                                       |
| `statsExporter.extraArgs`                           | Additional Prometheus metrics exporter container arguments                                                                                                                                                                                                                                                                                                                 | `{}`                                                             |
| `statsExporter.metricsNamespace`                    | namespace used for metrics labeling                                                                                                                                                                                                                                                                                                                                        | `nginx`                                                          |
| `statsExporter.statusPage`                          | URL of "vts-stats" page exposed by controller                                                                                                                                                                                                                                                                                                                              | `http://localhost:18080/nginx_status/format/json`                |
| `statsExporter.resources`                           | Prometheus metrics exporter resource requests & limits                                                                                                                                                                                                                                                                                                                     | `{}`                                                             |
| `statsExporter.service.annotations`                 | annotations for Prometheus metrics exporter service                                                                                                                                                                                                                                                                                                                        | `{}`                                                             |
| `statsExporter.service.clusterIP`                   | cluster IP address to assign to service                                                                                                                                                                                                                                                                                                                                    | `""`                                                             |
| `statsExporter.service.externalIPs`                 | Prometheus metrics exporter service external IP addresses                                                                                                                                                                                                                                                                                                                  | `[]`                                                             |
| `statsExporter.service.loadBalancerIP`              | IP address to assign to load balancer (if supported)                                                                                                                                                                                                                                                                                                                       | `""`                                                             |
| `statsExporter.service.loadBalancerSourceRanges`    | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                                                                                                                                                                            | `[]`                                                             |
| `statsExporter.service.servicePort`                 | Prometheus metrics exporter service port                                                                                                                                                                                                                                                                                                                                   | `9913`                                                           |
| `statsExporter.service.targetPort`                  | Prometheus metrics exporter target port                                                                                                                                                                                                                                                                                                                                    | `9913`                                                           |
| `statsExporter.service.type`                        | type of Prometheus metrics exporter service to create                                                                                                                                                                                                                                                                                                                      | `ClusterIP`                                                      |
| `tcp`                                               | TCP service key:value pairs                                                                                                                                                                                                                                                                                                                                                | `{}`                                                             |
| `udp`                                               | UDP service key:value pairs                                                                                                                                                                                                                                                                                                                                                | `{}`                                                             |

```console
$ helm install stable/nginx-ingress --name my-release \
    --set controller.stats.enabled=true
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install stable/nginx-ingress --name my-release -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
