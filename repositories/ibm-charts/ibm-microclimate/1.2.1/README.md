# `@helm-charts/ibm-charts-ibm-microclimate`

End to end development environment for rapidly creating, developing and deploying applications.

| Field               | Value            |
| ------------------- | ---------------- |
| Repository Name     | ibm-charts       |
| Chart Name          | ibm-microclimate |
| Chart Version       | 1.2.1            |
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
  helm:
    tlsSecretName: 'microclimate-helm-secret'
theia:
  repository: ibmcom/microclimate-theia
  tag: 1805
  resources:
    requests:
      memory: 350Mi
      cpu: 30m
    limits:
      memory: 1Gi
      cpu: 500m

filewatcher:
  repository: ibmcom/microclimate-file-watcher
  tag: 1805
  resources:
    requests:
      memory: 128Mi
      cpu: 100m
    limits:
      memory: 2Gi
      cpu: 300m

portal:
  repository: ibmcom/microclimate-portal
  tag: 1805
  resources:
    requests:
      memory: 128Mi
      cpu: 100m
    limits:
      memory: 2Gi
      cpu: 500m

devops:
  repository: ibmcom/microclimate-devops
  tag: 1805
  pullPolicy: Always
  resources:
    requests:
      memory: 128Mi
      cpu: 100m
    limits:
      memory: 2Gi
      cpu: 1000m

jmeter:
  repository: ibmcom/microclimate-jmeter
  tag: 1805

imagePullPolicy: Always

persistence:
  enabled: true
  existingClaimName:
  useDynamicProvisioning: true
  size: 2Gi
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
      Version: '18.05'
  Master:
    ServiceType: ClusterIP
    CustomConfigMap: true
    HostName:
    UseSecurity: true
    AdminUser: admin
    AdminPassword: admin
    Image: ibmcom/microclimate-jenkins
    ImageTag: 1805
    LoginOpenIdConnect: true
    InstallPlugins:
    JavaOpts: '-Xms1024m -Xmx1024m'
    Memory: '1500Mi'
  Agent:
    Memory: '600Mi'
  Persistence:
    ExistingClaim:
    StorageClass:

gitlab:
  url:
  apiToken:
