# `@helm-charts/ibm-charts-ibm-microclimate`

End to end development environment for rapidly creating, developing and deploying applications.

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | ibm-charts       |
| Chart Name          | ibm-microclimate |
| Chart Version       | 1.5.0            |
| NPM Package Version | 0.1.0            |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
#*******************************************************************************
# Licensed Materials - Property of IBM
# "Restricted Materials of IBM"
#
# Copyright IBM Corp. 2017 All Rights Reserved
#
# US Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with IBM Corp.
#*******************************************************************************
global:
  rbac:
    serviceAccountName: 'default'
  helm:
    tlsSecretName: 'microclimate-helm-secret'
theia:
  repository: ibmcom/microclimate-theia
  tag: 1808
  resources:
    requests:
      memory: 128Mi
      cpu: 30m
    limits:
      memory: 1Gi
      cpu: 500m

filewatcher:
  repository: ibmcom/microclimate-file-watcher
  tag: 1808
  resources:
    requests:
      memory: 128Mi
      cpu: 100m
    limits:
      memory: 2Gi
      cpu: 300m

portal:
  repository: ibmcom/microclimate-portal
  tag: 1808
  resources:
    requests:
      memory: 128Mi
      cpu: 100m
    limits:
      memory: 2Gi
      cpu: 500m

devops:
  repository: ibmcom/microclimate-devops
  tag: 1808
  pullPolicy: Always
  resources:
    requests:
      memory: 128Mi
      cpu: 100m
    limits:
      memory: 2Gi
      cpu: 1000m

beacon:
  repository: ibmcom/microclimate-beacon
  tag: 1808
  resources:
    requests:
      memory: 128Mi
      cpu: 100m
    limits:
      memory: 2Gi
      cpu: 1000m

jmeter:
  repository: ibmcom/microclimate-jmeter
  tag: 1808

imagePullPolicy: Always

persistence:
  enabled: true
  existingClaimName:
  useDynamicProvisioning: true
  size: 8Gi
  storageClassName: ''

ports:
  portal: 9090
  theia: 4191
  filewatcher: 9091

arch:
  amd64: '3 - Most preferred'
  ppc64le: '0 - Do not use'
  s390x: '0 - Do not use'

hostName: ''

jenkins:
  # pipeline section used to modify the default pipeline
  Pipeline:
    # Build step for all pipelines that are built by this Jenkins.
    Build: true
    # Deploy step for all pipelines built by this Jenkins.
    Deploy: true
    #  Setting this to true enables testing in the pipeline.
    Test: true
    #  Setting this to 'true' will prevent temporary namespaces from being deleted after tests are run against them.
    Debug: false
    # registry section points to a docker registry where images that are built via this pipeline are stored
    Registry:
      # The URL of the Docker registry for this pipeline e.g. mycluster.icp:8500/default.
      # May be required to change if your registry is elsewhere.
      Url: mycluster.icp:8500/default
      # The name of the Kubernetes secret to be used for registry access.
      Secret: microclimate-registry-secret
    # TargetNamespace is the namespace that the pipeline will deploy to.
    TargetNamespace: 'microclimate-pipeline-deployments'
    # template section defines the location of the Git repository from which the microserviceBuilderPipeline.groovy library is obtained
    Template:
      # repositoryUrl of the pipeline template
      RepositoryUrl: 'https://github.com/microclimate-dev2ops/jenkins-library.git'
      # version is the branch or tag to be used when downloading the library
      Version: '18.08'
  Master:
    ServiceType: ClusterIP
    CustomConfigMap: true
    HostName:
    UseSecurity: true
    AdminUser: admin
    AdminPassword: admin
    Image: ibmcom/microclimate-jenkins
    ImageTag: 1808
    LoginOpenIdConnect: true
    InstallPlugins:
      - credentials-binding:1.16
    JavaOpts: '-Xms1024m -Xmx1024m'
    HealthProbesLivenessTimeout: 240
    HealthProbeLivenessFailureThreshold: 100
    HealthProbesReadinessTimeout: 45
    Memory: '1500Mi'

  Agent:
    Memory: '600Mi'
  Persistence:
    ExistingClaim:
    StorageClass:
  # This is for Jenkins *and* DevOps
  rbac:
    serviceAccountName: 'default'
    install: false
