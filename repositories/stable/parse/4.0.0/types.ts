// Automatically generated

export interface ChartValues {
  dashboard?: {
    appName?: any
    enabled?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    password?: any
    resources?: any
    username?: any
  }
  global?: {
    imageRegistry?: any
  }
  image?: {
    registry?: any
    repository?: any
    tag?: any
  }
  loadBalancerIP?: any
  mongodb?: {
    usePassword?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  server?: {
    appId?: any
    host?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    masterKey?: any
    mountPath?: any
    port?: any
    resources?: any
  }
  serviceType?: any
}

