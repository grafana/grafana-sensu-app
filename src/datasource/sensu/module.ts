
import {SensuDatasource} from "./datasource";
import {SensuDatasourceQueryCtrl} from "./query_ctrl";

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
