# `@helm-charts/stable-grafana`

The leading tool for querying and visualizing time series and metrics.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | grafana |
| Chart Version       | 3.2.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
rbac:
  create: true
  pspEnabled: true
  pspUseAppArmor: true
  namespaced: false
serviceAccount:
  create: true
  name:

replicas: 1

deploymentStrategy: RollingUpdate

readinessProbe:
  httpGet:
    path: /api/health
    port: 3000

livenessProbe:
  httpGet:
    path: /api/health
    port: 3000
  initialDelaySeconds: 60
  timeoutSeconds: 30
  failureThreshold: 10

image:
  repository: grafana/grafana
  tag: 6.1.3
  pullPolicy: IfNotPresent

testFramework:
  image: 'dduportal/bats'
  tag: '0.4.0'

  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

securityContext:
  runAsUser: 472
  fsGroup: 472

extraConfigmapMounts:
  []
  # - name: certs-configmap
  #   mountPath: /etc/grafana/ssl/
  #   configMap: certs-configmap
  #   readOnly: true

extraEmptyDirMounts:
  []
  # - name: provisioning-notifiers
  #   mountPath: /etc/grafana/provisioning/notifiers

## Assign a PriorityClassName to pods if set
# priorityClassName:

downloadDashboardsImage:
  repository: appropriate/curl
  tag: latest
  pullPolicy: IfNotPresent

## Pod Annotations
# podAnnotations: {}

## Deployment annotations
# annotations: {}

## Expose the grafana service to be accessed from outside the cluster (LoadBalancer service).
## or access it from within the cluster (ClusterIP service). Set the service type and the port to serve it.
## ref: http://kubernetes.io/docs/user-guide/services/
##
service:
  type: ClusterIP
  port: 80
  targetPort:
    3000
    # targetPort: 4181 To be used with a proxy extraContainer
  annotations: {}
  labels: {}

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  labels: {}
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources: {}
#  limits:
#    cpu: 100m
#    memory: 128Mi
#  requests:
#    cpu: 100m
#    memory: 128Mi

## Node labels for pod assignment
## ref: https://kubernetes.io/docs/user-guide/node-selection/
#
nodeSelector: {}

## Tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
##
tolerations: []

## Affinity for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
##
affinity: {}

extraInitContainers: []

## Enable an Specify container in extraContainers. This is meant to allow adding an authentication proxy to a grafana pod
extraContainers: |
# - name: proxy
#   image: quay.io/gambol99/keycloak-proxy:latest
#   args:
#   - -provider=github
#   - -client-id=
#   - -client-secret=
#   - -github-org=<ORG_NAME>
#   - -email-domain=*
#   - -cookie-secret=
#   - -http-address=http://0.0.0.0:4181
#   - -upstream-url=http://127.0.0.1:3000
#   ports:
#     - name: proxy-web
#       containerPort: 4181

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: false
  # storageClassName: default
  accessModes:
    - ReadWriteOnce
  size: 10Gi
  # annotations: {}
  # subPath: ""
  # existingClaim:

initChownData:
  ## If false, data ownership will not be reset at startup
  ## This allows the prometheus-server to be run with an arbitrary user
  ##
  enabled: true

  ## initChownData container image
  ##
  image:
    repository: busybox
    tag: '1.30'
    pullPolicy: IfNotPresent

  ## initChownData resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources: {}
  #  limits:
  #    cpu: 100m
  #    memory: 128Mi
  #  requests:
  #    cpu: 100m
  #    memory: 128Mi

# Administrator credentials when not using an existing secret (see below)
adminUser: admin
# adminPassword: strongpassword

# Use an existing secret for the admin user.
admin:
  existingSecret: ''
  userKey: admin-user
  passwordKey: admin-password

## Define command to be executed at startup by grafana container
## Needed if using `vault-env` to manage secrets (ref: https://banzaicloud.com/blog/inject-secrets-into-pods-vault/)
## Default is "run.sh" as defined in grafana's Dockerfile
# command:
# - "sh"
# - "/run.sh"

## Use an alternate scheduler, e.g. "stork".
## ref: https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/
##
# schedulerName:

## Extra environment variables that will be pass onto deployment pods
env: {}

## The name of a secret in the same kubernetes namespace which contain values to be added to the environment
## This can be useful for auth tokens, etc
envFromSecret: ''

