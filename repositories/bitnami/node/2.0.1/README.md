# `@helm-charts/bitnami-node`

Event-driven I/O server-side JavaScript environment based on V8

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | node    |
| Chart Version       | 2.0.1   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami node image version
## ref: https://hub.docker.com/r/bitnami/node/tags/
##
image:
  registry: docker.io
  repository: bitnami/node
  tag: 9.11.1-prod
  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: IfNotPresent
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

gitImage:
  registry: docker.io
  repository: alpine/git
  tag: latest
  pullPolicy: IfNotPresent

## Git repository http/https
##
repository: https://github.com/bitnami/sample-mean.git

## Git repository revision to checkout
##
revision: master

## Specify the number of replicas for the application
##
replicas: 1

## Specify the port where your applucation will be running
##
applicationPort: 3000

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
serviceType: ClusterIP

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: false
  path: /app/data
  ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
  ## Default: volume.alpha.kubernetes.io/storage-class: default
  ##
  # storageClass:
  accessMode: ReadWriteOnce
  size: 1Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  {}
  # limits:
  #   cpu: 500m
  #   memory: 512Mi
  # requests:
  #   cpu: 500m
  #   memory: 512Mi

##
## MongoDB chart configuration
##
mongodb:
  ## Whether to deploy a mongodb server to satisfy the applications database requirements.
  ## To use an external database set this to false and configure the externaldb parameters
  install: true # Check mongodb chart for configuration values
  ## MongoDB custom user and database
  ## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#creating-a-user-and-database-on-first-run
  ##
  mongodbUsername: user
  mongodbDatabase: test_db
  mongodbPassword: secret_password

## Provision an external database (Only if mongodb.install is false)
## You can:
##    1) Pass an already existing Secret with your database credentials
##    2) Pass an already existing ServiceInstance name and specify the service catalog broker to automatically create a ServiceBinding for your application.
externaldb:
  # Set to true if your external database has ssl enabled
  ssl: false
  # You can use an existing secret containing your database credentials
  # Please refer to the respective section in the README to know the details about this secret.
  secretName:
  # Only if using Kubernetes Service Catalog you can specify the kind of broker used. Available options are osba|gce|aws
  type: osba
  # If you provide the serviceInstanceName, the chart will create a ServiceBinding for that ServiceInstance
  broker:
    serviceInstanceName:

## Configure ingress resource that allow you to access the application.
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  enabled: false
  path: /
  # Used to create an Ingress record.
  host: example.local
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: "true"
  # tls:
  #   Secrets must be manually created in the namespace.
  #   - secretName: your-tls-cert
  #     hosts:
  #       - example.local
```

</details>

---

# Node

[Node](https://www.nodejs.org) Event-driven I/O server-side JavaScript environment based on V8

## TL;DR

```console
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install bitnami/node
```

## Introduction

This chart bootstraps a [Node](https://github.com/bitnami/bitnami-docker-node) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It clones and deploys a Node.js application from a git repository. Optionally you can set un an Ingress resource to access your application and provision an external database using the k8s service catalog and the Open Service Broker for Azure.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/node
```

The command deploys Node.js on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation. Also includes support for MariaDB chart out of the box.

Due that the Helm Chart clones the application on the /app volume while the container is initializing, a persistent volume is not required.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Node chart and their default values.

| Parameter                               | Description                                               | Default                                                  |
| --------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| `image.registry`                        | NodeJS image registry                                     | `docker.io`                                              |
| `image.repository`                      | NodeJS Image name                                         | `bitnami/node`                                           |
| `image.tag`                             | NodeJS Image tag                                          | `{VERSION}`                                              |
| `image.pullPolicy`                      | NodeJS image pull policy                                  | `IfNotPresent`                                           |
| `image.pullSecrets`                     | Specify image pull secrets                                | `nil` (does not add image pull secrets to deployed pods) |
| `gitImage.registry`                     | Git image registry                                        | `docker.io`                                              |
| `gitImage.repository`                   | Git Image name                                            | `alpine/git`                                             |
| `gitImage.tag`                          | Git Image tag                                             | `latest`                                                 |
| `gitImage.pullPolicy`                   | Git image pull policy                                     | `Always` if `imageTag` is `latest`, else `IfNotPresent`  |
| `gitImage`                              | Image used for initContainers                             | `alpine/git`                                             |
| `repository`                            | Repo of the application                                   | `https://github.com/bitnami/sample-mean.git`             |
| `revision`                              | Revision to checkout                                      | `master`                                                 |
| `replicas`                              | Number of replicas for the application                    | `1`                                                      |
| `applicationPort`                       | Port where the application will be running                | `3000`                                                   |
| `serviceType`                           | Kubernetes Service type                                   | `LoadBalancer`                                           |
| `persistence.enabled`                   | Enable persistence using PVC                              | `false`                                                  |
| `persistence.path`                      | Path to persisted directory                               | `/app/data`                                              |
| `persistence.accessMode`                | PVC Access Mode                                           | `ReadWriteOnce`                                          |
| `persistence.size`                      | PVC Storage Request                                       | `1Gi`                                                    |
| `mongodb.install`                       | Wheter to install or not the MongoDB chart                | `true`                                                   |
| `externaldb.secretName`                 | Secret containing existing database credentials           | `nil`                                                    |
| `externaldb.type`                       | Type of database that defines the database secret mapping | `osba`                                                   |
| `externaldb.broker.serviceInstanceName` | The existing ServiceInstance to be used                   | `nil`                                                    |
| `ingress.enabled`                       | Enable ingress creation                                   | `false`                                                  |
| `ingress.path`                          | Ingress path                                              | `/`                                                      |
| `ingress.host`                          | Ingress host                                              | `example.local`                                          |
| `ingress.tls`                           | TLS configuration for the ingress                         | `{}`                                                     |

