# `@helm-charts/stable-k8s-spot-termination-handler`

The K8s Spot Termination handler handles draining AWS Spot Instances in response to termination requests.

| Field               | Value                        |
| ------------------- | ---------------------------- |
| Repository Name     | stable                       |
| Chart Name          | k8s-spot-termination-handler |
| Chart Version       | 0.1.0                        |
| NPM Package Version | 0.1.0                        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for k8s-spot-termination-handler.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

image:
  repository: quay.io/pusher/k8s-spot-termination-handler
  tag: v0.1.0
  pullPolicy: IfNotPresent

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # requests:
  #   cpu: 5m
  #   memory: 20Mi
  # limits:
  #   cpu: 100m
  #   memory: 100Mi

# By default, schedule only on spot workers
nodeSelector:
  'node-role.kubernetes.io/spot-worker': 'true'

tolerations: []

affinity: {}
```

</details>
