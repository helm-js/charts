// Automatically generated

export interface ChartValues {
  affinity?: any
  allowEmptyPassword?: any
  allowOverrideNone?: any
  customHTAccessCM?: any
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    port?: any
    user?: any
  }
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
  }
  healthcheckHttps?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    certManager?: any
    enabled?: any
    hosts?: any
    secrets?: any
  }
  livenessProbe?: any
  livenessProbeHeaders?: any
  mariadb?: {
    db?: {
      name?: any
      user?: any
    }
    enabled?: any
  }
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
    resources?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  readinessProbe?: any
  readinessProbeHeaders?: any
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    externalTrafficPolicy?: any
    extraPorts?: any
    httpsPort?: any
    nodePorts?: {
      http?: any
      https?: any
    }
    port?: any
    type?: any
  }
  sidecars?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpProtocol?: any
  smtpUser?: any
  smtpUsername?: any
  tolerations?: any
  wordpressBlogName?: any
  wordpressEmail?: any
  wordpressFirstName?: any
  wordpressLastName?: any
  wordpressPassword?: any
  wordpressSkipInstall?: any
  wordpressTablePrefix?: any
  wordpressUsername?: any
}

