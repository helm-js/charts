# `@helm-charts/gitlab-gitlab`

Web-based Git-repository manager with wiki and issue-tracking features.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | gitlab |
| Chart Name          | gitlab |
| Chart Version       | 0.3.1  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for gitlab-chart.
# This is a YAML-formatted file.

global:
  # gitlabVersion: master
  application:
    create: true
  hosts:
    domain: example.local
    https: true
    externalIP:
  ingress:
    configureCertmanager: true
    annotations: {}
    enabled: true
  initialRootPassword: {}
  psql:
    password: {}
    # host: myexternalsql.hostedsomewhere.else
    # port: 123
    # username: gitlab
    # database: gitlabhq_production
  redis:
    password: {}
  gitaly:
    authToken: {}
  minio:
    credentials: {}
  shell:
    authToken: {}
    hostKeys: {}
  railsSecrets: {}
  registry:
    certificate: {}
  runner:
    registrationToken: {}
  # Outgoing email server settings
  smtp:
    enabled: false
    address: smtp.mailgun.org
    port: 2525
    user_name: ''
    password:
      secret: ''
      key: password
    # domain:
    authentication: 'plain'
    starttls_auto: false
    openssl_verify_mode: 'peer'
  # Email persona used in email sent by GitLab
  email:
    from: ''
    display_name: GitLab
    reply_to: ''
    subject_suffix: ''
  time_zone: UTC
  service:
    annotations: {}
  antiAffinity: soft

certmanager:
  # Install cert-manager chart. Set to false if you already have cert-manager
  # installed or if you are not using cert-manager.
  install: true
  # Other cert-manager configurations from upstream
  # See https://github.com/kubernetes/charts/tree/master/stable/cert-manager#configuration
  rbac:
    create: true

nginx-ingress:
  enabled: true
  tcp:
    22: 'enabled'
  tcpExternalConfig: 'true'
  controller:
    config:
      hsts-include-subdomains: 'false'
      server-name-hash-bucket-size: '256'
      enable-vts-status: 'true'
      use-http2: 'false'
      ssl-ciphers: 'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4'
      ssl-protocols: 'TLSv1.1 TLSv1.2'
      server-tokens: 'false'
    extraArgs:
      force-namespace-isolation: ''
    service:
      externalTrafficPolicy: 'Local'
    resources:
      requests:
        cpu: 100m
        memory: 200Mi
    publishService:
      enabled: true
    replicaCount: 3
    minAvailable: 2
    scope:
      enabled: true
  defaultBackend:
    minAvailable: 1
    replicaCount: 2
  rbac:
    create: false
    createClusterRole: false
    createRole: true

prometheus:
  install: true
  rbac:
    create: true
  alertmanager:
    enabled: false
  alertmanagerFiles:
    alertmanager.yml: {}
  kubeStateMetrics:
    enabled: false
  nodeExporter:
    enabled: false
  pushgateway:
    enabled: false

redis-ha:
  nameOverride: redis
  enabled: false

postgresql:
  install: true
  postgresUser: gitlab
  postgresDatabase: gitlabhq_production
  imageTag: 9.6.8
  usePasswordFile: true
  existingSecret: 'secret'
  metrics:
    enabled: true
    ## Optionally define additional custom metrics
    ## ref: https://github.com/wrouesnel/postgres_exporter#adding-new-metrics-via-a-config-file

# registry:
#   enabled: false
#
# minio:
#   enabled: false
#
# redis:
#   enabled: false

gitlab-runner:
  install: true
  rbac:
    create: true
  runners:
    cache:
      cacheType: s3
      s3BucketName: runner-cache
      cacheShared: true
      s3BucketLocation: us-east-1
      s3CachePath: gitlab-runner
      s3CacheInsecure: false
# gitlab:
#   migrations:
#     enabled: false
#   unicorn:
#     enabled: false
#   sidekiq:
#     enabled: false
#   gitaly:
#     enabled: false
#   gitlab-shell:
#     enabled: false
```

</details>
