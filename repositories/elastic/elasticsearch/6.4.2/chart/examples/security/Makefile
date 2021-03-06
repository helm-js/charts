
default: test

RELEASE := helm-es-security

install:
	# This starts a command in the background to install the license once the cluster has formed
	until kubectl exec -ti $$(kubectl get pods -l release=$(RELEASE) -o name | awk -F'/' '{ print $$NF }' | shuf -n 1) -- curl --fail -XPUT 'http://localhost:9200/_xpack/license' -H "Content-Type: application/json" -d @/usr/share/elasticsearch/config/license/license.json > /dev/null 2>&1 ; do sleep 5; done & \
	helm upgrade --wait --timeout=600 --install --values ./security.yml $(RELEASE) ../../ ; \
	
purge:
	helm del --purge $(RELEASE)

license:
	kubectl exec -ti $$(kubectl get pods -l release=$(RELEASE) -o name | awk -F'/' '{ print $$NF }' | shuf -n 1) -- curl --fail -XPUT 'http://localhost:9200/_xpack/license' -H "Content-Type: application/json" -d @/usr/share/elasticsearch/config/license/license.json

health:
	kubectl exec -ti $$(kubectl get pods -l release=$(RELEASE) -o name | awk -F'/' '{ print $$NF }' | shuf -n 1) -- curl --fail -u elastic:changeme 'http://localhost:9200/'
	kubectl exec -ti $$(kubectl get pods -l release=$(RELEASE) -o name | awk -F'/' '{ print $$NF }' | shuf -n 1) -- curl --fail -u elastic:changeme 'http://localhost:9200/_xpack/license' | grep platinum
	
test: secrets install health

secrets:
	kubectl delete secrets elastic-credentials elastic-license elastic-certificates || true && \
	vault read -field=value secret/devops-ci/helm-charts/elasticsearch/security/license > license.json && \
	vault read -field=value secret/devops-ci/helm-charts/elasticsearch/security/certificates | base64 --decode > elastic-certificates.p12 && \
	kubectl create secret generic elastic-credentials  --from-literal=password=changeme --from-literal=username=elastic && \
	kubectl create secret generic elastic-license --from-file=license.json && \
	kubectl create secret generic elastic-certificates --from-file=elastic-certificates.p12 && \
	rm -f license.json elastic-certificates.p12
