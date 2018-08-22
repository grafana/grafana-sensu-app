System.register([], function (exports_1, context_1) {
    "use strict";
    var panelDefaults, defaults;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            panelDefaults = {
                links: [],
                datasource: null,
                maxDataPoints: 100,
                interval: null,
                targets: [{}],
            };
            defaults = {
                panelDefaults: panelDefaults,
            };
            exports_1("default", defaults);
        }
    };
});
//# sourceMappingURL=defaults.js.map