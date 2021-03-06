# `@helm-charts/stable-external-dns`

Configure external DNS servers (AWS Route53, Google CloudDNS and others) for Kubernetes Ingresses and Services

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | stable       |
| Chart Name          | external-dns |
| Chart Version       | 0.7.2        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Details about the image to be pulled.
image:
  name: registry.opensource.zalan.do/teapot/external-dns
  tag: v0.5.4
  pullSecrets: []
  pullPolicy: IfNotPresent

## This controls which types of resource external-dns should 'watch' for new
## DNS entries.
sources:
  - service
  - ingress

# Allow external-dns to publish DNS records for ClusterIP services (optional)
publishInternalServices: false

## The DNS provider where the DNS records will be created (options: aws, google, inmemory, azure )
provider: aws

# AWS Access keys to inject as environment variables
aws:
  secretKey: ''
  accessKey: ''
  roleArn: ''
  region: 'us-east-1'
  # Filter for zones of this type (optional, options: public, private)
  zoneType: ''

# Cloudflare keys to inject as environment variables
cloudflare:
  apiKey: ''
  email: ''
# When using the Google provider, specify the Google project (required when provider=google)
google:
  project: ''
  serviceAccountSecret: ''

## Limit possible target zones by domain suffixes (optional)
domainFilters: []
# Filter sources managed by external-dns via annotation using label selector semantics (default: all sources)
annotationFilter: ''

# Registry to use for ownership (txt or noop)
registry: 'txt'

# When using the TXT registry, a name that identifies this instance of ExternalDNS
txtOwnerId: ''

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

## List of node taints to tolerate (requires Kubernetes >= 1.6)
tolerations: []

## Modify how DNS records are sychronized between sources and providers (options: sync, upsert-only )
policy: upsert-only

## Annotations to be added to pods
##
podAnnotations: {}

podLabels: {}

# Verbosity of the logs (options: panic, debug, info, warn, error, fatal)
logLevel: info

extraArgs: {}

extraEnv: {}

## CPU and Memory limit and request for external-dns
resources: {}
#  limits:
#    memory: 50Mi
#  requests:
#    memory: 50Mi
#    cpu: 10m

rbac:
  ## If true, create & use RBAC resources
  ##
  create: false
  # Beginning with Kubernetes 1.8, the api is stable and v1 can be used.
  apiVersion: v1beta1

  ## Ignored if rbac.create is true
  ##
  serviceAccountName: default

service:
  annotations: {}
  clusterIP: ''

  ## List of IP addresses at which the service is available
  ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
  ##
  externalIPs: []

  loadBalancerIP: ''
  loadBalancerSourceRanges: []
  servicePort: 7979
  type: ClusterIP

priorityClassName: ''
```

</details>

---

# external-dns

## Chart Details

This chart will do the following:

- Create a deployment of [external-dns] within your Kubernetes Cluster.

Currently this uses the [Zalando] hosted container, if this is a concern follow the steps in the [external-dns] documentation to compile the binary and make a container. Where the chart pulls the image from is fully configurable.

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/external-dns
```

## Configuration

The following table lists the configurable parameters of the external-dns chart and their default values.

