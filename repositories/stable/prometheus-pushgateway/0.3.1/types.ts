// Automatically generated

export interface ChartValues {
  affinity?: any
  extraArgs?: any
  extraVars?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  podLabels?: any
  replicaCount?: any
  resources?: any
  service?: {
    port?: any
    targetPort?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  serviceAccountLabels?: any
  serviceLabels?: any
  serviceMonitor?: {
    enabled?: any
    honorLabels?: any
    interval?: any
    namespace?: any
    selector?: any
  }
  tolerations?: any
}

