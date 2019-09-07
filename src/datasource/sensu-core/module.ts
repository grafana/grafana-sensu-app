import { SensuCoreDatasource } from './datasource';
import { SensuCoreDatasourceQueryCtrl } from './query_ctrl';
import { ConfigCtrl } from './config';

class SensuCoreQueryOptionsCtrl {
  static templateUrl = 'datasource/sensu-core/partials/query.options.html';
}

export { SensuCoreDatasource as Datasource, SensuCoreDatasourceQueryCtrl as QueryCtrl, SensuCoreQueryOptionsCtrl as QueryOptionsCtrl, ConfigCtrl };