## Additional grafana server secret mounts
# Defines additional mounts with secrets. Secrets must be manually created in the namespace.
extraSecretMounts:
  []
  # - name: secret-files
  #   mountPath: /etc/secrets
  #   secretName: grafana-secret-files
  #   readOnly: true

## Additional grafana server volume mounts
# Defines additional volume mounts.
extraVolumeMounts:
  []
  # - name: extra-volume
  #   mountPath: /mnt/volume
  #   readOnly: true
  #   existingClaim: volume-claim

## Pass the plugins you want installed as a list.
##
plugins:
  []
  # - digrich-bubblechart-panel
  # - grafana-clock-panel

## Configure grafana datasources
## ref: http://docs.grafana.org/administration/provisioning/#datasources
##
datasources: {}
#  datasources.yaml:
#    apiVersion: 1
#    datasources:
#    - name: Prometheus
#      type: prometheus
#      url: http://prometheus-prometheus-server
#      access: proxy
#      isDefault: true

## Configure notifiers
## ref: http://docs.grafana.org/administration/provisioning/#alert-notification-channels
##
notifiers: {}
#  notifiers.yaml:
#    notifiers:
#    - name: email-notifier
#      type: email
#      uid: email1
#      # either:
#      org_id: 1
#      # or
#      org_name: Main Org.
#      is_default: true
#      settings:
#        addresses: an_email_address@example.com
#    delete_notifiers:

## Configure grafana dashboard providers
## ref: http://docs.grafana.org/administration/provisioning/#dashboards
##
## `path` must be /var/lib/grafana/dashboards/<provider_name>
##
dashboardProviders: {}
#  dashboardproviders.yaml:
#    apiVersion: 1
#    providers:
#    - name: 'default'
#      orgId: 1
#      folder: ''
#      type: file
#      disableDeletion: false
#      editable: true
#      options:
#        path: /var/lib/grafana/dashboards/default

## Configure grafana dashboard to import
## NOTE: To use dashboards you must also enable/configure dashboardProviders
## ref: https://grafana.com/dashboards
##
## dashboards per provider, use provider name as key.
##
dashboards:
  {}
  # default:
  #   some-dashboard:
  #     json: |
  #       $RAW_JSON
  #   custom-dashboard:
  #     file: dashboards/custom-dashboard.json
  #   prometheus-stats:
  #     gnetId: 2
  #     revision: 2
  #     datasource: Prometheus
  #   local-dashboard:
  #     url: https://example.com/repository/test.json
  #   local-dashboard-base64:
  #     url: https://example.com/repository/test-b64.json
  #     b64content: true

## Reference to external ConfigMap per provider. Use provider name as key and ConfiMap name as value.
## A provider dashboards must be defined either by external ConfigMaps or in values.yaml, not in both.
## ConfigMap data example:
##
## data:
##   example-dashboard.json: |
##     RAW_JSON
##
dashboardsConfigMaps: {}
#  default: ""

## Grafana's primary configuration
## NOTE: values in map will be converted to ini format
## ref: http://docs.grafana.org/installation/configuration/
##
grafana.ini:
  paths:
    data: /var/lib/grafana/data
    logs: /var/log/grafana
    plugins: /var/lib/grafana/plugins
    provisioning: /etc/grafana/provisioning
  analytics:
    check_for_updates: true
  log:
    mode: console
  grafana_net:
    url: https://grafana.net
## LDAP Authentication can be enabled with the following values on grafana.ini
## NOTE: Grafana will fail to start if the value for ldap.toml is invalid
# auth.ldap:
#   enabled: true
#   allow_sign_up: true
#   config_file: /etc/grafana/ldap.toml

## Grafana's LDAP configuration
## Templated by the template in _helpers.tpl
## NOTE: To enable the grafana.ini must be configured with auth.ldap.enabled
## ref: http://docs.grafana.org/installation/configuration/#auth-ldap
## ref: http://docs.grafana.org/installation/ldap/#configuration
ldap:
  # `existingSecret` is a reference to an existing secret containing the ldap configuration
  # for Grafana in a key `ldap-toml`.
  existingSecret: ''
  # `config` is the content of `ldap.toml` that will be stored in the created secret
  config: ''
  # config: |-
  #   verbose_logging = true
  #   [[servers]]
  #   host = "my-ldap-server"
  #   port = 636
  #   use_ssl = true
  #   start_tls = false
  #   ssl_skip_verify = false
  #   bind_dn = "uid=%s,ou=users,dc=myorg,dc=com"

