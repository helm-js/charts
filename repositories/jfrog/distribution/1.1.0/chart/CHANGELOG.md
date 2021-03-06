# JFrog Distribution Chart Changelog
All changes to this project chart be documented in this file.

## [1.1.0] - Oct 14, 2018
* Upgrade MongoDB version (chart 4.3.10, app 3.6.8-debian-9)

## [1.0.6] - Oct 11, 2018
* Update Distribution version 1.3.0

## [1.0.5] - Oct 9, 2018
* Quote ingress hosts to support wildcard names

## [1.0.4] - Oct 8, 2018
* Fix distribution to use mongodb credentials secret

## [1.0.3] - Oct 2, 2018
* Add `helm repo add jfrog https://charts.jfrog.io` to README

## [1.0.2] - Sep 30, 2018
* Add pods nodeSelector, affinity and tolerations

## [1.0.1] - Sep 26, 2018
* Disable persistence for CI testing
* Enable RBAC

## [1.0.0] - Sep 17, 2018
* **NOTE:** This chart is not compatible with older versions and should not be used to upgrade them. See README for more details on upgrades
* True HA with distributor and Redis in their own StatefulSets and headless services
* Redis StatefulSet now part of the main templates
* New Redis version: 4.0.11

## [0.6.0] - Sep 6, 2018
* Change Distribution DB name to `distribution`

## [0.5.0] - Sep 2, 2018
* HA support
* Full non-root Docker images
* Updated Distribution version to 1.2.0

## [0.4.0] - Aug 22, 2018
* Enabled RBAC Support
* Changed Deployment to Statefulset for Distribution's micro services
* Updated Distribution version to 1.1.0
