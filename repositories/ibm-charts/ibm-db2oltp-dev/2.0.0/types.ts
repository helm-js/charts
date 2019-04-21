// Automatically generated

export interface ChartValues {
  arch?: any
  dataVolume?: {
    existingClaimName?: any
    name?: any
    size?: any
    storageClassName?: any
  }
  db2inst?: {
    instname?: any
    password?: any
  }
  etcdVolume?: {
    name?: any
    size?: any
    storageClassName?: any
  }
  global?: {
    image?: {
      secretName?: any
    }
  }
  hadr?: {
    enabled?: any
    useDynamicProvisioning?: any
  }
  hadrVolume?: {
    existingClaimName?: any
    name?: any
    size?: any
    storageClassName?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  options?: {
    databaseName?: any
    oracleCompatibility?: any
  }
  persistence?: {
    enabled?: any
    useDynamicProvisioning?: any
  }
  resources?: any
  service?: {
    name?: any
    port?: any
    tsport?: any
    type?: any
  }
}

