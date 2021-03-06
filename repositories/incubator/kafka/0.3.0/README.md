# `@helm-charts/incubator-kafka`

Apache Kafka is publish-subscribe messaging rethought as a distributed commit log.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | kafka     |
| Chart Version       | 0.3.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# ------------------------------------------------------------------------------
# Kafka:
# ------------------------------------------------------------------------------

## The StatefulSet installs 3 pods by default
replicas: 3

## The kafka image repository
image: 'confluentinc/cp-kafka'

## The kafka image tag
imageTag: '4.0.0'

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
imagePullPolicy: 'IfNotPresent'

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
resources:
  {}
  # limits:
  #   cpu: 200m
  #   memory: 1536Mi
  # requests:
  #   cpu: 100m
  #   memory: 1024Mi

## The StatefulSet Update Strategy which Kafka will use when changes are applied.
## ref: https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#update-strategies
updateStrategy:
  type: 'OnDelete'

## The name of the storage class which the cluster should use.
# storageClass: default

## The subpath within the Kafka container's PV where logs will be stored.
## This is combined with `persistence.mountPath`, to create, by default: /opt/kafka/data/logs
logSubPath: 'logs'

## Pod scheduling preferences.
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
##
affinity: {}

## Node labels for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
nodeSelector: {}

## Configuration Overrides. Specify any Kafka settings you would like set on the StatefulSet
## here in map format, as defined in the official docs.
## ref: https://kafka.apache.org/documentation/#brokerconfigs
##
configurationOverrides:
  'offsets.topic.replication.factor': 3

## Persistence configuration. Specify if and how to persist data to a persistent volume.
##
persistence:
  enabled: true

  ## The size of the PersistentVolume to allocate to each Kafka Pod in the StatefulSet. For
  ## production servers this number should likely be much larger.
  ##
  size: '1Gi'

  ## The location within the Kafka container where the PV will mount its storage and Kafka will
  ## store its logs.
  ##
  mountPath: '/opt/kafka/data'

  ## Kafka data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass:

# ------------------------------------------------------------------------------
# Zookeeper:
# ------------------------------------------------------------------------------

zookeeper:
  ## If true, install the Zookeeper chart alongside Kafka
  ## ref: https://github.com/kubernetes/charts/tree/master/incubator/zookeeper
  enabled: true

  ## Configure Zookeeper resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  resources: {}

  ## The JVM heap size to allocate to Zookeeper
  heap: '1G'

  ## The amount of PV storage allocated to each Zookeeper pod in the statefulset
  storage: '2Gi'

  ## Specify a Zookeeper imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  imagePullPolicy: 'IfNotPresent'

  ## If the Zookeeper Chart is disabled a URL and port are required to connect
  url: ''
  port: 2181
```

</details>

---

# Apache Kafka Helm Chart

This is an implementation of Kafka StatefulSet found here:

- https://github.com/Yolean/kubernetes-kafka

## Pre Requisites:

- Kubernetes 1.3 with alpha APIs enabled and support for storage classes

- PV support on underlying infrastructure

- Requires at least `v2.0.0-beta.1` version of helm to support
  dependency management with requirements.yaml

## StatefulSet Details

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/

## StatefulSet Caveats

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#limitations

## Chart Details

This chart will do the following:

- Implement a dynamically scalable kafka cluster using Kubernetes StatefulSets

- Implement a dynamically scalable zookeeper cluster as another Kubernetes StatefulSet required for the Kafka cluster above

### Installing the Chart

To install the chart with the release name `my-kafka` in the default
namespace:

```
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-kafka incubator/kafka
```

If using a dedicated namespace(recommended) then make sure the namespace
exists with:

```
$ kubectl create ns kafka
$ helm install --name my-kafka --set global.namespace=kafka incubator/kafka
```

This chart includes a ZooKeeper chart as a dependency to the Kafka
cluster in its `requirement.yaml` by default. The chart can be customized using the
following configurable parameters:

| Parameter                   | Description                                                                       | Default                                   |
| --------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------- |
| `image`                     | Kafka Container image name                                                        | `confluentinc/cp-kafka`                   |
| `imageTag`                  | Kafka Container image tag                                                         | `4.0.0`                                   |
| `imagePullPolicy`           | Kafka Container pull policy                                                       | `IfNotPresent`                            |
| `replicas`                  | Kafka Brokers                                                                     | `3`                                       |
| `component`                 | Kafka k8s selector key                                                            | `kafka`                                   |
| `resources`                 | Kafka resource requests and limits                                                | `{}`                                      |
| `logSubPath`                | Subpath under `persistence.mountPath` where kafka logs will be placed.            | `logs`                                    |
| `affinity`                  | Pod scheduling preferences                                                        | `{}`                                      |
| `configurationOverrides`    | `Kafka` [configuration setting][brokerconfigs] overrides in the dictionary format | `{ offsets.topic.replication.factor: 3 }` |
| `updateStrategy`            | StatefulSet update strategy to use.                                               | `{ type: "OnDelete" }`                    |
| `persistence.enabled`       | Use a PVC to persist data                                                         | `true`                                    |
| `persistence.size`          | Size of data volume                                                               | `1Gi`                                     |
| `persistence.mountPath`     | Mount path of data volume                                                         | `/opt/kafka/data`                         |
| `persistence.storageClass`  | Storage class of backing PVC                                                      | `nil`                                     |
| `zookeeper.enabled`         | If True, installs Zookeeper Chart                                                 | `true`                                    |
| `zookeeper.resources`       | Zookeeper resource requests and limits                                            | `{}`                                      |
| `zookeeper.heap`            | JVM heap size to allocate to Zookeeper                                            | `1G`                                      |
| `zookeeper.storage`         | Zookeeper Persistent volume size                                                  | `2Gi`                                     |
| `zookeeper.imagePullPolicy` | Zookeeper Container pull policy                                                   | `IfNotPresent`                            |
| `zookeeper.url`             | URL of Zookeeper Cluster (unneeded if installing Zookeeper Chart)                 | `""`                                      |
| `zookeeper.port`            | Port of Zookeeper Cluster                                                         | `2181`                                    |

Specify parameters using `--set key=value[,key=value]` argument to `helm install`

Alternatively a YAML file that specifies the values for the parameters can be provided like this:

```bash
$ helm install --name my-kafka -f values.yaml incubator/kafka
```

### Connecting to Kafka

You can connect to Kafka by running a simple pod in the K8s cluster like this with a configuration like this:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: testclient
  namespace: kafka
spec:
  containers:
    - name: kafka
      image: solsson/kafka:0.11.0.0
      command:
        - sh
        - -c
        - 'exec tail -f /dev/null'
```

Once you have the testclient pod above running, you can list all kafka
topics with:

`kubectl -n kafka exec -ti testclient -- ./bin/kafka-topics.sh --zookeeper my-release-zookeeper:2181 --list`

Where `my-release` is the name of your helm release.

## Extensions

Kafka has a rich ecosystem, with lots of tools. This sections is intended to compile all of those tools for which a corresponding Helm chart has already been created.

- [Schema-registry](https://github.com/kubernetes/charts/tree/master/incubator/schema-registry) - A confluent project that provides a serving layer for your metadata. It provides a RESTful interface for storing and retrieving Avro schemas.

## Known Limitations

- Topic creation is not automated
- Only supports storage options that have backends for persistent volume claims (tested mostly on AWS)
- Kafka cluster is not accessible via an external endpoint

[brokerconfigs]: https://kafka.apache.org/documentation/#brokerconfigs
