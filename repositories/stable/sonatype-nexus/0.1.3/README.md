# `@helm-charts/stable-sonatype-nexus`

Sonatype Nexus is an open source repository manager

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | stable         |
| Chart Name          | sonatype-nexus |
| Chart Version       | 0.1.3          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for nexus.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: clearent/nexus
  tag: 3.5.1-02
service:
  name: nexus
  type: LoadBalancer
  externalPort: 8081
  internalPort: 8081
  readinessProbe:
    initialDelaySeconds: 30
    periodSeconds: 30
    failureThreshold: 6
  livenessProbe:
    initialDelaySeconds: 30
    periodSeconds: 30
  annotations:
  # foo.io/bar: "true"
ingress:
  enabled: false
  # Used to create an Ingress record.
  # hosts:
  #  - nexus.local
  # annotations:
  #  kubernetes.io/ingress.class: nginx
  #  kubernetes.io/tls-acme: "true"
  # tls: {}
  # Secrets must be manually created in the namespace.
  #  - secretName: nexus-tls
  #    hosts:
  #      - nexus.local
## Configuration if choosing to host docker registry
docker:
  enabled: false
  # Used to enable a docker registry
  # port: 5509
  # host: docker.local
## Persist data to a persitent volume
persistence:
  enabled: true
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi
resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: "1"
  #  memory: "1Gi"
  # requests:
  #  cpu: "100m"
  #  memory: "128Mi"
```

</details>

---

# Nexus

[Nexus](https://www.sonatype.com/nexus-repository-oss) is the world's only repository manager with FREE support for popular formats

## Introduction

This chart bootstraps a sonatype nexus instance

## Prerequisites

- Kubernetes 1.6+

## Installing the Chart

To install the chart:

```bash
$ helm install stable/sonatype-nexus
```

The above command deploys Nexus on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

The default login is admin/admin123

## Uninstalling the Chart

to uninstall/delete the deployment:

```bash
$ helm list
NAME           	REVISION	UPDATED                 	STATUS  	CHART      	NAMESPACE
plinking-gopher	1       	Fri Sep  1 13:19:50 2017	DEPLOYED	nexus-0.1.0	default
$ helm delete plinking-gopher
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Nexus chart and their default values.

| Parameter                                    | Description                        | Default                                   |
| -------------------------------------------- | ---------------------------------- | ----------------------------------------- |
| `image.tag`                                  | `nexus` image tag.                 | 3.5.1-02                                  |
| `image.pullPolicy`                           | Image pull policy                  | `IfNotPresent`                            |
| `ingress.enabled`                            | Flag for enabling ingress          | false                                     |
| `persistence.enabled`                        | Create a volume to store data      | true                                      |
| `persistence.size`                           | Size of persistent volume to claim | 8Gi RW                                    |
| `persistence.storageClass`                   | Type of persistent volume claim    | nil (uses alpha storage class annotation) |
| `persistence.accessMode`                     | ReadWriteOnce or ReadOnly          | ReadWriteOnce                             |
| `service.type`                               | Kubernetes Service type            | `LoadBalancer`                            |
| `service.readinessProbe.initialDelaySeconds` | ReadinessProbe initial delay       | 30                                        |
| `service.readinessProbe.periodSeconds`       | Seconds between polls              | 30                                        |
| `service.readinessProbe.failureThreshold`    | Number of attempts before failure  | 6                                         |
| `service.livenessProbe.initialDelaySeconds`  | livenessProbe initial delay        | 30                                        |
| `service.livenessProbe.periodSeconds`        | Seconds between polls              | 30                                        |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set persistence.enabled=false \
    stable/sonatype-nexus
```

The above example turns off the persistence. Data will not be kept between restarts or deployments

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/sonatype-nexus
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Nexus](https://github.com/clearent/nexus) image stores its data and configurations at the `/nexus-data` path of the container.

By default a PersistentVolumeClaim is created and mounted into that directory. In order to disable this functionality
you can change the values.yaml to disable persistence and use an emptyDir instead.

> _"An emptyDir volume is first created when a Pod is assigned to a Node, and exists as long as that Pod is running on that node. When a Pod is removed from a node for any reason, the data in the emptyDir is deleted forever."_
