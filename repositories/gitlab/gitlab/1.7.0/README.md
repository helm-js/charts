# `@helm-charts/gitlab-gitlab`

Web-based Git-repository manager with wiki and issue-tracking features.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | gitlab |
| Chart Name          | gitlab |
| Chart Version       | 1.7.0  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for gitlab/gitlab chart

## NOTICE
# Due to the scope and complexity of this chart, all possible values are
# not documented in this file. Extensive documentation for these values
# and more can be found at https://gitlab.com/charts/gitlab/

## Advanced Configuration
# Documentation for advanced configuration can be found under doc/advanced
# - external PostgreSQL
# - external Gitaly
# - external Redis
# - external NGINX
# - PersistentVolume configuration
# - external Object Storage providers

## The global properties are used to configure multiple charts at once.
## Extended documenation at doc/charts/globals.md
global:
  ## GitLab operator is Alpha. Not for production use.
  operator:
    enabled: false

  ## doc/installation/deployment.md#deploy-the-community-edition
  # edition: ee

  ## doc/charts/globals.md#gitlab-version
  # gitlabVersion: master

  ## doc/charts/globals.md#application-resource
  application:
    create: false
    links: []
    allowClusterRoles: true
  ## doc/charts/globals.md#configure-host-settings
  hosts:
    domain: example.com
    # hostSuffix:
    https: true
    externalIP:
    ssh: ~

  ## doc/charts/globals.md#configure-ingress-settings
  ingress:
    configureCertmanager: true
    annotations: {}
    enabled: true
    # tls:
    #   enabled: true

  ## Initial root password for this GitLab installation
  ## Secret created according to doc/installation/secrets.md#initial-root-password
  ## If allowing shared-secrets generation, this is OPTIONAL.
  initialRootPassword:
    {}
    # secret: RELEASE-gitlab-initial-root-password
    # key: password

  ## doc/charts/globals.md#configure-postgresql-settings
  psql:
    password:
      {}
      # secret:
      # key:
    # host: postgresql.hostedsomewhere.else
    # port: 123
    # username: gitlab
    # database: gitlabhq_production

  ## doc/charts/globals.md#configure-redis-settings
  redis:
    password:
      enabled: true
      # secret:
      # key:
    # host: redis.hostedsomewhere.else
    # port: 6379

  ## doc/charts/globals.md#configure-gitaly-settings
  gitaly:
    authToken:
      {}
      # secret:
      # key:
    internal:
      names: ['default']
    external: []

  ## doc/charts/globals.md#configure-minio-settings
  minio:
    enabled: true
    credentials:
      {}
      # secret:

  ## doc/charts/globals.md#configure-appconfig-settings
  ## Rails based portions of this chart share many settings
  appConfig:
    ## doc/charts/globals.md#general-application-settings
    enableUsagePing: true
    enableImpersonation:
    defaultCanCreateGroup: true
    usernameChangingEnabled: true
    issueClosingPattern:
    defaultTheme:
    defaultProjectsFeatures:
      issues: true
      mergeRequests: true
      wiki: true
      snippets: true
      builds: true
    webhookTimeout:

    ## doc/charts/globals.md#cron-jobs-related-settings
    cron_jobs:
      {}
      # stuck_ci_jobs_worker:
      #   cron: "0 * * * *"
      # pipeline_schedule_worker:
      #   cron: "19 * * * *"
      # expire_build_artifacts_worker:
      #   cron: "50 * * * *"
      # repository_check_worker:
      #   cron: "20 * * * *"
      # admin_email_worker:
      #   cron: "0 0 * * 0"
      # repository_archive_cache_worker:
      #   cron: "0 * * * *"
      # pages_domain_verification_cron_worker:
      #   cron: "*/15 * * * *"
      # pseudonymizer_worker:
      #   cron: "0 * * * *"

    ## doc/charts/globals.md#gravatarlibravatar-settings
    gravatar:
      plainUrl:
      sslUrl:

    ## doc/charts/globals.md#hooking-analytics-services-to-the-gitlab-instance
    extra:
      googleAnalyticsId:
      piwikUrl:
      piwikSiteId:

    ## doc/charts/globals.md#lfs-artifacts-uploads-packages-external-mr-diffs
    lfs:
      bucket: git-lfs
      connection:
        {}
        # secret:
        # key:
    artifacts:
      bucket: gitlab-artifacts
      connection:
        {}
        # secret:
        # key:
    uploads:
      bucket: gitlab-uploads
      connection:
        {}
        # secret:
        # key:
    packages:
      bucket: gitlab-packages
      connection: {}
    externalDiffs:
      bucket: gitlab-mr-diffs
      connection: {}

    ## doc/charts/globals.md#pseudonymizer-settings
    pseudonymizer:
      configMap:
      bucket: gitlab-pseudo
      connection:
        {}
        # secret:
        # key:
    backups:
      bucket: gitlab-backups
      tmpBucket: tmp

    ## doc/charts/globals.md#incoming-email-settings
    ## doc/installation/deployment.md#incoming-email
    incomingEmail:
      enabled: false
      address: ''
      host: 'imap.gmail.com'
      port: 993
      ssl: true
      startTls: false
      user: ''
      password:
        secret: ''
        key: password
      mailbox: inbox
      idleTimeout: 60

    ## doc/charts/globals.md#ldap
    ldap:
      servers: {}
      ## 'main' is the GitLab 'provider ID' of this LDAP server
      # main:
      #   label: 'LDAP'
      #   host: '_your_ldap_server'
      #   port: 636
      #   uid: 'sAMAccountName'
      #   bind_dn: '_the_full_dn_of_the_user_you_will_bind_with'
      #   password:
      #     secret: _the_secret_containing_your_ldap_password
      #     key: _the_key_which_holds_your_ldap_password
      #   encryption: 'plain'

    ## doc/charts/globals.md#omniauth
    omniauth:
      enabled: false
      autoSignInWithProvider:
      syncProfileFromProvider: []
      syncProfileAttributes: ['email']
      allowSingleSignOn: ['saml']
      blockAutoCreatedUsers: true
      autoLinkLdapUser: false
      autoLinkSamlUser: false
      externalProviders: []
      providers: []
      # - secret: gitlab-google-oauth2
      #   key: provider
  ## End of global.appConfig

  ## doc/charts/globals.md#configure-gitlab-shell-settings
  shell:
    authToken:
      {}
      # secret:
      # key:
    hostKeys:
      {}
      # secret:

  ## Rails application secrets
  ## Secret created according to doc/installation/secrets.md#gitlab-rails-secret
  ## If allowing shared-secrets generation, this is OPTIONAL.
  railsSecrets:
    {}
    # secret:

  ## doc/charts/globals.md#configure-registry-settings
  registry:
    bucket: registry
    certificate:
      {}
      # secret:
    httpSecret:
      {}
      # secret:
      # key:

  ## GitLab Runner
  ## Secret created according to doc/installation/secrets.md#gitlab-runner-secret
  ## If allowing shared-secrets generation, this is OPTIONAL.
  runner:
    registrationToken:
      {}
      # secret:

  ## doc/installation/deployment.md#outgoing-email
  ## Outgoing email server settings
  smtp:
    enabled: false
    address: smtp.mailgun.org
    port: 2525
    user_name: ''
    ## doc/installation/secrets.md#smtp-password
    password:
      secret: ''
      key: password
    # domain:
    authentication: 'plain'
    starttls_auto: false
    openssl_verify_mode: 'peer'

  ## doc/installation/deployment.md#outgoing-email
  ## Email persona used in email sent by GitLab
  email:
    from: ''
    display_name: GitLab
    reply_to: ''
    subject_suffix: ''

  ## Timezone for containers.
  time_zone: UTC

  ## Global Service Annotations
  service:
    annotations: {}

  antiAffinity: soft

  ## doc/installation/secrets.md#gitlab-workhorse-secret
  workhorse:
    {}
    # secret:
    # key:

  ## doc/charts/globals.md#custom-certificate-authorities
  # configuration of certificates container & custom CA injection
  certificates:
    image:
      repository: registry.gitlab.com/gitlab-org/build/cng/alpine-certificates
      tag: 20171114-r3
    customCAs: []
    # - secret: custom-CA
    # - secret: more-custom-CAs
