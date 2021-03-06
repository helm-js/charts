# `@helm-charts/stable-nginx-ingress`

An nginx Ingress controller that uses ConfigMap to store the nginx configuration.

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | stable        |
| Chart Name          | nginx-ingress |
| Chart Version       | 1.1.3         |
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
    tag: '0.21.0'
    pullPolicy: IfNotPresent
    # www-data -> uid 33
    runAsUser: 33

  config: {}
  # Will add custom header to Nginx https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples/customization/custom-headers
  headers: {}

  # Required for use with CNI based kubernetes installations (such as ones set up by kubeadm),
  # since CNI and hostport don't mix yet. Can be deprecated once https://github.com/kubernetes/kubernetes/issues/23920
  # is merged
  hostNetwork: false

  # Optionally change this to ClusterFirstWithHostNet in case you have 'hostNetwork: true'.
  # By default, while using host network, name resolution uses the host's DNS. If you wish nginx-controller
  # to keep resolving names inside the k8s network, use ClusterFirstWithHostNet.
  dnsPolicy: ClusterFirst

  ## Use host ports 80 and 443
  daemonset:
    useHostPort: false

    hostPorts:
      http: 80
      https: 443

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
  extraEnvs: []
  # extraEnvs:
  #   - name: FOO
  #     valueFrom:
  #       secretKeyRef:
  #         key: FOO
  #         name: secret-resource

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

  affinity: {}

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
    port: 10254
  readinessProbe:
    failureThreshold: 3
    initialDelaySeconds: 10
    periodSeconds: 10
    successThreshold: 1
    timeoutSeconds: 1
    port: 10254

  ## Annotations to be added to controller pods
  ##
  podAnnotations: {}

  replicaCount: 1

  minAvailable: 1

  resources: {}
  #  limits:
  #    cpu: 100m
  #    memory: 64Mi
  #  requests:
  #    cpu: 100m
  #    memory: 64Mi

  autoscaling:
    enabled: false
    minReplicas: 1
    maxReplicas: 11
    targetCPUUtilizationPercentage: 50
    targetMemoryUtilizationPercentage: 50

  ## Override NGINX template
  customTemplate:
    configMapName: ''
    configMapKey: ''

  service:
    annotations: {}
    labels: {}
    clusterIP: ''

    ## List of IP addresses at which the controller services are available
    ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
    ##
    externalIPs: []

    loadBalancerIP: ''
    loadBalancerSourceRanges: []

    enableHttp: true
    enableHttps: true

    ## Set external traffic policy to: "Local" to preserve source IP on
    ## providers supporting it
    ## Ref: https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typeloadbalancer
    externalTrafficPolicy: ''

    healthCheckNodePort: 0

    targetPorts:
      http: http
      https: https

    type: LoadBalancer

    # type: NodePort
    # nodePorts:
    #   http: 32080
    #   https: 32443
    nodePorts:
      http: ''
      https: ''

  extraContainers: []
  ## Additional containers to be added to the controller pod.
  ## See https://github.com/lemonldap-ng-controller/lemonldap-ng-controller as example.
  #  - name: my-sidecar
  #    image: nginx:latest
  #  - name: lemonldap-ng-controller
  #    image: lemonldapng/lemonldap-ng-controller:0.2.0
  #    args:
  #      - /lemonldap-ng-controller
  #      - --alsologtostderr
  #      - --configmap=$(POD_NAMESPACE)/lemonldap-ng-configuration
  #    env:
  #      - name: POD_NAME
  #        valueFrom:
  #          fieldRef:
  #            fieldPath: metadata.name
  #      - name: POD_NAMESPACE
  #        valueFrom:
  #          fieldRef:
  #            fieldPath: metadata.namespace
  #    volumeMounts:
  #    - name: copy-portal-skins
  #      mountPath: /srv/var/lib/lemonldap-ng/portal/skins

  extraVolumeMounts: []
  ## Additional volumeMounts to the controller main container.
  #  - name: copy-portal-skins
  #   mountPath: /var/lib/lemonldap-ng/portal/skins

  extraVolumes: []
  ## Additional volumes to the controller pod.
  #  - name: copy-portal-skins
  #    emptyDir: {}

  extraInitContainers: []
  ## Containers, which are run before the app containers are started.
  # - name: init-myservice
  #   image: busybox
  #   command: ['sh', '-c', 'until nslookup myservice; do echo waiting for myservice; sleep 2; done;']

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

  ## If controller.stats.enabled = true and controller.metrics.enabled = true, Prometheus metrics will be exported
  ##
  metrics:
    enabled: false

    service:
      annotations: {}
      # prometheus.io/scrape: "true"
      # prometheus.io/port: "10254"

      clusterIP: ''

      ## List of IP addresses at which the stats-exporter service is available
      ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
      ##
      externalIPs: []

      loadBalancerIP: ''
      loadBalancerSourceRanges: []
      servicePort: 9913
      type: ClusterIP

    serviceMonitor:
      enabled: false
      additionalLabels: {}

  lifecycle: {}

  priorityClassName: ''

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
    tag: '1.4'
    pullPolicy: IfNotPresent

  extraArgs: {}

  port: 8080

  ## Node tolerations for server scheduling to nodes with taints
  ## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  tolerations: []
  #  - key: "key"
  #    operator: "Equal|Exists"
  #    value: "value"
  #    effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"

  affinity: {}

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

  minAvailable: 1

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

  priorityClassName: ''

