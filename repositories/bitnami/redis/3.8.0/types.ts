// Automatically generated

export interface ChartValues {
  cluster?: {
    enabled?: any
    slaveCount?: any
  }
  configmap?: any
  existingSecret?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  master?: {
    affinity?: any
    args?: any
    disableCommands?: any
    extraFlags?: any
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
      path?: any
      size?: any
      storageClass?: any
      subPath?: any
    }
    podAnnotations?: any
    podLabels?: any
    port?: any
    readinessProbe?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
      successThreshold?: any
      timeoutSeconds?: any
    }
    resources?: any
    schedulerName?: any
    securityContext?: {
      enabled?: any
      fsGroup?: any
      runAsUser?: any
    }
    service?: {
      annotations?: any
      loadBalancerIP?: any
      nodePort?: any
      type?: any
    }
    statefulset?: {
      rollingUpdatePartition?: any
      updateStrategy?: any
    }
    tolerations?: any
  }
  metrics?: {
    enabled?: any
    extraArgs?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    resources?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      type?: any
    }
    tolerations?: any
  }
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  password?: any
  persistence?: {
    existingClaim?: any
  }
  rbac?: {
    create?: any
    role?: {
      rules?: any
    }
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  slave?: {
    affinity?: any
    args?: any
    disableCommands?: any
    extraFlags?: any
    livenessProbe?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    port?: any
    readinessProbe?: any
    resources?: any
    schedulerName?: any
    securityContext?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      type?: any
    }
    tolerations?: any
  }
  usePassword?: any
}