| Parameter                          | Description                                                                                                                | Default                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `annotationFilter`                 | Filter sources managed by external-dns via annotation using label selector semantics (default: all sources) (optional).    | `""`                                               |
| `aws.accessKey`                    | `AWS_ACCESS_KEY_ID` to set in the environment (optional).                                                                  | `""`                                               |
| `aws.secretKey`                    | `AWS_SECRET_ACCESS_KEY` to set in the environment (optional).                                                              | `""`                                               |
| `aws.region`                       | `AWS_DEFAULT_REGION` to set in the environment (optional).                                                                 | `us-east-1`                                        |
| `aws.roleArn`                      | If assume role credentials are used then is the role_arn (arn:aws:iam::....). Leave empty if not used.                     | `""`                                               |
| `aws.zoneType`                     | Filter for zones of this type (optional, options: public, private).                                                        | `""`                                               |
| `cloudflare.apiKey`                | `CF_API_KEY` to set in the environment (optional).                                                                         | `""`                                               |
| `cloudflare.email`                 | `CF_API_EMAIL` to set in the environment (optional).                                                                       | `""`                                               |
| `domainFilters`                    | Limit possible target zones by domain suffixes (optional).                                                                 | `[]`                                               |
| `extraArgs`                        | Optional object of extra args, as `name`: `value` pairs. Where the name is the command line arg to external-dns.           | `{}`                                               |
| `extraEnv`                         | Optional object of extra environment variables, as `name`: `value` pairs.                                                  | `{}`                                               |
| `google.project`                   | When using the Google provider, specify the Google project (required when provider=google).                                | `""`                                               |
| `google.serviceAccountSecret`      | When using the Google provider, optionally specify the secret which contains credentials.json if necessary.                | `""`                                               |
| `image.name`                       | Container image name (Including repository name if not `hub.docker.com`).                                                  | `registry.opensource.zalan.do/teapot/external-dns` |
| `image.pullPolicy`                 | Container pull policy.                                                                                                     | `IfNotPresent`                                     |
| `image.tag`                        | Container image tag.                                                                                                       | `v0.4.5`                                           |
| `image.pullSecrets`                | Array of pull secret names                                                                                                 | `[]`                                               |
| `logLevel`                         | Verbosity of the logs (options: panic, debug, info, warn, error, fatal)                                                    | `info`                                             |
| `nodeSelector`                     | Node labels for pod assignment                                                                                             | `{}`                                               |
| `podAnnotations`                   | Additional annotations to apply to the pod.                                                                                | `{}`                                               |
| `policy`                           | Modify how DNS records are sychronized between sources and providers (options: sync, upsert-only ).                        | `upsert-only`                                      |
| `provider`                         | The DNS provider where the DNS records will be created (options: aws, google, azure, cloudflare, digitalocean, inmemory ). | `aws`                                              |
| `publishInternalServices`          | Allow external-dns to publish DNS records for ClusterIP services (optional).                                               | `false`                                            |
| `rbac.create`                      | If true, create & use RBAC resources                                                                                       | `false`                                            |
| `rbac.serviceAccountName`          | Existing ServiceAccount to use (ignored if rbac.create=true)                                                               | `default`                                          |
| `registry`                         | Registry method to use (options: txt, noop)                                                                                | `txt`                                              |
| `resources`                        | CPU/Memory resource requests/limits.                                                                                       | `{}`                                               |
| `priorityClassName`                | priorityClassName                                                                                                          | `""`                                               |
| `service.annotations`              | Annotations to add to service                                                                                              | `{}`                                               |
| `service.clusterIP`                | IP address to assign to service                                                                                            | `""`                                               |
| `service.externalIPs`              | Service external IP addresses                                                                                              | `[]`                                               |
| `service.loadBalancerIP`           | IP address to assign to load balancer (if supported)                                                                       | `""`                                               |
| `service.loadBalancerSourceRanges` | List of IP CIDRs allowed access to load balancer (if supported)                                                            | `[]`                                               |
| `service.servicePort`              | Service port to expose                                                                                                     | `7979`                                             |
| `service.type`                     | Type of service to create                                                                                                  | `ClusterIP`                                        |
| `sources`                          | List of resource types to monitor, possible values are fake, service or ingress.                                           | `[service, ingress]`                               |
| `tolerations`                      | List of node taints to tolerate (requires Kubernetes >= 1.6)                                                               | `[]`                                               |
| `affinity`                         | List of affinities (requires Kubernetes >=1.6)                                                                             | `{}`                                               |
| `txtOwnerId`                       | When using the TXT registry, a name that identifies this instance of ExternalDNS (optional)                                | `"default"`                                        |
| `txtPrefix`                        | When using the TXT registry, a prefix for ownership records that avoids collision with CNAME entries (optional)            | `""`                                               |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/external-dns
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## IAM Permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["route53:ChangeResourceRecordSets"],
      "Resource": ["arn:aws:route53:::hostedzone/*"]
    },
    {
      "Effect": "Allow",
      "Action": ["route53:ListHostedZones", "route53:ListResourceRecordSets"],
      "Resource": ["*"]
    }
  ]
}
```

[external-dns]: https://github.com/kubernetes-incubator/external-dns
[zalando]: https://zalando.github.io/
[getting-started]: https://github.com/kubernetes-incubator/external-dns/blob/master/README.md#getting-started
