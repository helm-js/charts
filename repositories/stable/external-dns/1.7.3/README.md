# `@helm-charts/stable-external-dns`

Configure external DNS servers (AWS Route53, Google CloudDNS and others)
for Kubernetes Ingresses and Services

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | stable       |
| Chart Name          | external-dns |
| Chart Version       | 1.7.3        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Details about the image to be pulled.
image:
  name: registry.opensource.zalan.do/teapot/external-dns
  tag: v0.5.12
  pullSecrets: []
  pullPolicy: IfNotPresent

## This controls which types of resource external-dns should 'watch' for new
## DNS entries.
sources:
  - service
  - ingress

# Allow external-dns to publish DNS records for ClusterIP services (optional)
publishInternalServices: false

## The DNS provider where the DNS records will be created (options: aws, google, inmemory, azure, rfc2136 )
provider: aws

# AWS Access keys to inject as environment variables
aws:
  secretKey: ''
  accessKey: ''
  # pre external-dns 0.5.9 home dir should be `/root/.aws`
  credentialsPath: '/.aws'
  roleArn: ''
  region: 'us-east-1'
  # Filter for zones of this type (optional, options: public, private)
  zoneType: ''

azure:
  # If you don't specify a secret to load azure.json from, you will get the host's /etc/kubernetes/azure.json
  secretName: ''

# Cloudflare keys to inject as environment variables
cloudflare:
  apiKey: ''
  email: ''
  proxied: true

# Configuration for OpenStack Designate provider
designate:
  # A custom CA (optional)
  customCA:
    # Turn custom CA on or off
    enabled: false
    # The content of the custom CA file
    content: ''
    # Location to mount custom CA
    directory: '/config/designate'
    # Filename of the custom CA
    filename: 'designate-ca.pem'

# DigitalOcean API token to inject as environment variable
digitalocean:
  apiToken: ''

# When using the Google provider, specify the Google project (required when provider=google)
google:
  project: ''
  serviceAccountSecret: ''
  serviceAccountKey: ''

# Infoblox keys to inject
infoblox:
  # Required keys:
  wapiUsername: ''
  wapiPassword: ''
  gridHost: ''
  # Optional keys:
  domainFilter: ''
  noSslVerify: false
  wapiPort: ''
  wapiVersion: ''
  wapiConnectionPoolSize: ''
  wapiHttpTimeout: ''

rfc2136:
  host: ''
  port: 53
  zone: ''
  tsigSecret: ''
  tsigSecretAlg: hmac-sha256
  tsigKeyname: externaldns-key
  tsigAxfr: true

## Limit possible target zones by domain suffixes (optional)
domainFilters: []
## Limit possible target zones by zone id (optional)
zoneIdFilters: []
# Filter sources managed by external-dns via annotation using label selector semantics (default: all sources)
annotationFilter: ''
## Adjust the interval for DNS updates
interval: '1m'

# Registry to use for ownership (txt or noop)
registry: 'txt'

# When using the TXT registry, a name that identifies this instance of ExternalDNS
txtOwnerId: ''

# When enabled, prints DNS record changes rather than actually performing them
dryRun: false

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

# Extra environment variables which will be saved in a release-specific secret
# or retrieved via valueFrom.
# extraEnv:
# - name: SECRET_TO_SAVE
#   value: secret_value
# - name: AWS_ACCESS_KEY_ID
#   valueFrom:
#     secretKeyRef:
#       name: existing-secret
#       key: access-key-id
extraEnv: []

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

securityContext:
  {}
  # readOnlyRootFilesystem: true
  # runAsNonRoot: true
  # runAsUser: 65534 # 65534 is nobody - revise aws.credentialsPath when changing uid
  # capabilities:
  #   drop: ["ALL"]

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

