# `@helm-charts/stable-gcloud-sqlproxy`

Google Cloud SQL Proxy

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | stable          |
| Chart Name          | gcloud-sqlproxy |
| Chart Version       | 0.1.0           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Google Cloud SQl Proxy image
## ref: https://cloud.google.com/sql/docs/mysql/sql-proxy
## ref: https://cloud.google.com/sql/docs/postgres/sql-proxy
image: b.gcr.io/cloudsql-docker/gce-proxy
imageTag: '1.09'

## Specify a imagePullPolicy
## 'Always' if imageTag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Replicas Set count
replicasCount: 1

## Set the GCP service account key JSON file.
## Service account has access be set to Cloud SQL instances
## the key must be encoded with base64
## e.g. `cat service-account.json | base64`
##
serviceAccountKey: ''

## SQL connection settings
##
cloudsql:
  ## PostgreSQL/MySQL instance:
  ## update with your GCP project, the region of your Cloud SQL instance
  ## and the name of your Cloud SQL instance
  instance: 'PROJECT:REGION:INSTANCE'

  ## PostgreSQL port 5432 or MySQL port 3306, or other port you set for your SQL instance
  port: 5432

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    cpu: 100m
    memory: 100Mi
  limits:
    memory: 150Mi
    cpu: 150m

## Node selector
nodeSelector: {}
```

</details>

---

# GCP SQL Proxy

[sql-proxy](https://cloud.google.com/sql/docs/postgres/sql-proxy) The Cloud SQL Proxy provides secure access to your Cloud SQL Postgres/MySQL instances without having to whitelist IP addresses or configure SSL.

Accessing your Cloud SQL instance using the Cloud SQL Proxy offers these advantages:

- Secure connections: The proxy automatically encrypts traffic to and from the database; SSL certificates are used to verify client and server identities.
- Easier connection management: The proxy handles authentication with Google Cloud SQL, removing the need to provide static IP addresses of your GKE/GCE Kubernetes nodes.

## Introduction

This chart creates a Google Cloud Endpoints deployment and service on a Kubernetes cluster using the Helm package manager.
You need to create a service account for the proxy as per these [instructions](https://cloud.google.com/sql/docs/postgres/connect-container-engine).

## Prerequisites

- Kubernetes cluster on Google Container Engine (GKE)
- Kubernetes cluster on Google Compute Engine (GCE)
- GCP Service account for the proxy.

## Installing the Chart

Install from remote URL with the release name `gcp-sqlproxy` into namespace `sqlproxy`, set GCP service account and SQL instance and port:

```console
$ helm upgrade pg-sqlproxy stable/gcloud-sqlproxy --namespace sqlproxy \
  --set serviceAccountKey="$(cat service-account.json | base64)",cloudsql.instance="PROJECT:REGION:INSTANCE",cloudsql.port="5432" -i
```

Replace Postgres/MySQL host with: if access is from the same namespace with `pg-sqlproxy` or if it is from a different namespace with `pg-sqlproxy.sqlproxy`, the rest database connections settings do not have to be changed.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release-name` deployment:

```console
$ helm delete my-release-name
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Drupal chart and their default values.

| Parameter           | Description                         | Default                                    |
| ------------------- | ----------------------------------- | ------------------------------------------ |
| `image`             | SQLProxy image                      | `b.gcr.io/cloudsql-docker/gce-proxy`       |
| `imageTag`          | SQLProxy image tag                  | `1.09`                                     |
| `imagePullPolicy`   | Image pull policy                   | `IfNotPresent`                             |
| `replicasCount`     | Replicas count                      | `1`                                        |
| `serviceAccountKey` | Service account key JSON file       | Must be provided and base64 encoded        |
| `cloudsql.instance` | PostgreSQL/MySQL instance name      | `project:region:instance` must be provided |
| `cloudsql.port`     | PostgreSQL/MySQL instance port      | `5432`                                     |
| `resources`         | CPU/Memory resource requests/limits | Memory: `100/150Mi`, CPU: `100/150m`       |
| `nodeSelector`      | Node Selector                       |                                            |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/gcloud-sqlproxy
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Documentation

- [Cloud SQL Proxy for Postgres](https://cloud.google.com/sql/docs/postgres/sql-proxy)
- [Cloud SQL Proxy for MySQL](https://cloud.google.com/sql/docs/mysql/sql-proxy)
- [GKE samples](https://github.com/GoogleCloudPlatform/container-engine-samples/tree/master/cloudsql)
