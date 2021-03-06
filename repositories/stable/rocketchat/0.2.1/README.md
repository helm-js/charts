# `@helm-charts/stable-rocketchat`

Prepare to take off with the ultimate chat platform, experience the next level of team communications

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | rocketchat |
| Chart Version       | 0.2.1      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Rocket Chat image version
## ref: https://hub.docker.com/r/rocketchat/rocket.chat/tags
##
image:
  repository: rocketchat/rocket.chat
  tag: 0.73.2
  pullPolicy: IfNotPresent

## Host for the application
##
# host:

# Main RocketChat configuration:
config:
  SMTP_Host:
  SMTP_Port:
  SMTP_Username:
  SMTP_Password:
  From_Email:
  Jitsi_Enabled: false
  Jitsi_Domain: meet.jit.si
  Jitsi_URL_Room_Prefix: RocketChat
  Jitsi_Open_New_Window: false
  Jitsi_Enable_Channels: false
  Jitsi_Chrome_Extension:
  WebRTC_Enable_Channel: false
  WebRTC_Enable_Private: false
  WebRTC_Enable_Direct: false

##
## MongoDB chart configuration
##
mongodb:
  ## MongoDB admin password
  ### ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#setting-the-root-password-on-first-run
  ###
  ## mongodbRootPassword:
  #
  ## MongoDB custom user and database
  ## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#creating-a-user-and-database-on-first-run
  ##
  # mongodbUsername:
  # mongodbPassword:
  # mongodbDatabase:
  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true
    ## mongodb data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## rocketchat data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
# resources:
#   requests:
#     memory: 512Mi
#     cpu: 300m

securityContext:
  enabled: true
  runAsUser: 999
  fsGroup: 999

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true

  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

## Configure the ingress object to hook into existing infastructure
### ref : http://kubernetes.io/docs/user-guide/ingress/
###
ingress:
  enabled: false
  annotations:
    kubernetes.io/ingress.class: 'nginx'
  tls:
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

service:
  type: ClusterIP
```

</details>
