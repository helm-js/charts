// Automatically generated

export interface ChartValues {
  gitlab?: {
    migrations?: {
      initialRootPassword?: {
        secret?: any
      }
    }
    sidekiq?: {
      minio?: any
    }
    unicorn?: {
      minio?: any
    }
  }
  global?: {
    application?: {
      create?: any
      links?: any
    }
    certificates?: {
      customCAs?: any
      image?: {
        repository?: any
        tag?: any
      }
    }
    gitaly?: {
      authToken?: {
        key?: any
        secret?: any
      }
    }
    hosts?: {
      domain?: any
      externalIP?: any
      gitlab?: {
        https?: any
        name?: any
      }
      hostSuffix?: any
      https?: any
      minio?: {
        https?: any
        name?: any
      }
    }
    imagePullPolicy?: any
    ingress?: {
      configureCertmanager?: any
      tls?: {
        secretName?: any
      }
    }
    initialRootPassword?: {
      key?: any
      secret?: any
    }
    minio?: {
      credentials?: {
        secret?: any
      }
    }
    psql?: {
      database?: any
      host?: any
      password?: {
        key?: any
        secret?: any
      }
      port?: any
      secretName?: any
      username?: any
    }
    railsSecrets?: {
      secret?: any
    }
    redis?: {
      password?: {
        key?: any
        secret?: any
      }
    }
    registry?: {
      certificate?: {
        secret?: any
      }
    }
    runner?: {
      registrationToken?: {
        secret?: any
      }
    }
    service?: {
      annotations?: any
    }
    shell?: {
      authToken?: {
        key?: any
        secret?: any
      }
      hostKeys?: {
        secret?: any
      }
    }
    workhorse?: {
      key?: any
      secret?: any
    }
  }
  image?: {
    pullPolicy?: any
  }
  ingress?: any
  init?: {
    resources?: any
  }
  minio?: any
  nameOverride?: any
  registry?: {
    minio?: any
    storage?: any
  }
  runners?: {
    cache?: {
      s3ServerAddress?: any
      secretName?: any
    }
  }
  service?: any
}

