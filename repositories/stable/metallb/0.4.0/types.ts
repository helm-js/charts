// Automatically generated

export interface ChartValues {
  configInline?: any
  controller?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
  existingConfigMap?: any
  fullnameOverride?: any
  nameOverride?: any
  prometheus?: {
    scrapeAnnotations?: any
  }
  rbac?: {
    create?: any
  }
  serviceAccounts?: {
    controller?: {
      create?: any
      name?: any
    }
    speaker?: {
      create?: any
      name?: any
    }
  }
  speaker?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
  }
}

