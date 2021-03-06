# `@helm-charts/stable-rocketchat`

Prepare to take off with the ultimate chat platform, experience the next level of team communications

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | rocketchat |
| Chart Version       | 0.1.2      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Rocket Chat image version
## ref: https://hub.docker.com/r/library/rocket.chat/tags/
##
image: rocket.chat:0.56

## Specify a imagePullPolicy
## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

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

## Configure the ingress object to hook into existing infastructure
### ref : http://kubernetes.io/docs/user-guide/ingress/
###
ingress:
  enabled: false
  tls: false
  annotations:
    kubernetes.io/ingress.class: 'nginx'
```

</details>
