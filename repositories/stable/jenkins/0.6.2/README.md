# `@helm-charts/stable-jenkins`

Open source continuous integration server. It supports multiple SCM tools including CVS, Subversion and Git. It can execute Apache Ant and Apache Maven-based projects as well as arbitrary scripts.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | jenkins |
| Chart Version       | 0.6.2   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for jenkins.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

Master:
  Name: jenkins-master
  Image: 'jenkinsci/jenkins'
  ImageTag: '2.46.2'
  ImagePullPolicy: 'Always'
  Component: 'jenkins-master'
  UseSecurity: true
  AdminUser: admin
  # AdminPassword: <defaults to random>
  Cpu: '200m'
  Memory: '256Mi'
  # Set min/max heap here if needed with:
  # JavaOpts: "-Xms512m -Xmx512m"
  ServicePort: 8080
  # For minikube, set this to NodePort, elsewhere use LoadBalancer
  # Use ClusterIP if your setup includes ingress controller
  ServiceType: LoadBalancer
  # Used to create Ingress record (should used with ServiceType: ClusterIP)
  # HostName: jenkins.cluster.local
  # NodePort: <to set explicitly, choose port between 30000-32767
  ContainerPort: 8080
  SlaveListenerPort: 50000
  LoadBalancerSourceRanges:
    - 0.0.0.0/0
  # List of plugins to be install during Jenkins master start
  InstallPlugins:
    - kubernetes:0.11
    - workflow-aggregator:2.5
    - credentials-binding:1.11
    - git:3.2.0
  # Used to approve a list of groovy functions in pipelines used the script-security plugin. Can be viewed under /scriptApproval
  # ScriptApproval:
  #   - "method groovy.json.JsonSlurperClassic parseText java.lang.String"
  #   - "new groovy.json.JsonSlurperClassic"
  # List of groovy init scripts to be executed during Jenkins master start
  InitScripts:
  #  - |
  #    print 'adding global pipeline libraries, register properties, bootstrap jobs...'
  CustomConfigMap: false

  Ingress:
    Annotations:
      # kubernetes.io/ingress.class: nginx
      # kubernetes.io/tls-acme: "true"

    TLS:
      # - secretName: jenkins.cluster.local
      #   hosts:
      #     - jenkins.cluster.local

Agent:
  Enabled: true
  Image: jenkinsci/jnlp-slave
  ImageTag: 2.62
  Privileged: false
  Cpu: '200m'
  Memory: '256Mi'

Persistence:
  Enabled: true
  ## A manually managed Persistent Volume and Claim
  ## Requires Persistence.Enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # ExistingClaim:

  ## If defined, volume.beta.kubernetes.io/storage-class: <StorageClass>
  ## Default: volume.alpha.kubernetes.io/storage-class: default
  ##
  # StorageClass:
  AccessMode: ReadWriteOnce
  Size: 8Gi
  volumes:
  #  - name: nothing
  #    emptyDir: {}
  mounts:
#  - mountPath: /var/nothing
#    name: nothing
#    readOnly: true
```

</details>

---

# Jenkins Helm Chart

Jenkins master and slave cluster utilizing the Jenkins Kubernetes plugin

- https://wiki.jenkins-ci.org/display/JENKINS/Kubernetes+Plugin

Inspired by the awesome work of Carlos Sanchez <carlos@apache.org>

## Chart Details

This chart will do the following:

- 1 x Jenkins Master with port 8080 exposed on an external LoadBalancer
- All using Kubernetes Deployments

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/jenkins
```

## Configuration

The following tables lists the configurable parameters of the Jenkins chart and their default values.

### Jenkins Master

