// Automatically generated

export interface ChartValues {
  image?: {
    name?: any
    pullPolicy?: any
    tag?: any
  }
  nameOverride?: any
  persistence?: {
    enabled?: any
    hostPath?: any
  }
  podAnnotations?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  resources?: any
  sumologic?: {
    collectorUrl?: any
    excludeContainerRegex?: any
    excludeFacilityRegex?: any
    excludeHostRegex?: any
    excludeNamespaceRegex?: any
    excludePath?: any
    excludePodRegex?: any
    excludePriorityRegex?: any
    excludeUnitRegex?: any
    fluentdOpt?: any
    fluentdSource?: any
    flushInterval?: any
    kubernetesMeta?: any
    logFormat?: any
    numThreads?: any
    sourceCategory?: any
    sourceCategoryPrefix?: any
    sourceCategoryReplaceDash?: any
    sourceName?: any
    verifySsl?: any
  }
  tolerations?: any
  updateStrategy?: any
}

