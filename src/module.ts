///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
///<reference path="../node_modules/@types/d3/index.d.ts" />

import {SensuConfigCtrl} from "./components/config/config";
import {loadPluginCss} from "app/plugins/sdk";

loadPluginCss({
  dark: "plugins/grafana-sensu-app/css/sensu-app.dark.css",
  light: "plugins/grafana-sensu-app/css/sensu-app.light.css"
});

export {
  SensuConfigCtrl as ConfigCtrl,
};
