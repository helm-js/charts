// Automatically generated

export interface ChartValues {
  cron?: {
    replicacount?: any
    resources?: any
  }
  email?: {
    host?: any
    password?: any
    port?: any
    user?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    tls?: any
  }
  nameOverride?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    filestore_dir?: any
    size?: any
    storageClass?: any
  }
  postgresDatabase?: any
  postgresUser?: any
  sentrySecret?: any
  service?: {
    externalPort?: any
    internalPort?: any
    name?: any
    type?: any
  }
  smtpHost?: any
  smtpPort?: any
  smtpUser?: any
  user?: {
    email?: any
  }
  web?: {
    replicacount?: any
    resources?: any
  }
  worker?: {
    replicacount?: any
    resources?: any
  }
}

