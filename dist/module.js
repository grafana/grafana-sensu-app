System.register(["./components/config/config", "app/plugins/sdk"], function (exports_1, context_1) {
    "use strict";
    var config_1, sdk_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }
        ],
        execute: function () {
            exports_1("ConfigCtrl", config_1.SensuConfigCtrl);
            sdk_1.loadPluginCss({
                dark: "plugins/grafana-sensu-app/css/sensu-app.dark.css",
                light: "plugins/grafana-sensu-app/css/sensu-app.light.css"
            });
        }
    };
});
//# sourceMappingURL=module.js.map