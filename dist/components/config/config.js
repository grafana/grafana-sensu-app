System.register([], function (exports_1, context_1) {
    var SensuConfigCtrl;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            SensuConfigCtrl = (function () {
                function SensuConfigCtrl($scope, $injector, $q) {
                    this.$q = $q;
                    this.enabled = false;
                    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
                }
                SensuConfigCtrl.prototype.postUpdate = function () {
                    var _this = this;
                    if (!this.appModel.enabled) {
                        return this.$q.resolve();
                    }
                    return this.appEditCtrl.importDashboards().then(function () {
                        _this.enabled = true;
                        return {
                            url: "plugins/grafana-sensu-app/page/configure",
                            message: "Sensu App enabled!"
                        };
                    });
                };
                SensuConfigCtrl.templateUrl = "components/config/config.html";
                return SensuConfigCtrl;
            }());
            exports_1("SensuConfigCtrl", SensuConfigCtrl);
        }
    };
});
//# sourceMappingURL=config.js.map