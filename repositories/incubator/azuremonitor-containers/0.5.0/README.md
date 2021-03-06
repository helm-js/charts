# `@helm-charts/incubator-azuremonitor-containers`

Helm chart for deploying Azure Monitor container monitoring agent in Kubernetes

| Field               | Value                   |
| ------------------- | ----------------------- |
| Repository Name     | incubator               |
| Chart Name          | azuremonitor-containers |
| Chart Version       | 0.5.0                   |
| NPM Package Version | 0.1.0                   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for azuremonitor-containers.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

## Microsoft OMS Agent image for kubernetes cluster monitoring
## ref: https://github.com/Microsoft/OMS-docker/tree/ci_feature_prod
omsagent:
  image:
    tag: 'ciprod01092019'
    pullPolicy: IfNotPresent
    dockerProviderVersion: '3.0.0-3'
    agentVersion: '1.8.1.256'
  ## To get your workspace id and key do the following
  ## You can create a Azure Loganalytics workspace from portal.azure.com and get its ID & PRIMARY KEY from 'Advanced Settings' tab in the Ux.

  secret:
    wsid: <your_workspace_id>
    key: <your_workspace_key>
  domain: opinsights.azure.com
  env:
    clusterName: <my_Acs-engine_k8s_cluster_RG_ResourceID>
    doNotCollectKubeSystemLogs: 'true'
  rbac: true

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    daemonset:
      requests:
        cpu: 50m
        memory: 150Mi
      limits:
        cpu: 150m
        memory: 300Mi
    deployment:
      requests:
        cpu: 50m
        memory: 100Mi
      limits:
        cpu: 150m
        memory: 500Mi
```

</details>

---

# Azure Monitor – Containers

---

## Introduction

This article describes how to set up and use [Azure Monitor - Containers](https://docs.microsoft.com/en-us/azure/monitoring/monitoring-container-health) to monitor the health and performance of your workloads deployed to Kubernetes environments. Monitoring your Kubernetes cluster and containers is critical, especially when running a production cluster, at scale, with multiple applications.

---

## Pre-requisites

- Kubernetes 1.7+

- You will need to create a location to store your monitoring data.

1. [Create Azure Log Analytics Workspace](https://docs.microsoft.com/en-us/azure/log-analytics/log-analytics-quick-create-workspace)

- You will need to add AzureMonitor-Containers solution to your workspace from #1 above

2. [Add the 'AzureMonitor-Containers' Solution to your Log Analytics workspace.](http://aka.ms/coinhelmdoc)

3. [For AKS-Engine or ACS-Engine K8S cluster, add required tags on cluster resources, to be able to use Azure Container monitoring User experience (aka.ms/azmon-containers)](http://aka.ms/coin-acs-tag-doc)

---

## Installing the Chart

```bash
$ helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
$ helm install --name myrelease-1 \
--set omsagent.secret.wsid=<your_workspace_id>,omsagent.secret.key=<your_workspace_key>,omsagent.env.clusterName=<my_prod_cluster>  incubator/azuremonitor-containers

```

## Uninstalling the Chart

To uninstall/delete the `myrelease-1` release:

```bash

$ helm del --purge myrelease-1

```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the MSOMS chart and their default values.

The following table lists the configurable parameters of the MSOMS chart and their default values.

| Parameter                                 | Description                                                        | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omsagent.image.tag`                      | `msoms` image tag.                                                 | Most recent release                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `omsagent.image.pullPolicy`               | `msoms` image pull policy.                                         | IfNotPresent                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `omsagent.secret.wsid`                    | Azure Log analytics workspace id                                   | Does not have a default value, needs to be provided                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `omsagent.secret.key`                     | Azure Log analytics workspace key                                  | Does not have a default value, needs to be provided                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `omsagent.domain`                         | Azure Log analytics cloud domain (public / govt)                   | opinsights.azure.com (Public cloud as default), opinsights.azure.us (Govt Cloud)                                                                                                                                                                                                                                                                                                                                                                                           |
| `omsagent.env.clusterName`                | Name of your cluster                                               | Does not have a default value, needs to be provided. If AKS-Engine or ACS-Engine K8S cluster, it is recommended to provide either one of the below as cluster name, to be able to use Azure Container monitoring User experience (aka.ms/azmon-containers) <br/> <br/> - Azure Resource group resource ID of ACS-Engine cluster <br/> - Provide a friendly name here and ensure this name is used to 'tag' the cluster master node(s) - see step-3 in pre-requisites above |
| `omsagent.env.doNotCollectKubeSystemLogs` | Disable collecting logs from containers in 'kube-system' namespace | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `omsagent.rbac`                           | rbac enabled/disabled                                              | true (i.e enabled)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

You can create a Azure Loganalytics workspace from portal.azure.com and get its ID & PRIMARY KEY from 'Advanced Settings' tab in the Ux.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash

$ helm install --name myrelease-1 \
--set omsagent.secret.wsid=<your_workspace_id>,omsagent.secret.key=<your_workspace_key>,omsagent.env.clusterName=<my_AKS-Engine_k8s_cluster_RG_ResourceID>  incubator/azuremonitor-containers
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash

$ helm install --name myrelease-1 -f values.yaml incubator/azuremonitor-containers

```

After you successfully deploy the chart, you will be able to see your data in the [azure portal](aka.ms/azmon-containers)

If you need help with this chart, please reach us out through [this](mailto:askcoin@microsoft.com) email.
