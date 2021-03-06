{{- define "gitlab-runner.runner-env-vars" }}
- name: CI_SERVER_URL
  value: {{ template "gitlab-runner.gitlabUrl" . }}
- name: CLONE_URL
  value: {{ default "" .Values.runners.cloneUrl | quote }}
- name: REGISTER_LOCKED
  value: {{ .Values.runners.locked | quote | default "\"true\"" }}
- name: KUBERNETES_IMAGE
  value: {{ .Values.runners.image | quote }}
{{ if .Values.runners.privileged }}
- name: KUBERNETES_PRIVILEGED
  value: "true"
{{ end }}
- name: KUBERNETES_NAMESPACE
  value: {{ default .Release.Namespace .Values.runners.namespace | quote }}
- name: KUBERNETES_CPU_LIMIT
  value: {{ default "" .Values.runners.builds.cpuLimit | quote }}
- name: KUBERNETES_MEMORY_LIMIT
  value: {{ default "" .Values.runners.builds.memoryLimit | quote }}
- name: KUBERNETES_CPU_REQUEST
  value: {{ default "" .Values.runners.builds.cpuRequests | quote }}
- name: KUBERNETES_MEMORY_REQUEST
  value: {{ default "" .Values.runners.builds.memoryRequests| quote }}
- name: KUBERNETES_SERVICE_ACCOUNT
  value: {{ default "" .Values.runners.serviceAccountName | quote }}
- name: KUBERNETES_SERVICE_CPU_LIMIT
  value: {{ default "" .Values.runners.services.cpuLimit | quote }}
- name: KUBERNETES_SERVICE_MEMORY_LIMIT
  value: {{ default "" .Values.runners.services.memoryLimit | quote }}
- name: KUBERNETES_SERVICE_CPU_REQUEST
  value: {{ default "" .Values.runners.services.cpuRequests | quote }}
- name: KUBERNETES_SERVICE_MEMORY_REQUEST
  value: {{ default "" .Values.runners.services.memoryRequests | quote }}
- name: KUBERNETES_HELPER_CPU_LIMIT
  value: {{ default "" .Values.runners.helpers.cpuLimit | quote }}
- name: KUBERNETES_HELPER_MEMORY_LIMIT
  value: {{ default "" .Values.runners.helpers.memoryLimit | quote }}
- name: KUBERNETES_HELPER_CPU_REQUEST
  value: {{ default "" .Values.runners.helpers.cpuRequests | quote }}
- name: KUBERNETES_HELPER_MEMORY_REQUEST
  value: {{ default "" .Values.runners.helpers.memoryRequests | quote }}
- name: KUBERNETES_PULL_POLICY
  value: {{ default "" .Values.runners.imagePullPolicy | quote }}
{{- if .Values.runners.cache -}}
{{ include "gitlab-runner.cache_s3" . }}
{{- end }}
{{- end }}
