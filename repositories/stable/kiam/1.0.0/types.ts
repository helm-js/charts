// Automatically generated

export interface ChartValues {
  agent?: {
    dnsPolicy?: any
    enabled?: any
    extraArgs?: any
    extraEnv?: any
    extraHostPathMounts?: any
    fullnameOverride?: any
    gatewayTimeoutCreation?: any
    host?: {
      interface?: any
      iptables?: any
      port?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    log?: {
      jsonOutput?: any
      level?: any
    }
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    prometheus?: {
      port?: any
      syncInterval?: any
    }
    resources?: any
    tlsFiles?: any
    tolerations?: any
    updateStrategy?: any
  }
  fullnameOverride?: any
  nameOverride?: any
  rbac?: {
    create?: any
  }
  server?: {
    assumeRoleArn?: any
    cache?: {
      syncInterval?: any
    }
    enabled?: any
    extraArgs?: any
    extraEnv?: any
    extraHostPathMounts?: any
    fullnameOverride?: any
    gatewayTimeoutCreation?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    log?: {
      jsonOutput?: any
      level?: any
    }
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    prometheus?: {
      port?: any
      syncInterval?: any
    }
    resources?: any
    roleBaseArn?: any
    service?: {
      port?: any
      targetPort?: any
    }
    sessionDuration?: any
    tlsFiles?: any
    tolerations?: any
    updateStrategy?: any
  }
  serviceAccounts?: {
    agent?: {
      create?: any
      name?: any
    }
    server?: {
      create?: any
      name?: any
    }
  }
}

