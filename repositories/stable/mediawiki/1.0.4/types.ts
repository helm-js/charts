// Automatically generated

export interface ChartValues {
  allowEmptyPassword?: any
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    port?: any
    user?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  mariadb?: {
    enabled?: any
    mariadbDatabase?: any
    mariadbUser?: any
  }
  mediawikiEmail?: any
  mediawikiName?: any
  mediawikiPassword?: any
  mediawikiUser?: any
  nameOverride?: any
  persistence?: {
    apache?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
    enabled?: any
    mediawiki?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  resources?: any
  serviceLoadBalancerIP?: any
  serviceType?: any
  smtpHost?: any
  smtpHostID?: any
  smtpPassword?: any
  smtpPort?: any
  smtpUser?: any
}

