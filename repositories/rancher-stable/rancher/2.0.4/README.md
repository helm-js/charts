# `@helm-charts/rancher-stable-rancher`

Install Rancher Server to manage Kubernetes clusters across providers.

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | rancher-stable |
| Chart Name          | rancher        |
| Chart Version       | 2.0.4          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Add debug flag to Rancher server
debug: false

# Fully qualified name to reach your Rancher server
# hostname: rancher.my.org

## Optional array of imagePullSecrets containing private registry credentials
## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
imagePullSecrets: []
# - name: secretName

### ingress ###
# See tls section for details.
ingress:
  tls:
    # rancher, letsEncrypt, secrets
    source: rancher

### LetsEncrypt config ###
# ProTip: The production environment only allows you to register a name 5 times a week.
#         Use staging until you have your config right.
letsEncrypt:
  # email: none@example.com
  environment: production

# If you are using certs signed by a private CA set to 'true' and set the 'tls-ca'
# in the 'rancher-system' namespace. See the README.md for details
privateCA: false

# Override rancher image location for Air Gap installs
rancherImage: rancher/rancher
# rancher/rancher image tag. https://hub.docker.com/r/rancher/rancher/tags/
rancherImageTag: v2.0.4

# Number of Rancher server replicas.
replicas: 1

# Set pod resource requests/limits for Rancher.
resources: {}

### tls ###
#   Where to offload the TLS/SSL encrytion
#
# - ingress (default)
#   SSL on the ingress.
#
#   - (Default) Use Rancher generated "Self-Signed" Certs
#     Rancher will populate the <namespace>/rancher-tls secrets with the CA key and cert so cert-manager can
#     issue a cert for you.
#     tls: ingress
#     ingress.tls.source: rancher
#
#   - Use LetsEncrypt to issue certs
#     tls: ingress
#     ingress.tls.source: letsEncrypt
#     letsEncrypt.email: your.name@example.com
#     letsEncrypt.environment: prod
#
#   - Use certs from secret.
#     Add the tls.key and tls.crt values to the 'tls-rancher' secret in the 'cattle-system' namespace.
#     See the README.md for more details.
#     NOTE: If you are using private CA signed certs see 'privateCA:'
#     tls: ingress
#     ingress.tls.source: secret
#
# - external
#   Offload SSL at an external source like an external load balancer.
#   NOTE: If you are using private CA signed certs see 'privateCA:'
#
#   tls: external
#
tls: ingress
```

</details>
