# `@helm-charts/rimusz-gke-pvm-killer`

A Helm chart for gke-pvm-killer

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | rimusz         |
| Chart Name          | gke-pvm-killer |
| Chart Version       | 0.1.2          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for gke-pvm-killer.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: estafette/estafette-gke-preemptible-killer
  # tag: 1.0.46
  pullPolicy: IfNotPresent
  pullSecrets:

# Set google-service-account.json file
# The key must be encoded with base64 e.g. `cat google-service-account.json | base64`
googleServiceAccount: ''

# Specify an existing secret holding the google-service-account.json
existingSecret: ''

node:
  # Max time in second to wait before deleting a node
  drainTimeout: 300
  # Time in second to wait between each node check
  interval: 600

# Set which user:group you want gke-preemptible-killer to be run with
securityContext:
  enabled: true
  userId: 1000
  groupId: 1000

annotations:
  prometheus.io/scrape: 'true'
  prometheus.io/port: '9001'

livenessProbe:
  httpGet:
    path: /metrics
    port: 9001
  initialDelaySeconds: 30
  timeoutSeconds: 1

resources:
  requests:
    cpu: 10m
    memory: 16Mi
  limits:
    cpu: 50m
    memory: 128Mi

nodeSelector: {}

tolerations: []

affinity:
  nodeAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 10
        preference:
          matchExpressions:
            - key: cloud.google.com/gke-preemptible
              operator: In
              values:
                - 'true'

# Enable and set Pod Disruption Budget
podDisruptionBudget:
  enabled: true
  maxUnavailable: 1
  minAvailable: null

rbac:
  enabled: true
```

</details>

---

# GKE preemptible VMs killer

This small Kubernetes application loop through a given GKE [preemptibles](https://cloud.google.com/compute/docs/instances/preemptible) node pool and kill a node before the regular [24h life time of a preemptible VM](https://cloud.google.com/compute/docs/instances/preemptible#limitations).

## Why?

When creating a cluster, all the node are created at the same time and should be deleted after 24h of activity. To
prevent large disruption, the [estafette-gke-preemptible-killer](https://github.com/estafette/estafette-gke-preemptible-killer) can be used to kill instances during a random period of time between 12 and 24h. It makes use of the node annotation to store the time to kill value.

You can read more about the use case on [Travix Engineering blog post](https://travix.io/how-we-run-kubernetes-engine-at-travix-cde7a66af2bb).

## How does that work

At a given interval, the application get the list of preemptible (PVMs) nodes and check either the node should be
deleted or not. If the annotation doesn't exist, a time to kill value is added to the node annotation with a
random range between 12h and 24h based on the node creation time stamp.
When the time to kill time is passed, the Kubernetes node is marked as unschedulable, drained and the instance
deleted on Google Cloud.

## Prerequisites

- Kubernetes cluster on Google Container Engine (GKE)
- GCP Service account with role set to `Compute Instance Admin` and `Kubernetes Engine Admin`. This key is going to be used to authenticate from the application to the GCP Compute API. See [documentation](https://developers.google.com/identity/protocols/application-default-credentials).

## Installing the Chart

To install the chart with the release name `gke-pvm-killer`:

```
helm upgrade --install gke-pvm-killer --namespace estafette rimusz/gke-pvm-killer \
    --set googleServiceAccount="$(cat path_to_your/google-service-account.json | base64)"
```

### Installing with existing secret

You can deploy the Google service account `google-service-account.json` file as a [Kubernetes secret](https://kubernetes.io/docs/concepts/configuration/secret/).

Create the Kubernetes secret:

```
kubectl create secret generic gke-pvm-killer -n estafette --from-file=path_to_your/google-service-account.json
```

Pass the configuration file to helm:

```
helm upgrade --install gke-pvm-killer --namespace estafette rimusz/gke-pvm-killer \
    --set existingSecret="gke-pvm-killer"
```

**NOTE:** You have to keep passing the configuration file secret parameter as `--set existingSecret="gke-pvm-killer"` on all future calls to `helm upgrade` or set it in `values.yaml` file `existingSecret: gke-pvm-killer`!

## Uninstalling the Chart

To uninstall/delete the `gke-pvm-killer` deployment:

```
helm delete --purge gke-pvm-killer
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the kubernetes-dashboard chart and their default values.

| Parameter                            | Description                                                         | Default                                      |
| ------------------------------------ | ------------------------------------------------------------------- | -------------------------------------------- |
| `image.repository`                   | Image repository name                                               | `estafette/estafette-gke-preemptible-killer` |
| `image.pullPolicy`                   | Image pull policy                                                   | `IfNotPresent`                               |
| `image.pullSecrets`                  | Image pull secret from private registry                             | ``                                           |
| `googleServiceAccount`               | base64 encoded `google-service-account.json` file                   | ``                                           |
| `existingSecret`                     | Specifies an existing secret for `google-service-account.json` file | ``                                           |
| `node.drainTimeout`                  | Max time in second to wait before deleting a node                   | `300`                                        |
| `node.interval`                      | Time in second to wait between each node check                      | `600`                                        |
| `securityContext.enabled`            | Enables Security Context                                            | `true`                                       |
| `securityContext.userId`             | Security User Id                                                    | `1000`                                       |
| `securityContext.groupId`            | Security Group Id                                                   | `1000`                                       |
| `annotations.prometheus.io/scrape`   | The address to listen on for Prometheus metrics requests            | `true`                                       |
| `annotations.prometheus.io/port`     | The port to listen for Prometheus metrics requests                  | `9001`                                       |
| `livenessProbe`                      | Set liveness probe                                                  | `{}`                                         |
| `resources.limits.cpu`               | Specifies CPU limit                                                 | `50m`                                        |
| `resources.limits.memory`            | Specifies memory limit                                              | `128Mi`                                      |
| `resources.requests.cpu`             | Specifies CPU request                                               | `10m`                                        |
| `resources.requests.memory`          | Specifies memory request                                            | `16Mi`                                       |
| `nodeSelector`                       | gke-pvm-killer node selector                                        | `{}`                                         |
| `tolerations`                        | gke-pvm-killer node tolerations                                     | `[]`                                         |
| `affinity`                           | gke-pvm-killer node affinity                                        | `cloud.google.com/gke-preemptible`           |
| `podDisruptionBudget.enabled`        | Enables Pod Disruption Budget                                       | `false`                                      |
| `podDisruptionBudget.maxUnavailable` | Max unavailable Pods                                                | `1`                                          |
| `podDisruptionBudget.minAvailable`   | min unavailable Pods                                                | ``                                           |
| `rbac.enabled`                       | Specifies whether RBAC resources should be created                  | `true`                                       |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```
helm upgrade --install gke-pvm-killer --namespace estafette rimusz/gke-pvm-killer --set resources.limits.cpu=200m
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```
helm upgrade --install gke-pvm-killer --namespace estafette rimusz/gke-pvm-killer -f values.yaml
```

> **Tip**: You can use the default [values.yaml](values.yaml)