```

</details>

---

# Microclimate

## Introduction

Microclimate is an end to end development environment that lets you rapidly create, edit, and deploy applications.

This chart can be used to install Microclimate into a Kubernetes environment.

Visit the [Microclimate landing page](https://microclimate-dev2ops.github.io/) to learn more, or visit our [Slack channel](https://ibm-cloud-tech.slack.com/messages/C8RS7HBHV/) to ask any Microclimate questions you might have.

## Chart details

This chart will do the following:

- Deploy Microclimate
- Deploy Jenkins, used by the Microclimate pipeline
- Create services for Microclimate and Jenkins
- Create ingress points for Microclimate
- Create an optional Jenkins ingress
- Create Persistent Volume Claims if they aren't provided, see [configuration](#configuration) for more details

## Prerequisites

- IBM Cloud Private version 2.1.0.3. (**NOTE** ICP 2.1.0.2 installation may work but is not tested)
- For **IBM Cloud Private 2.1.0.2**, an additional installation step is required. See the [installation steps](#installing-the-chart) below
- Ensure [socat](http://www.dest-unreach.org/socat/doc/README) is available on all worker nodes in your cluster. Microclimate uses Helm internally and both the Helm Tiller and client require socat for port forwarding.

## Resources Required

The Microclimate containers have the following resource requests and limits:

| Container        | Memory Request | Memory Limit | CPU Request | CPU Limit |
| ---------------- | -------------- | ------------ | ----------- | --------- |
| theia            | 350Mi          | 1Gi          | 30m         | 500m      |
| file-watcher     | 128Mi          | 2Gi          | 100m        | 300m      |
| portal           | 128Mi          | 2Gi          | 100m        | 500m      |
| devops           | 128Mi          | 2Gi          | 100m        | 1000m     |
| jenkins - Master | 1500Mi         | -            | 200m        | -         |
| jenkins - Agent  | 600Mi          | -            | 200m        | -         |

See [configuration](#configuration) for details on how to configure these values

## Installing the Chart

**IMPORTANT** - For Microclimate to function correctly, you must first:

1. Create a Docker registry secret for Microclimate.
2. Patch this secret to a service account.
3. Create a secret so Microclimate can securely use Helm.
4. Set the Microclimate and Jenkins hostname values
5. Ensure Microclimate is configured correctly to use persistent storage, see the [configuration](#configuration) section below for more details.
6. (ICP 2.1.0.2 only) Set the Jenkins template version and unset the Helm secret value

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

After creating the Docker registry secret, patch the service account by using the following command, specifying the name of the service account. For example, to patch to the service account named `default`:

```
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "microclimate-registry-secret"}]}'
```

Note: If there are other secrets that need to be associated to this service account, they should be included in the `imagePullSecrets` array in the command above, for example, `... '{"imagePullSecrets": [{"name": "microclimate-registry-secret"}, {"name": "secret-1"}, ...., {"name": "secret-n"} ]}'`

#### Create a secret to use Tiller over TLS

**NOTE**: This step can be skipped for ICP 2.1.0.2 installation

Microclimate's pipeline deploys applications using the Tiller at `kube-system`. Secure communication with this Tiller is required and must be configured by creating a Kubernetes secret that contains the required certificate files as detailed below.

To create the secret, use the following command replacing the values with where you saved your files:

```
kubectl create secret generic microclimate-helm-secret --from-file=cert.pem=.helm/cert.pem --from-file=ca.pem=.helm/ca.pem --from-file=key.pem=.helm/key.pem
```

For example, you can download the IBM Cloud Private CLI from an IBM Cloud Private instance you've authenticated with, and then use the `bx pr login` command providing your login details and the cluster's master IP address. For more information, see the [IBM Cloud Private CLI documentation](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/manage_cluster/cli_commands.html#pr_login) where you are also provided with the certificate files with which you are required to create the secret.

The name of the secret you've created will be printed by the Microclimate pipeline when running a Jenkins job against your project: with this secret present your deployed applications will appear as a Helm release alongside any others that were deployed from `kube-system`.

Note that it is your responsibility to ensure the certificate and the secret remain valid.

#### Set Microclimate and Jenkins hostname values

Access to Microclimate and Jenkins is provided via two Kubernetes Ingresses which are created using the `hostName` and `jenkins.Master.Hostname` parameters respectively. Each of these parameters should consist of a fully-qualified domain name that resolves to the IP address of your cluster's proxy node, with a unique sub-domain that is used to route to the Microclimate and Jenkins user interfaces. For example, if `example.com` resolved to the proxy node, then `microclimate.example.com`and `jenkins.example.com` could be used. When a domain name is not available, the service `nip.io` can be used to provide a resolution based on an IP address. For example, `microclimate.<IP>.nip.io` and `jenkins.<IP>.nip.io` where `<IP>` would be replaced with the IP address of your cluster's proxy node.

The IP address of your cluster's proxy node can be found by using the following command:

`kubectl get nodes -l proxy=true`

NOTE: Kubernetes allows multiple Ingresses to be created with the same hostname and only one of the ingresses will be accessible via that hostname. When installing multiple instances of Microclimate, different hostname values must be used for each instance to ensure each is accessible.

#### Unset the Helm secret value and set the Jenkins template version

**NOTE**: This is only required when installing into ICP 2.1.0.2 - do not do this for other versions of ICP

The default value for the `global.helm.tlsSecretName` will not work on 2.1.0.2 and so the chart must be installed with this value being empty. In addition, the version of the Jenkins template must be changed to an older version; set the `jenkins.Template.Version` value to `"18.03"`.

#### Installing from the command line

**IMPORTANT** - Microclimate must be installed into the default namespace. Deployment into other namespaces is currently not supported.

To install the chart from the command line with the release name `microclimate`:

```
helm repo add ibm-charts https://raw.githubusercontent.com/IBM/charts/master/repo/stable/
helm install --name microclimate --set hostName=<MICROCLIMATE_INGRESS> --set jenkins.Master.HostName=<JENKINS_INGRESS> ibm-charts/ibm-microclimate
```

See the [Set Microclimate and Jenkins hostname values](#set-microclimate-and-jenkins-hostname-values) section above to determine suitable values for `<MICROCLIMATE_INGRESS>` and `<JENKINS_INGRESS>`.

This command deploys Microclimate on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

## Verifying the Chart

When the Helm install has completed successfully, the Microclimate Portal can be accessed via the Microclimate ingress hostname. This can be found by passing the name of your Microclimate release into the following command:

`kubectl get ingress -l release=<release_name>`

If you are using Helm to install Microclimate, you can access the Microclimate Portal using the URL printed at the end of the installation.

Use the following command to view all resources created by this chart, replacing `x.y.z` with the version number of the installed chart (e.g. 1.0.0):

`kubectl get all -l chart=ibm-microclimate-x.y.z`

## Uninstalling the Chart

To uninstall or delete the `microclimate` release:

```bash
helm delete --purge microclimate
```

The command removes all the Kubernetes resources that are associated with the chart and deletes the release.

## Configuration

#### Persistent Storage

Microclimate requires two persistent volumes to function correctly: one for storing project workspaces and one for the Jenkins pipeline. Persistent storage is enabled by default with a storage size of 2GB for the Microclimate workspace. This size should be configured by using the `persistence.size` option to scale with the number and size of projects expected to be created in Microclimate. As a rough guide, a generated Java project is approximately 128MB, a generated Swift project is approximately 100MB and a generated Node.js project is below 1 MB.

Jenkins requires an 8GB persistent volume which currently isn't configurable.

Both Microclimate and Jenkins can use existing Persistent Volume Claims, which should follow the guidelines above for storage size. These names can be passed into the following chart values: `persistence.existingClaimName` and `jenkins.Persistence.ExistingClaim`. NOTE: If you want to use Dynamic Provisioning or you want Microclimate to create its own `PersistentVolumeClaim`, these values MUST be left blank.

Dynamic Provisioning is enabled by default (`persistence.useDynamicProvisioning`) and uses the default storage class set up in your cluster. A different storage class can be used by editing the `persistence.storageClassName` option in the configuration, see below.

Microclimate attempts to create its own persistent volume claim by using the `persistence.storageClassName` and `persistence.size` options if Dynamic Provisioning isn't enabled and if PVCs aren't provided by name.

**Warning:** Microclimate stores any projects that are created by users in whichever Persistent Volume it gets mounted to. Uninstalling Microclimate might cause data to be lost if the `PersistentVolume` and `PersistentVolumeClaim` aren't configured correctly. To avoid losing data, we recommend that you have the correct Reclaim Policy set in a provided `PersistentVolumeClaim` or in the provided `StorageClass` if you are using Dynamic Provisioning. The same practice should be applied to the Jenkins persistent volume.

For more information about creating Persistent Storage and enabling Dynamic Provisioning, see  
[Cluster Storage](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/manage_cluster/cluster_storage.html)
[Working with storage](https://www.ibm.com/developerworks/community/blogs/fe25b4ef-ea6a-4d86-a629-6f87ccf4649e/entry/Working_with_storage)
[Dynamic Provisioning](https://www.ibm.com/support/knowledgecenter/SSBS6K_2.1.0/installing/storage_class_all.html).

#### Resource requests and limits

Each Microclimate container has a set of default requests and limits for CPU and Memory usage. These are set at recommended values but should be configured to suit the needs of your cluster. See below for how to configure these values.

#### Configuring Microclimate

Microclimate provides a number of configuration options to customise its installation. Below are a list of configurable parameters.

If you are installing by using the Helm CLI then values can be set by using one or more `--set` arguments when doing `helm install`. For example, to configure persistent storage options, you can use the following:

`helm install --name myMicroclimate --set persistence.useDynamicProvisioning=false --set persistence.size=2Gi --set hostName=<MICROCLIMATE_INGRESS> ibm-charts/ibm-microclimate`

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
| `imagePullPolicy`                    | Image pull policy used for all images                                                                                                                        | `Always`                           |
| `persistence.enabled`                | Use persistent storage for Microclimate workspace                                                                                                            | `true`                             |
| `persistence.existingClaimName`      | Name of an existing PVC to be used with Microclimate - Should be left blank if you use Dynamic Provisioning or if you want Microclimate to make it's own PVC | `""`                               |
| `persistence.useDynamicProvisioning` | Use dynamic provisioning                                                                                                                                     | `true`                             |
| `persistence.size`                   | Storage size allowed for Microclimate workspace                                                                                                              | `2Gi`                              |
| `persistence.storageClassName`       | Storage class name for Microclimate workspace                                                                                                                | `""`                               |
| `jenkins.Master.HostName`            | Host name used for Ingress for the Jenkins                                                                                                                   | `""`                               |
| `jenkins.Persistence.ExistingClaim`  | Name of an existing PVC to be used for Jenkins - Should be left blank if you use Dynamic Provisioning or if you want Microclimate to make it's own PVC       | `""`                               |
| `global.helm.tlsSecretName`          | Name of the Kubernetes secret to be used by the Microclimate pipeline: must be provided in order to use Tiller securely                                      | `""`                               |
| `gitlab.url`                         | Optionally, the URL of a Gitlab instance                                                                                                                     | `""`                               |
| `gitlab.apiToken`                    | Optionally, an API token for the Gitlab instance specified in `gitlab.url`                                                                                   | `""`                               |

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

#### GitLab

The Microclimate chart might optionally be configured with details of a GitLab instance by setting the `gitlab.url` and `github.apiToken` values. Repositories contained in this instance automatically have webhooks created when a pipeline is created on a project associated with the repository.

## Limitations

- Microclimate must be deployed in to the `default` namespace.

- This chart should only use the default image tags provided with the chart. Different image versions might not be compatible with different versions of this chart.

See the [product documentation](https://microclimate-dev2ops.github.io/knownissues) for other known issues and limitations.

## Documentation

The Microclimate [landing page](https://microclimate-dev2ops.github.io) provides additional learning resources and documentation.
