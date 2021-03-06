// Automatically generated

export interface ChartValues {
  affinity?: any
  deployment?: {
    annotations?: any
    labels?: any
    matchlabes?: any
  }
  env?: {
    field?: any
    open?: {
      CONTEXT_PATH?: any
      STORAGE?: any
    }
    secret?: {
      GOOGLE_CREDENTIALS_JSON?: any
    }
  }
  fullnameOverride?: any
  fullnamePrefix?: any
  fullnameSuffix?: any
  gcp?: {
    secret?: {
      enabled?: any
      key?: any
      name?: any
    }
  }
  global?: {
    fullnamePrefix?: any
    fullnameSuffix?: any
    namePrefix?: any
    nameSuffix?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    labels?: any
    tls?: any
  }
  nameOverride?: any
  namePrefix?: any
  nameSuffix?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    labels?: any
    pv?: {
      accessMode?: any
      capacity?: {
        storage?: any
      }
      enabled?: any
      nfs?: {
        path?: any
        server?: any
      }
      pvname?: any
    }
    size?: any
    storageClass?: any
    volumeName?: any
  }
  probes?: {
    liveness?: any
    readiness?: any
  }
  replica?: {
    annotations?: any
  }
  replicaCount?: any
  resources?: any
  securityContext?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalPort?: any
    labels?: any
    nodePort?: any
    servicename?: any
    type?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
  strategy?: any
  tolerations?: any
}

