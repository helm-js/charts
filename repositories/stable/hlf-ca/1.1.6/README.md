# `@helm-charts/stable-hlf-ca`

Hyperledger Fabric Certificate Authority chart (these charts are created by AID:Tech and are currently not directly associated with the Hyperledger project)

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | hlf-ca |
| Chart Version       | 1.1.6  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Default values for hlf-ca.
## This is a YAML-formatted file.
## Declare variables to be passed into your templates.

image:
  repository: hyperledger/fabric-ca
  tag: 1.3.0
  pullPolicy: IfNotPresent

service:
  ## Cluster IP or LoadBalancer
  type: ClusterIP
  port: 7054

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # certmanager.k8s.io/cluster-issuer: "letsencrypt-staging"
  path: /
  hosts:
    - hlf-ca.local
  tls: []
  #  - secretName: hlf-ca-tls
  #    hosts:
  #      - hlf-ca.local

persistence:
  enabled: true
  annotations: {}
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  storageClass: ''
  accessMode: ReadWriteOnce
  size: 1Gi
  # existingClaim: ""

##################################
## Further configuration options #
##################################
## CA Admin Username
adminUsername: admin
## CA Admin password (set to 24 random characters by default)
# adminPassword:
## Name of CA, stored in FABRIC_CA_SERVER_CA_NAME (and the configMap "--config", if deploying a Root CA)
caName: org1-ca

##
## Fabric CA Database
## By default an sqlite3 in-memory database is used
## To install a 'postgresql' or 'mysql' database, enable and configure the configuration below
##################################
##
db:
  # SSL authentication
  # Supported values are: "disable", "require", "verify-ca" and "verify-full".
  # https://github.com/hyperledger/fabric-ca/blob/master/docs/source/users-guide.rst
  ssl: disable

##
## PostgreSQL chart configuration
##
## https://github.com/helm/charts/tree/master/stable/postgresql
##
postgresql:
  ## Whether to deploy a postgres server to satisfy the Fabric CA database requirements.
  # To use an external database set this to false and configure the externalDatabase parameters, specifying the type to 'postgres'
  enabled: false
  image:
    registry: docker.io
    repository: 'bitnami/postgresql'
    tag: '10.6.0'
  postgresqlDatabase: fabric_ca
  postgresqlUsername: fabric_ca

##
## MySQL chart configuration
##
## https://github.com/helm/charts/tree/master/stable/mysql
##
mysql:
  ## Whether to deploy a mysql server to satisfy the Fabric CA database requirements.
  # To use an external database set this to false and configure the externalDatabase parameters, specifying the type to 'mysql'
  enabled: false
  image: 'mysql'
  imageTag: '5.7.14'
  mysqlDatabase: fabric_ca
  mysqlUser: fabric_ca
  # Custom mysql configuration to remove SQL Mode NO_ZERO_DATE because the Fabric CA schema defines TIMESTAMP to 0 by default
  # https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html
  configurationFiles:
    mysql.cnf: |-
      [mysqld]
      sql-mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

##
## External Database configuration (MySQL or PostgresSQL installed on/off Kubernetes)
##
externalDatabase:
  # Either postgres or mysql
  type:
  host: ''
  port: ''
  database: ''
  username: ''
  password: ''

## Settings used in configMap "--config"
config:
  hlfToolsVersion: 1.3.0
  ## Mount the TLS certificate & key to disk?
  mountTLS: false
  ## Enable debug logging in ca Server configuration file
  debug: true
  ## CSR pathlength in ca Server configuration file
  csr:
    ca:
      pathlength: 1
    names:
      c: US
      st: 'North Carolina'
      l:
      o: Hyperledger
      ou: Fabric
  ## "intermediate" is only specified for Intermediate CA's
  # intermediate:
  #   parent:
  #     chart: parent-ca
  #     url: parent-ca.example.com
  #     port: 7054
  ## Affiliations used in ca Server configuration file
  affiliations:
    org1: []

resources:
  {}
  ## We usually recommend not to specify default resources and to leave this as a conscious
  ## choice for the user. This also increases chances charts run on environments with little
  ## resources, such as Minikube. If you do want to specify resources, uncomment the following
  ## lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

