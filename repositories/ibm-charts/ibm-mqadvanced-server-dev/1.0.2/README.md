# `@helm-charts/ibm-charts-ibm-mqadvanced-server-dev`

IBM MQ queue manager

| Field               | Value                     |
| ------------------- | ------------------------- |
| Repository Name     | ibm-charts                |
| Chart Name          | ibm-mqadvanced-server-dev |
| Chart Version       | 1.0.2                     |
| NPM Package Version | 0.1.0                     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# © Copyright IBM Corporation 2017
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# license must be set to "accept" to accept the terms of the IBM license
license: 'not accepted'

image:
  # repository is the container repository to use, which must contain IBM MQ Advanced for Developers
  repository: ibmcom/mq
  # tag is the tag to use for the container repository
  tag: 9
  # pullSecret is the secret to use when pulling the image from a private registry
  pullSecret:
  # pullPolicy is either IfNotPresent or Always (https://kubernetes.io/docs/concepts/containers/images/)
  pullPolicy: IfNotPresent

# persistence section specifies persistence settings which apply to the whole chart
persistence:
  # enabled is whether to use Persistent Volumes or not
  enabled: true
  # useDynamicProvisioning is whether or not to use Storage Classes to dynamically create Persistent Volumes
  useDynamicProvisioning: true

# dataPVC section specifies settings for the main Persistent Volume Claim, which is used for data in /var/mqm
dataPVC:
  # name sets part of the name for this Persistent Volume Claim
  name: 'data'
  ## storageClassName is the name of the Storage Class to use, or an empty string for no Storage Class
  storageClassName: ''
  ## size is the minimum size of the Persistent Volume
  size: 2Gi

service:
  name: qmgr
  type: ClusterIP

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 500m
    memory: 512Mi

# queueManager section specifies settings for the MQ Queue Manager
queueManager:
  # name allows you to specify the name to use for the queue manager.  Defaults to the Helm release name.
  name:
  # dev section specifies settings for the MQ developer defaults available in the MQ Advanced for Developers image.
  dev:
    # adminPassword sets the password of the admin user
    adminPassword:
    # appPassword sets the password of the app user
    appPassword:

# nameOverride can be set to partially override the name of the resources created by this chart
nameOverride:
```

</details>

---

![IBM MQ logo](https://developer.ibm.com/messaging/wp-content/uploads/sites/18/2017/07/IBM-MQ-Square-200.png)

# IBM MQ

IBM® MQ is messaging middleware that simplifies and accelerates the integration of diverse applications and business data across multiple platforms. It uses message queues to facilitate the exchanges of information and offers a single messaging solution for cloud, mobile, Internet of Things (IoT) and on-premises environments.

# Introduction

This chart deploys a single IBM MQ Advanced for Developers server (queue manager) into an IBM Cloud private or other Kubernetes environment.

## Prerequisites

- Kubernetes 1.6 or greater, with beta APIs enabled
- If persistence is enabled (see [configuration](#configuration)), then you either need to create a PersistentVolume, or specify a Storage Class if classes are defined in your cluster.

## Installing the Chart

To install the chart with the release name `foo`:

```sh
helm install --name foo stable/ibm-mqadvanced-server-dev --set license=accept
```

This command accepts the [IBM MQ Advanced for Developers license](LICENSE) and deploys an MQ Advanced for Developers server on the Kubernetes cluster. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: See all the resources deployed by the chart using `kubectl get all -l release=foo`

## Uninstalling the Chart

To uninstall/delete the `foo` release:

```sh
helm delete foo
```

The command removes all the Kubernetes components associated with the chart, except any Persistent Volume Claims (PVCs). This is the default behavior of Kubernetes, and ensures that valuable data is not deleted. In order to delete the Queue Manager's data, you can delete the PVC using the following command:

```sh
kubectl delete pvc -l release=foo
```

## Configuration

The following table lists the configurable parameters of the `ibm-mqadvanced-server-dev` chart and their default values.

| Parameter                            | Description                                                     | Default                                                                                       |
| ------------------------------------ | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `license`                            | Set to `accept` to accept the terms of the IBM license          | `not accepted`                                                                                |
| `image.repository`                   | Image full name including repository                            | `ibmcom/mq`                                                                                   |
| `image.tag`                          | Image tag                                                       | `9`                                                                                           |
| `image.pullPolicy`                   | Image pull policy                                               | `IfNotPresent`                                                                                |
| `image.pullSecret`                   | Image pull secret, if you are using a private Docker registry   | `nil`                                                                                         |
| `persistence.enabled`                | Use persistent volumes for all defined volumes                  | `true`                                                                                        |
| `persistence.useDynamicProvisioning` | Use dynamic provisioning (storage classes) for all volumes      | `true`                                                                                        |
| `dataPVC.name`                       | Suffix for the PVC name                                         | `"data"`                                                                                      |
| `dataPVC.storageClassName`           | Storage class of volume for main MQ data (under `/var/mqm`)     | `""`                                                                                          |
| `dataPVC.size`                       | Size of volume for main MQ data (under `/var/mqm`)              | `2Gi`                                                                                         |
| `service.name`                       | Name of the Kubernetes service to create                        | `qmgr`                                                                                        |
| `service.type`                       | Kubernetes service type exposing ports, e.g. `NodePort`         | `ClusterIP`                                                                                   |
| `resources.limits.cpu`               | Kubernetes CPU limit for the Queue Manager container            | `500m`                                                                                        |
| `resources.limits.memory`            | Kubernetes memory limit for the Queue Manager container         | `512Mi`                                                                                       |
| `resources.requests.cpu`             | Kubernetes CPU request for the Queue Manager container          | `500m`                                                                                        |
| `resources.requests.memory`          | Kubernetes memory request for the Queue Manager container       | `512Mi`                                                                                       |
| `queueManager.name`                  | MQ Queue Manager name                                           | Helm release name                                                                             |
| `queueManager.dev.adminPassword`     | Developer defaults - administrator password                     | Random generated string. See the notes that appear when you install for how to retrieve this. |
| `queueManager.dev.appPassword`       | Developer defaults - app password                               | `nil` (no password required to connect an MQ client)                                          |
| `nameOverride`                       | Set to partially override the resource names used in this chart | `nil`                                                                                         |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart.

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/).

# Troubleshooting

## Cannot create a GlusterFS PersistentVolumeClaim

The generated PVC name can be too long when using GlusterFS. See [here](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/troubleshoot/cannot_create_pvc.html) for more information. The PVC name is generated from three things:

1. The Helm release name, which is set by you at deployment time
2. A short PVC label, which defaults to "data" and can be changed using the `dataPVC.name` parameter.
3. The name of the chart you are using, which can be changed using the `nameOverride` parameter.

# Copyright

© Copyright IBM Corporation 2017
