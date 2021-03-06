# `@helm-charts/incubator-haproxy-ingress`

Ingress controller implementation for haproxy loadbalancer.

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | incubator       |
| Chart Name          | haproxy-ingress |
| Chart Version       | 0.0.4           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Enable RBAC
rbac:
  create: true

# Create ServiceAccount
serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

# Default 404 backend
defaultBackend:
  name: ingress-default-backend
  image:
    repository: gcr.io/google_containers/defaultbackend
    tag: '1.0'
    pullPolicy: IfNotPresent
  resources:
    cpu: 10m
    memory: 20Mi

  service:
    name: ingress-default-backend

controller:
  name: controller
  image:
    repository: quay.io/jcmoraisjr/haproxy-ingress
    tag: 'v0.6'
    pullPolicy: IfNotPresent

  defaultSslCertificate:
    secret:
      # If not set, release namespace is used
      namespace:
      # Required
      name:

  # ConfigMap to configure haproxy ingress
  config: {}

  # Use host ports?
  hostPorts:
    enable: false
    http: 80
    https: 443
    # List of ports from tcp map
    tcp: []

  # Name of the ingress class to route through this controller
  ingressClass: haproxy

  healthzPort: 10253
  statsPort: 1936

  service:
    annotations: {}
    labels: {}
    clusterIP: ''
    externalTrafficPolicy: ''

    targetPorts:
      http: 80
      https: 443

    type: LoadBalancer
    loadBalancerIP: ''

    enableHttp: true
    enableHttps: true

    # type: NodePort
    # nodePorts:
    #   http: 32080
    #   https: 32443
    nodePorts:
      http: ''
      https: ''

  resources: {}

# TCP service key:value pairs
# <port>: <namespace>/<servicename>:<portnumber>[:[<in-proxy>][:<out-proxy>]]
# https://github.com/jcmoraisjr/haproxy-ingress/tree/v0.6#tcp-services-configmap
tcp: {}
#  8080: "default/example-tcp-svc:9000"
```

</details>

---

# haproxy-ingress

[haproxy-ingress](https://github.com/jcmoraisjr/haproxy-ingress) is an Ingress controller that uses ConfigMap to store the haproxy configuration.

## Introduction

This chart bootstraps an haproxy-ingress deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/haproxy-ingress
```

The command deploys haproxy-ingress on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the haproxy-ingress chart and their default values.

| Parameter                                           | Description                                                                                                                                                                                      | Default                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `rbac.create`                                       | If true, create & use RBAC resources                                                                                                                                                             | `true`                                    |
| `serviceAccount.create`                             | If true, create serviceAccount                                                                                                                                                                   | `true`                                    |
| `serviceAccount.name`                               | ServiceAccount to be used                                                                                                                                                                        | ``                                        |
| `defaultBackend.name`                               | name of the default backend component                                                                                                                                                            | `ingress-default-backend`                 |
| `defaultBackend.image.repository`                   | default backend container image repository                                                                                                                                                       | `gcr.io/google_containers/defaultbackend` |
| `defaultBackend.image.tag`                          | default backend container image repository tag                                                                                                                                                   | `1.0`                                     |
| `defaultBackend.image.pullPolicy`                   | default backend container image pullPolicy                                                                                                                                                       | `IfNotPresent`                            |
| `defaultBackend.resources.cpu`                      | default backend cpu resources limit                                                                                                                                                              | `10m`                                     |
| `defaultBackend.resources.memory`                   | default backend memory resources limit                                                                                                                                                           | `20Mi`                                    |
| `defaultBackend.service.name`                       | name of default backend service to create                                                                                                                                                        | `ingress-default-backend`                 |
| `controller.name`                                   | name of the controller component                                                                                                                                                                 | `controller`                              |
| `controller.image.repository`                       | controller container image repository                                                                                                                                                            | `quay.io/jcmoraisjr/haproxy-ingress`      |
| `controller.image.tag`                              | controller container image tag                                                                                                                                                                   | `v0.6`                                    |
| `controller.image.pullPolicy`                       | controller container image pullPolicy                                                                                                                                                            | `IfNotPresent`                            |
| `controller.defaultSslCertificate.secret.namespace` | namespace of default certificate for controller                                                                                                                                                  | `{{ .Release.Namespace }}`                |
| `controller.defaultSslCertificate.secret.name`      | name of the secret for default certificate of controller                                                                                                                                         | `""`                                      |
| `controller.config`                                 | additional haproxy-ingress [ConfigMap entries](https://github.com/jcmoraisjr/haproxy-ingress/blob/v0.6/README.md#configmap)                                                                      | `{}`                                      |
| `controller.healthzPort`                            | The port number for liveness and readiness checks                                                                                                                                                | `10253`                                   |
| `controller.hostPorts.enable`                       | Enable host-ports for selected ports                                                                                                                                                             | `false`                                   |
| `controller.hostPorts.http`                         | If `controller.hostPorts.enable` is `true` and this is non-empty sets the hostPort for http                                                                                                      | `"80"`                                    |
| `controller.hostPorts.https`                        | If `controller.hostPorts.enable` is `true` and this is non-empty sets the hostPort for https                                                                                                     | `"443"`                                   |
| `controller.hostPorts.tcp`                          | If `controller.hostPorts.enable` is `true` use hostport for these ports from `tcp`                                                                                                               | `[]`                                      |
| `controller.ingressClass`                           | name of the ingress class to route through this controller                                                                                                                                       | `haproxy`                                 |
| `controller.resources`                              | controller pod resource requests & limits                                                                                                                                                        | `{}`                                      |
| `controller.statsPort`                              | The port number for haproxy statistics                                                                                                                                                           | `1936`                                    |
| `controller.service.annotations`                    | annotations for controller service                                                                                                                                                               | `{}`                                      |
| `controller.service.labels`                         | labels for controller service                                                                                                                                                                    | `{}`                                      |
| `controller.service.clusterIP`                      | internal controller cluster service IP                                                                                                                                                           | `""`                                      |
| `controller.service.externalTrafficPolicy`          | external traffic policy                                                                                                                                                                          | `Cluster`                                 |
| `controller.service.enableHttp`                     | if port 80 should be opened for service                                                                                                                                                          | `true`                                    |
| `controller.service.enableHttps`                    | if port 443 should be opened for service                                                                                                                                                         | `true`                                    |
| `controller.service.loadBalancerIP`                 | IP address to assign to load balancer (if supported)                                                                                                                                             | `""`                                      |
| `controller.service.targetPorts.http`               | Sets the targetPort that maps to the Ingress' port 80                                                                                                                                            | `80`                                      |
| `controller.service.targetPorts.https`              | Sets the targetPort that maps to the Ingress' port 443                                                                                                                                           | `443`                                     |
| `controller.service.type`                           | type of controller service to create                                                                                                                                                             | `LoadBalancer`                            |
| `controller.service.nodePorts.http`                 | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 80                                                                         | `""`                                      |
| `controller.service.nodePorts.https`                | If `controller.service.type` is `NodePort` and this is non-empty, it sets the nodePort that maps to the Ingress' port 443                                                                        | `""`                                      |
| `tcp`                                               | TCP [service ConfigMap](https://github.com/jcmoraisjr/haproxy-ingress/blob/v0.6/README.md#tcp-services-configmap): `<port>: <namespace>/<servicename>:<portnumber>[:[<in-proxy>][:<out-proxy>]]` | `{}`                                      |