The above parameters map to the env variables defined in [bitnami/node](http://github.com/bitnami/bitnami-docker-node). For more information please refer to the [bitnami/node](http://github.com/bitnami/bitnami-docker-node) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set repository=https://github.com/jbianquetti-nami/simple-node-app.git,replicas=2 \
    bitnami/node
```

The above command clones the remote git repository to the `/app/` directory of the container. Additionally it sets the number of `replicas` to `2`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/node
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Node](https://github.com/bitnami/bitnami-docker-node) image stores the Node application and configurations at the `/app` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Set up an Ingress controller

First install the nginx-ingress controller via helm:

```
$ helm install stable/nginx-ingress
```

Now deploy the node helm chart:

```
$ helm install --name my-release bitnami/node --set ingress.enabled=true,ingress.host=example.com,serviceType=ClusterIP
```

### Configure TLS termination for your ingress controller

You must manually create a secret containing the certificate and key for your domain. You can do it with this command:

```
$ kubectl create secret tls my-tls-secret --cert=path/to/file.cert --key=path/to/file.key
```

Then ensure you deploy the Helm chart with the following ingress configuration:

```
ingress:
  enabled: false
  path: /
  host: example.com
  annotations:
    kubernetes.io/ingress.class: nginx
  tls:
      hosts:
        - example.com
```

## Connect your application to an already existing database

1. Create a secret containing your database credentials:

```
$ kubectl create secret generic my-database-secret --from-literal=host=YOUR_DATABASE_HOST --from-literal=port=YOUR_DATABASE_PORT --from-literal=username=YOUR_DATABASE_USER  --from-literal=password=YOUR_DATABASE_PASSWORD --from-literal=database=YOUR_DATABASE_NAME
```

`YOUR_DATABASE_HOST`, `YOUR_DATABASE_PORT`, `YOUR_DATABASE_USER`, `YOUR_DATABASE_PASSWORD`, and `YOUR_DATABASE_NAME` are placeholders that must be replaced with correct values.

2. Deploy the node chart specifying the secret name

```
$ helm install --name node-app --set mongodb.install=false,externaldb.secretName=my-database-secret bitnami/node
```

## Provision a database using the Open Service Broker for Azure

1. Install Service Catalog in your Kubernetes cluster following [this instructions](https://kubernetes.io/docs/tasks/service-catalog/install-service-catalog-using-helm/)
2. Install the Open Service Broker for Azure in your Kubernetes cluster following [this instructions](https://github.com/Azure/open-service-broker-azure/tree/master/contrib/k8s/charts/open-service-broker-azure)

> TIP: you may want to install the osba chart setting the `modules.minStability=EXPERIMENTAL` to see all the available services.
>
>     $ helm install azure/open-service-broker-azure --name osba --namespace osba \
>            --set azure.subscriptionId=$AZURE_SUBSCRIPTION_ID \
>            --set azure.tenantId=$AZURE_TENANT_ID \
>            --set azure.clientId=$AZURE_CLIENT_ID \
>            --set azure.clientSecret=$AZURE_CLIENT_SECRET \
>            --set modules.minStability=EXPERIMENTAL

3. Create and deploy a ServiceInstance to provision a database server in Azure cloud.

```
apiVersion: servicecatalog.k8s.io/v1beta1
kind: ServiceInstance
metadata:
  name: azure-mongodb-instance
  labels:
    app: mongodb
spec:
  clusterServiceClassExternalName: azure-cosmosdb-mongo-account
  clusterServicePlanExternalName: account
  parameters:
    location: YOUR_AZURE_LOCATION
    resourceGroup: mongodb-k8s-service-catalog
    ipFilters:
      allowedIPRanges:
      -  "0.0.0.0/0"
```

Please update the `YOUR_AZURE_LOCATION` placeholder in the above example.

```
$ kubectl create -f mongodb-service-instance.yml
```

4. Deploy the helm chart:

   ```
   $ helm install --name node-app --set mongodb.install=false,externaldb.broker.serviceInstanceName=azure-mongodb-instance bitnami/node
   ```

Once the instance has been provisioned in Azure, a new secret should have been automatically created with the connection parameters for your application.

Deploying the helm chart enabling the Azure external database makes the following assumptions:

- You would want an Azure CosmosDB MongoDB database
- Your application uses DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, and DATABASE_NAME environment variables to connect to the database.

You can read more about the kubernetes service catalog at https://github.com/kubernetes-bitnami/service-catalog
