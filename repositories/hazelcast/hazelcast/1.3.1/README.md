# `@helm-charts/hazelcast-hazelcast`

Hazelcast IMDG is the most widely used in-memory data grid with hundreds of thousands of installed clusters around the world. It offers caching solutions ensuring that data is in the right place when it’s needed for optimal performance.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | hazelcast |
| Chart Name          | hazelcast |
| Chart Version       | 1.3.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Hazelcast image version
## ref: https://hub.docker.com/r/hazelcast/hazelcast-kubernetes/tags/
##
image:
  # repository is the Hazelcast image name
  repository: 'hazelcast/hazelcast'
  # tag is the Hazelcast image tag
  tag: '3.11.2'
  # pullPolicy is the Docker image pull policy
  # It's recommended to change this to 'Always' if the image tag is 'latest'
  # ref: http://kubernetes.io/docs/user-guide/images/#updating-images
  #
  pullPolicy: IfNotPresent
  # pullSecrets is an array of docker-registry secret names
  # Secrets must be manually created in the namespace.
  # ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  # pullSecrets:
  # - myRegistryKeySecretName

# Cluster settings
cluster:
  # memberCount is the number Hazelcast members
  memberCount: 2

# Hazelcast properties
hazelcast:
  # rest is a flag used to enable REST endpoints for Hazelcast member
  rest: true
  # javaOpts are additional JAVA_OPTS properties for Hazelcast member
  javaOpts:
  # configurationFiles are Hazelcast configuration files
  configurationFiles:
    hazelcast.xml: |-
      <?xml version="1.0" encoding="UTF-8"?>
      <hazelcast xsi:schemaLocation="http://www.hazelcast.com/schema/config hazelcast-config-3.10.xsd"
                     xmlns="http://www.hazelcast.com/schema/config"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

        <properties>
          <property name="hazelcast.discovery.enabled">true</property>
        </properties>
        <network>
          <join>
            <multicast enabled="false"/>
            <kubernetes enabled="true">
              <service-name>${serviceName}</service-name>
              <namespace>${namespace}</namespace>
              <resolve-not-ready-addresses>true</resolve-not-ready-addresses>
            </kubernetes>
          </join>
        </network>

        <management-center enabled="${hazelcast.mancenter.enabled}">${hazelcast.mancenter.url}</management-center>
      </hazelcast>

# nodeSelector is an array of Hazelcast Node labels for POD assignments
# ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

gracefulShutdown:
  enabled: true
  maxWaitSeconds: 600

# Hazelcast Liveness probe
livenessProbe:
  # enabled is a flag to used to enable liveness probe
  enabled: true
  # initialDelaySeconds is a delay before liveness probe is initiated
  initialDelaySeconds: 30
  # periodSeconds decides how often to perform the probe
  periodSeconds: 10
  # timeoutSeconds decides when the probe times out
  timeoutSeconds: 10
  # successThreshold is the minimum consecutive successes for the probe to be considered successful after having failed
  successThreshold: 1
  # failureThreshold is the minimum consecutive failures for the probe to be considered failed after having succeeded
  failureThreshold: 10

# Hazelcast Readiness probe
readinessProbe:
  # enabled is a flag to used to enable readiness probe
  enabled: true
  # initialDelaySeconds is a delay before readiness probe is initiated
  initialDelaySeconds: 30
  # periodSeconds decides how often to perform the probe
  periodSeconds: 10
  # timeoutSeconds decides when the probe times out
  timeoutSeconds: 10
  # successThreshold is the minimum consecutive successes for the probe to be considered successful after having failed
  successThreshold: 1
  # failureThreshold is the minimum consecutive failures for the probe to be considered failed after having succeeded
  failureThreshold: 10

# Configure resource requests and limits
# ref: http://kubernetes.io/docs/user-guide/compute-resources/
#
# resources:
#   requests:
#     memory: 256Mi
#     cpu: 100m
#   limits:
#     memory: 1024Mi
#     cpu: 200m

# Hazelcast Service properties
service:
  # type defines the Kubernetes service type ('ClusterIP', 'LoadBalancer', or 'NodePort')
  type: ClusterIP
  # port is the Kubernetes service port
  port: 5701
  # clusterIP set to None makes the service headless
  # It is required if DNS Lookup is used (https://github.com/hazelcast/hazelcast-kubernetes#dns-lookup)
  # clusterIP: "None"

# Role-based Access Control
rbac:
  # Specifies whether RBAC resources should be created
  # It is not required if DNS Lookup is used (https://github.com/hazelcast/hazelcast-kubernetes#dns-lookup)
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

# Security Context properties
securityContext:
  # enabled is a flag to enable Security Context
  enabled: true
  # runAsUser is the user ID used to run the container
  runAsUser: 65534
  # fsGroup is the group ID associated with the container
  fsGroup: 65534

