# JFrog Distribution Helm Chart

## Prerequisites Details

* Kubernetes 1.8+

## Chart Details
This chart does the following:

* Deploy PostgreSQL database.
* Deploy Redis.
* Deploy distributor.
* Deploy distribution.

## Requirements
- A running Kubernetes cluster
- Dynamic storage provisioning enabled
- Default StorageClass set to allow services using the default StorageClass for persistent storage
- A running Artifactory Enterprise Plus
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed and setup to use the cluster
- [Helm](https://helm.sh/) installed and setup to use the cluster (helm init)

## Installing the Chart

### Add JFrog Helm repository
Before installing JFrog helm charts, you need to add the [JFrog helm repository](https://charts.jfrog.io/) to your helm client
```bash
helm repo add jfrog https://charts.jfrog.io
```

### Install Chart
To install the chart with the release name `distribution`:
```bash
helm install --name distribution jfrog/distribution
```

### Accessing Distribution
**NOTE:** It might take a few minutes for Distribution's public IP to become available, and the nodes to complete initial setup.
Follow the instructions outputted by the install command to get the Distribution IP and URL to access it.

### Updating Distribution
Once you have a new chart version, you can update your deployment with
```bash
helm upgrade distribution jfrog/distribution
```

### Create a unique Master Key
JFrog Distribution requires a unique master key to be used by all micro-services in the same cluster. By default the chart has one set in values.yaml (`distribution.masterKey`).

**This key is for demo purpose and should not be used in a production environment!**

You should generate a unique one and pass it to the template at install/upgrade time.
```bash
# Create a key
export MASTER_KEY=$(openssl rand -hex 32)
echo ${MASTER_KEY}

# Pass the created master key to helm
helm install --set distribution.masterKey=${MASTER_KEY} -n distribution jfrog/distribution
```
**NOTE:** Make sure to pass the same master key with `--set distribution.masterKey=${MASTER_KEY}` on all future calls to `helm install` and `helm upgrade`!

### High Availability
JFrog Distribution can run in High Availability by having multiple replicas of the Distribution service.

To enable this, pass replica count to the `helm install` and `helm upgrade` commands.
```bash
# Run 3 replicas of the Distribution service
helm install --name distribution --set replicaCount=3 jfrog/distribution
```

### External Database
There is an option to use an external PostgreSQL database for your Distribution.

To use an external **PostgreSQL**, You need to set the Distribution **PostgreSQL** connection details
```bash
export POSTGRES_HOST=
export POSTGRES_PORT=
export POSTGRES_DATABASE=
export POSTGRES_USERNAME=
export POSTGRES_PASSWORD=

helm install --name distribution \
    --set database.host=${POSTGRES_HOST} \
    --set database.port=${POSTGRES_PORT} \
    --set database.database=${POSTGRES_DATABASE} \
    --set database.user=${POSTGRES_USERNAME} \
    --set database.password=${POSTGRES_PASSWORD} \
    jfrog/distribution
```
**NOTE:** The Database password is saved as a Kubernetes secret


#### Use existing secrets for PostgreSQL connection details
You can use already existing secrets for managing the database connection details.

Pass them to the install command like this
```bash
export POSTGRES_USERNAME_SECRET_NAME=
export POSTGRES_USERNAME_SECRET_KEY=
export POSTGRES_PASSWORD_SECRET_NAME=
export POSTGRES_PASSWORD_SECRET_KEY=

helm install --name distribution \
    --set database.secrets.user.name=${POSTGRES_USERNAME_SECRET_NAME} \
    --set database.secrets.user.key=${POSTGRES_USERNAME_SECRET_KEY} \
    --set database.secrets.password.name=${POSTGRES_PASSWORD_SECRET_NAME} \
    --set database.secrets.password.key=${POSTGRES_PASSWORD_SECRET_KEY} \
    jfrog/distribution
```

## Upgrade
Upgrading Distribution is a simple helm command
```bash
helm upgrade distribution jfrog/distribution
```

**NOTE:** Check for any version specific upgrade nodes in [CHANGELOG.md]

### Non compatible upgrades
In cases where a new version is not compatible with existing deployed version (look in CHANGELOG.md) you should
* Deploy new version along side old version (set a new release name)
* Copy configurations and data from old deployment to new one (/var/opt/jfrog)
* Update DNS to point to new Distribution service
* Remove old release

## Custom init containers
There are cases where a special, unsupported init processes is needed like checking something on the file system or testing something before spinning up the main container.

For this, there is a section for writing a custom init container in the [values.yaml](values.yaml). By default it's commented out
```
distribution:
  ## Add custom init containers
  customInitContainers: |
    ## Init containers template goes here ##
```


## Configuration
The following table lists the configurable parameters of the distribution chart and their default values.

|         Parameter                            |           Description                      |               Default              |
|----------------------------------------------|--------------------------------------------|------------------------------------|
| `imagePullSecrets`                           | Docker registry pull secret                |                                    |
| `replicaCount`                               | HA - Number of instances per service       |                                    |
| `serviceAccount.create`   | Specifies whether a ServiceAccount should be created          | `true`                             |
| `serviceAccount.name`     | The name of the ServiceAccount to create                      | Generated using fullname template  |
| `rbac.create`             | Specifies whether RBAC resources should be created            | `true`                             |
| `rbac.role.rules`         | Rules to create                   | `[]`                                                           |
| `ingress.enabled`                            | If true, distribution Ingress will be created | `false`                         |
| `ingress.annotations`                        | distribution Ingress annotations              | `{}`                            |
| `ingress.hosts`                              | distribution Ingress hostnames                | `[]`                            |
| `ingress.tls`                                | distribution Ingress TLS configuration (YAML) | `[]`                            |
| `postgresql.enabled`                         | Enable PostgreSQL                          | `true`                             |
| `postgresql.imageTag`                        | PostgreSQL image tag                       | `9.6.11`                           |
| `postgresql.postgresDatabase`                | PostgreSQL database name                   | `distribution`                     |
| `postgresql.postgresUser`                    | PostgreSQL database username               | `distribution`                     |
| `postgresql.postgresPassword`                | PostgreSQL database password               | ` `                                |
| `postgresql.postgresConfig.maxConnections`   | PostgreSQL max_connections                 | `1500`                             |
| `postgresql.service.port`                    | PostgreSQL service port                    | `5432`                             |
| `postgresql.persistence.enabled`             | PostgreSQL persistence enabled             | `true`                             |
| `postgresql.persistence.size`                | PostgreSQL persistent disk size            | `50Gi`                             |
| `postgresql.persistence.existingClaim`       | PostgreSQL persistence use existing PVC    | ` `                                |
| `postgresql.resources.requests.memory`       | PostgreSQL initial memory request          | ` `                                |
| `postgresql.resources.requests.cpu`          | PostgreSQL initial cpu request             | ` `                                |
| `postgresql.resources.limits.memory`         | PostgreSQL memory limit                    | ` `                                |
| `postgresql.resources.limits.cpu`            | PostgreSQL cpu limit                       | ` `                                |
| `postgresql.nodeSelector`                    | PostgreSQL node selector                   | `{}`                               |
| `postgresql.affinity`                        | PostgreSQL node affinity                   | `{}`                               |
| `postgresql.tolerations`                     | PostgreSQL node tolerations                | `[]`                               |
| `redis.password`                             | Redis password                             | ` `                                |
| `redis.port`                                 | Redis Port                                 | `6379`                             |
| `redis.persistence.enabled`                  | Redis use a PVC to persist data            | `true`                             |
| `redis.persistence.existingClaim`            | Redis use an existing PVC to persist data  | `nil`                              |
| `redis.persistence.storageClass`             | Redis storage class of backing PVC         | `generic`                          |
| `redis.persistence.size`                     | Redis size of data volume                  | `10Gi`                             |
| `redis.nodeSelector`                         | Redis node selector                        | `{}`                               |
| `redis.affinity`                             | Redis node affinity                        | `{}`                               |
| `redis.tolerations`                          | Redis node tolerations                     | `[]`                               |
| `common.uid`                                 | Distribution and Distributor process user ID               | `1020`                             |
| `common.gid`                                 | Distribution and Distributor process group ID              | `1020`                             |
| `distribution.name`                          | Distribution name                          | `distribution`                     |
| `distribution.image.pullPolicy`              | Container pull policy                      | `IfNotPresent`                     |
| `distribution.image.repository`              | Container image                            | `docker.jfrog.io/jf-distribution`  |
| `distribution.image.version`                 | Container image tag                        | `.Chart.AppVersion`                |
| `distribution.service.type`                  | Distribution service type                  | `LoadBalancer`                     |
| `distribution.customInitContainers`          | Custom init containers for Distribution    |                                    |
| `distribution.externalPort`                  | Distribution service external port         | `80`                               |
| `distribution.internalPort`                  | Distribution service internal port         | `8080`                             |
| `distribution.masterKey`                     | Distribution Master Key (can be generated with `openssl rand -hex 32`) | `BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB` |
| `distribution.serviceId`                     | Distribution service ID                    | ` `                                |
| `distribution.env.artifactoryUrl`            | Distribution Environment Artifactory URL   | ` `                                |
| `distribution.persistence.mountPath`         | Distribution persistence volume mount path | `"/jf-distribution"`               |
| `distribution.persistence.enabled`           | Distribution persistence volume enabled    | `true`                             |
| `distribution.persistence.storageClass`      | Storage class of backing PVC               | `nil`                              |
| `distribution.persistence.existingClaim`     | Provide an existing PersistentVolumeClaim  | `nil`                              |
| `distribution.persistence.accessMode`        | Distribution persistence volume access mode| `ReadWriteOnce`                    |
| `distribution.persistence.size`              | Distribution persistence volume size       | `50Gi`                             |
| `distribution.nodeSelector`                  | Distribution node selector                 | `{}`                               |
| `distribution.affinity`                      | Distribution node affinity                 | `{}`                               |
| `distribution.tolerations`                   | Distribution node tolerations              | `[]`                               |
| `distributor.name`                           | Distribution name                          | `distribution`                     |
| `distributor.image.pullPolicy`               | Container pull policy                      | `IfNotPresent`                     |
| `distributor.image.repository`               | Container image                            | `docker.jfrog.io/jf-distribution`  |
| `distributor.image.version`                  | Container image tag                        | `.Chart.AppVersion`                |
| `distributor.persistence.mountPath`          | Distributor persistence volume mount path  | `"/bt-distributor"`                |
| `distributor.persistence.existingClaim`      | Provide an existing PersistentVolumeClaim  | `nil`                              |
| `distributor.persistence.storageClass`       | Storage class of backing PVC | `nil (uses alpha storage class annotation)`      |
| `distributor.persistence.enabled`            | Distributor persistence volume enabled     | `true`                             |
| `distributor.persistence.accessMode`         | Distributor persistence volume access mode | `ReadWriteOnce`                    |
| `distributor.persistence.size`               | Distributor persistence volume size        | `50Gi`                             |
| `distributor.nodeSelector`                   | Distributor node selector                  | `{}`                               |
| `distributor.affinity`                       | Distributor node affinity                  | `{}`                               |
| `distributor.tolerations`                    | Distributor node tolerations               | `[]`                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

### Ingress and TLS
To get Helm to create an ingress object with a hostname, add these two lines to your Helm command:
```bash
helm install --name distribution \
  --set ingress.enabled=true \
  --set ingress.hosts[0]="distribution.company.com" \
  --set distribution.service.type=NodePort \
  jfrog/distribution
```

If your cluster allows automatic creation/retrieval of TLS certificates (e.g. [cert-manager](https://github.com/jetstack/cert-manager)), please refer to the documentation for that mechanism.

To manually configure TLS, first create/retrieve a key & certificate pair for the address(es) you wish to protect. Then create a TLS secret in the namespace:

```bash
kubectl create secret tls distribution-tls --cert=path/to/tls.cert --key=path/to/tls.key
```

Include the secret's name, along with the desired hostnames, in the Distribution Ingress TLS section of your custom `values.yaml` file:

```
  ingress:
    ## If true, Distribution Ingress will be created
    ##
    enabled: true

    ## Distribution Ingress hostnames
    ## Must be provided if Ingress is enabled
    ##
    hosts:
      - distribution.domain.com
    annotations:
      kubernetes.io/tls-acme: "true"
    ## Distribution Ingress TLS configuration
    ## Secrets must be manually created in the namespace
    ##
    tls:
      - secretName: distribution-tls
        hosts:
          - distribution.domain.com
```

## Useful links
- https://www.jfrog.com/confluence/display/EP/Getting+Started
- https://www.jfrog.com/confluence/display/DIST/Installing+Distribution
- https://www.jfrog.com/confluence/
