# `@helm-charts/incubator-istio`

Istio Helm chart for Kubernetes

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | incubator    |
| Chart Name          | istio        |
| Chart Version       | 0.2.7-chart7 |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Install Default RBAC roles and bindings
rbac:
  install: false
  apiVersion: v1beta1

istio:
  install: false
  release: 0.2.7

## Enable Istio auth feature
## This deploys a CA in the namespace and enables mTLS between the services
auth:
  enabled: true

## Initializer configuration
initializer:
  customConfigMap: false
  enabled: false
  policy: enabled

  deployment:
    name: initializer
    image: docker.io/istio/sidecar_initializer
    initImage: docker.io/istio/proxy_init
    proxyImage: docker.io/istio/proxy
    imagePullPolicy: IfNotPresent
    replicas: 1
    annotations:
      sidecar.istio.io/inject: 'false'
    ## Node labels for pod assignment
    ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
    ##
    nodeSelector: {}
    resources: {}
    #  limits:
    #   cpu: 100m
    #   memory: 128Mi
    # requests:
    #   cpu: 100m
    #   memory: 128Mi

## Mixer configuration
mixer:
  customConfigMap: false

  service:
    type: ClusterIP
    annotations: {}
    externalTcpPort: 9091
    externalHttpHeathPort: 9093
    externalStatsdPromPort: 9102
    externalStatsdUdpPort: 9125
    externalConfigApiPort: 9094
    externalPrometheusPort: 42422

  deployment:
    name: mixer
    image: docker.io/istio/mixer
    imagePullPolicy: IfNotPresent
    replicas: 1
    annotations:
      sidecar.istio.io/inject: 'false'
    ## Node labels for pod assignment
    ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
    ##
    nodeSelector: {}
    resources: {}
    #  limits:
    #    cpu: 100m
    #    memory: 128Mi
    #  requests:
    #    cpu: 100m
    #    memory: 128Mi

## Pilot configuration
pilot:
  name: pilot
  customConfigMap: false

  service:
    type: ClusterIP
    externalHttpDiscovery: 8080
    externalAdmissionWebhookServer: 443

  deployment:
    replicas: 1
    annotations:
      sidecar.istio.io/inject: 'false'
    ## Node labels for pod assignment
    ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
    ##
    nodeSelector: {}

    discovery:
      name: discovery
      image: docker.io/istio/pilot
      imagePullPolicy: IfNotPresent
      resources: {}
      #  limits:
      #    cpu: 100m
      #    memory: 128Mi
      #  requests:
      #    cpu: 100m
      #    memory: 128Mi

## Ingress configuration
ingress:
  service:
    type: LoadBalancer
    externalHttpPort: 80
    externalHttpsPort: 443

  deployment:
    name: ingress
    annotations:
      sidecar.istio.io/inject: 'false'
    image: docker.io/istio/proxy_debug
    imagePullPolicy: IfNotPresent
    replicas: 1
    ## Node labels for pod assignment
    ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
    ##
    nodeSelector: {}
    resources:
    #  limits:
    #    cpu: 100m
    #    memory: 128Mi
    #  requests:
    #    cpu: 100m
    #    memory: 128Mi

## Engress configuration
egress:
  service:
    type: ClusterIP
    externalHttpPort: 80

  deployment:
    name: egress
    annotations:
      sidecar.istio.io/inject: 'false'
    image: docker.io/istio/proxy_debug
    imagePullPolicy: IfNotPresent
    replicas: 1
    ## Node labels for pod assignment
    ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
    ##
    nodeSelector: {}
    resources: {}
    #  limits:
    #    cpu: 100m
    #    memory: 128Mi
    #  requests:
    #    cpu: 100m
    #    memory: 128Mi

## CA configuration
## Only installed if auth.enabled
ca:
  deployment:
    name: ca
    annotations:
      sidecar.istio.io/inject: 'false'
    image: docker.io/istio/istio-ca
    imagePullPolicy: IfNotPresent
    replicas: 1
    ## Node labels for pod assignment
    ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
    ##
    nodeSelector: {}
    resources: {}
    #  limits:
    #    cpu: 100m
    #    memory: 128Mi
    #  requests:
    #    cpu: 100m
    #    memory: 128Mi

