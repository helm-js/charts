// Automatically generated

export interface ChartValues {
  affinity?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  postgresql?: {
    install?: any
    nameOverride?: any
    postgresDatabase?: any
    postgresPassword?: any
    postgresUser?: any
  }
  resources?: any
  securityContext?: any
  service?: {
    annotations?: any
    gogs?: {
      appName?: any
      cacheAdapter?: any
      cacheHost?: any
      cacheInterval?: any
      cronCheckRepoStatsRunAtStart?: any
      cronCheckRepoStatsSchedule?: any
      cronEnabled?: any
      cronRepoArchiveCleanupOlderThan?: any
      cronRepoArchiveCleanupRunAtStart?: any
      cronRepoArchiveCleanupSchedule?: any
      cronRepoHealthCheckArgs?: any
      cronRepoHealthCheckSchedule?: any
      cronRepoHealthCheckTimeout?: any
      cronRunAtStart?: any
      cronUpdateMirrorsSchedule?: any
      databaseHost?: any
      databaseName?: any
      databasePassword?: any
      databaseType?: any
      databaseUser?: any
      installLock?: any
      logLevel?: any
      logMode?: any
      mailerEnabled?: any
      mailerFrom?: any
      mailerHost?: any
      mailerPasswd?: any
      mailerSkipVerify?: any
      mailerSubjectPrefix?: any
      mailerUser?: any
      otherShowFooterBranding?: any
      otherShowFooterTemplateLoadTime?: any
      otherShowFooterVersion?: any
      repositoryUploadAllowedTypes?: any
      repositoryUploadEnabled?: any
      repositoryUploadMaxFileSize?: any
      repositoryUploadMaxFiles?: any
      runMode?: any
      securitySecretKey?: any
      serverDomain?: any
      serverLandingPage?: any
      serverRootUrl?: any
      serviceDisableRegistration?: any
      serviceEnableCaptcha?: any
      serviceEnableNotifyMail?: any
      serviceRegisterEmailConfirm?: any
      serviceRequireSignInView?: any
      uiExplorePagingNum?: any
      uiFeedMaxCommitNum?: any
      uiIssuePagingNum?: any
      webhookDeliverTimeout?: any
      webhookPagingNum?: any
      webhookQueueLength?: any
      webhookSkipTlsVerify?: any
    }
    httpNodePort?: any
    httpPort?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    nameOverride?: any
    sshDomain?: any
    sshNodePort?: any
    sshPort?: any
  }
  serviceType?: any
  tolerations?: any
}

