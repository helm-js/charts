# `@helm-charts/ibm-charts-ibm-dsm-dev`

IBM Data Server Manager Developer-C Edition. Note that there can only be one DSM deployed per namespace, subsequent DSM will be deleted silently.

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | ibm-charts  |
| Chart Name          | ibm-dsm-dev |
| Chart Version       | 0.2.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
######################## IBM DSM ##############################################
###############################################################################

#nameOverride: ""

###############################################################################
## Common image variables
###############################################################################
image:
  repository: 'na.cumulusrepo.com/hcicp_dev/dsm'
  tag: '2.1.4'
  pullPolicy: IfNotPresent
  secret: 'VISIT http://ibm.biz/db2-dsm-license TO RETRIEVE IMAGE SECRET'
imageSidecar:
  repository: 'na.cumulusrepo.com/hcicp_dev/dsm-sidecar'
  tag: '0.2.0'
  pullPolicy: IfNotPresent

###############################################################################
## Persistent Storage
###############################################################################

## Global persistence settings
persistence:
  enabled: true
  useDynamicProvisioning: false

## Persistence enabled by default
dsmVolume:
  name: 'dsmvolume'

  ## Specify the name of the Existing Claim to be used by your application
  existingClaimName: ''

  ## Specify the name of the StorageClass
  ## empty string means don't use a StorageClass
  storageClassName: ''

  ## Required minimum Persistence Storage volume size
  size: 4Gi

service:
  httpPort: 11080
  httpsPort: 11081
  type: NodePort
  name: console

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 4Gi
    cpu: 2

license: 'accept'

## Default user and password to login
login:
  user: admin
  password: ''
```

</details>

---

# IBM DSM Developer-C Helm Chart - BETA

[IBM Data Server Manager](https://www.ibm.com/developerworks/cn/downloads/im/dsm/index.html) enables you to manage database applications in a non-production environment.

## Introduction

This chart is consist of IBM Data Server Manager which is a database management tool intended to be deployed in IBM Cloud-Private environments.

## Prerequisites

- Kubernetes 1.6 with Beta APIs enabled
- Helm 2.3.1 and later version
- PersistentVolume needs to be pre-created prior to installing the chart if `persistance.enabled=true` and `persistence.dynamicProvisioning=false` (default values, see [persistence](#persistence) section). It can be created by using the IBM Cloud private UI or via a yaml file as the following example:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv0001
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: anything
    storage: 4Gi
  hostPath:
    path: /data/pv0001/
EOF
```

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release --set license=accept stable/ibm-dsm-dev
```

The command deploys ibm-dsm-dev on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Verifying the Chart

See NOTES.txt associated with this chart for verification instructions

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release. If a delete can result in orphaned components include instructions additional commands required for clean-up.

For example :

When deleting a release with stateful sets the associated persistent volume will need to be deleted.  
Do the following after deleting the chart release to clean up orphaned Persistent Volumes.

```console
$ kubectl delete pvc -l release=my-release
```

## Configuration

The following tables lists the configurable parameters of the ibm-dsm-dev chart and their default values.

| Parameter                             | Description                                      | Default                                                 |
| ------------------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `image.repository`                    | `DSM` image                                      | `na.cumulusrepo.com/hcicp_dev/dsm`                      |
| `image.tag`                           | `DSM` image tag                                  | `2.1.4`                                                 |
| `imageSidecar.Tag`                    | `DSM` sidecar image tag                          | `0.2.0`                                                 |
| `image.pullPolicy`                    | `DSM` image pull policy                          | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `imageSidecar.pullPolicy`             | `DSM` sidecar image pull policy                  | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `login.user`                          | `DSM` admin user name                            | `admin`                                                 |
| `login.password`                      | `DSM` admin password                             | `nil`                                                   |
| `dsmVolume.name`                      | The PVC name to persist data                     | `dsmvolume`                                             |
| `persistence.enabled`                 | Use a PVC to persist data                        | `true`                                                  |
| `persistence.useDynamicProvisioning`  | Specify a storage class or leave empty           | `false`                                                 |
| `dsmVolume.persistence.existingClaim` | Provide an existing PersistentVolumeClaim        | `nil`                                                   |
| `dsmVolume.persistence.storageClass`  | Storage class of backing PVC                     | `nil`                                                   |
| `dsmVolume.persistence.size`          | Size of data volume                              | `4Gi`                                                   |
| `resources`                           | CPU/Memory resource requests/limits              | Memory: `4Gi`, CPU: `2`                                 |
| `service.httpPort`                    | Internal http port                               | `11080`                                                 |
| `service.httpPort`                    | Interal https port                               | `11081`                                                 |
| `service.type`                        | k8s service type exposing ports, e.g.`ClusterIP` | `NodePort`                                              |  |
| `service.name`                        | k8s service type exposing ports name             | `console`                                               |  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart.

> **Tip**: You can use the default [values.yaml](values.yaml)

The volume defaults to mount at a subdirectory of the volume instead of the volume root to avoid the volume's hidden directories from interfering with database creation.

## Persistence

- Persistent storage using kubernetes dynamic provisioning. Uses the default storageclass defined by the kubernetes admin or by using a custom storageclass which will override the default.
  - Set global values to:
    - persistence.enabled: true (default)
    - persistence.useDynamicProvisioning: true
  - Specify a custom storageClassName per volume or leave the value empty to use the default storageClass.

* Persistent storage using a predefined PersistentVolumeClaim or PersistentVolume setup prior to the deployment of this chart
  - Set global values to:
    - persistence.enabled: true
    - persistence.useDynamicProvisioning: false (default)
  - Specify an existingClaimName per volume or leave the value empty and let the kubernetes binding process select a pre-existing volume based on the accessMode and size.

- No persistent storage. This mode with use emptyPath for any volumes referenced in the deployment
  - enable this mode by setting the global values to:
    - persistence.enabled: false
    - persistence.useDynamicProvisioning: false

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) volume. The volume is created using dynamic volume provisioning. If the PersistentVolumeClaim should not be managed by the chart, define `persistence.existingClaim`.

## Automatically connect and manage Db2

If you have Db2 created in your namespace (no matter created before or after DSM), DSM will automatically connect to it and start to manage it.

A repository DB is created automatically to store your monitor and administration metadata. The minimum resource requied: 1 CPU 1G memory and 16G storage. It may need ten minutes to create DSM, repository DB and bind them.

You can only have one DSM per namespace.If you deployed a second DSM, it will be deleted silently in a while in backend.If you delete DSM, its repository DB will not be deleted automatically. When you create a new DSM, it will reuse the repository and load the metadata.

To permanently delete repository(after DSM deleted), please use the following command:

```bash
helm ls --tiller-namespace=<namespace>
helm delete --purge <namespace>-<name>-repodb --tiller-namespace=<namespace>
```