## Enable RBAC as per https://github.com/kubernetes/ingress/tree/master/examples/rbac/nginx and https://github.com/kubernetes/ingress/issues/266
rbac:
  create: true

# If true, create & use Pod Security Policy resources
# https://kubernetes.io/docs/concepts/policy/pod-security-policy/
podSecurityPolicy:
  enabled: false

serviceAccount:
  create: true
  name:

## Optional array of imagePullSecrets containing private registry credentials
## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
imagePullSecrets: []
# - name: secretName

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

- Kubernetes 1.6+

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

The following table lists the configurable parameters of the nginx-ingress chart and their default values.

| Parameter                                             | Description                                                                                                                                                                                                                                                                                                                                                                | Default                                                          |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `controller.name`                                     | name of the controller component                                                                                                                                                                                                                                                                                                                                           | `controller`                                                     |
| `controller.image.repository`                         | controller container image repository                                                                                                                                                                                                                                                                                                                                      | `quay.io/kubernetes-ingress-controller/nginx-ingress-controller` |
| `controller.image.tag`                                | controller container image tag                                                                                                                                                                                                                                                                                                                                             | `0.21.0`                                                         |
| `controller.image.pullPolicy`                         | controller container image pull policy                                                                                                                                                                                                                                                                                                                                     | `IfNotPresent`                                                   |
| `controller.image.runAsUser`                          | User ID of the controller process. Value depends on the Linux distribution used inside of the container image. By default uses debian one.                                                                                                                                                                                                                                 | `33`                                                             |
| `controller.config`                                   | nginx ConfigMap entries                                                                                                                                                                                                                                                                                                                                                    | none                                                             |
| `controller.hostNetwork`                              | If the nginx deployment / daemonset should run on the host's network namespace. Do not set this when `controller.service.externalIPs` is set and `kube-proxy` is used as there will be a port-conflict for port `80`                                                                                                                                                       | false                                                            |
| `controller.defaultBackendService`                    | default 404 backend service; required only if `defaultBackend.enabled = false`                                                                                                                                                                                                                                                                                             | `""`                                                             |
| `controller.dnsPolicy`                                | If using `hostNetwork=true`, change to `ClusterFirstWithHostNet`. See [pod's dns policy](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy) for details                                                                                                                                                                            | `ClusterFirst`                                                   |
| `controller.electionID`                               | election ID to use for the status update                                                                                                                                                                                                                                                                                                                                   | `ingress-controller-leader`                                      |
| `controller.extraEnvs`                                | any additional environment variables to set in the pods                                                                                                                                                                                                                                                                                                                    | `{}`                                                             |
| `controller.extraContainers`                          | Sidecar containers to add to the controller pod. See [LemonLDAP::NG controller](https://github.com/lemonldap-ng-controller/lemonldap-ng-controller) as example                                                                                                                                                                                                             | `{}`                                                             |
| `controller.extraVolumeMounts`                        | Additional volumeMounts to the controller main container                                                                                                                                                                                                                                                                                                                   | `{}`                                                             |
| `controller.extraVolumes`                             | Additional volumes to the controller pod                                                                                                                                                                                                                                                                                                                                   | `{}`                                                             |
| `controller.extraInitContainers`                      | Containers, which are run before the app containers are started                                                                                                                                                                                                                                                                                                            | `[]`                                                             |
| `controller.ingressClass`                             | name of the ingress class to route through this controller                                                                                                                                                                                                                                                                                                                 | `nginx`                                                          |
| `controller.scope.enabled`                            | limit the scope of the ingress controller                                                                                                                                                                                                                                                                                                                                  | `false` (watch all namespaces)                                   |
| `controller.scope.namespace`                          | namespace to watch for ingress                                                                                                                                                                                                                                                                                                                                             | `""` (use the release namespace)                                 |
| `controller.extraArgs`                                | Additional controller container arguments                                                                                                                                                                                                                                                                                                                                  | `{}`                                                             |
| `controller.kind`                                     | install as Deployment or DaemonSet                                                                                                                                                                                                                                                                                                                                         | `Deployment`                                                     |
| `controller.daemonset.useHostPort`                    | If `controller.kind` is `DaemonSet`, this will enable `hostPort` for TCP/80 and TCP/443                                                                                                                                                                                                                                                                                    | false                                                            |
| `controller.daemonset.hostPorts.http`                 | If `controller.daemonset.useHostPort` is `true` and this is non-empty, it sets the hostPort                                                                                                                                                                                                                                                                                | `"80"`                                                           |
| `controller.daemonset.hostPorts.https`                | If `controller.daemonset.useHostPort` is `true` and this is non-empty, it sets the hostPort                                                                                                                                                                                                                                                                                | `"443"`                                                          |
| `controller.tolerations`                              | node taints to tolerate (requires Kubernetes >=1.6)                                                                                                                                                                                                                                                                                                                        | `[]`                                                             |
| `controller.affinity`                                 | node/pod affinities (requires Kubernetes >=1.6)                                                                                                                                                                                                                                                                                                                            | `{}`                                                             |
| `controller.minReadySeconds`                          | how many seconds a pod needs to be ready before killing the next, during update                                                                                                                                                                                                                                                                                            | `0`                                                              |
| `controller.nodeSelector`                             | node labels for pod assignment                                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `controller.podAnnotations`                           | annotations to be added to pods                                                                                                                                                                                                                                                                                                                                            | `{}`                                                             |
| `controller.podLabels`                                | labels to add to the pod container metadata                                                                                                                                                                                                                                                                                                                                | `{}`                                                             |
| `controller.replicaCount`                             | desired number of controller pods                                                                                                                                                                                                                                                                                                                                          | `1`                                                              |
| `controller.minAvailable`                             | minimum number of available controller pods for PodDisruptionBudget                                                                                                                                                                                                                                                                                                        | `1`                                                              |
| `controller.resources`                                | controller pod resource requests & limits                                                                                                                                                                                                                                                                                                                                  | `{}`                                                             |
| `controller.priorityClassName`                        | controller priorityClassName                                                                                                                                                                                                                                                                                                                                               | `nil`                                                            |
| `controller.lifecycle`                                | controller pod lifecycle hooks                                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `controller.service.annotations`                      | annotations for controller service                                                                                                                                                                                                                                                                                                                                         | `{}`                                                             |
| `controller.service.labels`                           | labels for controller service                                                                                                                                                                                                                                                                                                                                              | `{}`                                                             |
| `controller.publishService.enabled`                   | if true, the controller will set the endpoint records on the ingress objects to reflect those on the service                                                                                                                                                                                                                                                               | `false`                                                          |
| `controller.publishService.pathOverride`              | override of the default publish-service name                                                                                                                                                                                                                                                                                                                               | `""`                                                             |
| `controller.service.clusterIP`                        | internal controller cluster service IP                                                                                                                                                                                                                                                                                                                                     | `""`                                                             |
| `controller.service.externalIPs`                      | controller service external IP addresses. Do not set this when `controller.hostNetwork` is set to `true` and `kube-proxy` is used as there will be a port-conflict for port `80`                                                                                                                                                                                           | `[]`                                                             |
| `controller.service.externalTrafficPolicy`            | If `controller.service.type` is `NodePort` or `LoadBalancer`, set this to `Local` to enable [source IP preservation](https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typenodeport)                                                                                                                                                    | `"Cluster"`                                                      |
| `controller.service.healthCheckNodePort`              | If `controller.service.type` is `NodePort` or `LoadBalancer` and `controller.service.externalTrafficPolicy` is set to `Local`, set this to [the managed health-check port the kube-proxy will expose](https://kubernetes.io/docs/tutorials/services/source-ip/#source-ip-for-services-with-typenodeport). If blank, a random port in the `NodePort` range will be assigned | `""`                                                             |
| `controller.service.loadBalancerIP`                   | IP address to assign to load balancer (if supported)                                                                                                                                                                                                                                                                                                                       | `""`                                                             |
| `controller.service.loadBalancerSourceRanges`         | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                                                                                                                                                                            | `[]`                                                             |
| `controller.service.enableHttp`                       | if port 80 should be opened for service                                                                                                                                                                                                                                                                                                                                    | `true`                                                           |
| `controller.service.enableHttps`                      | if port 443 should be opened for service                                                                                                                                                                                                                                                                                                                                   | `true`                                                           |
| `controller.service.targetPorts.http`                 | Sets the targetPort that maps to the Ingress' port 80                                                                                                                                                                                                                                                                                                                      | `80`                                                             |
| `controller.service.targetPorts.https`                | Sets the targetPort that maps to the Ingress' port 443                                                                                                                                                                                                                                                                                                                     | `443`                                                            |
| `controller.service.type`                             | type of controller service to create                                                                                                                                                                                                                                                                                                                                       | `LoadBalancer`                                                   |
| `controller.service.nodePorts.http`                   | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 80                                                                                                                                                                                                                                                   | `""`                                                             |
| `controller.service.nodePorts.https`                  | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 443                                                                                                                                                                                                                                                  | `""`                                                             |
| `controller.livenessProbe.initialDelaySeconds`        | Delay before liveness probe is initiated                                                                                                                                                                                                                                                                                                                                   | 10                                                               |
| `controller.livenessProbe.periodSeconds`              | How often to perform the probe                                                                                                                                                                                                                                                                                                                                             | 10                                                               |
| `controller.livenessProbe.timeoutSeconds`             | When the probe times out                                                                                                                                                                                                                                                                                                                                                   | 5                                                                |
| `controller.livenessProbe.successThreshold`           | Minimum consecutive successes for the probe to be considered successful after having failed.                                                                                                                                                                                                                                                                               | 1                                                                |
| `controller.livenessProbe.failureThreshold`           | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                                                                                                                                                                                                                                                 | 3                                                                |
| `controller.livenessProbe.port`                       | The port number that the liveness probe will listen on.                                                                                                                                                                                                                                                                                                                    | 10254                                                            |
| `controller.readinessProbe.initialDelaySeconds`       | Delay before readiness probe is initiated                                                                                                                                                                                                                                                                                                                                  | 10                                                               |
| `controller.readinessProbe.periodSeconds`             | How often to perform the probe                                                                                                                                                                                                                                                                                                                                             | 10                                                               |
| `controller.readinessProbe.timeoutSeconds`            | When the probe times out                                                                                                                                                                                                                                                                                                                                                   | 1                                                                |
| `controller.readinessProbe.successThreshold`          | Minimum consecutive successes for the probe to be considered successful after having failed.                                                                                                                                                                                                                                                                               | 1                                                                |
| `controller.readinessProbe.failureThreshold`          | Minimum consecutive failures for the probe to be considered failed after having succeeded.                                                                                                                                                                                                                                                                                 | 3                                                                |
| `controller.readinessProbe.port`                      | The port number that the readiness probe will listen on.                                                                                                                                                                                                                                                                                                                   | 10254                                                            |
| `controller.stats.enabled`                            | if `true`, enable "vts-status" page                                                                                                                                                                                                                                                                                                                                        | `false`                                                          |
| `controller.stats.service.annotations`                | annotations for controller stats service                                                                                                                                                                                                                                                                                                                                   | `{}`                                                             |
| `controller.stats.service.clusterIP`                  | internal controller stats cluster service IP                                                                                                                                                                                                                                                                                                                               | `""`                                                             |
| `controller.stats.service.externalIPs`                | controller service stats external IP addresses                                                                                                                                                                                                                                                                                                                             | `[]`                                                             |
| `controller.stats.service.loadBalancerIP`             | IP address to assign to load balancer (if supported)                                                                                                                                                                                                                                                                                                                       | `""`                                                             |
| `controller.stats.service.loadBalancerSourceRanges`   | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                                                                                                                                                                            | `[]`                                                             |
| `controller.stats.service.type`                       | type of controller stats service to create                                                                                                                                                                                                                                                                                                                                 | `ClusterIP`                                                      |
| `controller.metrics.enabled`                          | if `true`, enable Prometheus metrics (`controller.stats.enabled` must be `true` as well)                                                                                                                                                                                                                                                                                   | `false`                                                          |
| `controller.metrics.service.annotations`              | annotations for Prometheus metrics service                                                                                                                                                                                                                                                                                                                                 | `{}`                                                             |
| `controller.metrics.service.clusterIP`                | cluster IP address to assign to service                                                                                                                                                                                                                                                                                                                                    | `""`                                                             |
| `controller.metrics.service.externalIPs`              | Prometheus metrics service external IP addresses                                                                                                                                                                                                                                                                                                                           | `[]`                                                             |
| `controller.metrics.service.labels`                   | labels for metrics service                                                                                                                                                                                                                                                                                                                                                 | `{}`                                                             |
| `controller.metrics.service.loadBalancerIP`           | IP address to assign to load balancer (if supported)                                                                                                                                                                                                                                                                                                                       | `""`                                                             |
| `controller.metrics.service.loadBalancerSourceRanges` | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                                                                                                                                                                            | `[]`                                                             |
| `controller.metrics.service.servicePort`              | Prometheus metrics service port                                                                                                                                                                                                                                                                                                                                            | `9913`                                                           |
| `controller.metrics.service.type`                     | type of Prometheus metrics service to create                                                                                                                                                                                                                                                                                                                               | `ClusterIP`                                                      |
| `controller.metrics.serviceMonitor.enabled`           | Set this to `true` to create ServiceMonitor for Prometheus operator                                                                                                                                                                                                                                                                                                        | `false`                                                          |
| `controller.metrics.serviceMonitor.additionalLabels`  | Additional labels that can be used so ServiceMonitor will be discovered by Prometheus                                                                                                                                                                                                                                                                                      | `{}`                                                             |
| `controller.customTemplate.configMapName`             | configMap containing a custom nginx template                                                                                                                                                                                                                                                                                                                               | `""`                                                             |
| `controller.customTemplate.configMapKey`              | configMap key containing the nginx template                                                                                                                                                                                                                                                                                                                                | `""`                                                             |
| `controller.headers`                                  | configMap key:value pairs containing the [custom headers](https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples/customization/custom-headers) for Nginx                                                                                                                                                                                                    | `{}`                                                             |
| `controller.updateStrategy`                           | allows setting of RollingUpdate strategy                                                                                                                                                                                                                                                                                                                                   | `{}`                                                             |
| `defaultBackend.enabled`                              | If false, controller.defaultBackendService must be provided                                                                                                                                                                                                                                                                                                                | `true`                                                           |
| `defaultBackend.name`                                 | name of the default backend component                                                                                                                                                                                                                                                                                                                                      | `default-backend`                                                |
| `defaultBackend.image.repository`                     | default backend container image repository                                                                                                                                                                                                                                                                                                                                 | `k8s.gcr.io/defaultbackend`                                      |
| `defaultBackend.image.tag`                            | default backend container image tag                                                                                                                                                                                                                                                                                                                                        | `1.4`                                                            |
| `defaultBackend.image.pullPolicy`                     | default backend container image pull policy                                                                                                                                                                                                                                                                                                                                | `IfNotPresent`                                                   |
| `defaultBackend.extraArgs`                            | Additional default backend container arguments                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `defaultBackend.port`                                 | Http port number                                                                                                                                                                                                                                                                                                                                                           | `8080`                                                           |
| `defaultBackend.tolerations`                          | node taints to tolerate (requires Kubernetes >=1.6)                                                                                                                                                                                                                                                                                                                        | `[]`                                                             |
| `defaultBackend.affinity`                             | node/pod affinities (requires Kubernetes >=1.6)                                                                                                                                                                                                                                                                                                                            | `{}`                                                             |
| `defaultBackend.nodeSelector`                         | node labels for pod assignment                                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `defaultBackend.podAnnotations`                       | annotations to be added to pods                                                                                                                                                                                                                                                                                                                                            | `{}`                                                             |
| `defaultBackend.podLabels`                            | labels to add to the pod container metadata                                                                                                                                                                                                                                                                                                                                | `{}`                                                             |
| `defaultBackend.replicaCount`                         | desired number of default backend pods                                                                                                                                                                                                                                                                                                                                     | `1`                                                              |
| `defaultBackend.minAvailable`                         | minimum number of available default backend pods for PodDisruptionBudget                                                                                                                                                                                                                                                                                                   | `1`                                                              |
| `defaultBackend.resources`                            | default backend pod resource requests & limits                                                                                                                                                                                                                                                                                                                             | `{}`                                                             |
| `defaultBackend.priorityClassName`                    | default backend priorityClassName                                                                                                                                                                                                                                                                                                                                          | `nil`                                                            |
| `defaultBackend.service.annotations`                  | annotations for default backend service                                                                                                                                                                                                                                                                                                                                    | `{}`                                                             |
| `defaultBackend.service.clusterIP`                    | internal default backend cluster service IP                                                                                                                                                                                                                                                                                                                                | `""`                                                             |
| `defaultBackend.service.externalIPs`                  | default backend service external IP addresses                                                                                                                                                                                                                                                                                                                              | `[]`                                                             |
| `defaultBackend.service.loadBalancerIP`               | IP address to assign to load balancer (if supported)                                                                                                                                                                                                                                                                                                                       | `""`                                                             |
| `defaultBackend.service.loadBalancerSourceRanges`     | list of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                                                                                                                                                                            | `[]`                                                             |
| `defaultBackend.service.type`                         | type of default backend service to create                                                                                                                                                                                                                                                                                                                                  | `ClusterIP`                                                      |
| `imagePullSecrets`                                    | name of Secret resource containing private registry credentials                                                                                                                                                                                                                                                                                                            | `nil`                                                            |
| `rbac.create`                                         | if `true`, create & use RBAC resources                                                                                                                                                                                                                                                                                                                                     | `true`                                                           |
| `podSecurityPolicy.enabled`                           | if `true`, create & use Pod Security Policy resources                                                                                                                                                                                                                                                                                                                      | `false`                                                          |
| `serviceAccount.create`                               | if `true`, create a service account                                                                                                                                                                                                                                                                                                                                        | ``                                                               |
| `serviceAccount.name`                                 | The name of the service account to use. If not set and `create` is `true`, a name is generated using the fullname template.                                                                                                                                                                                                                                                | ``                                                               |
| `revisionHistoryLimit`                                | The number of old history to retain to allow rollback.                                                                                                                                                                                                                                                                                                                     | `10`                                                             |
| `tcp`                                                 | TCP service key:value pairs                                                                                                                                                                                                                                                                                                                                                | `{}`                                                             |
| `udp`                                                 | UDP service key:value pairs                                                                                                                                                                                                                                                                                                                                                | `{}`                                                             |

```console
$ helm install stable/nginx-ingress --name my-release \
    --set controller.stats.enabled=true
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install stable/nginx-ingress --name my-release -f values.yaml
```

A useful trick to debug issues with ingress is to increase the logLevel
as described [here](https://github.com/kubernetes/ingress-nginx/blob/master/docs/troubleshooting.md#debug)

```console
$ helm install stable/nginx-ingress --set controller.extraArgs.v=2
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## PodDisruptionBudget

Note that the PodDisruptionBudget resource will only be defined if the replicaCount is greater than one,
else it would make it impossible to evacuate a node. See [gh issue #7127](https://github.com/helm/charts/issues/7127) for more info.

## Prometheus Metrics

The Nginx ingress controller can export Prometheus metrics. In order for this to work, the VTS dashboard must be enabled as well.

```console
$ helm install stable/nginx-ingress --name my-release \
    --set controller.stats.enabled=true \
    --set controller.metrics.enabled=true
```

You can add Prometheus annotations to the metrics service using `controller.metrics.service.annotations`. Alternatively, if you use the Prometheus Operator, you can enable ServiceMonitor creation using `controller.metrics.serviceMonitor.enabled`.

## ExternalDNS Service configuration

Add an [ExternalDNS](https://github.com/kubernetes-incubator/external-dns) annotation to the LoadBalancer service:

```yaml
annotations:
  external-dns.alpha.kubernetes.io/hostname: kubernetes-example.com.
```

## AWS L7 ELB with SSL Termination

Annotate the controller as shown in the [nginx-ingress l7 patch](https://github.com/kubernetes/ingress-nginx/blob/master/deploy/provider/aws/service-l7.yaml):

```yaml
controller:
  service:
    targetPorts:
      http: http
      https: http
    annotations:
      service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:XX-XXXX-X:XXXXXXXXX:certificate/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX
      service.beta.kubernetes.io/aws-load-balancer-backend-protocol: 'http'
      service.beta.kubernetes.io/aws-load-balancer-ssl-ports: 'https'
      service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: '3600'
```

## AWS route53-mapper

To configure the LoadBalancer service with the [route53-mapper addon](https://github.com/kubernetes/kops/tree/master/addons/route53-mapper), add the `domainName` annotation and `dns` label:

```yaml
controller:
  service:
    labels:
      dns: 'route53'
    annotations:
      domainName: 'kubernetes-example.com'
```
