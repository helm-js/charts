# `@helm-charts/incubator-check-mk`

check_mk monitoring

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | check-mk  |
| Chart Version       | 0.2.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for check-mk.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: 'nlmacamp/check_mk'
  tag: 'latest'
  pullPolicy: IfNotPresent
service:
  name: check-mk
  type: NodePort
  externalPort: 80
  internalPort: 5000
ingress:
  enabled: false
  # Used to create Ingress record (should used with service.type: ClusterIP).
  hosts:
    - monitor.ijuned.com
  annotations:
    kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local
resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi
```

</details>
