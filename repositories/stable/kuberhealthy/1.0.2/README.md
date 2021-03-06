# `@helm-charts/stable-kuberhealthy`

The official Helm chart for Kuberhealthy.

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | stable       |
| Chart Name          | kuberhealthy |
| Chart Version       | 1.0.2        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kuberhealthy.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

prometheus:
  enabled: false
  name: 'prometheus'
  enableScraping: true
  serviceMonitor: false
  enableAlerting: true

image:
  repository: quay.io/comcast/kuberhealthy
  tag: 1.0.0

resources:
  requests:
    cpu: 100m
    memory: 80Mi
  limits:
    cpu: 400m
    memory: 200Mi

tolerations:
  # change to true to tolerate and deploy to masters
  master: false

deployment:
  replicas: 2
  maxSurge: 0
  maxUnavailable: 1
  imagePullPolicy: IfNotPresent

# Please remember that changing the service type to LoadBalancer
# will expose Kuberhealthy to the internet, which could cause
# error messages shown by Kuberhealthy to be exposed to the
# public internet.  It is recommended to create the service
# with ClusterIP, then to manually edit the service in order to
# securely expose the port in an appropriate way for your
# specific environment.
service:
  externalPort: 80
  type: ClusterIP
```

</details>

---

<center><img src="https://github.com/Comcast/kuberhealthy/blob/master/images/kuberhealthy.png?raw=true"></center><br />

Easy synthetic testing for [Kubernetes](https://kubernetes.io) clusters. Supplements other solutions like [Prometheus](https://prometheus.io/) nicely.

## What is Kuberhealthy?

Kuberhealthy performs stynthetic tests from within Kubernetes clusters in order to catch issues that would otherwise go unnoticed. Instead of trying to identify all the things that could potentially go wrong, Kuberhealthy replicates real workflow and watches carefully for the expected Kubernetes behavior to occur. Kuberhealthy serves both a JSON status page and a [Prometheus](https://prometheus.io/) metrics endpoint for integration into your choice of alerting solution. More checks will be added in future versions to better cover [service provisioning](https://github.com/Comcast/kuberhealthy/issues/11), [DNS resolution](https://github.com/Comcast/kuberhealthy/issues/16), [disk provisioning](https://github.com/Comcast/kuberhealthy/issues/9), and more.

Some examples of errors Kuberhealthy has detected in production:

- Nodes where new pods get stuck in `Terminating` due to CNI communication failures
- Nodes where new pods get stuck in `ContainerCreating` due to disk scheduler errors
- Nodes where new pods get stuck in `Pending` due to Docker daemon errors
- Nodes where Docker or Kubelet crashes or has restarted
- A node that can not provision or terminate pods quickly enough due to high IO wait
- A pod in the `kube-system` namespace that is restarting too quickly
- A [Kubernetes component](https://kubernetes.io/docs/concepts/overview/components/) that is in a non-ready state
- Intermittent failures to access or create custom resources
- Kubernetes system services remaining technically "healthy" while their underlying pods are crashing too much
  - kube-scheduler
  - kube-apiserver
  - kube-dns

### Helm Variables

It is possible to configure Kuberhealthy's Prometheus integration with Helm variables. Variable breakdown is below:

```
prometheus:
  enabled: true # do we deploy a ServiceMonitor spec?
  name: "prometheus" # the name of the Prometheus deployment in your environment.
  enableScraping: true # add the Prometheus scrape annotation to Kuberhealthy pods
  serviceMonitor: false # use a ServiceMonitor configuration, for if using Prometheus Operator
  enableAlerting: true # enable default Kuberhealthy alerts configuration
app:
  name: "kuberhealthy" # what to name the kuberhealthy deployment
image:
  repository: quay.io/comcast/kuberhealthy
  tag: 1.0.0
resources:
  requests:
    cpu: 100m
    memory: 80Mi
  limits:
    cpu: 400m
    memory: 200Mi
tolerations:
  # change to true to tolerate and deploy to masters annotated with node-role.kubernetes.io/master
  master: true
deployment:
  replicas: 2 # any number of replicas are supported, but only act in a failover capacity
  maxSurge: 0
  maxUnavailable: 1
  imagePullPolicy: IfNotPresent
  namespace: kuberhealthy
```

For more details, see the [Kuberhealthy web site](https://comcast.github.io/kuberhealthy/).

To report a bug, see the [Kuberhealthy project issues](https://github.com/Comcast/kuberhealthy/issues).
