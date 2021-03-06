# `@helm-charts/stable-sysdig`

Sysdig Monitor and Secure agent

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | sysdig |
| Chart Version       | 1.4.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Sysdig Monitor and Secure Helm package.

image:
  registry: docker.io
  repository: sysdig/agent
  tag: 0.89.0
  # Specify a imagePullPolicy
  # Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  # ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  pullPolicy: IfNotPresent
  # Optionally specify an array of imagePullSecrets.
  # Secrets must be manually created in the namespace.
  # ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  #
  # pullSecrets:
  #   - name: myRegistrKeySecretName

resources:
  # Although resources needed are subjective on the actual workload we provide
  # a sane defaults ones. If you have more questions or concerns, please refer
  # to Sysdig Support for more info about it
  requests:
    cpu: 100m
    memory: 512Mi
  limits:
    cpu: 200m
    memory: 1024Mi

rbac:
  # true here enables creation of rbac resources
  create: true

serviceAccount:
  # Create and use serviceAccount resources
  create: true
  # Use this value as serviceAccountName
  name:

daemonset:
  # Perform rolling updates by default in the DaemonSet agent
  # ref: https://kubernetes.io/docs/tasks/manage-daemon/update-daemon-set/
  updateStrategy:
    # You can also customize maxUnavailable, maxSurge or minReadySeconds if you
    # need it
    type: RollingUpdate

ebpf:
  # Enable eBPF support for Sysdig Agent
  enabled: false

  settings:
    # Needed to correctly detect the kernel version for the eBPF program
    # Set to false if not running on Google COS
    mountEtcVolume: true

sysdig:
  # Required: You need your Sysdig Monitor access key before running agents.
  # accessKey: ""

  settings:
    {}
    ### Agent tags
    # tags: linux:ubuntu,dept:dev,local:nyc
    #### Sysdig Software related config ####
    # Sysdig collector address
    # collector: 192.168.1.1
    # Collector TCP port
    # collector_port: 6666
    # Whether collector accepts ssl
    # ssl: true
    # collector certificate validation
    # ssl_verify_certificate: true
    #######################################
    # new_k8s: true
    # k8s_cluster_name: production

secure:
  # true here enables Sysdig Secure: container run-time security & forensics
  enabled: false

customAppChecks:
  {}
  # Allow passing custom app checks for Sysdig Agent.
  # Example:
  #
  # sample.py: |-
  #   from checks import AgentCheck
  #
  #   class MyCustomCheck(AgentCheck):
  #       def check(self, instance):
  #           self.gauge("testhelm", 1)

