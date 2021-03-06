// Automatically generated

export interface ChartValues {
  affinity?: any
  env?: {
    logLevel?: any
  }
  existingSecret?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  imagePullSecrets?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  livenessProbe?: any
  nameOverride?: any
  nodeSelector?: any
  podDisruptionBudget?: {
    enabled?: any
    maxUnavailable?: any
    minAvailable?: any
  }
  rbac?: {
    enabled?: any
  }
  readinessProbe?: any
  replicaCount?: any
  resources?: any
  scanPolicy?: {
    license?: {
      deployments?: any
      statefulSets?: any
    }
    security?: {
      deployments?: any
      statefulSets?: any
    }
    unscanned?: {
      deployments?: any
      statefulSets?: any
      whiltelistNamespaces?: any
    }
  }
  securityContext?: {
    enabled?: any
    kubeXrayGroupId?: any
    kubeXrayUserId?: any
  }
  service?: {
    externalTrafficPolicy?: any
    loadBalancerIP?: any
    port?: any
    type?: any
  }
  tolerations?: any
  xrayConfig?: any
}