| Parameter                         | Description                         | Default                                                                      |
| --------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| `Master.Name`                     | Jenkins master name                 | `jenkins-master`                                                             |
| `Master.Image`                    | Master image name                   | `jenkinsci/jenkins`                                                          |
| `Master.ImageTag`                 | Master image tag                    | `2.46.1`                                                                     |
| `Master.ImagePullPolicy`          | Master image pull policy            | `Always`                                                                     |
| `Master.Component`                | k8s selector key                    | `jenkins-master`                                                             |
| `Master.Cpu`                      | Master requested cpu                | `200m`                                                                       |
| `Master.Memory`                   | Master requested memory             | `256Mi`                                                                      |
| `Master.ServiceType`              | k8s service type                    | `LoadBalancer`                                                               |
| `Master.ServicePort`              | k8s service port                    | `8080`                                                                       |
| `Master.NodePort`                 | k8s node port                       | Not set                                                                      |
| `Master.ContainerPort`            | Master listening port               | `8080`                                                                       |
| `Master.SlaveListenerPort`        | Listening port for agents           | `50000`                                                                      |
| `Master.LoadBalancerSourceRanges` | Allowed inbound IP addresses        | `0.0.0.0/0`                                                                  |
| `Master.CustomConfigMap`          | Use a custom ConfigMap              | `false`                                                                      |
| `Master.Ingress.Annotations`      | Ingress annotations                 | `{}`                                                                         |
| `Master.Ingress.TLS`              | Ingress TLS configuration           | `[]`                                                                         |
| `Master.InitScripts`              | List of Jenkins init scripts        | Not set                                                                      |
| `Master.InstallPlugins`           | List of Jenkins plugins to install  | `kubernetes:0.11 workflow-aggregator:2.5 credentials-binding:1.11 git:3.2.0` |
| `Master.ScriptApproval`           | List of groovy functions to approve | Not set                                                                      |

### Jenkins Agent

| Parameter          | Description                                     | Default                |
| ------------------ | ----------------------------------------------- | ---------------------- |
| `Agent.Enabled`    | Enable Kubernetes plugin jnlp-agent podTemplate | `true`                 |
| `Agent.Image`      | Agent image name                                | `jenkinsci/jnlp-slave` |
| `Agent.ImageTag`   | Agent image tag                                 | `2.62`                 |
| `Agent.Privileged` | Agent privileged container                      | `false`                |
| `Agent.Cpu`        | Agent requested cpu                             | `200m`                 |
| `Agent.Memory`     | Agent requested memory                          | `256Mi`                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/jenkins
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The Jenkins image stores persistence under `/var/jenkins_home` path of the container. A dynamically managed Persistent Volume
Claim is used to keep the data across deployments, by default. This is known to work in GCE, AWS, and minikube. Alternatively,
a previously configured Persistent Volume Claim can be used.

It is possible to mount several volumes using `Persistence.volumes` and `Persistence.mounts` parameters.

### Persistence Values

| Parameter                   | Description                     | Default         |
| --------------------------- | ------------------------------- | --------------- |
| `Persistence.Enabled`       | Enable the use of a Jenkins PVC | `true`          |
| `Persistence.ExistingClaim` | Provide the name of a PVC       | `nil`           |
| `Persistence.AccessMode`    | The PVC access mode             | `ReadWriteOnce` |
| `Persistence.Size`          | The size of the PVC             | `8Gi`           |
| `Persistence.volumes`       | Additional volumes              | `nil`           |
| `Persistence.mounts`        | Additional mounts               | `nil`           |

#### Existing PersistentVolumeClaim

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --name my-release --set Persistence.ExistingClaim=PVC_NAME stable/jenkins
```

## Custom ConfigMap

When creating a new chart with this chart as a dependency, CustomConfigMap can be used to override the default config.xml provided.
It also allows for providing additional xml configuration files that will be copied into `/var/jenkins_home`. In the parent chart's values.yaml,
set the value to true and provide the file `templates/config.yaml` for your use case. If you start by copying `config.yaml` from this chart and
want to access values from this chart you must change all references from `.Values` to `.Values.jenkins`.

```
jenkins:
  Master:
    CustomConfigMap: true
```