# Allows to enable a Prometheus to scrape pods, implemented for Hazelcast version >= 3.12 (or 'latest')
metrics:
  enabled: false
  service:
    type: ClusterIP
    port: 8080
    annotations:
      prometheus.io/scrape: 'true'
      prometheus.io/path: '/metrics'

# customVolume is the configuration for any volume mounted as '/data/custom/' (e.g. to mount a volume with custom JARs)
# customVolume:

# Hazelcast Management Center application properties
mancenter:
  # enabled is a flag to enable Management Center application
  enabled: true
  ## Hazelcast Management Center image version
  ## ref: https://hub.docker.com/r/hazelcast/management-center/tags/
  ##
  image:
    # repository is the Hazelcast Management Center image name
    repository: 'hazelcast/management-center'
    # tag is the Hazelcast Management Center image tag
    tag: '3.11'
    # pullPolicy is the Docker image pull policy
    # It's recommended to change this to 'Always' if the image tag is 'latest'
    # ref: http://kubernetes.io/docs/user-guide/images/#updating-images
    #
    pullPolicy: IfNotPresent
    # pullSecrets is an array of docker-registry secret names
    # Secrets must be manually created in the namespace.
    # ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    # pullSecrets:
    # - myRegistryKeySecretName

  # ingress configuration for mancenter
  ingress:
    enabled: false
    annotations: {}
    # hosts:
    # - hazelcast-mancenter.cluster.domain
    # tls:
    # - secretName: hazelcast-ingress-tls
    #   hosts:
    #   - hazelcast-mancenter.cluster.domain

  # javaOpts are additional JAVA_OPTS properties for Hazelcast Management Center
  javaOpts:

  # licenseKey is the license key for Hazelcast Management Center
  # if not provided, it can be filled in the Management Center web interface
  licenseKey:
  # licenseKeySecretName is the name of the secret where the Hazelcast Management Center License Key is stored (can be used instead of licenseKey)
  # licenseKeySecretName:

  # nodeSelector is an array of Hazelcast Management Center Node labels for POD assignments
  # ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
  nodeSelector: {}

  # Configure resource requests and limits
  # ref: http://kubernetes.io/docs/user-guide/compute-resources/
  #
  # resources:
  #   requests:
  #     memory: 256Mi
  #     cpu: 100m
  #   limits:
  #     memory: 1024Mi
  #     cpu: 200m

  # Management Center persistence properties
  persistence:
    # enabled is a flag to enable persistence for Management Center
    enabled: true
    # existingClaim is a name of the existing Persistence Volume Claim that will be used for persistence
    # if not defined, a new Persistent Value Claim is created with the default name
    # existingClaim:
    # accessModes defines the access modes for the created Persistent Volume Claim
    accessModes:
      - ReadWriteOnce
    # size is the size of Persistent Volume Claim
    size: 8Gi

  # Hazelcast Management Center Service properties
  service:
    # type defines the Kubernetes service type ('ClusterIP', 'LoadBalancer', or 'NodePort')
    type: LoadBalancer
    # port is the Kubernetes service port
    port: 8080

  # Hazelcast Management Center Liveness probe
  livenessProbe:
    # enabled is a flag to used to enable liveness probe
    enabled: true
    # initialDelaySeconds is a delay before liveness probe is initiated
    initialDelaySeconds: 30
    # periodSeconds decides how often to perform the probe
    periodSeconds: 10
    # timeoutSeconds decides when the probe times out
    timeoutSeconds: 5
    # successThreshold is the minimum consecutive successes for the probe to be considered successful after having failed
    successThreshold: 1
    # failureThreshold is the minimum consecutive failures for the probe to be considered failed after having succeeded
    failureThreshold: 3
  # Hazelcast Management Center Readiness probe
  readinessProbe:
    # enabled is a flag to used to enable readiness probe
    enabled: true
    # initialDelaySeconds is a delay before readiness probe is initiated
    initialDelaySeconds: 30
    # periodSeconds decides how often to perform the probe
    periodSeconds: 10
    # timeoutSeconds decides when the probe times out
    timeoutSeconds: 1
    # successThreshold is the minimum consecutive successes for the probe to be considered successful after having failed
    successThreshold: 1
    # failureThreshold is the minimum consecutive failures for the probe to be considered failed after having succeeded
    failureThreshold: 3
```

</details>

---

# Hazelcast

[Hazelcast IMDG](http://hazelcast.com/) is the most widely used in-memory data grid with hundreds of thousands of installed clusters around the world. It offers caching solutions ensuring that data is in the right place when it’s needed for optimal performance.

## Quick Start

```bash
$ helm repo add hazelcast https://hazelcast.github.io/charts/
$ helm repo update
$ helm install hazelcast/hazelcast
```

## Introduction

This chart bootstraps a [Hazelcast](https://github.com/hazelcast/hazelcast-docker/tree/master/hazelcast-kubernetes) and [Management Center](https://github.com/hazelcast/management-center-docker) deployments on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release hazelcast/hazelcast
```