nodeSelector: {}

tolerations: []

affinity:
  {}
  ## Suggested antiAffinity, as each CA should be on a separate Node for resilience
  # podAntiAffinity:
  #   requiredDuringSchedulingIgnoredDuringExecution:
  #     - topologyKey: "kubernetes.io/hostname"
  #       labelSelector:
  #         matchLabels:
  #           app: hlf-ca
```

</details>

---

# Hyperledger Fabric CA

[Hyperledger Fabric CA](http://hyperledger-fabric-ca.readthedocs.io/) is a Certificate Authority node for the [Hyperledger](https://www.hyperledger.org/) Fabric permissioned blockchain framework. Learn more about it by visiting the [user's guide](http://hyperledger-fabric-ca.readthedocs.io/en/latest/users-guide.html#).

## TL;DR;

```bash
$ helm install stable/hlf-ca
```

## Introduction

The Hyperledger Fabric CA can be installed as either a Root CA, or an intermediate CA (by pointing to a parent CA, which can itself be a Root CA or an intermediate).

This CA can then be used to register and enroll identities for clients, admins and nodes of the Hyperledger Fabric network.

## Prerequisites

- Kubernetes 1.9+
- PV provisioner support in the underlying infrastructure.

## Installing the Chart

To install the chart with the release name `org1-ca`:

```bash
$ helm install stable/hlf-ca --name org1-ca
```

The command deploys the Hyperledger Fabric CA on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

### Custom parameters

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install stable/hlf-ca --name org1-ca --set adminUsername=ca-admin,adminPassword=secretpassword
```

The above command creates a CA Admin user named `ca-admin` with password `secretpassword`.

Alternatively, a YAML file can be provided while installing the chart. This file specifies values to override those provided in the default values.yaml. For example,

```bash
$ helm install stable/hlf-ca --name org1-ca -f my-values.yaml
```

## Updating the chart

When updating the chart, make sure you provide the `adminPassword`, otherwise `helm update` will generate a new random (and invalid) password.

```bash
$ export CA_PASSWORD=$(kubectl get secret --namespace {{ .Release.Namespace }} org1-ca -o jsonpath="{.data.CA_PASSWORD}" | base64 --decode; echo)
$ helm upgrade org1-ca stable/hlf-ca --set adminPassword=$CA_PASSWORD
```

## Uninstalling the Chart

To uninstall/delete the `org1-ca` deployment:

