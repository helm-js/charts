# `@helm-charts/incubator-chartmuseum`

Helm Chart Repository with support for Amazon S3 and Google Cloud Storage

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | incubator   |
| Chart Name          | chartmuseum |
| Chart Version       | 0.3.0       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1
image:
  repository: chartmuseum/chartmuseum
  tag: v0.2.7
  pullPolicy: IfNotPresent
env:
  open:
    # storage backend, can be one of: local, amazon, google
    STORAGE: local
    # s3 bucket to store charts for amazon storage backend
    STORAGE_AMAZON_BUCKET:
    # prefix to store charts for amazon storage backend
    STORAGE_AMAZON_PREFIX:
    # region of s3 bucket to store charts
    STORAGE_AMAZON_REGION:
    # alternative s3 endpoint
    STORAGE_AMAZON_ENDPOINT:
    # gcs bucket to store charts for google storage backend
    STORAGE_GOOGLE_BUCKET:
    # prefix to store charts for google storage backend
    STORAGE_GOOGLE_PREFIX:
    # form field which will be queried for the chart file content
    CHART_POST_FORM_FIELD_NAME: chart
    # form field which will be queried for the provenance file content
    PROV_POST_FORM_FIELD_NAME: prov
    # show debug messages
    DEBUG: false
    # output structured logs as json
    LOG_JSON: true
    # disable Prometheus metrics
    DISABLE_METRICS: true
    # disable all routes prefixed with /api
    DISABLE_API: true
    # allow chart versions to be re-uploaded
    ALLOW_OVERWRITE: false
    # absolute url for .tgzs in index.yaml
    CHART_URL:
  secret:
    # username for basic http authentication
    BASIC_AUTH_USER:
    # password for basic http authentication
    BASIC_AUTH_PASS:
deployment:
  ## Chartmuseum Deployment annotations
  annotations: {}
  #   name: value
replica:
  ## Chartmuseum Replicas annotations
  annotations: {}
  ## Read more about kube2iam to provide access to s3 https://github.com/jtblin/kube2iam
  #   iam.amazonaws.com/role: role-arn
service:
  type: ClusterIP
  externalPort: 8080
  internalPort: 8080
  annotations:
    {}
    # foo.io/bar: "true"
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 80m
    memory: 64Mi
persistence:
  Enabled: false
  AccessMode: ReadWriteOnce
  Size: 8Gi
  ## A manually managed Persistent Volume and Claim
  ## Requires Persistence.Enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # ExistingClaim:
  ## Chartmuseum data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # StorageClass: "-"

## Ingress for load balancer
ingress:
  enabled: false
## Chartmuseum Ingress labels
##
#   labels:
#     dns: "route53"

## Chartmuseum Ingress annotations
##
#   annotations:
#     kubernetes.io/ingress.class: nginx
#     kubernetes.io/tls-acme: "true"

## Chartmuseum Ingress hostnames
## Must be provided if Ingress is enabled
##
#   hosts:
#     chartmuseum.domain.com:
#         - /charts
#         - /index.yaml

## Chartmuseum Ingress TLS configuration
## Secrets must be manually created in the namespace
##
#   tls:
#   - secretName: chartmuseum-server-tls
#     hosts:
#     - chartmuseum.domain.com
```

</details>

---

# ChartMuseum Helm Chart

Work in progress...

Please see https://github.com/chartmuseum/chartmuseum