## Addons configuration
## Each addon may be disabled
addons:
  zipkin:
    enabled: true

    service:
      type: NodePort
      externalPort: 9411

    deployment:
      name: zipkin
      annotations:
        sidecar.istio.io/inject: 'false'
      image: docker.io/openzipkin/zipkin
      imageTag: latest
      imagePullPolicy: IfNotPresent
      replicas: 1
      ## Node labels for pod assignment
      ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
      ##
      nodeSelector: {}
      resources: {}
      #  limits:
      #    cpu: 100m
      #    memory: 128Mi
      #  requests:
      #    cpu: 100m
      #    memory: 128Mi

  prometheus:
    enabled: true

    service:
      type: NodePort
      externalPort: 9090
      annotations:
        prometheus.io/scrape: 'true'

    deployment:
      name: prometheus
      annotations:
        sidecar.istio.io/inject: 'false'
      image: quay.io/coreos/prometheus
      imageTag: v1.1.1
      imagePullPolicy: IfNotPresent
      replicas: 1
      ## Node labels for pod assignment
      ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
      ##
      nodeSelector: {}
      resources: {}
      #  limits:
      #    cpu: 100m
      #    memory: 128Mi
      #  requests:
      #    cpu: 100m
      #    memory: 128Mi

  grafana:
    enabled: true

    service:
      type: NodePort
      externalPort: 3000

    deployment:
      name: grafana
      annotations:
        sidecar.istio.io/inject: 'false'
      image: docker.io/istio/grafana
      imagePullPolicy: IfNotPresent
      replicas: 1
      ## Node labels for pod assignment
      ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
      ##
      nodeSelector: {}
      resources: {}
      #  limits:
      #    cpu: 100m
      #    memory: 128Mi
      #  requests:
      #    cpu: 100m
      #    memory: 128Mi

  servicegraph:
    enabled: true

    service:
      type: NodePort
      externalPort: 8088

    deployment:
      name: servicegraph
      annotations:
        sidecar.istio.io/inject: 'false'
      image: docker.io/istio/servicegraph
      imagePullPolicy: IfNotPresent
      replicas: 1
      ## Node labels for pod assignment
      ## Ref: https://kubernetes.io/docs/user-guide/node-selection/
      ##
      nodeSelector: {}
      resources: {}
      #  limits:
      #    cpu: 100m
      #    memory: 128Mi
      #  requests:
      #    cpu: 100m
      #    memory: 128Mi
```

</details>

---

# Istio

[Istio](https://istio.io/), Istio is an open platform that provides a uniform way to connect, manage, and secure microservices. Istio supports managing traffic flows between microservices, enforcing access policies, and aggregating telemetry data, all without requiring changes to the microservice code.

## TL;DR;

```console
$ helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com
$ helm install incubator/istio
```

## Introduction

This chart bootstraps a [Istio](https://istio.io/) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.6+
- Kubernetes 1.7+ if you would like to use the Initializer (auto-inject)
- istioctl

### istioctl installation steps

Run

```console
curl -L https://git.io/getIstio | sh -
```

to download and extract the latest release automatically (on MacOS and Ubuntu), the `istioctl` client will be added to your PATH by the above shell command.

## RBAC

By default the chart is installed without associated RBAC roles and rolebindings. If you would like to install the provided roles and rolebindings please do the following:

```
$ helm install incubator/istio --set rbac.install=true
```

This will install the associated RBAC roles and rolebindings using beta annotations.

To determine if your cluster supports this running the following:

```console
$ kubectl api-versions | grep rbac
```

You also need to have the following parameter on the api server. See the following document for how to enable [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/)

```
--authorization-mode=RBAC
```

If the output contains "beta" or both "alpha" and "beta" you can proceed with normal installation.

### Changing RBAC manifest apiVersion

By default the RBAC resources are generated with the "v1beta1" apiVersion. To use "v1alpha1" do the following:

```console
$ helm install --name my-release incubator/istio --set rbac.install=true,rbac.apiVersion=v1alpha1
```

If it does not. Follow the steps below to disable.

### Disable RBAC role/rolebinding creation

If you don't want the RBAC roles and bindings to be created by the installation of this chart simply install the default chart.

```console
$ helm install --name my-release incubator/istio
```

## Installing the Chart

It is recommended that you install Istio into the istio-system namespace.

Full installation requires two steps.

The first step will install the prerequisite CRDs.

To install the chart with the release name `istio` into the namespace istio-system:

```console
$ helm install --name istio incubator/istio --namespace istio-system
```

The second step will install the Istio components

```console
helm upgrade istio incubator/istio --reuse-values --set istio.install=true
```

The command deploys Istio on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `istio` deployment:

```console
$ helm delete istio
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Istio chart and their default values.

> **Tip**: You can use the default [values.yaml](values.yaml)

| Parameter | Description | Default |
| --------- | ----------- | ------- |
|           |             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install incubator/istio --name my-release \
    --set auth.enabled=false
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install incubator/istio --name my-release -f values.yaml
```

## Custom ConfigMaps

When creating a new chart with this chart as a dependency, customConfigMap can be used to override the default config map provided. To use, set the value to true and provide the file `templates/configmap.yaml` for your use case. If you start by copying `configmap.yaml` from this chart and want to access values from this chart you must change all references from `.Values` to `.Values.istio`.

```
pilot:
  customConfigMap: true
```

### Addons

Istio ships with several preconfigured addons

- Grafana
- Prometheus
- ServiceGraph
- Zipkin

These addons can be selectively installed by setting `addons.<addon-name>.enabled=false` in values.yaml or by using the `--set` command

### Auto-inject

If you are running a Kubernetes 1.7+ and have the Initializers api enabled you may choose to enable the Initializer to be installed. See the [docs](https://kubernetes.io/docs/admin/extensible-admission-controllers/) on how to enable.

```console
helm install --name my-release --devel incubator/istio --namespace istio-system --set istio.install=true,initializer.enabled=true
```