```

</details>

---

# Microclimate

## Introduction

Microclimate is an end to end development environment that lets you rapidly create, edit, and deploy applications.

This chart can be used to install Microclimate into a Kubernetes environment.

Visit the [Microclimate landing page](https://microclimate-dev2ops.github.io/) to learn more, or visit our [Slack channel](https://ibm-cloud-tech.slack.com/messages/C8RS7HBHV/) to ask any Microclimate questions you might have.

For more information about what's new in the latest chart, see [Release notes](https://github.com/IBM/charts/blob/master/stable/ibm-microclimate/RELEASENOTES.md).

## Chart details

This chart does the following:

- Deploy Microclimate
- Deploy Jenkins, used by the Microclimate pipeline
- Create services for Microclimate and Jenkins
- Create ingress points for Microclimate
- Create an optional Jenkins ingress
- Create Persistent Volume Claims if they aren't provided, see [configuration](#configuration) for more details.

## Prerequisites

- IBM Cloud Private version 2.1.0.3. (**NOTE** ICP 2.1.0.2 installation might work but is not tested)
- For **IBM Cloud Private 2.1.0.2**, an additional installation step is required. See the [installation steps](#installing-the-chart) below
- Ensure [socat](http://www.dest-unreach.org/socat/doc/README) is available on all worker nodes in your cluster. Microclimate uses Helm internally and both the Helm Tiller and client require socat for port forwarding.

## Resources Required

The Microclimate containers have the following resource requests and limits:

| Container        | Memory Request | Memory Limit | CPU Request | CPU Limit |
| ---------------- | -------------- | ------------ | ----------- | --------- |
| theia            | 350Mi          | 1Gi          | 30m         | 500m      |
| file-watcher     | 128Mi          | 2Gi          | 100m        | 300m      |
| portal           | 128Mi          | 2Gi          | 100m        | 500m      |
| beacon           | 128Mi          | 2Gi          | 100m        | 500m      |
| devops           | 128Mi          | 2Gi          | 100m        | 1000m     |
| jenkins - Master | 1500Mi         | -            | 200m        | -         |
| jenkins - Agent  | 600Mi          | -            | 200m        | -         |

See [configuration](#configuration) for details on how to configure these values

# Installing the Chart

**IMPORTANT** - For Microclimate to function correctly, you must first:

1. Create a Docker registry secret for Microclimate.
2. Patch this secret to a service account.
3. Ensure that the target namespace for deployments can access the docker image registry.
4. Create a secret so Microclimate can securely use Helm.
5. Set the Microclimate and Jenkins hostname values
6. Ensure Microclimate is configured correctly to use persistent storage, see the [configuration](#configuration) section below for more details.
7. (ICP 2.1.0.2 only) Set the Jenkins template version

#### Installing into a non-default namespace

Microclimate can be installed into a non-default namespace by specifying configuration options when installing the Helm chart.

Set `global.rbac.serviceAccountName=<a name>,jenkins.rbac.serviceAccountName=<a name>` when installing the chart.

For example:

`helm install --name microclimate --namespace ns2 --set global.rbac.serviceAccountName=ns2-micro-sa,jenkins.rbac.serviceAccountName=ns2-devops-sa,hostName=microclimate.${INGRESS_IP}.nip.io,jenkins.Pipeline.Registry.Url=mycluster.icp:8500/ns2,jenkins.Master.HostName=jenkins.${INGRESS_IP}.nip.io ibm-charts/ibm-microclimate`

Configure the `jenkins.Pipeline.Registry.Url` as the namespace corresponding to your Docker registry namespace. In the above example, you cannot push to the default Docker registry in a non-default namespace because the pod will not have pull permissions. As a result, you must set `jenkins.Pipeline.Registry.Url=mycluster.icp:8500/ns2`

It is up to an administrator to create the service account with the corresponding cluster role bindings and roles. For a worked example see [the non-default namespace documentation for Microclimate](https://microclimate-dev2ops.github.io/installndnamespace).

Secrets should also be created in the namespace that you deploy into, for example, you can append `--namespace team1` to create the secret in the `team1` namespace, and the examples below should be modified accordingly.

```
kubectl create secret docker-registry microclimate-registry-secret \
  --docker-server mycluster.icp:8500 \
  --docker-username admin \
  --docker-email null \
  --docker-password admin \
  --namespace team1