## Grafana's SMTP configuration
## NOTE: To enable, grafana.ini must be configured with smtp.enabled
## ref: http://docs.grafana.org/installation/configuration/#smtp
smtp:
  # `existingSecret` is a reference to an existing secret containing the smtp configuration
  # for Grafana.
  existingSecret: ''
  userKey: 'user'
  passwordKey: 'password'

## Sidecars that collect the configmaps with specified label and stores the included files them into the respective folders
## Requires at least Grafana 5 to work and can't be used together with parameters dashboardProviders, datasources and dashboards
sidecar:
  image: kiwigrid/k8s-sidecar:0.0.16
  imagePullPolicy: IfNotPresent
  resources: {}
  #   limits:
  #     cpu: 100m
  #     memory: 100Mi
  #   requests:
  #     cpu: 50m
  #     memory: 50Mi
  dashboards:
    enabled: false
    # label that the configmaps with dashboards are marked with
    label: grafana_dashboard
    # folder in the pod that should hold the collected dashboards
    folder: /tmp/dashboards
    # If specified, the sidecar will search for dashboard config-maps inside this namespace.
    # Otherwise the namespace in which the sidecar is running will be used.
    # It's also possible to specify ALL to search in all namespaces
    searchNamespace: null
  datasources:
    enabled: false
    # label that the configmaps with datasources are marked with
    label: grafana_datasource
    # If specified, the sidecar will search for datasource config-maps inside this namespace.
    # Otherwise the namespace in which the sidecar is running will be used.
    # It's also possible to specify ALL to search in all namespaces
    searchNamespace: null
