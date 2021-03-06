# `@helm-charts/incubator-patroni`

Highly available elephant herd: HA PostgreSQL cluster.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | patroni   |
| Chart Version       | 0.1.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
Name: patroni
Namespace: default

Component: patroni
ImagePullPolicy: IfNotPresent

# The image to use. Spilo is the dockerized Patroni
Spilo:
  # this image was built from https://github.com/zalando/spilo/tree/master/postgres-appliance
  Image: registry.opensource.zalan.do/acid/spilo-9.5
  Version: 1.1-p5

# How many postgres containers to spawn
Replicas: 5

# Resource limits per replica
Resources:
  Cpu: 100m
  Memory: 512Mi
  Storage: 1Gi

# Credentials used by Patroni
# * more information: https://github.com/zalando/patroni/blob/master/docs/SETTINGS.rst#postgresql
Credentials:
  Superuser: tea
  Admin: cola
  Standby: pinacolada

# Patroni depends on etcd, configure it here
Etcd:
  Discovery: # leave blank to use vendored etcd chart
```

</details>

---

# Patroni Helm Chart

This directory contains a Kubernetes chart to deploy a five node patroni cluster using a petset.

## Prerequisites Details

- Kubernetes 1.3 with alpha APIs enable
- PV support on the underlying infrastructure

## PetSet Details

- http://kubernetes.io/docs/user-guide/petset/

## PetSet Caveats

- http://kubernetes.io/docs/user-guide/petset/#alpha-limitations

## Todo

- Make namespace configurable

## Chart Details

This chart will do the following:

- Implement a HA scalable PostgreSQL cluster using Kubernetes PetSets

## Get this chart

Download the latest release of the chart from the [releases](../../../releases) page.

Alternatively, clone the repo if you wish to use the development snapshot:

```console
$ git clone https://github.com/kubernetes/charts.git
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release patroni-x.x.x.tgz
```

## Connecting to Postgres

Your access point is a cluster IP. In order to access it spin up another pod:

```console
$ kubectl run -i --tty ubuntu --image=ubuntu:16.04 --restart=Never -- bash -il
```

Then, from inside the pod, connect to postgres:

```console
$ apt-get update && apt-get install postgresql-client -y
$ psql -U admin -h my-release-patroni.default.svc.cluster.local postgres
<admin password from values.yaml>
postgres=>
```

## Configuration

The following tables lists the configurable parameters of the patroni chart and their default values.

| Parameter               | Description                       | Default                                             |
| ----------------------- | --------------------------------- | --------------------------------------------------- |
| `Name`                  | Service name                      | `patroni`                                           |
| `Namespace`             | Service namespace                 | `default`                                           |
| `Spilo.Image`           | Container image name              | `registry.opensource.zalan.do/acid/spilo-9.5`       |
| `Spilo.Version`         | Container image tag               | `1.0-p5`                                            |
| `ImagePullPolicy`       | Container pull policy             | `IfNotPresent`                                      |
| `Replicas`              | k8s petset replicas               | `5`                                                 |
| `Component`             | k8s selector key                  | `patroni`                                           |
| `Resources.Cpu`         | container requested cpu           | `100m`                                              |
| `Resources.Memory`      | container requested memory        | `512Mi`                                             |
| `Resources.Storage`     | Persistent volume size            | `1Gi`                                               |
| `Credentials.Superuser` | password for the superuser        | `tea`                                               |
| `Credentials.Admin`     | password for the admin user       | `cola`                                              |
| `Credentials.Standby`   | password for the replication user | `pinacolada`                                        |
| `Etcd.Discovery`        | domain name of etcd cluster       | `<release-name>-etcd.<namespace>.svc.cluster.local` |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml patroni-x.x.x.tgz
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Cleanup

In order to remove everything you created a simple `helm delete <release-name>` isn't enough (as of now), but you can do the following:

```console
$ release=<release-name>
$ helm delete $release
$ grace=$(kubectl get po $release-patroni-0 --template '{{.spec.terminationGracePeriodSeconds}}')
$ kubectl delete petset,po -l release=$release
$ sleep $grace
$ kubectl delete pvc -l release=$release
```

## Internals

Patroni is responsible for electing a Postgres master pod by leveraging etcd.
It then exports this master via a Kubernetes service and a label query that filters for `spilo-role=master`.
This label is dynamically set on the pod that acts as the master and removed from all other pods.
Consequently, the service endpoint will point to the current master.

```console
$ kubectl get pods -l spilo-role -L spilo-role
NAME                   READY     STATUS    RESTARTS   AGE       SPILO-ROLE
my-release-patroni-0   1/1       Running   0          9m        replica
my-release-patroni-1   1/1       Running   0          9m        master
my-release-patroni-2   1/1       Running   0          8m        replica
my-release-patroni-3   1/1       Running   0          8m        replica
my-release-patroni-4   1/1       Running   0          8m        replica
```
