// Automatically generated

export interface ChartValues {
  cluster?: {
    memberCount?: any
  }
  customVolume?: any
  fullnameOverride?: any
  gracefulShutdown?: {
    enabled?: any
    maxWaitSeconds?: any
  }
  hazelcast?: {
    configurationFiles?: any
    javaOpts?: any
    licenseKey?: any
    licenseKeySecretName?: any
    rest?: any
    ssl?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  mancenter?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      repository?: any
      tag?: any
    }
    javaOpts?: any
    licenseKey?: any
    licenseKeySecretName?: any
    livenessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    nodeSelector?: any
    persistence?: {
      accessModes?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClass?: any
    }
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    resources?: any
    secretsMountName?: any
    service?: {
      clusterIP?: any
      port?: any
      type?: any
    }
    ssl?: any
  }
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    create?: any
  }
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  resources?: any
  secretsMountName?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  service?: {
    clusterIP?: any
    port?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

