# `@helm-charts/incubator-etcd`

Distributed reliable key-value store for the most critical data of a distributed system.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | etcd      |
| Chart Version       | 0.4.1     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for etcd.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

peerPort: 2380
clientPort: 2379
component: 'etcd'
replicas: 3
image:
  repository: 'k8s.gcr.io/etcd-amd64'
  tag: '2.2.5'
  pullPolicy: 'IfNotPresent'
resources: {}
# We usually recommend not to specify default resources and to leave this as a conscious
# choice for the user. This also increases chances charts run on environments with little
# resources, such as Minikube. If you do want to specify resources, uncomment the following
# lines, adjust them as necessary, and remove the curly braces after 'resources:'.
# limits:
#  cpu: 100m
#  memory: 128Mi
# requests:
#  cpu: 100m
#  memory: 128Mi

persistentVolume:
  enabled: false
  # storage: "1Gi"
  ## etcd data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"

## Node labels and tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
nodeSelector: {}
tolerations: []
affinity: {}
```

</details>

---

# Etcd Helm Chart

Credit to https://github.com/ingvagabund. This is an implementation of that work

- https://github.com/kubernetes/contrib/pull/1295

## Prerequisites Details

- Kubernetes 1.5 (for `StatefulSets` support)
- PV support on the underlying infrastructure

## StatefulSet Details

- https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/

## StatefulSet Caveats

- https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/#limitations

## Todo

- Implement SSL

## Chart Details

This chart will do the following:

- Implemented a dynamically scalable etcd cluster using Kubernetes StatefulSets

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-release incubator/etcd
```

## Configuration

The following table lists the configurable parameters of the etcd chart and their default values.

| Parameter          | Description                          | Default                 |
| ------------------ | ------------------------------------ | ----------------------- |
| `image.repository` | Container image repository           | `k8s.gcr.io/etcd-amd64` |
| `image.tag`        | Container image tag                  | `2.2.5`                 |
| `image.pullPolicy` | Container pull policy                | `IfNotPresent`          |
| `replicas`         | k8s statefulset replicas             | `3`                     |
| `resources`        | container required resources         | `{}`                    |  |
| `clientPort`       | k8s service port                     | `2379`                  |
| `peerPorts`        | Container listening port             | `2380`                  |
| `storage`          | Persistent volume size               | `1Gi`                   |
| `storageClass`     | Persistent volume storage class      | `anything`              |
| `affinity`         | affinity settings for pod assignment | `{}`                    |
| `nodeSelector`     | Node labels for pod assignment       | `{}`                    |
| `tolerations`      | Toleration labels for pod assignment | `[]`                    |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml incubator/etcd
```

> **Tip**: You can use the default [values.yaml](values.yaml)

# Deep dive

## Cluster Health

```
$ for i in <0..n>; do kubectl exec <release-podname-$i> -- sh -c 'etcdctl cluster-health'; done
```

eg.

```
$ for i in {0..9}; do kubectl exec named-lynx-etcd-$i --namespace=etcd -- sh -c 'etcdctl cluster-health'; done
member 7878c44dabe58db is healthy: got healthy result from http://named-lynx-etcd-7.named-lynx-etcd:2379
member 19d2ab7b415341cc is healthy: got healthy result from http://named-lynx-etcd-4.named-lynx-etcd:2379
member 6b627d1b92282322 is healthy: got healthy result from http://named-lynx-etcd-3.named-lynx-etcd:2379
member 6bb377156d9e3fb3 is healthy: got healthy result from http://named-lynx-etcd-0.named-lynx-etcd:2379
member 8ebbb00c312213d6 is healthy: got healthy result from http://named-lynx-etcd-8.named-lynx-etcd:2379
member a32e3e8a520ff75f is healthy: got healthy result from http://named-lynx-etcd-5.named-lynx-etcd:2379
member dc83003f0a226816 is healthy: got healthy result from http://named-lynx-etcd-2.named-lynx-etcd:2379
member e3dc94686f60465d is healthy: got healthy result from http://named-lynx-etcd-6.named-lynx-etcd:2379
member f5ee1ca177a88a58 is healthy: got healthy result from http://named-lynx-etcd-1.named-lynx-etcd:2379
cluster is healthy
```

## Failover

If any etcd member fails it gets re-joined eventually.
You can test the scenario by killing process of one of the replicas:

```shell
$ ps aux | grep etcd-1
$ kill -9 ETCD_1_PID
```

```shell
$ kubectl get pods -l "release=${RELEASE-NAME},app=etcd"
NAME                 READY     STATUS        RESTARTS   AGE
etcd-0               1/1       Running       0          54s
etcd-2               1/1       Running       0          51s
```

After a while:

```shell
$ kubectl get pods -l "release=${RELEASE-NAME},app=etcd"
NAME                 READY     STATUS    RESTARTS   AGE
etcd-0               1/1       Running   0          1m
etcd-1               1/1       Running   0          20s
etcd-2               1/1       Running   0          1m
```

You can check state of re-joining from `etcd-1`'s logs:

```shell
$ kubectl logs etcd-1
Waiting for etcd-0.etcd to come up
Waiting for etcd-1.etcd to come up
ping: bad address 'etcd-1.etcd'
Waiting for etcd-1.etcd to come up
Waiting for etcd-2.etcd to come up
Re-joining etcd member
Updated member with ID 7fd61f3f79d97779 in cluster
2016-06-20 11:04:14.962169 I | etcdmain: etcd Version: 2.2.5
2016-06-20 11:04:14.962287 I | etcdmain: Git SHA: bc9ddf2
...
```

## Scaling using kubectl

This is for reference. Scaling should be managed by `helm upgrade`

The etcd cluster can be scale up by running `kubectl patch` or `kubectl edit`. For instance,

```sh
$ kubectl get pods -l "release=${RELEASE-NAME},app=etcd"
NAME      READY     STATUS    RESTARTS   AGE
etcd-0    1/1       Running   0          7m
etcd-1    1/1       Running   0          7m
etcd-2    1/1       Running   0          6m

$ kubectl patch statefulset/etcd -p '{"spec":{"replicas": 5}}'
"etcd" patched

$ kubectl get pods -l "release=${RELEASE-NAME},app=etcd"
NAME      READY     STATUS    RESTARTS   AGE
etcd-0    1/1       Running   0          8m
etcd-1    1/1       Running   0          8m
etcd-2    1/1       Running   0          8m
etcd-3    1/1       Running   0          4s
etcd-4    1/1       Running   0          1s
```

Scaling-down is similar. For instance, changing the number of replicas to `4`:

```sh
$ kubectl edit statefulset/etcd
statefulset "etcd" edited

$ kubectl get pods -l "release=${RELEASE-NAME},app=etcd"
NAME      READY     STATUS    RESTARTS   AGE
etcd-0    1/1       Running   0          8m
etcd-1    1/1       Running   0          8m
etcd-2    1/1       Running   0          8m
etcd-3    1/1       Running   0          4s
```

Once a replica is terminated (either by running `kubectl delete pod etcd-ID` or scaling down),
content of `/var/run/etcd/` directory is cleaned up.
If any of the etcd pods restarts (e.g. caused by etcd failure or any other),
the directory is kept untouched so the pod can recover from the failure.
