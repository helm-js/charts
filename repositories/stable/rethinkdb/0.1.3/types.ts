// Automatically generated

export interface ChartValues {
  cluster?: {
    persistentVolume?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      size?: any
    }
    podAnnotations?: any
    replicas?: any
    resources?: any
    rethinkCacheSize?: any
    service?: {
      annotations?: any
    }
    storageClass?: {
      enabled?: any
      parameters?: any
      provisioner?: any
    }
  }
  image?: {
    name?: any
    pullPolicy?: any
    tag?: any
  }
  nameOverride?: any
  ports?: {
    admin?: any
    cluster?: any
    driver?: any
  }
  proxy?: {
    driverTLS?: {
      cert?: any
      enabled?: any
      key?: any
    }
    podAnnotations?: any
    replicas?: any
    resources?: any
    service?: {
      clusterIP?: any
      externalIPs?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      type?: any
    }
    serviceAnnotations?: any
  }
  rbac?: {
    create?: any
  }
  rethinkdbPassword?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
}

