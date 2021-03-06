# `@helm-charts/banzaicloud-stable-spark-shuffle`

A Helm chart for Spark Shuffle in Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | spark-shuffle      |
| Chart Version       | 0.0.4              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Shuffle
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: banzaicloud/spark-shuffle
  tag: v2.2.1-k8s-1.0.35
  pullPolicy: IfNotPresent

spark:
  version: 2.2.0

resources: #{}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 500m
  #  memory: 1024Mi
  requests:
    cpu: 200m
    memory: 200Mi

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
nodeSelector: {}
```

</details>