```

</details>

---

# Grafana Helm Chart

- Installs the web dashboarding system [Grafana](http://grafana.org/)

## TL;DR;

```console
$ helm install stable/grafana
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/grafana
```

## Uninstalling the Chart

To uninstall/delete the my-release deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

| Parameter                             | Description                                                                                                                                                                                                                  | Default                                                                                                                          |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `replicas`                            | Number of nodes                                                                                                                                                                                                              | `1`                                                                                                                              |
| `deploymentStrategy`                  | Deployment strategy                                                                                                                                                                                                          | `RollingUpdate`                                                                                                                  |
| `livenessProbe`                       | Liveness Probe settings                                                                                                                                                                                                      | `{ "httpGet": { "path": "/api/health", "port": 3000 } "initialDelaySeconds": 60, "timeoutSeconds": 30, "failureThreshold": 10 }` |
| `readinessProbe`                      | Rediness Probe settings                                                                                                                                                                                                      | `{ "httpGet": { "path": "/api/health", "port": 3000 } }`                                                                         |
| `securityContext`                     | Deployment securityContext                                                                                                                                                                                                   | `{"runAsUser": 472, "fsGroup": 472}`                                                                                             |
| `priorityClassName`                   | Name of Priority Class to assign pods                                                                                                                                                                                        | `nil`                                                                                                                            |
| `image.repository`                    | Image repository                                                                                                                                                                                                             | `grafana/grafana`                                                                                                                |
| `image.tag`                           | Image tag. (`Must be >= 5.0.0`)                                                                                                                                                                                              | `6.1.3`                                                                                                                          |
| `image.pullPolicy`                    | Image pull policy                                                                                                                                                                                                            | `IfNotPresent`                                                                                                                   |
| `service.type`                        | Kubernetes service type                                                                                                                                                                                                      | `ClusterIP`                                                                                                                      |
| `service.port`                        | Kubernetes port where service is exposed                                                                                                                                                                                     | `80`                                                                                                                             |
| `service.targetPort`                  | internal service is port                                                                                                                                                                                                     | `3000`                                                                                                                           |
| `service.annotations`                 | Service annotations                                                                                                                                                                                                          | `{}`                                                                                                                             |
| `service.labels`                      | Custom labels                                                                                                                                                                                                                | `{}`                                                                                                                             |
| `ingress.enabled`                     | Enables Ingress                                                                                                                                                                                                              | `false`                                                                                                                          |
| `ingress.annotations`                 | Ingress annotations                                                                                                                                                                                                          | `{}`                                                                                                                             |
| `ingress.labels`                      | Custom labels                                                                                                                                                                                                                | `{}`                                                                                                                             |
| `ingress.path`                        | Ingress accepted path                                                                                                                                                                                                        | `/`                                                                                                                              |
| `ingress.hosts`                       | Ingress accepted hostnames                                                                                                                                                                                                   | `[]`                                                                                                                             |
| `ingress.tls`                         | Ingress TLS configuration                                                                                                                                                                                                    | `[]`                                                                                                                             |
| `resources`                           | CPU/Memory resource requests/limits                                                                                                                                                                                          | `{}`                                                                                                                             |
| `nodeSelector`                        | Node labels for pod assignment                                                                                                                                                                                               | `{}`                                                                                                                             |
| `tolerations`                         | Toleration labels for pod assignment                                                                                                                                                                                         | `[]`                                                                                                                             |
| `affinity`                            | Affinity settings for pod assignment                                                                                                                                                                                         | `{}`                                                                                                                             |
| `extraInitContainers`                 | Init containers to add to the grafana pod                                                                                                                                                                                    | `{}`                                                                                                                             |
| `extraContainers`                     | Sidecar containers to add to the grafana pod                                                                                                                                                                                 | `{}`                                                                                                                             |
| `persistence.enabled`                 | Use persistent volume to store data                                                                                                                                                                                          | `false`                                                                                                                          |
| `persistence.size`                    | Size of persistent volume claim                                                                                                                                                                                              | `10Gi`                                                                                                                           |
| `persistence.existingClaim`           | Use an existing PVC to persist data                                                                                                                                                                                          | `nil`                                                                                                                            |
| `persistence.storageClassName`        | Type of persistent volume claim                                                                                                                                                                                              | `nil`                                                                                                                            |
| `persistence.accessModes`             | Persistence access modes                                                                                                                                                                                                     | `[ReadWriteOnce]`                                                                                                                |
| `persistence.subPath`                 | Mount a sub dir of the persistent volume                                                                                                                                                                                     | `nil`                                                                                                                            |
| `initChownData.enabled`               | If false, don't reset data ownership at startup                                                                                                                                                                              | true                                                                                                                             |
| `initChownData.image.repository`      | init-chown-data container image repository                                                                                                                                                                                   | `busybox`                                                                                                                        |
| `initChownData.image.tag`             | init-chown-data container image tag                                                                                                                                                                                          | `latest`                                                                                                                         |
| `initChownData.image.pullPolicy`      | init-chown-data container image pull policy                                                                                                                                                                                  | `IfNotPresent`                                                                                                                   |
| `initChownData.resources`             | init-chown-data pod resource requests & limits                                                                                                                                                                               | `{}`                                                                                                                             |
| `schedulerName`                       | Alternate scheduler name                                                                                                                                                                                                     | `nil`                                                                                                                            |
| `env`                                 | Extra environment variables passed to pods                                                                                                                                                                                   | `{}`                                                                                                                             |
| `envFromSecret`                       | Name of a Kubenretes secret (must be manually created in the same namespace) containing values to be added to the environment                                                                                                | `""`                                                                                                                             |
| `extraSecretMounts`                   | Additional grafana server secret mounts                                                                                                                                                                                      | `[]`                                                                                                                             |
| `extraVolumeMounts`                   | Additional grafana server volume mounts                                                                                                                                                                                      | `[]`                                                                                                                             |
| `extraConfigmapMounts`                | Additional grafana server configMap volume mounts                                                                                                                                                                            | `[]`                                                                                                                             |
| `extraEmptyDirMounts`                 | Additional grafana server emptyDir volume mounts                                                                                                                                                                             | `[]`                                                                                                                             |
| `plugins`                             | Plugins to be loaded along with Grafana                                                                                                                                                                                      | `[]`                                                                                                                             |
| `datasources`                         | Configure grafana datasources (passed through tpl)                                                                                                                                                                           | `{}`                                                                                                                             |
| `notifiers`                           | Configure grafana notifiers                                                                                                                                                                                                  | `{}`                                                                                                                             |
| `dashboardProviders`                  | Configure grafana dashboard providers                                                                                                                                                                                        | `{}`                                                                                                                             |
| `dashboards`                          | Dashboards to import                                                                                                                                                                                                         | `{}`                                                                                                                             |
| `dashboardsConfigMaps`                | ConfigMaps reference that contains dashboards                                                                                                                                                                                | `{}`                                                                                                                             |
| `grafana.ini`                         | Grafana's primary configuration                                                                                                                                                                                              | `{}`                                                                                                                             |
| `ldap.existingSecret`                 | The name of an existing secret containing the `ldap.toml` file, this must have the key `ldap-toml`.                                                                                                                          | `""`                                                                                                                             |
| `ldap.config`                         | Grafana's LDAP configuration                                                                                                                                                                                                 | `""`                                                                                                                             |
| `annotations`                         | Deployment annotations                                                                                                                                                                                                       | `{}`                                                                                                                             |
| `podAnnotations`                      | Pod annotations                                                                                                                                                                                                              | `{}`                                                                                                                             |
| `sidecar.image`                       | Sidecar image                                                                                                                                                                                                                | `kiwigrid/k8s-sidecar:0.0.16`                                                                                                    |
| `sidecar.imagePullPolicy`             | Sidecar image pull policy                                                                                                                                                                                                    | `IfNotPresent`                                                                                                                   |
| `sidecar.resources`                   | Sidecar resources                                                                                                                                                                                                            | `{}`                                                                                                                             |
| `sidecar.dashboards.enabled`          | Enabled the cluster wide search for dashboards and adds/updates/deletes them in grafana                                                                                                                                      | `false`                                                                                                                          |
| `sidecar.dashboards.label`            | Label that config maps with dashboards should have to be added                                                                                                                                                               | `grafana_dashboard`                                                                                                              |
| `sidecar.dashboards.searchNamespace`  | If specified, the sidecar will search for dashboard config-maps inside this namespace. Otherwise the namespace in which the sidecar is running will be used. It's also possible to specify ALL to search in all namespaces   | `nil`                                                                                                                            |
| `sidecar.datasources.enabled`         | Enabled the cluster wide search for datasources and adds/updates/deletes them in grafana                                                                                                                                     | `false`                                                                                                                          |
| `sidecar.datasources.label`           | Label that config maps with datasources should have to be added                                                                                                                                                              | `grafana_datasource`                                                                                                             |
| `sidecar.datasources.searchNamespace` | If specified, the sidecar will search for datasources config-maps inside this namespace. Otherwise the namespace in which the sidecar is running will be used. It's also possible to specify ALL to search in all namespaces | `nil`                                                                                                                            |
| `smtp.existingSecret`                 | The name of an existing secret containing the SMTP credentials.                                                                                                                                                              | `""`                                                                                                                             |
| `smtp.userKey`                        | The key in the existing SMTP secret containing the username.                                                                                                                                                                 | `"user"`                                                                                                                         |
| `smtp.passwordKey`                    | The key in the existing SMTP secret containing the password.                                                                                                                                                                 | `"password"`                                                                                                                     |
| `admin.existingSecret`                | The name of an existing secret containing the admin credentials.                                                                                                                                                             | `""`                                                                                                                             |
| `admin.userKey`                       | The key in the existing admin secret containing the username.                                                                                                                                                                | `"admin-user"`                                                                                                                   |
| `admin.passwordKey`                   | The key in the existing admin secret containing the password.                                                                                                                                                                | `"admin-password"`                                                                                                               |
| `rbac.create`                         | Create and use RBAC resources                                                                                                                                                                                                | `true`                                                                                                                           |
| `rbac.namespaced`                     | Creates Role and Rolebinding instead of the default ClusterRole and ClusteRoleBindings for the grafana instance                                                                                                              | `false`                                                                                                                          |
| `rbac.pspEnabled`                     | Create PodSecurityPolicy (with `rbac.create`, grant roles permissions as well)                                                                                                                                               | `true`                                                                                                                           |
| `rbac.pspUseAppArmor`                 | Enforce AppArmor in created PodSecurityPolicy (requires `rbac.pspEnabled`)                                                                                                                                                   | `true`                                                                                                                           |
| `command`                             | Define command to be executed by grafana container at startup                                                                                                                                                                | `nil`                                                                                                                            |
| `testFramework.image`                 | `test-framework` image repository.                                                                                                                                                                                           | `dduportal/bats`                                                                                                                 |
| `testFramework.tag`                   | `test-framework` image tag.                                                                                                                                                                                                  | `0.4.0`                                                                                                                          |

### Example of extraVolumeMounts

```yaml
- extraVolumeMounts:
    - name: plugins
      mountPath: /var/lib/grafana/plugins
      subPath: configs/grafana/plugins
      existingClaim: existing-grafana-claim
      readOnly: false
