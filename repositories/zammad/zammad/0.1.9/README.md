# `@helm-charts/zammad-zammad`

Zammad is a web based open source helpdesk/customer support system with many features to manage customer communication via several channels like telephone, facebook, twitter, chat and e-mails.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | zammad |
| Chart Name          | zammad |
| Chart Version       | 0.1.9  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
useElasticsearch: true
useMemcached: true
usePostgresql: true

image:
  repository: zammad/zammad-docker-compose
  tag: 2.8.0-26
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations:
    ingress.kubernetes.io/proxy-body-size: 50m
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: zammad-tls
  #    hosts:
  #      - chart-example.local

# zammad containers can be configured by env vars
env:
  ELASTICSEARCH_HOST: zammad-elasticsearch-client
  ELASTICSEARCH_PORT: 9200
  MEMCACHED_HOST: zammad-memcached
  MEMCACHED_PORT: 11211
  POSTGRESQL_HOST: zammad-postgresql
  POSTGRESQL_PORT: 5432
  POSTGRESQL_USER: zammad
  POSTGRESQL_PASS: zammad
  POSTGRESQL_DB: zammad_production
  POSTGRESQL_DB_CREATE: false
  ZAMMAD_RAILSSERVER_HOST: zammad-railsserver
  ZAMMAD_RAILSSERVER_PORT: 3000
  ZAMMAD_WEBSOCKET_HOST: zammad-websocket
  ZAMMAD_WEBSOCKET_PORT: 6042

persistence:
  enabled: true
  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## Zammad data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 15Gi

# We usually recommend not to specify default resources and to leave this as a conscious
# choice for the user. This also increases chances charts run on environments with little
# resources, such as Minikube. If you do want to specify resources, uncomment the following
# lines, adjust them as necessary, and remove the curly braces after 'resources:'.
resources:
  nginx: {}
  # requests:
  #   cpu: 50m
  #   memory: 32Mi
  # limits:
  #   cpu: 100m
  #   memory: 64Mi
  railsserver:
    {}
    # requests:
    #   cpu: 100m
    #   memory: 512Mi
    # limits:
    #   cpu: 200m
    #   memory: 1024Mi
  scheduler:
    {}
    # requests:
    #   cpu: 100m
    #   memory: 256Mi
    # limits:
    #   cpu: 200m
    #   memory: 512Mi
  websocket:
    {}
    # requests:
    #   cpu: 100m
    #   memory: 256Mi
    # limits:
    #   cpu: 200m
    #   memory: 512Mi

nodeSelector: {}

tolerations: []

affinity: {}

elasticsearch:
  image:
    repository: 'zammad/zammad-docker-compose'
    tag: 'zammad-elasticsearch-2.8.0-26'
  cluster:
    xpackEnable: false
    # See README for proper configuration
    env:
      EXPECTED_MASTER_NODES: '1'
      MINIMUM_MASTER_NODES: '1'
      RECOVER_AFTER_MASTER_NODES: '1'
      XPACK_MONITORING_ENABLED: false
  client:
    replicas: 1
    # resources:
    #   requests:
    #     cpu: "25m"
    #     memory: "512Mi"
    #   limits:
    #     cpu: "300m"
    #     memory: "1024Mi"
  data:
    terminationGracePeriodSeconds: 60
    replicas: 1
    # resources:
    #   requests:
    #     cpu: "175m"
    #     memory: "1536Mi"
    #   limits:
    #     cpu: "350m"
    #     memory: "2048Mi"
  master:
    replicas: 1
    # resources:
    #   requests:
    #     cpu: "25m"
    #     memory: "512Mi"
    #   limits:
    #     cpu: "300m"
    #     memory: "1024Mi"

memcached:
  replicaCount: 1
  # resources:
  #   requests:
  #     cpu: 50m
  #     memory: 64Mi
  #   limits:
  #     cpu: 100m
  #     memory: 128Mi

postgresql:
  postgresqlUsername: zammad
  postgresqlPassword: zammad
  postgresqlDatabase: zammad_production
  # resources:
  #   requests:
  #     cpu: 250m
  #     memory: 256Mi
  #   limits:
  #     cpu: 500m
  #     memory: 512Mi
