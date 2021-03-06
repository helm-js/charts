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
  fullnameOverride?: any
  ghostBlogTitle?: any
  ghostEmail?: any
  ghostHost?: any
  ghostLoadBalancerIP?: any
  ghostPassword?: any
  ghostPath?: any
  ghostPort?: any
  ghostUsername?: any
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
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
  mariadb?: {
    db?: {
      name?: any
      user?: any
    }
    enabled?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  resources?: any
  serviceType?: any
  smtpHost?: any
  smtpPassword?: any
  smtpPort?: any
  smtpService?: any
  smtpUser?: any
  volumePermissions?: {
    image?: {
      name?: any
      pullPolicy?: any
      tag?: any
    }
  }
}

