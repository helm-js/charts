# `@helm-charts/banzaicloud-stable-clair`

Clair is an open source project for the static analysis of vulnerabilities in application containers.

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | clair              |
| Chart Version       | 0.1.1              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for clair.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
logLevel: info
insecureTls: false
image:
  repository: quay.io/coreos/clair-git
  tag: latest
  pullPolicy: Always
service:
  name: clair
  type: LoadBalancer
  internalApiPort: 6060
  externalApiPort: 6060
  internalHealthPort: 6061
  externalHealthPort: 6061
ingress:
  enabled: false
  # Used to create Ingress record (should used with service.type: ClusterIP).
  hosts:
    - clair-clair
  annotations:
    # kubernetes.io/ingress.global-static-ip-name: "test-ip"
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local
resources:
  limits:
    cpu: 200m
    memory: 1500Mi
  requests:
    cpu: 100m
    memory: 500Mi
config:
  # postgresURI: "postgres://user:password@host:5432/postgres?sslmode=disable"
  paginationKey: 'XxoPtCUzrUv4JV5dS+yQ+MdW7yLEJnRMwigVY/bpgtQ='
  updateInterval: 2h
  notificationWebhookEndpoint: https://example.com/notify/me
  enabledUpdaters:
    - debian
    - ubuntu
    - rhel
    - oracle
    - alpine
  enabledNamespaceDetectors:
    - os-release
    - lsb-release
    - apt-sources
    - alpine-release
    - redhat-release
  enabledFeatureListers:
    - apk
    - dpkg
    - rpm
# Configuration values for the postgresql dependency.
# ref: https://github.com/kubernetes/charts/blob/master/stable/postgresql/README.md
postgresql:
  # The dependant Postgres chart can be disabled, to connect to
  # an existing database by defining config.postgresURI
  enabled: true
  cpu: 1000m
  memory: 1Gi
  # These values are hardcoded until Helm supports secrets.
  # For more info see: https://github.com/kubernetes/helm/issues/2196
  postgresUser: clair
  postgresPassword: clair
  postgresDatabase: clair

  persistence:
    size: 10Gi
```

</details>