The command deploys Hazelcast on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Hazelcast chart and their default values.

| Parameter                                      | Description                                                                                                              | Default                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `image.repository`                             | Hazelcast Image name                                                                                                     | `hazelcast/hazelcast-kubernetes` |
| `image.tag`                                    | Hazelcast Image tag                                                                                                      | `{VERSION}`                      |
| `image.pullPolicy`                             | Image pull policy                                                                                                        | `IfNotPresent`                   |
| `image.pullSecrets`                            | Specify docker-registry secret names as an array                                                                         | `nil`                            |
| `cluster.memberCount`                          | Number of Hazelcast members                                                                                              | 2                                |
| `hazelcast.rest`                               | Enable REST endpoints for Hazelcast member                                                                               | `true`                           |
| `hazelcast.javaOpts`                           | Additional JAVA_OPTS properties for Hazelcast member                                                                     | `nil`                            |
| `hazelcast.configurationFiles`                 | Hazelcast configuration files                                                                                            | `{DEFAULT_HAZELCAST_XML}`        |
| `nodeSelector`                                 | Hazelcast Node labels for pod assignment                                                                                 | `nil`                            |
| `gracefulShutdown.enabled`                     | Turn on and off Graceful Shutdown                                                                                        | `true`                           |
| `gracefulShutdown.maxWaitSeconds`              | Maximum time to wait for the Hazelcast POD to shut down                                                                  | `600`                            |
| `livenessProbe.enabled`                        | Turn on and off liveness probe                                                                                           | `true`                           |
| `livenessProbe.initialDelaySeconds`            | Delay before liveness probe is initiated                                                                                 | `30`                             |
| `livenessProbe.periodSeconds`                  | How often to perform the probe                                                                                           | `10`                             |
| `livenessProbe.timeoutSeconds`                 | When the probe times out                                                                                                 | `5`                              |
| `livenessProbe.successThreshold`               | Minimum consecutive successes for the probe to be considered successful after having failed                              | `1`                              |
| `livenessProbe.failureThreshold`               | Minimum consecutive failures for the probe to be considered failed after having succeeded.                               | `3`                              |
| `readinessProbe.enabled`                       | Turn on and off readiness probe                                                                                          | `true`                           |
| `readinessProbe.initialDelaySeconds`           | Delay before readiness probe is initiated                                                                                | `30`                             |
| `readinessProbe.periodSeconds`                 | How often to perform the probe                                                                                           | `10`                             |
| `readinessProbe.timeoutSeconds`                | When the probe times out                                                                                                 | `1`                              |
| `readinessProbe.successThreshold`              | Minimum consecutive successes for the probe to be considered successful after having failed                              | `1`                              |
| `readinessProbe.failureThreshold`              | Minimum consecutive failures for the probe to be considered failed after having succeeded.                               | `3`                              |
| `resources`                                    | CPU/Memory resource requests/limits                                                                                      | `nil`                            |
| `service.type`                                 | Kubernetes service type ('ClusterIP', 'LoadBalancer', or 'NodePort')                                                     | `ClusterIP`                      |
| `service.port`                                 | Kubernetes service port                                                                                                  | `5701`                           |
| `rbac.create`                                  | Enable installing RBAC Role authorization                                                                                | `true`                           |
| `serviceAccount.create`                        | Enable installing Service Account                                                                                        | `true`                           |
| `serviceAccount.name`                          | Name of Service Account, if not set, the name is generated using the fullname template                                   | `nil`                            |
| `securityContext.enabled`                      | Enables Security Context for Hazelcast and Management Center                                                             | `true`                           |
| `securityContext.runAsUser`                    | User ID used to run the Hazelcast and Management Center containers                                                       | `65534`                          |
| `securityContext.fsGroup`                      | Group ID associated with the Hazelcast and Management Center container                                                   | `65534`                          |
| `metrics.enabled`                              | Turn on and off JMX Prometheus metrics available at `/metrics`                                                           | `false`                          |
| `metrics.service.type`                         | Type of the metrics service                                                                                              | `ClusterIP`                      |
| `metrics.service.port`                         | Port of the `/metrics` endpoint and the metrics service                                                                  | `8080`                           |
| `metrics.service.annotations`                  | Annotations for the Prometheus discovery                                                                                 |                                  |
| `customVolume`                                 | Configuration for a volume mounted as '/data/custom' (e.g. to mount a volume with custom JARs)                           | `nil`                            |
| `mancenter.enabled`                            | Turn on and off Management Center application                                                                            | `true`                           |
| `mancenter.image.repository`                   | Hazelcast Management Center Image name                                                                                   | `hazelcast/management-center`    |
| `mancenter.image.tag`                          | Hazelcast Management Center Image tag (NOTE: must be the same or one minor release greater than Hazelcast image version) | `{VERSION}`                      |
| `mancenter.image.pullPolicy`                   | Image pull policy                                                                                                        | `IfNotPresent`                   |
| `mancenter.image.pullSecrets`                  | Specify docker-registry secret names as an array                                                                         | `nil`                            |
| `mancenter.javaOpts`                           | Additional JAVA_OPTS properties for Hazelcast Management Center                                                          | `nil`                            |
| `mancenter.licenseKey`                         | License Key for Hazelcast Management Center, if not provided, can be filled in the web interface                         | `nil`                            |
| `mancenter.licenseKeySecretName`               | Kubernetes Secret Name, where Management Center License Key is stored (can be used instead of licenseKey)                | `nil`                            |
| `mancenter.nodeSelector`                       | Hazelcast Management Center node labels for pod assignment                                                               | `nil`                            |
| `mancenter.resources`                          | CPU/Memory resource requests/limits                                                                                      | `nil`                            |
| `mancenter.persistence.enabled`                | Enable Persistent Volume for Hazelcast Management                                                                        | `true`                           |
| `mancenter.persistence.existingClaim`          | Name of the existing Persistence Volume Claim, if not defined, a new is created                                          | `nil`                            |
| `mancenter.persistence.accessModes`            | Access Modes of the new Persistent Volume Claim                                                                          | `ReadWriteOnce`                  |
| `mancenter.persistence.size`                   | Size of the new Persistent Volume Claim                                                                                  | `8Gi`                            |
| `mancenter.service.type`                       | Kubernetes service type ('ClusterIP', 'LoadBalancer', or 'NodePort')                                                     | `LoadBalancer`                   |
| `mancenter.service.port`                       | Kubernetes service port                                                                                                  | `5701`                           |
| `mancenter.livenessProbe.enabled`              | Turn on and off liveness probe                                                                                           | `true`                           |
| `mancenter.livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                                                 | `30`                             |
| `mancenter.livenessProbe.periodSeconds`        | How often to perform the probe                                                                                           | `10`                             |
| `mancenter.livenessProbe.timeoutSeconds`       | When the probe times out                                                                                                 | `5`                              |
| `mancenter.livenessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed                              | `1`                              |
| `mancenter.livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.                               | `3`                              |
| `mancenter.readinessProbe.enabled`             | Turn on and off readiness probe                                                                                          | `true`                           |
| `mancenter.readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated                                                                                | `30`                             |
| `mancenter.readinessProbe.periodSeconds`       | How often to perform the probe                                                                                           | `10`                             |
| `mancenter.readinessProbe.timeoutSeconds`      | When the probe times out                                                                                                 | `1`                              |
| `mancenter.readinessProbe.successThreshold`    | Minimum consecutive successes for the probe to be considered successful after having failed                              | `1`                              |
| `mancenter.readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe to be considered failed after having succeeded.                               | `3`                              |
| `mancenter.ingress.enabled`                    | Enable ingress for the management center                                                                                 | `false`                          |
| `mancenter.ingress.annotations`                | Any annotations for the ingress                                                                                          | `{}`                             |
| `mancenter.ingress.hosts`                      | List of hostnames for ingress, see `values.yaml` for example                                                             | `[]`                             |
| `mancenter.ingress.tls`                        | List of TLS configuration for ingress, see `values.yaml` for example                                                     | `[]`                             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set cluster.memberCount=3,hazelcast.rest=false \
    hazelcast/hazelcast
```

The above command sets number of Hazelcast members to 3 and disables REST endpoints.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml hazelcast/hazelcast
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Custom Hazelcast configuration

Custom Hazelcast configuration can be specified inside `values.yaml`, as the `hazelcast.configurationFiles.hazelcast.xml` property.

```yaml
hazelcast:
  configurationFiles:
    hazelcast.xml: |-
      <?xml version="1.0" encoding="UTF-8"?>
      <hazelcast xsi:schemaLocation="http://www.hazelcast.com/schema/config hazelcast-config-3.10.xsd"
                     xmlns="http://www.hazelcast.com/schema/config"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

        <properties>
          <property name="hazelcast.discovery.enabled">true</property>
        </properties>
        <network>
          <join>
            <multicast enabled="false"/>
            <tcp-ip enabled="false" />
            <discovery-strategies>
              <discovery-strategy enabled="true" class="com.hazelcast.kubernetes.HazelcastKubernetesDiscoveryStrategy">
              </discovery-strategy>
            </discovery-strategies>
          </join>
        </network>

        <management-center enabled="${hazelcast.mancenter.enabled}">${hazelcast.mancenter.url}</management-center>

        <!-- Custom Configuration Placeholder -->
      </hazelcast>
```
