// Automatically generated

export interface ChartValues {
  antiAffinity?: any
  auth?: {
    enabled?: any
    password?: any
    token?: any
    user?: any
  }
  client?: {
    service?: {
      annotations?: any
      loadBalancerIP?: any
      nodePort?: any
      port?: any
      type?: any
    }
  }
  cluster?: {
    service?: {
      annotations?: any
      loadBalancerIP?: any
      nodePort?: any
      port?: any
      type?: any
    }
  }
  clusterAuth?: {
    enabled?: any
    password?: any
    token?: any
    user?: any
  }
  debug?: {
    enabled?: any
    logtime?: any
    trace?: any
  }
  extraArgs?: any
  global?: {
    imagePullSecrets?: any
    imageRegistry?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    enabled?: any
    hosts?: any
    secrets?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  maxConnections?: any
  maxControlLine?: any
  maxPayload?: any
  metrics?: {
    args?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    podAnnotations?: any
    port?: any
    resources?: any
  }
  monitoring?: {
    service?: {
      annotations?: any
      loadBalancerIP?: any
      nodePort?: any
      port?: any
      type?: any
    }
  }
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  nodeSelector?: any
  podAnnotations?: any
  podLabels?: any
  priorityClassName?: any
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaCount?: any
  resources?: any
  schedulerName?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsUser?: any
  }
  sidecars?: any
  statefulset?: {
    rollingUpdatePartition?: any
    updateStrategy?: any
  }
  tolerations?: any
  writeDeadline?: any
}

