# `@helm-charts/gitlab-kubernetes-gitlab-demo`

GitLab running on Kubernetes suitable for demos

| Field               | Value                  |
| ------------------- | ---------------------- |
| Repository Name     | gitlab                 |
| Chart Name          | kubernetes-gitlab-demo |
| Chart Version       | 0.1.29                 |
| NPM Package Version | 0.1.0                  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kubernetes-gitlab-demo.
# This is a YAML-formatted file.

# Required variables

# baseDomain is the top-most part of the domain. Subdomains will be generated
# for gitlab, mattermost, registry, and prometheus.
# Recommended to set up an A record on the DNS to *.your-domain.com to point to
# the baseIP
# e.g. *.your-domain.com.	A	300	baseIP
#baseDomain: your-domain.com

# legoEmail is a valid email address used by Let's Encrypt. It does not have to
# be at the baseDomain.
#legoEmail: you@example.com

# Optional variables
# baseIP is an externally provisioned static IP address to use instead of the provisioned one.
#baseIP: 1.1.1.1
gitlabNamespace: gitlab
# `ce` or `ee`
gitlab: ce
gitlabCEImage: gitlab/gitlab-ce:9.3.7-ce.0
gitlabEEImage: gitlab/gitlab-ee:9.3.7-ee.0
postgresPassword: NDl1ZjNtenMxcWR6NXZnbw==
initialSharedRunnersRegistrationToken: 'tQtCbx5UZy_ByS7FyzUH'
mattermostAppSecret: NDl1ZjNtenMxcWR6NXZnbw==
mattermostAppUID: aadas
redisImage: redis:3.2.4
redisDedicatedStorage: true
redisStorageSize: 5Gi
postgresImage: postgres:9.6.1
# If you disable postgresDedicatedStorage, you should consider bumping up gitlabRailsStorageSize
postgresDedicatedStorage: true
postgresStorageSize: 30Gi
gitlabRailsStorageSize: 30Gi
gitlabRegistryStorageSize: 30Gi
gitlabConfigStorageSize: 1Gi
gitlabRunnerImage: gitlab/gitlab-runner:alpine-v9.3.0
# Valid values for provider are `gke` for Google Container Engine. Leaving it blank (or any othervalue) will disable fast disk options.
provider: gke
healthCheckToken: 'SXBAQichEJasbtDSygrD'
# Optional, for GitLab EE images only
#gitlabEELicense: base64-encoded-license

gitlab-runner:
  checkInterval: 1
  gitlabUrl: http://gitlab.gitlab:8005/
  # runnerRegistrationToken must equal initialSharedRunnersRegistrationToken
  runnerRegistrationToken: 'tQtCbx5UZy_ByS7FyzUH'
  namespace: gitlab
  resources:
    limits:
      memory: 500Mi
      cpu: 600m
    requests:
      memory: 500Mi
      cpu: 600m
  runners:
    namespace: gitlab
    privileged: true
```

</details>

---

# Kubernetes GitLab Demo

This chart has been deprecated and replaced by [gitlab-omnibus](../gitlab-omnibus).
