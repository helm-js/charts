// Automatically generated

export interface ChartValues {
  allowEmptyPassword?: any
  externalDatabase?: {
    database?: any
    host?: any
    password?: any
    user?: any
  }
  fullnameOverride?: any
  ghostBlogTitle?: any
  ghostEmail?: any
  ghostLoadBalancerIP?: any
  ghostPassword?: any
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
    enabled?: any
    mariadbDatabase?: any
    mariadbUser?: any
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

