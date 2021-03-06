// Automatically generated

export interface ChartValues {
  autoscaling?: {
    enabled?: any
    maxReplicas?: any
    metrics?: {
      cpu?: {
        targetAverageUtilization?: any
      }
    }
    minReplicas?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: {
    initialDelaySeconds?: any
    periodSeconds?: any
  }
  nameOverride?: any
  service?: {
    port?: any
    type?: any
  }
}