```

</details>

---

# Zammad Helm Chart

This directory contains a Kubernetes chart to deploy [Zammad](https://zammad.org/) ticket system.

## Prerequisites Details

- Kubernetes 1.8+

## Chart Details

This chart will do the following:

- Install Zammad deployment
- Install Elasticsearch, Memcached & PostgreSQL as requirements

## Installing the Chart

To install the chart use the following:

```console
$ helm repo add zammad https://zammad.github.io
$ helm upgrade --install zammad zammad/zammad  --namespace zammad
```

## Configuration

The following table lists the configurable parameters of the zammad chart and their default values.

| Parameter                                          | Description                                      | Default                         |
| -------------------------------------------------- | ------------------------------------------------ | ------------------------------- |
| `useElasticsearch`                                 | Use Elasticsearch dependency                     | `true`                          |
| `useMemcached`                                     | Use Memcached dependency                         | `true`                          |
| `usePostgresql`                                    | Use PostgreSQL dependency                        | `true`                          |
| `image.repository`                                 | Container image to use                           | `zammad/zammad-docker-compose`  |
| `image.tag`                                        | Container image tag to deploy                    | `2.8.0-26`                      |
| `image.pullPolicy`                                 | Container pull policy                            | `IfNotPresent`                  |
| `service.type`                                     | Service type                                     | `ClusterIP`                     |
| `service.port`                                     | Service port                                     | `80`                            |
| `ingress.enabled`                                  | Enable Ingress                                   | `false`                         |
| `ingress.annotations`                              | Additional ingress annotations                   | ``                              |
| `ingress.path`                                     | Ingress path                                     | ``                              |
| `ingress.hosts`                                    | Ingress hosts                                    | ``                              |
| `ingress.tls`                                      | Ingress TLS                                      | `[]`                            |
| `env`                                              | Environment variables                            | `See values.yaml`               |
| `persistence.enabled`                              | Enable persistence                               | `true`                          |
| `persistence.accessMode`                           | Access mode                                      | `ReadWriteOnce`                 |
| `persistence.size`                                 | Volume size                                      | `15Gi`                          |
| `resources.nginx`                                  | Resource usage of Zammad's nginx container       | `{}`                            |
| `resources.railsserver`                            | Resource usage of Zammad's railsserver container | `{}`                            |
| `resources.scheduler`                              | Resource usage of Zammad's scheduler container   | `{}`                            |
| `resources.websocket`                              | Resource usage of Zammad's websocket container   | `{}`                            |
| `nodeSelector`                                     | Node Selector                                    | `{}`                            |
| `tolerations`                                      | Tolerations                                      | `[]`                            |
| `affinity`                                         | Affinity                                         | `{}`                            |
| `elasticsearch.image.repository`                   | Elasticsearch image repo                         | `zammad/zammad-docker-compose`  |
| `elasticsearch.image.tag`                          | Elasticsearch image tag                          | `zammad-elasticsearch-2.8.0-26` |
| `elasticsearch.cluster.xpackEnable`                | Enable Elasticsearch Xpack option                | `false`                         |
| `elasticsearch.cluster.env`                        | Elasticsearch environment variables              | ``                              |
| `elasticsearch.client.replicas`                    | Elasticsearch client replicas                    | `1`                             |
| `elasticsearch.data.terminationGracePeriodSeconds` | Elasticsearch termination Grace Period           | `60`                            |
| `elasticsearch.data.replicas`                      | Elasticsearch data replicas                      | `1`                             |
| `elasticsearch.master.replicas`                    | Elasticsearch master replicas                    | `1`                             |
| `memcached.replicaCount`                           | Memcached replicas                               | `1`                             |
| `postgresql.postgresqlUsername`                    | PostgreSQL user                                  | `zammad`                        |
| `postgresql.postgresqlPassword`                    | PostgreSQL password                              | `zammad`                        |
| `postgresql.postgresqlDatabase`                    | PostgreSQL DB                                    | `zammad_production`             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

### Properly configuring Elasticsearch

The default **elasticsearch.yml** set by the Elasticsearch chart expects 2 masters. If using just 1 master replica, there are 3 environment variables which should be set equally to avoid issues starting Elasticsearch.

Set the following environment variables under **elasticsearch.cluster.env**. The Zammad StatefulSet will most likely fail without setting these correctly.

Refer to the Elasticsearch documentation for info on these variables. \[[1](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/modules-gateway.html)] \[[2](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/modules-node.html#split-brain)]

```yaml
elasticsearch:
  cluster:
    env:
      EXPECTED_MASTER_NODES: '1'
      MINIMUM_MASTER_NODES: '1'
      RECOVER_AFTER_MASTER_NODES: '1'
  master:
    replicas: 1
```

### Important note for NFS filesystems

For persistent volumes, NFS filesystems should work correctly for **Elasticsearch** and **PostgreSQL**; however, errors will occur if Zammad itself uses an NFS-based persistent volume. Websockets will break completely. This is particularly bad news for receiving notifications from the application and using the Chat module.

Don't use an NFS-based storage class for Zammad's persistent volume.

This is relevant to **EFS** for AWS users, as well.

## Using zammad

Once the zammad pod is ready, it can be accessed using the ingress or port forwarding:

```console
$ kubectl port-forward service/zammad 8080:80
```
