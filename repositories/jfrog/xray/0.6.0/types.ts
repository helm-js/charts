// Automatically generated

export interface ChartValues {
  analysis?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    name?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      type?: any
    }
    storage?: {
      sizeLimit?: any
    }
    tolerations?: any
  }
  common?: {
    masterKey?: any
    stdOutEnabled?: any
    xrayConfigPath?: any
    xrayGroupId?: any
    xrayUserId?: any
    xrayVersion?: any
  }
  fullnameOverride?: any
  global?: {
    mongoUrl?: any
    postgresqlUrl?: any
  }
  imagePullPolicy?: any
  imagePullSecrets?: any
  indexer?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    name?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      type?: any
    }
    storage?: {
      sizeLimit?: any
    }
    tolerations?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    tls?: any
  }
  initContainerImage?: any
  mongodb?: {
    enabled?: any
    mongodbDatabase?: any
    mongodbUsername?: any
  }
  nameOverride?: any
  persist?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    name?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    storage?: {
      sizeLimit?: any
    }
    tolerations?: any
  }
  postgresql?: {
    enabled?: any
    postgresDatabase?: any
    postgresUser?: any
    service?: {
      port?: any
    }
  }
  rbac?: {
    create?: any
    role?: {
      rules?: any
    }
  }
  server?: {
    affinity?: any
    externalPort?: any
    fullnameOverride?: any
    image?: any
    internalPort?: any
    loadBalancerSourceRanges?: any
    name?: any
    nodeSelector?: any
    replicaCount?: any
    resources?: any
    service?: {
      externalPort?: any
      type?: any
    }
    serviceName?: any
    storage?: {
      sizeLimit?: any
    }
    tolerations?: any
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