## End of global

## Settings to for the Let's Encrypt ACME Issuer
# certmanager-issuer:
## The email address to register certificates requested from Let's Encrypt.
## Required if using Let's Encrypt.
# email: email@example.com

## Installation & configuration of stable/cert-manager
## See requirements.yaml for current version
certmanager:
  # Install cert-manager chart. Set to false if you already have cert-manager
  # installed or if you are not using cert-manager.
  install: true
  # Other cert-manager configurations from upstream
  # See https://github.com/kubernetes/charts/tree/master/stable/cert-manager#configuration
  rbac:
    create: true

## doc/charts/nginx/index.md
## doc/architecture/decisions.md#nginx-ingress
## Installation & configuration of charts/nginx
nginx-ingress:
  enabled: true
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
        memory: 100Mi
    publishService:
      enabled: true
    replicaCount: 3
    minAvailable: 2
    scope:
      enabled: true
    stats:
      enabled: true
    metrics:
      enabled: true
      service:
        annotations:
          prometheus.io/scrape: 'true'
          prometheus.io/port: '10254'
  defaultBackend:
    minAvailable: 1
    replicaCount: 2
    resources:
      requests:
        cpu: 5m
        memory: 5Mi
  rbac:
    create: true
  serviceAccount:
    create: true

## Installation & configuration of stable/prometheus
## See requirements.yaml for current version
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

## Configuration of Redis
## doc/architecture/decisions.md#redis
## doc/charts/redis
# redis:
#   enabled: true
## doc/architecture/decisions.md#redis-ha
## doc/charts/redis-ha
redis-ha:
  enabled: false
  nameOverride: redis

## Instllation & configuration of stable/prostgresql
## See requirements.yaml for current version
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

## Installation & configuration charts/registry
## doc/architecture/decisions.md#registry
## doc/charts/registry/
# registry:
#   enabled: false

## Automatic shared secret generation
## doc/installation/secrets.md
## doc/charts/shared-secrets
shared-secrets:
  enabled: true
  rbac:
    create: true

## Installation & configuration of gitlab/gitlab-runner
## See requirements.yaml for current version
gitlab-runner:
  install: true
  rbac:
    create: true
  runners:
    locked: false
    cache:
      cacheType: s3
      s3BucketName: runner-cache
      cacheShared: true
      s3BucketLocation: us-east-1
      s3CachePath: gitlab-runner
      s3CacheInsecure: false
## Settings for individual sub-charts under GitLab
## Note: Many of these settings are configurable via globals
# gitlab:
## doc/charts/gitlab/migrations
#   migrations:
#     enabled: false
## doc/charts/gitlab/unicorn
#   unicorn:
#     enabled: false
## doc/charts/gitlab/sidekiq
#   sidekiq:
#     enabled: false
## doc/charts/gitlab/gitaly
#   gitaly:
#     enabled: false
## doc/charts/gitlab/gitlab-shell
#   gitlab-shell:
#     enabled: false
```

</details>
