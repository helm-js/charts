# `@helm-charts/banzaicloud-stable-dex`

dexidp Dex

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | dex                |
| Chart Version       | 0.0.12             |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for dex
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

image: banzaicloud/dex-shim
imageTag: '0.3.2'
imagePullPolicy: 'IfNotPresent'

replicas: 1

postgresql:
  enabled: true
  postgresqlUsername: dex
  postgresqlPassword: foo
  postgresqlDatabase: dex_db

cloudsql:
  enabled: false
  image:
    repository: gcr.io/cloudsql-docker/gce-proxy
    tag: 1.11
    pullPolicy: IfNotPresent
  instance: ''

exampleApp:
  enabled: false
  clientID: ''
  clientSecret: ''
  redirectURI: ''

# resources:
# limits:
# cpu: 100m
# memory: 50Mi
# requests:
# cpu: 100m
# memory: 50Mi

ports:
  - name: http
    containerPort: 5556
    protocol: TCP
  - name: grpc
    containerPort: 5557
    protocol: TCP

service:
  type: ClusterIP
  annotations: {}

extraVolumes: []
extraVolumeMounts: []

certs:
  tlsName: ''
  caName: ''

env: []

rbac:
  create: true

serviceAccount:
  create: true
  name:

config:
  issuer: ''

  logger:
    level: ''

  web:
    http: ''

  grpc:
    addr: ''

  frontend:
    theme: ''

  storage:
    type: ''
    config:
      database: ''
      user: ''
      password: ''
      host: ''
      ssl:
        mode: ''

  staticClients: []

  connectors: {}

  enablePasswordDB: false
  staticPasswords: []

nodeSelector: {}

ingress:
  enabled: false
  annotations:
    {}
    #kubernetes.io/ingress.class: traefik
    #ingress.kubernetes.io/ssl-redirect: "false"
    #traefik.frontend.rule.type: PathPrefix
  hosts:
    - '/'
    # - "domain.com/xyz"
    # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local
```

</details>

---

# Dexidp dex chart

## Installing the Chart

```shell
helm repo add banzaicloud-stable http://kubernetes-charts.banzaicloud.com/branch/master
helm install --name dex banzaicloud-stable/dex
```

## Configuration

The following tables lists configurable parameters of the dex chart and their default values.

| Parameter                      | Description                                   | Default                                                           |
| ------------------------------ | --------------------------------------------- | ----------------------------------------------------------------- |
| image                          | dex image                                     | quay.io/dexidp/dex                                                |
| imageTag                       | image tag                                     | master                                                            |
| imagePullPolicy                | image pull policy                             | IfNotPresent                                                      |
| replicas                       | number of replicas                            | 1                                                                 |
| postgresql.enabled             | deploy postgresql                             | true                                                              |
| postgresql.postgresqlUsername  | postgresql username                           | dex                                                               |
| postgresql.postgresqlPassword  | postgresql password                           | foo                                                               |
| postgresql.postgresqlDatabase  | postgresql database                           | dex_db                                                            |
| cloudsql.enabled               | cloudsql                                      | false                                                             |
| cloudsql.instance              | cloudsql instance host                        | ""                                                                |
| cloudsql.image.repository      | cloudsql proxy image repository               | gcr.io/cloudsql-docker/gce-proxy                                  |
| cloudsql.image.tag             | cloudsql proxy image tag                      | 1.11                                                              |
| cloudsql.image.pullPolicy      | cloudsql proxy image pull policy              | IfNotPresent                                                      |
| ports[0].name                  | port 0 name                                   | http                                                              |
| ports[0].containerPort         | port 0 port                                   | 5556                                                              |
| posts[0].protocol              | port 0 protocol                               | TCP                                                               |
| service.type                   | service type                                  | ClusterIP                                                         |
| service.annotations            | service annotattions                          | {}                                                                |
| certs.tlsName                  | tls secret name                               | dex-web-server-tls                                                |
| certs.caName                   | CA secret name                                | dex-web-server-ca                                                 |
| env                            | environment variables                         | []                                                                |
| rbac.create                    | RBAC resources should be created              | true                                                              |
| serviceAccount.create          | serviceAccount should be created              | true                                                              |
| serviceAccount.name            | name of the ServiceAccount to use             | default                                                           |
| config.issuer                  | issuer url                                    | http://127.0.0.1:5556/dex                                         |
| config.logger.level            | logger level                                  | debug                                                             |
| config.web.http                | dex host and port                             | 0.0.0.0:5556                                                      |
| config.storage.type            | storage type                                  | postgresql                                                        |
| config.storage.config.database | storage db                                    | {{ postgresql.postgresqlDatabase }}                               |
| config.storage.config.user     | storage user                                  | {{ postgresql.postgresqlUsername }}                               |
| config.storage.config.password | storage password                              | {{ postgresql.postgresqlPassword }}                               |
| config.storage.config.host     | storage host                                  | Release.Name-postgresql.Release.Namespace..svc.cluster.local:5432 |
| config.storage.config.ssl.mode | storage ssl mode                              | disable                                                           |
| config.staticClients           | client config (use config file see below)     | []                                                                |
| config.connectors              | connectors config (use config file see below) | []                                                                |
| nodeSelector                   | nodeselector                                  | {}                                                                |
| ingress.enabled                | ingress enabled                               | false                                                             |
| ingress.annotations            | ingress annotations                           | {}                                                                |
| ingress.hosts                  | ingress hosts                                 | ["/"]                                                             |
| ingress.tls                    | ingress TLS                                   | []                                                                |

An example static client config:

```yaml
config:
  staticClients:
    - id: example-app
      redirectURIs:
        - 'http://127.0.0.1:9000/auth/dex/callback'
        - 'http://localhost:9000/auth/dex/callback'
      name: 'Example App'
      secret: example-secret
```

An example connector config:

```yaml
config:
  connectors:
    github:
      type: github
      id: github
      name: GitHub
      config:
        loadAllGroups: true
        clientID: <github-client-id>
        clientSecret: <fithub-client-secret>
        redirectURI: http://127.0.0.1:5556/dex/callback

    ldap:
      type: ldap
      name: OpenLDAP
      id: ldap
      config:
        host: <ladp-ip>:<ldap-port>
        # No TLS for this setup.
        insecureNoSSL: true
        # This would normally be a read-only user.
        bindDN: cn=admin,dc=example,dc=org
        bindPW: admin
        usernamePrompt: Email Address
        userSearch:
          baseDN: ou=People,dc=example,dc=org
          filter: '(objectClass=person)'
          username: mail
          # "DN" (case sensitive) is a special attribute name. It indicates that
          # this value should be taken from the entity's DN not an attribute on
          # the entity.
          idAttr: DN
          emailAttr: mail
          nameAttr: cn
        groupSearch:
          baseDN: ou=Groups,dc=example,dc=org
          filter: '(objectClass=groupOfNames)'
          # A user is a member of a group when their DN matches
          # the value of a "member" attribute on the group entity.
          userAttr: DN
          groupAttr: member
          # The group name should be the "cn" value.
          nameAttr: cn
```
