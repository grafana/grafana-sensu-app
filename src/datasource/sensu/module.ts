
///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {SensuDatasource} from "./datasource";
import {SensuDatasourceQueryCtrl} from "./query_ctrl";

import {loadPluginCss} from "grafana/app/plugins/sdk";

loadPluginCss({
  dark: "plugins/grafana-sensu-app/datasource/sensu/css/query-editor.css",
  light: "plugins/grafana-sensu-app/datasource/sensu/css/query-editor.css"
});

class SensuConfigCtrl {
  static templateUrl = "datasource/sensu/partials/config.html";
}

class SensuQueryOptionsCtrl {
  static templateUrl = "datasource/sensu/partials/query.options.html";
}

export {
  SensuDatasource as Datasource,
  SensuDatasourceQueryCtrl as QueryCtrl,
  SensuConfigCtrl as ConfigCtrl,
  SensuQueryOptionsCtrl as QueryOptionsCtrl
};
