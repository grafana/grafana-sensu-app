System.register(["react", "./sensu_navbar"], function (exports_1, context_1) {
    var __assign = (this && this.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    var react_1, sensu_navbar_1, DEFAULT_COLOR, BACKGROUND_OPACITY, LABEL_SIZE_COEF;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function SensuOverview(props) {
        var options = props.options;
        var getColor = "green";
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(sensu_navbar_1.SensuNavBar, __assign({}, props))));
    }
    exports_1("SensuOverview", SensuOverview);
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (sensu_navbar_1_1) {
                sensu_navbar_1 = sensu_navbar_1_1;
            }
        ],
        execute: function () {
            DEFAULT_COLOR = "rgb(31, 120, 193)";
            BACKGROUND_OPACITY = 0.1;
            LABEL_SIZE_COEF = 0.7;
        }
    };
});
//# sourceMappingURL=sensu_overview.js.map