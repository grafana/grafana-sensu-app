///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import { SensuCoreDatasource } from './datasource';
import { SensuCoreDatasourceQueryCtrl } from './query_ctrl';

import { loadPluginCss } from 'grafana/app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/grafana-sensu-app/datasource/sensu-core/css/query-editor.css',
  light: 'plugins/grafana-sensu-app/datasource/sensu-core/css/query-editor.css',
});

class SensuConfigCtrl {
  static templateUrl = 'datasource/sensu-core/partials/config.html';
}

class SensuQueryOptionsCtrl {
  static templateUrl = 'datasource/sensu-core/partials/query.options.html';
}

export {
  SensuCoreDatasource as Datasource,
  SensuCoreDatasourceQueryCtrl as QueryCtrl,
  SensuConfigCtrl as ConfigCtrl,
  SensuQueryOptionsCtrl as QueryOptionsCtrl,
};
