System.register(["./datasource", "./query_ctrl"], function (exports_1, context_1) {
    var datasource_1, query_ctrl_1, SensuConfigCtrl, SensuQueryOptionsCtrl;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (query_ctrl_1_1) {
                query_ctrl_1 = query_ctrl_1_1;
            }
        ],
        execute: function () {
            exports_1("Datasource", datasource_1.SensuDatasource);
            exports_1("QueryCtrl", query_ctrl_1.SensuDatasourceQueryCtrl);
            SensuConfigCtrl = (function () {
                function SensuConfigCtrl() {
                }
                SensuConfigCtrl.templateUrl = "datasource/sensu/partials/config.html";
                return SensuConfigCtrl;
            }());
            exports_1("ConfigCtrl", SensuConfigCtrl);
            SensuQueryOptionsCtrl = (function () {
                function SensuQueryOptionsCtrl() {
                }
                SensuQueryOptionsCtrl.templateUrl = "datasource/sensu/partials/query.options.html";
                return SensuQueryOptionsCtrl;
            }());
            exports_1("QueryOptionsCtrl", SensuQueryOptionsCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map