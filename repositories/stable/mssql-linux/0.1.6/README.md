# `@helm-charts/stable-mssql-linux`

SQL Server 2017 Linux Helm Chart

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | mssql-linux |
| Chart Version       | 0.1.6       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
acceptEula:
  value: 'n'
edition:
  value: Express
# Override sapassword in templates/secret.yaml
# sapassword: "MyStrongPassword1234"
image:
  repository: microsoft/mssql-server-linux
  tag: 2017-CU3
  pullPolicy: IfNotPresent
service:
  type: ClusterIP
livenessprobe:
  initialDelaySeconds: 15
  periodSeconds: 20
readinessprobe:
  initialDelaySeconds: 5
  periodSeconds: 10
resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 2Gi
  # requests:
  #  cpu: 100m
  #  memory: 2Gi
nodeSelector: {}
```

</details>

---

# HELM Chart for Microsoft SQL Server 2017 on Linux

## Prerequisites

- This chart requires Docker Engine 1.8+ in any of their supported platforms. Please see vendor requirements [here for more information](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker).
- At least 2GB of RAM (3.25 GB prior to 2017-CU2). Make sure to assign enough memory to the Docker VM if you're running on Docker for Mac or Windows.
- Requires the following variables
  - You must change the acceptEula.value in the values.yaml file to `Y` or include `--set acceptEula.value=Y` in the command line of `helm install` to override the default value of `N`.
  - You must change the editions variable in the values.yaml file to include the edition of SQL Server or include `--set edition.value=<your_product_id | edition_name>` in the command line of `helm install`.

## Chart Components

- Creates a SQL Server 2017 deployment (default edition: Express)
- Creates a Kubernetes Service on specified port (default: 1433)
- Creates a Secert to hold SA_PASSWORD

## Installing the Chart

You can install the chart with the release name `mymssql` as below.

```console
$ helm install --name mymssql stable/mssql-linux --set acceptEula.value=Y --set edition.value=Developer
```

> Note - If you do not specify a name, helm will select a name for you.

### Installed Components

You can use `kubectl get` to view all of the installed components.

```console
$ kubectl get all -l app=mssql-linux
NAME                                DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy/mymssql-mssql-linux          1         1         1            1           9m

NAME                                DESIRED   CURRENT   READY     AGE
rs/mymssql-mssql-linux-8688756468   1         1         1         9m

NAME                                DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy/mymssql-mssql-linux          1         1         1            1           9m

NAME                                DESIRED   CURRENT   READY     AGE
rs/mymssql-mssql-linux-8688756468   1         1         1         9m

NAME                                      READY     STATUS    RESTARTS   AGE
po/mymssql-mssql-linux-8688756468-x758g   1/1       Running   0          9m

NAME                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
svc/mymssql-mssql-linux   ClusterIP   10.104.152.61   <none>        1433/TCP   9m

```

### SA Password Retrieval

The sa password is a randonmized in the secret.yaml file. To retrieve the password, perform the following steps once you install the helm chart.

```console
$ kubectl exec mymssql-mssql-linux-8688756468 -- env | grep SA_PASSWORD
```

## Connecting to SQL Server Instance

1.  Run the following command
    This command will create a pod called `mssqlcli` that will include the SQL Server Commandline `sqlcmd` and start at a bash prompt.

```console
$ kubectl run mssqlcli --image=microsoft/mssql-tools -ti --restart=Never --rm=true -- /bin/bash
$ sqlcmd -S mymssql-mssql-linux -U sa
Password: <Enter SA Password>
$ 1> select @@VERSION;
$ 2> go
------------------------------------------------------------------------------------
Microsoft SQL Server 2017 (RTM-CU3-GDR) (KB4052987) - 14.0.3015.40 (X64)
	Dec 22 2017 16:13:22
	Copyright (C) 2017 Microsoft Corporation
	Express Edition (64-bit) on Linux (Ubuntu 16.04.3 LTS)
(1 rows affected)

```

## Values

The configuration parameters in this section control the resources requested and utilized by the SQL Server instance.

| Parameter        | Description                                                                                                                                                                               | Default                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| acceptEula.value | EULA that needs to be accepted. It will need to be changed via commandline or values.yaml.                                                                                                | N                            |
| edition.value    | The edition of SQL Server to install. See section [Editions](#sql-server-for-linux-editions).                                                                                             | Express                      |
| sapassword       | Overrides the randomly created password with a default password. [Please read password requirements](https://docs.microsoft.com/en-us/sql/relational-databases/security/password-policy). | Random (20-AlphNum)          |
| image.repository | The docker hub repo for SQL Server                                                                                                                                                        | microsoft/mssql-server-linux |
| image.tag        | The tag for the image                                                                                                                                                                     | 2017-CU3                     |
| image.pullPolicy | The pull policy for the deployment                                                                                                                                                        | IfNotPresent                 |
| service.name     | Service Name                                                                                                                                                                              | mssqlsrvr                    |
| service.type     | Service Type                                                                                                                                                                              | ClusterIP                    |

## Liveness and Readiness

The SQL Server instance has liveness and readiness checks specified. These parameters can be used to tune the sensitivity of the liveness and readiness checks.

### Liveness Probes

| Parameter                         | Description                                                                          | Default |
| --------------------------------- | ------------------------------------------------------------------------------------ | ------- |
| livenessprobe.initialDelaySeconds | Tells the kubelet that it should wait XX second(s) before performing the first probe | 15      |
| livenessprobe.periodSeconds       | Field specifies that the kubelet should perform a liveness probe every XX seconds(s) | 20      |

### Readiness Probes

| Parameter                          | Description                                                                          | Default |
| ---------------------------------- | ------------------------------------------------------------------------------------ | ------- |
| readinessprobe.initialDelaySeconds | Tells the kubelet that it should wait XX second(s) before performing the first probe | 5       |
| readinessprobe.periodSeconds       | Field specifies that the kubelet should perform a liveness probe every XX second(s)  | 10      |

## Resources

You can specify the resource limits for this chart in the values.yaml file. Make sure you comment out or remove the curly brackets from the values.yaml file before specifying resource limits.
Example:

```yaml
resources:
  limits:
    cpu: 1
    memory: 2Gi
  requests:
    cpu: 0.5
    memory: 2Gi
```

## SQL Server for Linux Editions

Below are the supported versions of SQL Server on Linux. You can find out more information [here](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-editions-and-components-2017).

- Developer : This will run the container using the Developer Edition (this is the default if no MSSQL_PID environment variable is supplied)
- Express : This will run the container using the Express Edition
- Standard : This will run the container using the Standard Edition
- Enterprise : This will run the container using the Enterprise Edition
- EnterpriseCore : This will run the container using the Enterprise Edition Core
- Product ID: This will run the container with the edition that is associated with the PID
