// Automatically generated

export interface ChartValues {
  concourse?: {
    web?: {
      auth?: {
        cf?: {
          apiUrl?: any
          enabled?: any
          skipSslValidation?: any
          useCaCert?: any
        }
        cookieSecure?: any
        duration?: any
        github?: {
          enabled?: any
          host?: any
          useCaCert?: any
        }
        gitlab?: {
          enabled?: any
          host?: any
        }
        ldap?: {
          bindDn?: any
          bindPw?: any
          displayName?: any
          enabled?: any
          groupSearchBaseDn?: any
          groupSearchFilter?: any
          groupSearchGroupAttr?: any
          groupSearchNameAttr?: any
          groupSearchScope?: any
          groupSearchUserAttr?: any
          host?: any
          insecureNoSsl?: any
          insecureSkipVerify?: any
          startTls?: any
          useCaCert?: any
          userSearchBaseDn?: any
          userSearchEmailAttr?: any
          userSearchFilter?: any
          userSearchIdAttr?: any
          userSearchNameAttr?: any
          userSearchScope?: any
          userSearchUsername?: any
        }
        mainTeam?: {
          allowAllUsers?: any
          cf?: {
            org?: any
            space?: any
            spaceGuid?: any
            user?: any
          }
          github?: {
            org?: any
            team?: any
            user?: any
          }
          gitlab?: {
            group?: any
            user?: any
          }
          ldap?: {
            group?: any
            user?: any
          }
          localUser?: any
          oauth?: {
            group?: any
            user?: any
          }
          oidc?: {
            group?: any
            user?: any
          }
        }
        oauth?: {
          authUrl?: any
          displayName?: any
          enabled?: any
          groupsKey?: any
          scope?: any
          skipSslValidation?: any
          tokenUrl?: any
          useCaCert?: any
          userinfoUrl?: any
        }
        oidc?: {
          displayName?: any
          enabled?: any
          groupsKey?: any
          hostedDomains?: any
          issuer?: any
          scope?: any
          skipSslValidation?: any
          useCaCert?: any
        }
      }
      awsSecretsManager?: {
        enabled?: any
        pipelineSecretTemplate?: any
        region?: any
        teamSecretTemplate?: any
      }
      awsSsm?: {
        enabled?: any
        pipelineSecretTemplate?: any
        region?: any
        teamSecretTemplate?: any
      }
      baggageclaimResponseHeaderTimeout?: any
      bindIp?: any
      bindPort?: any
      buildTrackerInterval?: any
      cliArtifactsDir?: any
      containerPlacementStrategy?: any
      datadog?: {
        agentHost?: any
        agentHostUseHostIP?: any
        agentPort?: any
        enabled?: any
        prefix?: any
      }
      debugBindIp?: any
      debugBindPort?: any
      defaultBuildLogsToRetain?: any
      defaultTaskCpuLimit?: any
      defaultTaskMemoryLimit?: any
      emitToLogs?: any
      encryption?: {
        enabled?: any
      }
      externalUrl?: any
      gc?: {
        interval?: any
        oneOffGracePeriod?: any
        overrideDefaults?: any
      }
      globalResourceCheckTimeout?: any
      influxdb?: {
        database?: any
        enabled?: any
        insecureSkipVerify?: any
        url?: any
        username?: any
      }
      interceptIdleTimeout?: any
      kubernetes?: {
        configPath?: any
        enabled?: any
        keepNamespaces?: any
        namespacePrefix?: any
        teams?: any
      }
      localAuth?: {
        enabled?: any
      }
      logDbQueries?: any
      logLevel?: any
      maxBuildLogsToRetain?: any
      metrics?: {
        attribute?: any
        hostName?: any
      }
      newrelic?: {
        accountId?: any
        apiKey?: any
        enabled?: any
        servicePrefix?: any
      }
      noop?: any
      peerUrl?: any
      postgres?: {
        connectTimeout?: any
        database?: any
        host?: any
        port?: any
        socket?: any
        sslmode?: any
      }
      prometheus?: {
        bindIp?: any
        bindPort?: any
        enabled?: any
      }
      resourceCheckingInterval?: any
      resourceTypeCheckingInterval?: any
      riemann?: {
        enabled?: any
        host?: any
        port?: any
        servicePrefix?: any
        tag?: any
      }
      staticWorker?: {
        baggageclaimUrl?: any
        enabled?: any
        gardenUrl?: any
        resource?: any
      }
      syslog?: {
        address?: any
        drainInterval?: any
        enabled?: any
        hostname?: any
        transport?: any
        useCaCert?: any
      }
      tls?: {
        bindPort?: any
        enabled?: any
      }
      tsa?: {
        atcUrl?: any
        bindDebugPort?: any
        bindIp?: any
        bindPort?: any
        heartbeatInterval?: any
        logLevel?: any
        peerIp?: any
        sessionSigningKey?: any
        teamAuthorizedKeys?: any
      }
      vault?: {
        authBackend?: any
        authBackendMaxTtl?: any
        caPath?: any
        cache?: any
        enabled?: any
        insecureSkipVerify?: any
        maxLease?: any
        pathPrefix?: any
        retryInitial?: any
        retryMax?: any
        serverName?: any
        url?: any
        useCaCert?: any
      }
      xFrameOptions?: any
    }
    worker?: {
      baggageclaim?: {
        bindDebugPort?: any
        bindIp?: any
        bindPort?: any
        btrfsBin?: any
        driver?: any
        logLevel?: any
        mkfsBin?: any
        overlaysDir?: any
        reapInterval?: any
        volumes?: any
      }
      bindDebugPort?: any
      bindIp?: any
      bindPort?: any
      certsDir?: any
      ephemeral?: any
      garden?: {
        additionalDnsServer?: any
        additionalHostEntry?: any
        allowHostAccess?: any
        apparmor?: any
        assetsDir?: any
        bindIp?: any
        bindPort?: any
        bindSocket?: any
        cleanupProcessDirsOnWait?: any
        consoleSocketsPath?: any
        containerdSocket?: any
        cpuQuotaPerShare?: any
        dadooBin?: any
        debugBindIp?: any
        debugBindPort?: any
        defaultContainerBlockioWeight?: any
        defaultGraceTime?: any
        defaultRootfs?: any
        denyNetwork?: any
        depot?: any
        destroyContainersOnStartup?: any
        disablePrivilegedContainers?: any
        disableSwapLimit?: any
        dnsProxyEnable?: any
        dnsServer?: any
        dockerRegistry?: any
        dropsondeDestination?: any
        dropsondeOrigin?: any
        externalIp?: any
        gidMapLength?: any
        gidMapStart?: any
        graph?: any
        graphCleanupThresholdInMegabytes?: any
        imagePlugin?: any
        imagePluginExtraArg?: any
        initBin?: any
        insecureDockerRegistry?: any
        iptablesBin?: any
        iptablesRestoreBin?: any
        logLevel?: any
        maxContainers?: any
        metricsEmissionInterval?: any
        mtu?: any
        networkPlugin?: any
        networkPluginExtraArg?: any
        networkPool?: any
        nstarBin?: any
        persistentImage?: any
        portPoolPropertiesPath?: any
        portPoolSize?: any
        portPoolStart?: any
        privilegedImagePlugin?: any
        privilegedImagePluginExtraArg?: any
        propertiesPath?: any
        runtimePlugin?: any
        runtimePluginExtraArg?: any
        skipSetup?: any
        tarBin?: any
        tcpMemoryLimit?: any
        timeFormat?: any
        uidMapLength?: any
        uidMapStart?: any
        useContainerdForProcesses?: any
      }
      http_proxy?: any
      https_proxy?: any
      logLevel?: any
      name?: any
      no_proxy?: any
      peerIp?: any
      tag?: any
      team?: any
      workDir?: any
    }
    workingDirectory?: any
  }
  image?: any
  imageDigest?: any
  imagePullPolicy?: any
  imagePullSecrets?: any
  imageTag?: any
  nameOverride?: any
  persistence?: {
    enabled?: any
    worker?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  postgresql?: {
    enabled?: any
    nameOverride?: any
    postgresDatabase?: any
    postgresUser?: any
  }
  rbac?: {
    apiVersion?: any
    create?: any
    webServiceAccountName?: any
    workerServiceAccountName?: any
  }
  secrets?: {
    awsSecretsManagerSessionToken?: any
    awsSecretsmanagerAccessKey?: any
    awsSecretsmanagerSecretKey?: any
    awsSecretsmanagerSessionToken?: any
    awsSsmAccessKey?: any
    awsSsmSecretKey?: any
    awsSsmSessionToken?: any
    cfCaCert?: any
    create?: any
    githubCaCert?: any
    hostKey?: any
    hostKeyPub?: any
    influxdbPassword?: any
    ldapCaCert?: any
    localUsers?: any
    oauthCaCert?: any
    oidcCaCert?: any
    oldEncryptionKey?: any
    postgresCaCert?: any
    postgresClientCert?: any
    postgresClientKey?: any
    sessionSigningKey?: any
    syslogCaCert?: any
    vaultAuthParam?: any
    vaultCaCert?: any
    vaultClientCert?: any
    vaultClientKey?: any
    vaultClientToken?: any
    workerKey?: any
    workerKeyPub?: any
  }
  web?: {
    additionalAffinities?: any
    annotations?: any
    authSecretsPath?: any
    env?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    keySecretsPath?: any
    livenessProbe?: any
    nameOverride?: any
    nodeSelector?: any
    postgresqlSecretsPath?: any
    readinessProbe?: any
    replicas?: any
    resources?: any
    service?: {
      annotations?: any
      atcNodePort?: any
      atcTlsNodePort?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      tsaNodePort?: any
      type?: any
    }
    syslogSecretsPath?: any
    tlsSecretsPath?: any
    tolerations?: any
    vaultSecretsPath?: any
  }
  worker?: {
    additionalAffinities?: any
    additionalVolumeMounts?: any
    additionalVolumes?: any
    annotations?: any
    emptyDirSize?: any
    env?: any
    fatalErrors?: any
    hardAntiAffinity?: any
    keySecretsPath?: any
    minAvailable?: any
    nameOverride?: any
    nodeSelector?: any
    podManagementPolicy?: any
    replicas?: any
    resources?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
    updateStrategy?: any
  }
}

