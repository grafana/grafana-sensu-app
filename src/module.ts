///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {SensuConfigCtrl} from "./components/config/config";
import {SensuServersCtrl} from "./components/servers/servers";
import {SensuServerInfoCtrl} from "./components/server_info/info";
import {loadPluginCss} from "grafana/app/plugins/sdk";

loadPluginCss({
  dark: "plugins/grafana-sensu-app/css/sensu-app.dark.css",
  light: "plugins/grafana-sensu-app/css/sensu-app.light.css"
});

export {
  SensuConfigCtrl as ConfigCtrl,
  SensuServerInfoCtrl,
  SensuServersCtrl
};
