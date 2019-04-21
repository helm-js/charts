// Automatically generated

export interface ChartValues {
  alertmanager?: {
    affinity?: any
    baseURL?: any
    configMapOverrideName?: any
    enabled?: any
    extraArgs?: any
    extraEnv?: any
    fullnameOverride?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      extraLabels?: any
      hosts?: any
      tls?: any
    }
    name?: any
    nodeSelector?: any
    persistentVolume?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
      subPath?: any
    }
    podAnnotations?: any
    prefixURL?: any
    priorityClassName?: any
    replicaCount?: any
    resources?: any
    schedulerName?: any
    securityContext?: any
    service?: {
      annotations?: any
      clusterIP?: any
      enableMeshPeer?: any
      externalIPs?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      servicePort?: any
      type?: any
    }
    tolerations?: any
  }
  alertmanagerFiles?: any
  configmapReload?: {
    extraArgs?: any
    extraConfigmapMounts?: any
    extraVolumeDirs?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    resources?: any
  }
  extraScrapeConfigs?: any
  fullnameOverride?: any
  initChownData?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    resources?: any
  }
  kubeStateMetrics?: {
    affinity?: any
    args?: any
    deploymentAnnotations?: any
    enabled?: any
    fullnameOverride?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    pod?: {
      labels?: any
    }
    podAnnotations?: any
    priorityClassName?: any
    replicaCount?: any
    resources?: any
    securityContext?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      servicePort?: any
      type?: any
    }
    tolerations?: any
  }
  nameOverride?: any
  networkPolicy?: {
    enabled?: any
  }
  nodeExporter?: {
    deploymentAnnotations?: any
    enabled?: any
    extraArgs?: any
    extraConfigmapMounts?: any
    extraHostPathMounts?: any
    fullnameOverride?: any
    hostNetwork?: any
    hostPID?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    name?: any
    nodeSelector?: any
    pod?: {
      labels?: any
    }
    podAnnotations?: any
    podSecurityPolicy?: {
      annotations?: any
      enabled?: any
    }
    priorityClassName?: any
    resources?: any
    securityContext?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      hostPort?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      servicePort?: any
      type?: any
    }
    tolerations?: any
    updateStrategy?: any
  }
  pushgateway?: {
    affinity?: any
    enabled?: any
    extraArgs?: any
    fullnameOverride?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    priorityClassName?: any
    replicaCount?: any
    resources?: any
    securityContext?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      servicePort?: any
      type?: any
    }
    tolerations?: any
  }
  rbac?: {
    create?: any
  }
  server?: {
    affinity?: any
    baseURL?: any
    configMapOverrideName?: any
    deploymentAnnotations?: any
    enableAdminApi?: any
    extraArgs?: any
    extraConfigmapMounts?: any
    extraHostPathMounts?: any
    extraSecretMounts?: any
    fullnameOverride?: any
    global?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      extraLabels?: any
      hosts?: any
      tls?: any
    }
    name?: any
    nodeSelector?: any
    persistentVolume?: {
      accessModes?: any
      annotations?: any
      enabled?: any
      existingClaim?: any
      mountPath?: any
      size?: any
      storageClass?: any
      subPath?: any
    }
    podAnnotations?: any
    prefixURL?: any
    priorityClassName?: any
    replicaCount?: any
    resources?: any
    retention?: any
    schedulerName?: any
    securityContext?: any
    service?: {
      annotations?: any
      clusterIP?: any
      externalIPs?: any
      labels?: any
      loadBalancerIP?: any
      loadBalancerSourceRanges?: any
      nodePort?: any
      servicePort?: any
      type?: any
    }
    strategy?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
  }
  serverFiles?: any
  serviceAccounts?: {
    alertmanager?: {
      create?: any
      name?: any
    }
    kubeStateMetrics?: {
      create?: any
      name?: any
    }
    nodeExporter?: {
      create?: any
      name?: any
    }
    pushgateway?: {
      create?: any
      name?: any
    }
    server?: {
      create?: any
      name?: any
    }
  }
  thanosSidecar?: {
    cluster?: {
      address?: any
      peers?: any
      port?: any
    }
    enabled?: any
    grpc?: {
      address?: any
      port?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    logLevel?: any
    name?: any
    objstore?: {
      configFile?: any
      configSecretName?: any
      provider?: any
      secretName?: any
    }
    resources?: any
  }
}

