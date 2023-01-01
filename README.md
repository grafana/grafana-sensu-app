# Grafana App for Sensu
[![CircleCI](https://circleci.com/gh/grafana/grafana-sensu-app.svg?style=svg)](https://circleci.com/gh/grafana/grafana-sensu-app)
[![David Dependancy Status](https://david-dm.org/grafana/grafana-sensu-app.svg)](https://david-dm.org/grafana/grafana-sensu-app)
[![David Dev Dependency Status](https://david-dm.org/grafana/grafana-sensu-app/dev-status.svg)](https://david-dm.org/grafana/grafana-sensu-app/?type=dev)

## Requirements

* [Grafana 5+](https://www.grafana.com)
* [Sensu Core 1.x](https://sensu.io)
* [Sensu API](https://docs.sensu.io/sensu-core/1.6/installation/install-sensu-server-api/#sensu-core)

## Features

* Sidebar with link to premade dashboards used to manage Sensu
* Datasource for general purpose use
* Custom Panels that can be used with any dashboard (soon in v1.1)

## Changes/Release Notes

See the [Change Log](CHANGELOG.md) here.

## Installation

Once the plugin is installed, the application will need to be enabled:

![App Enable](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-app-enabled.png)

Once enabled, you will see this:

![App Enabled](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-app-enable2.png)

A convenience icon is also added the side menu:

![Side Menu](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-app-sidemenu.png)

### Setup datasource

The datasource needs to be configured to communicate with your Sensu API. Set the Url to your Sensu API, typically on port 4567.

![Datasource Configuration](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-app-datasource-config.png)

NOTE: You can pre-provision the datasource before enabling the app. Once the app is enabled, the datasource will become available.

Create a file: in provisioning/datasources/sensu.yaml
```yaml
# config file version
apiVersion: 1

deleteDatasources:
  - name: SENSU
    orgId: 1

datasources:
- name: SENSU
  type: grafana-sensucore-datasource
  access: proxy
  url: http://sensu:4567
  basicAuth: true
  basicAuthUser: sensu
  basicAuthPassword: mypassword
  withCredentials: false
  isDefault: false
  jsonData:
     tlsAuth: false
     tlsAuthWithCACert: false
  secureJsonData:
    tlsCACert: ""
    tlsClientCert: ""
    tlsClientKey: ""
  version: 1
  editable: true
```

### Sensu API detail
Once a datasource is created, you can see select the name of the instance, and see details about the API.

![Server Info](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-app-server-info.png)

### Authentication

Basic Auth and Basic Auth over SSL have been tested.

## Summary Dashboard

A dashboard is included to give you a quick view of your Sensu environment.


![Summary Dashboard](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-app-summary.png)

NOTE: If the import fails while enabling, you can re-import it using the plugin configuration page:

![Summary Dashboard Import](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-app-dashboard-import.png)


## Using the datasource

The datasource interacts with your Sensu API, and is intended to provide "read-only" actions through the query interface.
Additional (write) functionality will be provided through custom panels.

The datasource can be used to fetch data for:
* Events (counts, by type, and details)
* Results (check results)
* Aggregates (rolled up aggregate states)
* Clients (count and list)

The query builder provides hints for each type, with two optional dimensions "Client Name" and "Check Name".

### Using the query builder

ADD SCREENSHOT

There are 16 query options in the datasource:

1. Aggregates: Returns aggregate check states, with 7 different "modes"
2. Aggregates as JSON
3. Check Subscriptions: Returns list of checks associated with a subscription
4. Clients
5. Clients as JSON
6. Client Health as JSON
7. Client History
8. Events
9. Events as JSON
10. Event Metrics
11. Event Metrics as JSON
12. Results as JSON
13. Results as Table
14. Sensu Health
15. Silenced Entries
16. Stashes

#### Aggregates
Returns aggregate check states, with 7 "modes":

  1. List
  2. Clients
  3. Checks
  4. Results Critical
  5. Results OK
  6. Results Unknown
  7. Results Warning

Aggregates are best used with a Table or SingleStat panel.

##### List

Using the mode "List", select +Dimension and enter an aggregate name (the input field will provide hints).
Once an aggregate is selected, use the Filter option to narrow the results.

* Number of checks per client
* Number of clients included in the aggregate
* State Critical
* State Warning
* State Stale
* State OK
* Total Checks in the aggregate (effectively clients * checks)

#### Aggregates as JSON

This source type is best used with a Table Panel. When used in a table panel the default results in a list of aggregate names.

To get more detail for an aggregate, add a dimension with name of an aggregate, then select mode "Clients".
The table will now return a row per client showing all of the checks included in the aggregate.

Useful modes:
* Clients - shows clients and checks of the aggrgate
* Checks - shows check names

#### Check Subscriptions (not implemented)

This source type returns the list of checks associated with a subscription
  Dimensions
  * name - name of check
  * aggregate - name of aggregate
  * type (metric|check)
  * source - JIT client

#### Clients

This source type has two modes, list and count, and can be used with dimensions plus filters.

#### Clients as JSON

This source type returns the list of clients in json format, best used by table panels.

```JSON
{"name":"zeus","address":"192.168.1.99","subscriptions":["production","linux","client:zeus"],"production_status":{"status":"production"},"version":"1.4.3","timestamp":1547076659,"datapoints":[],"type":"docs"}
```

#### Client Health as JSON (not implemented)

This source type returns the details of each check for each client.

```JSON
{"timestamp":1547076646000,"check_name":"check_ntp","client":"zeus","check":{"command":"/opt/sensu/embedded/bin/check-ntp.rb","aggregates":["mining_servers"],"interval":60,"handle":false,"subscribers":["linux"],"name":"check_ntp","issued":1547076646000,"executed":1547076646000,"duration":0.074,"output":"CheckNTP OK: NTP offset by 1.002957ms\n","status":0,"type":"standard","history":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"last_state_change":null,"last_ok":null}
```

#### Client History
Similar to Results, but with additional data

#### Events
Returns events as a list with the option to filter out silenced events.

#### Events as JSON
Returns events in JSON format with the option to filter out silenced events. This type is best used with Table panels.

```JSON
{"timestamp":1547076369000,"check_name":"keepalive","client":{"name":"pi-probe-1","address":"192.168.1.138","subscriptions":["production","linux","pi","pi-probe","client:pi-probe-1"],"production_status":{"status":"production"},"version":"1.4.2","timestamp":1540740517,"client_short_name":"pi-probe-1"},"check":{"thresholds":{"warning":120,"critical":180},"name":"keepalive","issued":1547076369000,"executed":1547076369000,"output":"No keepalive sent from client for 6335852 seconds (>=180)","status":2,"type":"standard","history":["2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2"],"total_state_change":0,"status_text":"CRITICAL"},"occurrences":185864,"occurrences_watermark":185864,"action":"create","id":"81fce2d2-5d89-4b21-928d-0134eba42294","last_state_change":1540799011000,"last_ok":1540740518000,"silenced":false,"silenced_by":[]}
```

#### Event Metrics
This returns totals for events depending on their state.

#### Event Metrics JSON
This returns json-formatted totals for events depending on their state.

```JSON
{"target":"allEvents","timestamp":1547076354000,"numEvents":20,"numSilenced":1,"numClientsSilenced":10,"numChecksSilenced":10,"numWarningEvents":4,"numWarningEventsSilenced":1,"numCriticalEvents":14,"numCriticalEventsSilenced":0,"numUnknownEvents":2,"numUnknownEventsSilenced":0}
```

#### Results as JSON
Returns check results in JSON format

```JSON
{"timestamp":1547076414000,"message":"check_disk_usage","client":"zeus","check":{"name":"check_disk_usage","issued":1547076414000,"executed":1547076414000,"output":"CheckDisk WARNING: /cifs/asustor/public 86.61% bytes usage (4.69 TiB/5.41 TiB), /run/user/108/gvfs Unable to read., /run/user/1000/gvfs Unable to read.\n","status":1,"type":"standard"}}
```

#### Results as Table (not implemented)
Returns check results in Table format

#### Sensu Health (not implemented)
#### Silenced Entries (not implemented)
#### Stashes (not implemented)

### Dimensions and Filters

Some query options will include dimensions and/or filters depending on which is selected.

![Dimensions](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-datasource-dimensions.png)

![Filters](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-datasource-filters.png)


#### Template Variables

Support exists for using the following as template variables in Grafana:

1. Clients
2. Checks
3. Aggregates

Here is an example configuration adding `Client` as a template variable:

![Template Config](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-app-templating-config.png)

Once added, you can reference the template variable as you would with any other Grafana datasource.
Here is an example showing how to limit a table panel to show just the selected client:

![Using "client" template variable](https://raw.githubusercontent.com/grafana/grafana-sensu-app/master/src/screenshots/sensu-app-using-template-var.png)


### References

More info about Sensu [here](https://sensu.io/).

### TODO

* overview panel
* source type: client history
  * needs dimension: check_name filter
  * and min/max/current/avg/total selector
* source type: aggregates, aggregate mode: list
  * need dimension to pick aggregate field “checks/clients/crit/ok/stale/etc”
  * and min/max/current/avg/total selector

## Contributing

See the [Contributing Guide](CONTRIBUTING.md) here.

## Feedback and Questions

Please submit any issues with the app on [Github](https://github.com/grafana/grafana-sensu-app/issues).
test