```

## Import dashboards

There are a few methods to import dashboards to Grafana. Below are some examples and explanations as to how to use each method:

```yaml
dashboards:
  default:
    some-dashboard:
      json: |
        {
          "annotations":

          ...
          # Complete json file here
          ...

          "title": "Some Dashboard",
          "uid": "abcd1234",
          "version": 1
        }
    custom-dashboard:
      # This is a path to a file inside the dashboards directory inside the chart directory
      file: dashboards/custom-dashboard.json
    prometheus-stats:
      # Ref: https://grafana.com/dashboards/2
      gnetId: 2
      revision: 2
      datasource: Prometheus
    local-dashboard:
      url: https://raw.githubusercontent.com/user/repository/master/dashboards/dashboard.json
```

## BASE64 dashboards

Dashboards could be storaged in a server that does not return JSON directly and instead of it returns a Base64 encoded file (e.g. Gerrit)
A new parameter has been added to the url use case so if you specify a b64content value equals to true after the url entry a Base64 decoding is applied before save the file to disk.
If this entry is not set or is equals to false not decoding is applied to the file before saving it to disk.

### Gerrit use case:

Gerrit API for download files has the following schema: https://yourgerritserver/a/{project-name}/branches/{branch-id}/files/{file-id}/content where {project-name} and
{file-id} usualy has '/' in their values and so they MUST be replaced by %2F so if project-name is user/repo, branch-id is master and file-id is equals to dir1/dir2/dashboard
the url value is https://yourgerritserver/a/user%2Frepo/branches/master/files/dir1%2Fdir2%2Fdashboard/content

## Sidecar for dashboards

If the parameter `sidecar.dashboards.enabled` is set, a sidecar container is deployed in the grafana pod. This container watches all config maps in the cluster and filters out the ones with a label as defined in `sidecar.dashboards.label`. The files defined in those configmaps are written to a folder and accessed by grafana. Changes to the configmaps are monitored and the imported dashboards are deleted/updated. A recommendation is to use one configmap per dashboard, as an reduction of multiple dashboards inside one configmap is currently not properly mirrored in grafana.
Example dashboard config:

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: sample-grafana-dashboard
  labels:
     grafana_dashboard: 1
data:
  k8s-dashboard.json: |-
  [...]
```