```bash
$ helm delete org1-ca
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Hyperledger Fabric CA chart and default values.

| Parameter                          | Description                                       | Default                           |
| ---------------------------------- | ------------------------------------------------- | --------------------------------- |
| `image.repository`                 | `hlf-ca` image repository                         | `hyperledger/fabric-ca`           |
| `image.tag`                        | `hlf-ca` image tag                                | `x86_64-1.1.0`                    |
| `image.pullPolicy`                 | Image pull policy                                 | `IfNotPresent`                    |
| `service.port`                     | TCP port                                          | `7054`                            |
| `service.type`                     | K8S service type exposing ports, e.g. `ClusterIP` | `ClusterIP`                       |
| `ingress.enabled`                  | If true, Ingress will be created                  | `false`                           |
| `ingress.annotations`              | Ingress annotations                               | `{}`                              |
| `ingress.path`                     | Ingress path                                      | `/`                               |
| `ingress.hosts`                    | Ingress hostnames                                 | `[]`                              |
| `ingress.tls`                      | Ingress TLS configuration                         | `[]`                              |
| `persistence.existingClaim`        | Name of an existing PVC to use for Fabric CA      | `nil`                             |
| `persistence.accessMode`           | Use volume as ReadOnly or ReadWrite               | `ReadWriteOnce`                   |
| `persistence.annotations`          | Persistent Volume annotations                     | `{}`                              |
| `persistence.size`                 | Size of data volume                               | `1Gi`                             |
| `persistence.storageClass`         | Storage class of backing PVC                      | `default`                         |
| `adminUsername`                    | Admin Username for CA                             | `admin`                           |
| `adminPassword`                    | Admin Password                                    | Random 24 alphanumeric characters |
| `caName`                           | Name of CA                                        | `org1-ca`                         |
| `db.ssl`                           | SSL Authentication                                | `disable`                         |
| `postgresql.enabled`               | Deploy a PostgreSQL container holding the CA data | `false`                           |
| `mysql.enabled`                    | Deploy a MySQL container holding the CA data      | `false`                           |
| `externalDatabase.type`            | Database type (either `postgres` or `mysql` )     | `nil`                             |
| `externalDatabase.host`            | Host of the external database                     | `localhost`                       |
| `externalDatabase.username`        | Existing username in the external db              | ``                                |
| `externalDatabase.password`        | Password for the above username                   | ``                                |
| `externalDatabase.database`        | Name of the existing database                     | ``                                |
| `externalDatabase.port`            | Database port number                              | ``                                |
| `config.hlfToolsVersion`           | Version of Hyperledger Fabric tools used          | `1.1.0`                           |
| `config.mountTLS`                  | If TLS secrets are generated, do we mount them?   | `false`                           |
| `config.debug`                     | Enable debug logging                              | `true`                            |
| `config.csr.ca.pathlength`         | Pathlength of CA certificate hierarchy            | `1`                               |
| `config.csr.names.c`               | Country to which CA belongs                       | `US`                              |
| `config.csr.names.st`              | State to which CA belongs                         | `North Carolina`                  |
| `config.csr.names.l`               | Locality to which CA belongs                      | ``                                |
| `config.csr.names.o`               | Organization to which CA belongs                  | `Hyperledger`                     |
| `config.csr.names.ou`              | Organizational Unit to which CA belongs           | `Fabric`                          |
| `config.intermediate`              | Structure defining that CA is intermediate        | `nil`                             |
| `config.intermediate.parent.chart` | Which hlf-ca chart acts as parent to this CA      | `nil`                             |
| `config.intermediate.parent.url`   | URL of parent CA                                  | `nil`                             |
| `config.intermediate.parent.port`  | Port of parent CA                                 | `nil`                             |
| `config.affiliations`              | Affiliations for CA                               | `{org1: [] }`                     |
| `resources`                        | CPU/Memory resource requests/limits               | `{}`                              |
| `nodeSelector`                     | Node labels for pod assignment                    | `{}`                              |
| `tolerations`                      | Toleration labels for pod assignment              | `[]`                              |
| `affinity`                         | Affinity settings for pod assignment              | `{}`                              |

## Database

The Fabric CA server needs a database to store the users registered.

By default the chart is configured to use an in-memory `sqlite3` database, but you can also configure the helm chart to install a `PostgreSQL` or a `MySQL` database along the Fabric CA server.

### PostgreSQL

To install a `postgresql` running in Kubernetes you have to enable and configure the `postgresql` section in `values.yaml` or pass the following parameter:

```
 helm install stable/hlf-ca --name org1-ca --set postgresql.enabled=true
```

### MySQL

To install a `mysql` running in Kubernetes you have to enable and configure the `mysql` section in `values.yaml` or pass the following parameter:

```
 helm install stable/hlf-ca --name org1-ca --set mysql.enabled=true
```

### External Database

In case you already setup a database (`postgres` or `mysql`), you can enable and configure the `externalDatabase` section in `values.yaml` or pass the following parameters:`

```
 helm install stable/hlf-ca --name org1-ca \
   --set externalDatabase.type=mysql \
   --set externalDatabase.host=myhost \
   --set externalDatabase.username=myuser \
   --set externalDatabase.password=mypassword \
   --set externalDatabase.database=mydatabase
```

Please consult the [documentation](https://hyperledger-fabric-ca.readthedocs.io/en/latest/users-guide.html?highlight=database#configuring-the-database) for mode details.

## Persistence

The volume stores the Fabric_CA data and configurations at the `/var/hyperledger` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning through a PersistentVolumeClaim managed by the chart.

## Feedback and feature requests

This is a work in progress and we are happy to accept feature requests. We are even happier to accept pull requests implementing improvements :-)
