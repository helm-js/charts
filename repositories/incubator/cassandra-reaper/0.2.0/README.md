# `@helm-charts/incubator-cassandra-reaper`

Reaper is a centralized, stateful, and highly configurable tool for running Apache Cassandra repairs against single or multi-site clusters.

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | incubator        |
| Chart Name          | cassandra-reaper |
| Chart Version       | 0.2.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for cassandra-reaper.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

nameOverride: ''
fullnameOverride: ''

replicaCount: 1

image:
  repository: thelastpickle/cassandra-reaper
  tag: 1.3.0
  pullPolicy: IfNotPresent

service:
  type: ClusterIP

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  labels: {}
  path: /
  hosts: []
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local
  basicAuth:
    enabled: false
    name: ~
    # base64 encoded version of the basic auth file
    secret: ~

env: {}
resources: {}
nodeSelector: {}
tolerations: []
affinity: {}
```

</details>

---

# Cassandra

A cassandra-reaper Chart for Kubernetes

## Install Chart

To install the cassandra-reaper Chart into your Kubernetes cluster

```bash
helm install --namespace cassandra -n cassandra-reaper incubator/cassandra-reaper
```

If you want to delete your Chart, use this command

```bash
helm delete --purge cassandra-reaper
```

## Configuration

The following table lists the configurable parameters of the cassandra-reaper chart and their default values.

To properly configure `cassandra-reaper`, please refer to [the environment variables documentation](http://cassandra-reaper.io/docs/configuration/docker_vars/).

As `cassandra-reaper` currently lacks an authentication mechanism basic auth support is provided (whether this will work for you is dependent on your chosen ingress
controller). Check your ingress controllers documentation for how to specifically configure this as each implementation is slightly different. Note that you need to
provide a base64-encoded version of the auth string if you enable this feature.

Example:

```bash
htpassword -c ./auth myuser
cat ./auth | base64
```

| Parameter                   | Description                                             | Default                                   |
| --------------------------- | ------------------------------------------------------- | ----------------------------------------- |
| `replicaCount`              | The number of `cassandra-reaper` replicas               | `1`                                       |
| `image.repository`          | `cassandra-reaper` image repository                     | `thelastpickle/cassandra-reaper`          |
| `image.tag`                 | `cassandra-reaper` image tag                            | `1.3.0`                                   |
| `image.pullPolicy`          | Image pull policy                                       | `IfNotPresent`                            |
| `service.type`              | Kubernetes service type exposing ports, e.g. `NodePort` | `ClusterIP`                               |
| `ingress.enabled`           | Enable Ingress resource                                 | `false`                                   |
| `ingress.annotations`       | Annotations for Ingress resource                        | `{}`                                      |
| `ingress.labels`            | Additional labels for Ingress resource                  | `{}`                                      |
| `ingress.path`              | Path for Ingress resource                               | `/`                                       |
| `ingress.hosts`             | Ingress resource hosts                                  | `[]`                                      |
| `ingress.tls`               | Ingress resource TLS definition                         | `[]`                                      |
| `ingress.basicAuth.enabled` | Creates basic auth secret if true                       | `false`                                   |
| `ingress.basicAuth.name`    | Name of the basic auth secret resource                  | `basic-auth`                              |
| `ingress.basicAuth.secret`  | Base64 encoded contents of the basic auth file          | MUST be provided if basic auth is enabled |
| `env`                       | Environment variables                                   | `{}`                                      |
| `resources`                 | Resource requests/limits                                | `{}`                                      |
| `nodeSelector`              | Kubernetes node selector                                | `{}`                                      |
| `tolerations`               | Kubernetes node tolerations                             | `[]`                                      |
| `affinity`                  | Kubernetes node affinity                                | `{}`                                      |