> **Note**: If you want to use Chart version >1.1.0 with external-dns image <0.5.9 and use aws credentials, make sure to set `aws.credentialsPath: "/root/.aws"`

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/external-dns
```

## Configuration

The following table lists the configurable parameters of the external-dns chart and their default values.

| Parameter                          | Description                                                                                                                                                                                                    | Default                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `annotationFilter`                 | Filter sources managed by external-dns via annotation using label selector semantics (default: all sources) (optional).                                                                                        | `""`                                               |
| `aws.accessKey`                    | set in `~/.aws/credentials` mounted through secret (optional).                                                                                                                                                 | `""`                                               |
| `aws.secretKey`                    | set in `~/.aws/credentials` mounted through secret (optional).                                                                                                                                                 | `""`                                               |
| `aws.credentialsPath`              | determine `mountPath` for `credentials` secret, defaults to `nobody` USER home path `/.aws` (optional).                                                                                                        | `"/.aws"`                                          |
| `aws.region`                       | `AWS_DEFAULT_REGION` to set in the environment (optional).                                                                                                                                                     | `us-east-1`                                        |
| `aws.roleArn`                      | If assume role credentials are used then is the role_arn (arn:aws:iam::....). Leave empty if not used.                                                                                                         | `""`                                               |
| `aws.zoneType`                     | Filter for zones of this type (optional, options: public, private).                                                                                                                                            | `""`                                               |
| `azure.secretName`                 | Set the secret created for the SP for azure, should contain an azure.json file                                                                                                                                 | `""`                                               |
| `cloudflare.apiKey`                | `CF_API_KEY` to set in the environment (optional).                                                                                                                                                             | `""`                                               |
| `cloudflare.email`                 | `CF_API_EMAIL` to set in the environment (optional).                                                                                                                                                           | `""`                                               |
| `cloudflare.proxied`               | enable the proxy feature of Cloudflare (DDOS protection, CDN...) (optional).                                                                                                                                   | `true`                                             |
| `designate.customCA.enabled`       | A switch to enable a custom CA for the Designate provider (optional)                                                                                                                                           | false                                              |
| `designate.customCA.content`       | The content of the Designate provider's custom CA                                                                                                                                                              | ""                                                 |
| `designate.customCA.directory`     | Directory in which to mount the Designate provider's custom CA                                                                                                                                                 | "/config/designate"                                |
| `designate.customCA.filename`      | Filename of Designate provider's custom CA                                                                                                                                                                     | "designate-ca.pem"                                 |
| `domainFilters`                    | Limit possible target zones by domain suffixes (optional).                                                                                                                                                     | `[]`                                               |
| `digitalocean.apiToken`            | When using the DigitalOcean provider, sets `DO_TOKEN` in the environment (optional).                                                                                                                           | `""`                                               |
| `dryRun`                           | When enabled, prints DNS record changes rather than actually performing them (optional).                                                                                                                       | `false`                                            |
| `extraArgs`                        | Optional object of extra args, as `name`: `value` pairs. Where the name is the command line arg to external-dns.                                                                                               | `{}`                                               |
| `extraEnv`                         | Optional array of extra environment variables. Supply a `name` property and either `value` of `valueFrom` for each.                                                                                            | `[]`                                               |
| `google.project`                   | When using the Google provider, specify the Google project (required when provider=google).                                                                                                                    | `""`                                               |
| `google.serviceAccountSecret`      | When using the Google provider, optionally specify the existing secret which contains credentials.json if necessary.                                                                                           | `""`                                               |
| `google.serviceAccountKey`         | When using the Google provider, optionally specify the service account key JSON file. Must be provided when no existing secret is used, in this case a new secret will be created holding this service account | `""`                                               |
| `image.name`                       | Container image name (Including repository name if not `hub.docker.com`).                                                                                                                                      | `registry.opensource.zalan.do/teapot/external-dns` |
| `image.pullPolicy`                 | Container pull policy.                                                                                                                                                                                         | `IfNotPresent`                                     |
| `image.tag`                        | Container image tag.                                                                                                                                                                                           | `v0.5.12`                                          |
| `image.pullSecrets`                | Array of pull secret names                                                                                                                                                                                     | `[]`                                               |
| `infoblox.gridHost`                | When using the Infoblox provider, specify the Infoblox Grid host.                                                                                                                                              | `""`                                               |
| `infoblox.wapiUsername`            | When using the Infoblox provider, specify the Infoblox WAPI username.                                                                                                                                          | `""`                                               |
| `infoblox.wapiPassword`            | When using the Infoblox provider, specify the Infoblox WAPI password.                                                                                                                                          | `""`                                               |
| `infoblox.domainFilter`            | When using the Infoblox provider, optionally specify the domain.                                                                                                                                               | `""`                                               |
| `infoblox.noSslVerify`             | When using the Infoblox provider, optionally disable SSL verification.                                                                                                                                         | `false`                                            |
| `infoblox.wapiPort`                | When using the Infoblox provider, optionally specify the Infoblox WAPI port.                                                                                                                                   | `""`                                               |
| `infoblox.wapiVersion`             | When using the Infoblox provider, optionally specify the Infoblox WAPI version.                                                                                                                                | `""`                                               |
| `infoblox.wapiConnectionPoolSize`  | When using the Infoblox provider, optionally specify the Infoblox WAPI request connection pool size.                                                                                                           | `""`                                               |
| `infoblox.wapiHttpTimeout`         | When using the Infoblox provider, optionally specify the Infoblox WAPI request timeout in seconds.                                                                                                             | `""`                                               |
| `rfc2136.host`                     | When using the rfc2136 provider, specify the RFC2136 host.                                                                                                                                                     | `""`                                               |
| `rfc2136.port`                     | When using the rfc2136 provider, optionally specify the RFC2136 port.                                                                                                                                          | `53`                                               |
| `rfc2136.zone`                     | When using the rfc2136 provider, specify the zone.                                                                                                                                                             | `""`                                               |
| `rfc2136.tsigSecret`               | When using the rfc2136 provider, if you want to enable security, specify the tsig secret.                                                                                                                      | `""`                                               |
| `rfc2136.tsigKeyname`              | When using the rfc2136 provider, if you want to enable security, specify the tsig keyname. If you want an insecure connection, disable this parameter.                                                         | `"externaldns-key"`                                |
| `rfc2136.tsigSecretAlg`            | When using the rfc2136 provider, if you want to enable security, specify the tsig secret alg.                                                                                                                  | `"hmac-sha256"`                                    |
| `rfc2136.tsigAxfr`                 | When using the rfc2136 provider, if you want to enable security, enable AFXR.                                                                                                                                  | `true`                                             |
| `logLevel`                         | Verbosity of the logs (options: panic, debug, info, warn, error, fatal)                                                                                                                                        | `info`                                             |
| `nodeSelector`                     | Node labels for pod assignment                                                                                                                                                                                 | `{}`                                               |
| `podAnnotations`                   | Additional annotations to apply to the pod.                                                                                                                                                                    | `{}`                                               |
| `policy`                           | Modify how DNS records are sychronized between sources and providers (options: sync, upsert-only ).                                                                                                            | `upsert-only`                                      |
| `provider`                         | The DNS provider where the DNS records will be created (options: aws, google, azure, cloudflare, digitalocean, inmemory, rfc2136 ).                                                                            | `aws`                                              |
| `publishInternalServices`          | Allow external-dns to publish DNS records for ClusterIP services (optional).                                                                                                                                   | `false`                                            |
| `rbac.create`                      | If true, create & use RBAC resources                                                                                                                                                                           | `false`                                            |
| `rbac.serviceAccountName`          | Existing ServiceAccount to use (ignored if rbac.create=true)                                                                                                                                                   | `default`                                          |
| `interval`                         | Interval update period to use                                                                                                                                                                                  | `1m`                                               |
| `registry`                         | Registry method to use (options: txt, noop)                                                                                                                                                                    | `txt`                                              |
| `resources`                        | CPU/Memory resource requests/limits.                                                                                                                                                                           | `{}`                                               |
| `securityContext`                  | Security options the pod should run with. [More info](https://kubernetes.io/docs/concepts/policy/security-context/)                                                                                            | `{}`                                               |
| `priorityClassName`                | priorityClassName                                                                                                                                                                                              | `""`                                               |
| `service.annotations`              | Annotations to add to service                                                                                                                                                                                  | `{}`                                               |
| `service.clusterIP`                | IP address to assign to service                                                                                                                                                                                | `""`                                               |
| `service.externalIPs`              | Service external IP addresses                                                                                                                                                                                  | `[]`                                               |
| `service.loadBalancerIP`           | IP address to assign to load balancer (if supported)                                                                                                                                                           | `""`                                               |
| `service.loadBalancerSourceRanges` | List of IP CIDRs allowed access to load balancer (if supported)                                                                                                                                                | `[]`                                               |
| `service.servicePort`              | Service port to expose                                                                                                                                                                                         | `7979`                                             |
| `service.type`                     | Type of service to create                                                                                                                                                                                      | `ClusterIP`                                        |
| `sources`                          | List of resource types to monitor, possible values are fake, service or ingress.                                                                                                                               | `[service, ingress]`                               |
| `tolerations`                      | List of node taints to tolerate (requires Kubernetes >= 1.6)                                                                                                                                                   | `[]`                                               |
| `affinity`                         | List of affinities (requires Kubernetes >=1.6)                                                                                                                                                                 | `{}`                                               |
| `txtOwnerId`                       | When using the TXT registry, a name that identifies this instance of ExternalDNS (optional)                                                                                                                    | `"default"`                                        |
| `txtPrefix`                        | When using the TXT registry, a prefix for ownership records that avoids collision with CNAME entries (optional)                                                                                                | `""`                                               |
| `zoneIdFilters`                    | Limit possible target zones by zone id (optional)                                                                                                                                                              | `[]`                                               |

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