# Allow sysdig to run on Kubernetes 1.6 masters.
tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
```

</details>

---

# Sysdig

[Sysdig](https://www.sysdig.com/) is a unified platform for container and microservices monitoring, troubleshooting, security and forensics. Sysdig platform has been built on top of [Sysdig tool](https://sysdig.com/opensource/sysdig/) and [Sysdig Inspect](https://sysdig.com/blog/sysdig-inspect/) open-source technologies.

## Introduction

This chart adds the Sysdig agent for [Sysdig Monitor](https://sysdig.com/product/monitor/) and [Sysdig Secure](https://sysdig.com/product/secure/) to all nodes in your cluster via a DaemonSet.

## Prerequisites

- Kubernetes 1.2+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`, retrieve your Sysdig Monitor Access Key from your [Account Settings](https://app.sysdigcloud.com/#/settings/agentInstallation) and run:

```bash
$ helm install --name my-release \
    --set sysdig.accessKey=YOUR-KEY-HERE stable/sysdig
```

After a few seconds, you should see hosts and containers appearing in Sysdig Monitor and Sysdig Secure.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

> **Tip**: Use helm delete --purge my-release to completely remove the release from Helm internal storage

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Sysdig chart and their default values.

| Parameter                       | Description                                                            | Default                                     |
| ------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| `image.registry`                | Sysdig agent image registry                                            | `docker.io`                                 |
| `image.repository`              | The image repository to pull from                                      | `sysdig/agent`                              |
| `image.tag`                     | The image tag to pull                                                  | `0.88.1`                                    |
| `image.pullPolicy`              | The Image pull policy                                                  | `IfNotPresent`                              |
| `image.pullSecrets`             | Image pull secrets                                                     | `nil`                                       |
| `resources.requests.cpu`        | CPU requested for being run in a node                                  | `100m`                                      |
| `resources.requests.memory`     | Memory requested for being run in a node                               | `512Mi`                                     |
| `resources.limits.cpu`          | CPU limit                                                              | `200m`                                      |
| `resources.limits.memory`       | Memory limit                                                           | `1024Mi`                                    |
| `rbac.create`                   | If true, create & use RBAC resources                                   | `true`                                      |
| `serviceAccount.create`         | Create serviceAccount                                                  | `true`                                      |
| `serviceAccount.name`           | Use this value as serviceAccountName                                   | ``                                          |
| `daemonset.updateStrategy.type` | The updateStrategy for updating the daemonset                          | `RollingUpdate`                             |
| `ebpf.enabled`                  | Enable eBPF support for Sysdig instead of `sysdig-probe` kernel module | `false`                                     |
| `ebpf.settings.mountEtcVolume`  | Needed to detect which kernel version are running in Google COS        | `true`                                      |
| `sysdig.accessKey`              | Your Sysdig Monitor Access Key                                         | `Nil` You must provide your own key         |
| `sysdig.settings`               | Settings for agent's configuration file                                | `{}`                                        |
| `secure.enabled`                | Enable Sysdig Secure                                                   | `false`                                     |
| `customAppChecks`               | The custom app checks deployed with your agent                         | `{}`                                        |
| `tolerations`                   | The tolerations for scheduling                                         | `node-role.kubernetes.io/master:NoSchedule` |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set sysdig.accessKey=YOUR-KEY-HERE,sysdig.settings.tags="role:webserver,location:europe" \
    stable/sysdig
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/sysdig
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## On-Premise deployment settings

There are several people who runs Sysdig platform On-Premise, in its own infrastructure.

This is also supported by the Helm chart, and you can enable it with the following parameters:

| Parameter                                | Description                                              | Default |
| ---------------------------------------- | -------------------------------------------------------- | ------- |
| `sysdig.settings.collector`              | The IP address or hostname of the collector              | ``      |
| `sysdig.settings.collector_port`         | The port where collector is listening                    | ``      |
| `sysdig.settings.ssl`                    | The collector accepts SSL                                | `true`  |
| `sysdig.settings.ssl_verify_certificate` | Set to false if you don't want to verify SSL certificate | `true`  |

For example:

```bash
$ helm install --name sysdig-agent-on-prem \
    --set sysdig.accessKey=YOUR-KEY-HERE \
    --set sysdig.settings.collector=42.32.196.18 \
    --set sysdig.settings.collector_port=6443 \
    --set sysdig.settings.ssl_verify_certificate=false \
    stable/sysdig
```

## Using private image registries

To authenticate against an image registry you will need to store the credentials
in a Secret:

```bash
kubectl create secret docker-registry NAME \
 --docker-server=SERVER \
 --docker-username=USERNAME \
 --docker-password=TOKEN \
 --docker-email=EMAIL
```

The values YAML file will need to point to the Secret you just created (this
cannot be done using the command-line):

```yaml
image:
  pullSecrets:
    - name: NAME
```

Finally, set the accessKey value and you are ready to deploy the Sysdig agent
using the Helm chart:

```bash
helm install --name sysdig-agent -f private-registry-values.yaml stable/sysdig
```

You can read more details about this in [Kubernetes Documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).

## Custom App Checks

Application checks are integrations that allow the Sysdig agent to poll specific metrics exposed by any application. Sysdig Monitor has several built-in app checks, but sometimes you need to create your own.

You can deploy them with the following YAML:

```yaml
customAppChecks:
  sample.py: |-
    from checks import AgentCheck

    class MyCustomCheck(AgentCheck):
        def check(self, instance):
            self.gauge("testhelm", 1)

sysdig:
  settings:
    app_checks:
      - name: sample
        interval: 10
        pattern: # pattern to match the application
          comm: systemd
        conf:
          key: value
```

The first section, deploys the Custom App Check in a Kubernetes configmap, and the second configures it using dragent.yaml file. So that deploy Sysdig Chart using this file:

```bash
$ helm install --name sysdig-agent-1 \
  --set sysdig.accessKey=SYSDIG_ACCESS_KEY \
  -f custom-appchecks.yaml \
  stable/sysdig

```

And that's all, you will have your Custom App Check up and running.

You can get more information about [Custom App Checks in Sysdig's Official Documentation](https://sysdigdocs.atlassian.net/wiki/spaces/Monitor/pages/204767436/).

### Automating the generation of custom-app-checks.yaml file

Sometimes edit YAML files with multistrings is a bit cumbersome and error prone, so we added a script for automating this step and make your life easier.

This script lives in [Helm Chart repository](https://github.com/helm/charts) in the `stable/sysdig/scripts` directory.

Imagine that you would like to add rules for your Redis, MongoDB and Traefik containers, you have to:

```bash
$ git clone https://github.com/kubernetes/charts.git
$ cd stable/sysdig
$ ./scripts/appchecks2helm appChecks/solr.py appChecks/traefik.py appChecks/nats.py > custom-app-checks.yaml
$ helm install --name sysdig -f custom-app-checks.yaml stable/sysdig
```

## Deploying the AWS Marketplace Sysdig agent image

This is an use case similar to pulling images from a private registry. First you
need to get the authorization token for the AWS Marketplace ECS image registry:

```bash
aws ecr --region=us-east-1 get-authorization-token --output text --query authorizationData[].authorizationToken | base64 -d | cut -d: -f2
```

And then use it to create the Secret. Don't forget to replace TOKEN and EMAIL
with your own values:

```bash
kubectl create secret docker-registry aws-marketplace-credentials \
 --docker-server=217273820646.dkr.ecr.us-east-1.amazonaws.com \
 --docker-username=AWS \
 --docker-password="TOKEN" \
 --docker-email="EMAIL"
```

Next you need to create a values YAML file to pass the specific ECS registry
configuration (you will find these values when you activate the software from
the AWS Marketplace):

```yaml
sysdig:
  accessKey: XxxXXxXXxXXxxx

image:
  registry: 217273820646.dkr.ecr.us-east-1.amazonaws.com
  repository: 2df5da52-6fa2-46f6-b164-5b879e86fd85/cg-3361214151/agent
  tag: 0.85.1-latest
  pullSecrets:
    - name: aws-marketplace-credentials
```

Finally, set the accessKey value and you are ready to deploy the Sysdig agent
using the Helm chart:

```bash
helm install --name sysdig-agent -f aws-marketplace-values.yaml stable/sysdig
```