```

The service accounts need to be patched too and this is also covered at the non-default namespace installation documentation linked to above.

For more information on role-based access control, consult the [IBM Private Cloud RBAC documentation](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/user_management/assign_role.html) and the [official Kubernetes RBAC documentation](https://kubernetes.io/docs/admin/authorization/rbac).

#### Create Docker registry secret

Create a Docker registry secret in the default namespace:

```
kubectl create secret docker-registry microclimate-registry-secret \
  --docker-server=mycluster.icp:8500 \
  --docker-username=<account-name> \
  --docker-password=<account-password> \
  --docker-email=<account-email>
```

For example, to create the secret for an account named 'admin' with the password 'admin':

```
kubectl create secret docker-registry microclimate-registry-secret \
  --docker-server=mycluster.icp:8500 \
  --docker-username=admin \
  --docker-password=admin \
  --docker-email=null
```

#### Patch service account

After creating the Docker registry secret, check if the default service account has `imagePullSecrets` associated with it already:

```
kubectl describe serviceaccount default
```

If it does not, patch the service account by using the following command, specifying the name of the service account. For example, to patch to the service account named `default`:

```
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "microclimate-registry-secret"}]}'
```

If it does, use this array:

```
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "microclimate-registry-secret"}, {"name": "secret-1"}, ...., {"name": "secret-n"} ]}'

bx pr login -a https://mycluster.icp:8443
kubectl create secret generic microclimate-helm-secret --from-file=cert.pem=<user path>/.helm/cert.pem --from-file=ca.pem=<user path>/.helm/ca.pem --from-file=key.pem=<user path>/.helm/key.pem
```

#### Ensure target namespace for deployments

The chart parameter `jenkins.Pipeline.TargetNamespace` defines the namespace that the pipeline deploys to. Its default value is "microclimate-pipeline-deployments". This namespace must be created before using the pipeline. Ensure that the default service account in this namespace has an associated image pull secret that permits pods in this namespace to pull images from the ICP image registry. For example, you might create another docker-registry secret and patch the service account:

```
kubectl create secret docker-registry microclimate-registry-secret \
  --namespace=microclimate-pipeline-deployments \
  --docker-server=mycluster.icp:8500 \
  --docker-username=admin \
  --docker-password=admin \
  --docker-email=null

kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "microclimate-registry-secret"}]}' --namespace microclimate-pipeline-deployments
```

Currently, these steps are completed by you if you use a pipeline in the 'deploy last good commit' mode. The patch happens when the pipeline first runs.

#### Create a secret to use Tiller over TLS

**NOTE**: This step can be skipped for ICP 2.1.0.2 installation

Microclimate's pipeline deploys applications by using the Tiller at `kube-system`. Secure communication with this Tiller is required and must be configured by creating a Kubernetes secret that contains the required certificate files as detailed below.

To create the secret, use the following command replacing the values with where you saved your files:

```
kubectl create secret generic microclimate-helm-secret --from-file=cert.pem=.helm/cert.pem --from-file=ca.pem=.helm/ca.pem --from-file=key.pem=.helm/key.pem
```

For example, you can download the IBM Cloud Private CLI from an IBM Cloud Private instance you've authenticated with. Then, use the `bx pr login` command by providing your login details and the master IP address of the cluster. The `bx pr` plug-in is not installed by default with the `bx` command, and it is not included in the `bx pr` plug-in repository. Download the plug-in from IBM Cloud Private. For more information, see [Installing the IBM Cloud Private CLI](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.3/manage_cluster/install_cli.html), which lists instructions for how to install the `bx pr` plug-in, and the [IBM Cloud Private CLI documentation](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/manage_cluster/cli_commands.html), which provides the certificate files that you can use to create the secret.

The name of the secret you've created is printed by the Microclimate pipeline when you run a Jenkins job against your project: with this secret present your deployed applications appear as a Helm release alongside any others that were deployed from `kube-system`.

Note: It is your responsibility to ensure that the certificate and the secret remain valid.

#### Set Microclimate and Jenkins hostname values

Access to Microclimate and Jenkins is provided via two Kubernetes Ingresses which are created by using the `hostName` and `jenkins.Master.Hostname` parameters respectively. Each of these parameters should consist of a fully-qualified domain name that resolves to the IP address of your cluster's proxy node, with a unique sub-domain that is used to route to the Microclimate and Jenkins user interfaces. For example, if `example.com` resolved to the proxy node, then `microclimate.example.com` and `jenkins.example.com` could be used. When a domain name is not available, the service `nip.io` can be used to provide a resolution based on an IP address. For example, `microclimate.<IP>.nip.io` and `jenkins.<IP>.nip.io` where `<IP>` would be replaced with the IP address of your cluster's proxy node.

The IP address of your cluster's proxy node can be found by using the following command:

`kubectl get nodes -l proxy=true -o yaml | grep -B 1 ExternalIP`

NOTE: Kubernetes allows multiple Ingresses to be created with the same hostname and one of the ingresses only is accessible via that hostname. When you install multiple instances of Microclimate, different hostname values must be used for each instance to ensure that each is accessible.

#### Set the Jenkins template version

**NOTE**: This is required when installing into ICP 2.1.0.2 only - do not do this for other versions of ICP

The latest versions of the Jenkins pipeline template do not support ICP 2.1.0.2 and so the version of the Jenkins pipeline template must be changed to an older version; set the `jenkins.Pipeline.Template.Version` value to `"18.03"`.

#### Installing from the command line

To install the chart from the command line with the release name `microclimate`:

```
helm repo add ibm-charts https://raw.githubusercontent.com/IBM/charts/master/repo/stable/
helm install --name microclimate --set hostName=microclimate.<icp-proxy>.nip.io --set jenkins.Master.HostName=jenkins.<icp-proxy>.nip.io ibm-charts/ibm-microclimate --tls
```

See the [Set Microclimate and Jenkins hostname values](#set-microclimate-and-jenkins-hostname-values) section above to determine suitable values for `microclimate.<icp-proxy>` and `jenkins.<icp-proxy>`.

This command deploys Microclimate on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Verifying the Chart

Verify the chart by accessing the Microclimate Portal, by using your IBM Cloud Private credentials to log in.

When the Helm install has completed successfully, the Microclimate Portal can be accessed via the Microclimate ingress hostname. This can be found by passing the name of your Microclimate release into the following command:

`kubectl get ingress -l release=<release_name>`

If you are using Helm to install Microclimate, you can access the Microclimate Portal by using the URL printed at the end of the installation.

Use the following command to view all resources created by this chart, replacing `x.y.z` with the version number of the installed chart, for example `1.0.0`:

`kubectl get all -l chart=ibm-microclimate-x.y.z`

## Uninstalling the Chart

To uninstall or delete the `microclimate` release:

```bash
helm delete --purge microclimate
```

The command removes all the Kubernetes resources that are associated with the chart and deletes the release.

## Configuration

#### Persistent Storage

Microclimate requires two persistent volumes to function correctly: one for storing project workspaces and one for the Jenkins pipeline. The persistent volume used for project workspaces is shared by all users of the Microclimate instance and must be defined with an access mode of ReadWriteMany (RWX). The volume for Jenkins should be ReadWriteOnce (RWO). The default size of the persistent volume claim for the project workspaces is 8Gi. Configure this size with the `persistence.size` option to scale with the number of users and the number and size of the projects they are expected to create or import into Microclimate. As a rough guide, a generated Java project is approximately 128Mi, a generated Swift project is approximately 100Mi, and a generated Node.js project is approximately 1Mi. Therefore, the default size of 8Gi allows space for approximately 64 Java projects.

The Jenkins pipeline requires an 8GB persistent volume, which currently isn't configurable.

Both Microclimate and Jenkins can use existing Persistent Volume Claims, which should follow the guidelines above for storage size. These names can be passed into the `persistence.existingClaimName` and `jenkins.Persistence.ExistingClaim` chart values.

If you want to use Dynamic Provisioning, or you want Microclimate to create its own `PersistentVolumeClaim`, these values must be left blank.

Dynamic Provisioning is enabled by default (`persistence.useDynamicProvisioning`) and uses the default storage class set up in your cluster. A different storage class can be used by editing the `persistence.storageClassName` option for Microclimate and the `jenkins.Persistence.StorageClass` option for Jenkins in the configuration.

Microclimate attempts to create its own persistent volume claim by using the `persistence.storageClassName` and `persistence.size` options if Dynamic Provisioning isn't enabled and if PVCs aren't provided by name.

**Warning:** Microclimate stores any projects that are created by users in whichever Persistent Volume it gets mounted to. Uninstalling Microclimate might cause data to be lost if the `PersistentVolume` and `PersistentVolumeClaim` aren't configured correctly. To avoid losing data, we recommend that you have the correct Reclaim Policy set in a provided `PersistentVolumeClaim` or in the provided `StorageClass` if you are using Dynamic Provisioning. The same practice should be applied to the Jenkins persistent volume.

**Warning:** Avoid using hostPath persistent volumes. A hostPath volume sets up a file system on a single node of a cluster. The portal, file-watcher, and editor pods need access to the same file system, and these pods can start on different nodes. If the pods start on different nodes, pods that are started on one node are unable to access the hostPath volume that is created on a different node.

For more information about creating Persistent Storage and enabling Dynamic Provisioning, see [Cluster Storage](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/manage_cluster/cluster_storage.html),
[Working with storage](https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage), and
[Dynamic Provisioning](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/installing/storage_class_all.html).

#### Resource requests and limits

Each Microclimate container has a set of default requests and limits for CPU and Memory usage. These are set at recommended values but should be configured to suit the needs of your cluster.

#### Configuring Microclimate

Microclimate provides a number of configuration options to customise its installation. Below are a list of configurable parameters.

If you are installing by using the Helm CLI then values can be set by using one or more `--set` arguments when doing `helm install`. For example, to configure persistent storage options, you can use the following:

`helm install --name myMicroclimate --set persistence.useDynamicProvisioning=false --set persistence.size=16Gi --set hostName=<MICROCLIMATE_INGRESS> ibm-charts/ibm-microclimate`

#### Configuration parameters

| Parameter                            | Description                                                                                                                                                  | Default                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `hostName`                           | URL to the Ingress point for Microclimate                                                                                                                    | **MUST BE SET BY USER**            |
| `theia.repository`                   | Image repository for theia                                                                                                                                   | `ibmcom/microclimate-theia`        |
| `theia.tag`                          | Tag for theia image                                                                                                                                          | `latest`                           |
| `filewatcher.repository`             | Image repository for file-watcher                                                                                                                            | `ibmcom/microclimate-file-watcher` |
| `filewatcher.tag`                    | Tag for file-watcher image                                                                                                                                   | `latest`                           |
| `portal.repository`                  | Image repository for portal                                                                                                                                  | `ibmcom/microclimate-portal`       |
| `portal.tag`                         | Tag for portal image                                                                                                                                         | `latest`                           |
| `beacon.repository`                  | Image repository for beacon                                                                                                                                  | `ibmcom/microclimate-beacon`       |
| `beacon.tag`                         | Tag for beacon image                                                                                                                                         | `latest`                           |
| `imagePullPolicy`                    | Image pull policy used for all images                                                                                                                        | `Always`                           |
| `persistence.enabled`                | Use persistent storage for Microclimate workspace                                                                                                            | `true`                             |
| `persistence.existingClaimName`      | Name of an existing PVC to be used with Microclimate - Should be left blank if you use Dynamic Provisioning or if you want Microclimate to make it's own PVC | `""`                               |
| `persistence.useDynamicProvisioning` | Use dynamic provisioning                                                                                                                                     | `true`                             |
| `persistence.size`                   | Storage size allowed for Microclimate workspace                                                                                                              | `8Gi`                              |
| `persistence.storageClassName`       | Storage class name for Microclimate workspace                                                                                                                | `""`                               |
| `jenkins.Master.HostName`            | Host name used for Ingress for the Jenkins                                                                                                                   | `""`                               |
| `jenkins.Persistence.StorageClass`   | Storage class name for Microclimate workspace                                                                                                                | `""`                               |
| `jenkins.Persistence.ExistingClaim`  | Name of an existing PVC to be used for Jenkins - Should be left blank if you use Dynamic Provisioning or if you want Microclimate to make it's own PVC       | `""`                               |
| `jenkins.rbac.serviceAccountName`    | Name of an existing service account for Jenkins and the DevOps component to use                                                                              | `"default"`                        |
| `global.helm.tlsSecretName`          | Name of the Kubernetes secret to be used by the Microclimate pipeline: must be provided in order to use Tiller securely                                      | `""`                               |
| `global.rbac.serviceAccountName`     | Name of an existing service account for Microclimate's Portal and File Watcher components to use                                                             | `"default"`                        |

Jenkins also has a number of other configurable options not listed here. These can be viewed in the chart's `values.yaml` file or in your cluster's dashboard page for this chart.

Resource requests and limits can also be configured for each of the `theia`, `filewatcher`, and `portal` containers by using the options below, for example, `theia.resources.request.cpu`:

| Parameter                                   | Description                               | Default                                                                      |
| ------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| `<containerName>.resources.requests.cpu`    | CPU Request size for a given container    | View the [Resources Required](#ResourcesRequired) section for default values |
| `<containerName>.resources.limits.cpu`      | CPU Limit size for a given container      | View the [Resources Required](#ResourcesRequired) section for default values |
| `<containerName>.resources.requests.memory` | Memory Request size for a given container | View the [Resources Required](#ResourcesRequired) section for default values |
| `<containerName>.resources.limits.memory`   | Memory Limit size for a given container   | View the [Resources Required](#ResourcesRequired) section for default values |

#### Replace TLS certificates

The default installation of Microclimate on an ICP cluster configures a secure TLS endpoint through Ingress for both the Microclimate and Jenkins user interfaces. If customization of the certificates used to secure these TLS endpoints is required, follow this procedure.

These commands can be run from any host that has a kubectl client with access to the ICP cluster that is the target of the changes.

1. Generate or acquire a new certificate for Microclimate

Substituting your own TLS certificate for encrypting Microclimate communications requires a certificate and key file. If you are not using an existing certificate, a new certificate needs to be generated. The following command creates a new certificate for this purpose:

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=microclimate.myhost.com"`