## Sidecar for datasources

If the parameter `sidecar.datasources.enabled` is set, an init container is deployed in the grafana pod. This container lists all config maps in the cluster and filters out the ones with a label as defined in `sidecar.datasources.label`. The files defined in those configmaps are written to a folder and accessed by grafana on startup. Using these yaml files, the data sources in grafana can be imported. The configmaps must be created before `helm install` so that the datasources init container can list the configmaps.

Example datasource config adapted from [Grafana](http://docs.grafana.org/administration/provisioning/#example-datasource-config-file):

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: sample-grafana-datasource
  labels:
     grafana_datasource: 1
data:
  datasource.yaml: |-
    # config file version
    apiVersion: 1

    # list of datasources that should be deleted from the database
    deleteDatasources:
      - name: Graphite
        orgId: 1

    # list of datasources to insert/update depending
    # whats available in the database
    datasources:
      # <string, required> name of the datasource. Required
    - name: Graphite
      # <string, required> datasource type. Required
      type: graphite
      # <string, required> access mode. proxy or direct (Server or Browser in the UI). Required
      access: proxy
      # <int> org id. will default to orgId 1 if not specified
      orgId: 1
      # <string> url
      url: http://localhost:8080
      # <string> database password, if used
      password:
      # <string> database user, if used
      user:
      # <string> database name, if used
      database:
      # <bool> enable/disable basic auth
      basicAuth:
      # <string> basic auth username
      basicAuthUser:
      # <string> basic auth password
      basicAuthPassword:
      # <bool> enable/disable with credentials headers
      withCredentials:
      # <bool> mark as default datasource. Max one per org
      isDefault:
      # <map> fields that will be converted to json and stored in json_data
      jsonData:
         graphiteVersion: "1.1"
         tlsAuth: true
         tlsAuthWithCACert: true
      # <string> json object of data that will be encrypted.
      secureJsonData:
        tlsCACert: "..."
        tlsClientCert: "..."
        tlsClientKey: "..."
      version: 1
      # <bool> allow users to edit datasources from the UI.
      editable: false

```
