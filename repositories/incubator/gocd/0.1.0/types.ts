// Automatically generated

export interface ChartValues {
  agent?: {
    env?: {
      agentAutoRegisterEnvironemnts?: any
      agentAutoRegisterHostname?: any
      agentAutoRegisterKey?: any
      agentAutoRegisterResources?: any
      goAgentBootstrapperArgs?: any
      goAgentBootstrapperJvmArgs?: any
      goAgentSystemProperties?: any
      goServerUrl?: any
    }
    goServerUrl?: any
    healthCheck?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      pvSelector?: any
      size?: any
      storageClass?: any
      subpath?: {
        dockerEntryPoint?: any
        homego?: any
      }
    }
    replicaCount?: any
  }
  nameOverride?: any
  nodeSelector?: any
  server?: {
    enabled?: any
    env?: {
      extraEnvVars?: any
      goServerSystemProperties?: any
    }
    healthCheck?: {
      initialDelaySeconds?: any
      periodSeconds?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
    }
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      pvSelector?: any
      size?: any
      storageClass?: any
      subpath?: {
        dockerEntryPoint?: any
        godata?: any
        homego?: any
      }
    }
    resources?: any
    service?: {
      externalPort?: any
      httpPort?: any
      httpsPort?: any
      nodeHttpPort?: any
      nodeHttpsPort?: any
      type?: any
    }
  }
}