Note: Replace `microclimate.myhost.com` with your unique Microclimate ingress endpoint.

2. Replace the Microclimate TLS certificate

The next step is to take the certificate acquired in step 1 and replace the existing certificate being used for Microclimate TLS communications. The default installation of Microclimate creates a Kubernetes secret named `microclimate-mc-tls-secret` which contains this certificate. Use the following command to replace that secret with your new certificate:

`kubectl create secret tls microclimate-mc-tls-secret --key tls.key --cert tls.crt --dry-run -o yaml | kubectl replace --force -f -`

3. Generate or acquire a new certificate for Microclimate Jenkins

Substituting your own TLS certificate for encrypting Microclimate Jenkins communications requires a certificate and key file. If you are not using an existing certificate, a new certificate needs to be generated. The following command creates a suitable new certificate for this purpose:

`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=jenkins.myhost.com"`

Note: Replace `jenkins.myhost.com` with your unique Microclimate Jenkins ingress endpoint.

4. Replace the Microclimate Jenkins TLS certificate

The last step is to take the certificate acquired in step 3 and replace the existing certificate being used for Microclimate Jenkins TLS communications. The default installation of Microclimate creates a Kubernetes secret named `microclimate-tls-secret` which contains this certificate. Use the following command to replace that secret with your new certificate:

`kubectl create secret tls microclimate-tls-secret --key tls.key --cert tls.crt --dry-run -o yaml | kubectl replace --force -f -`

## Limitations

- This chart should only use the default image tags provided with the chart. Different image versions might not be compatible with different versions of this chart.

See the [product documentation](https://microclimate-dev2ops.github.io/knownissues) for other known issues and limitations.

## Documentation

The Microclimate [landing page](https://microclimate-dev2ops.github.io) provides additional learning resources and documentation.
