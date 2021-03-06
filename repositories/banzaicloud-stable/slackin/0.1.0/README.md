# `@helm-charts/banzaicloud-stable-slackin`

A Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | slackin            |
| Chart Version       | 0.1.0              |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for slackin.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

slackinCoc: ''
#A URL to a Code of Conduct people must agree on before joining.

slackinChannels: ''
#For single channel mode
#channel,channel,...

slackinHostname: '0.0.0.0'
#Hostname to listen on

slackinCSS: ''
#Skackin Site CSS

slackinTheme: 'dark'
#Color scheme to use, light or dark

slackApiToken: ''
#"A Slack API token (find it on https://api.slack.com/web)

googleCaptchaSecret: ''
#Google captcha secret key

googleCaptchaSiteKey: ''
#Google captcha site key

slackinPort: 3000
#Slackin App Port Defaul 3000

slackSubdomain: ''
#Your Slack's subdomain (**this**.slack.com)

replicaCount: 1

image:
  repository: banzaicloud/slackin-extended
  tag: 0.13.2
  pullPolicy: IfNotPresent

nameOverride: ''
fullnameOverride: ''

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

</details>
