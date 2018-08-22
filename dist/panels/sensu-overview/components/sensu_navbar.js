System.register(["react", "../../external/babel.min.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var react_1, Button, SensuNavBar;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            Button = window["material-ui"].Button;
            SensuNavBar = (function (_super) {
                __extends(SensuNavBar, _super);
                function SensuNavBar(props) {
                    return _super.call(this, props) || this;
                }
                SensuNavBar.prototype.render = function () {
                    debugger;
                    return (react_1.default.createElement(Button, { variant: "raised", color: "primary" }, "navbar placeholder"));
                };
                SensuNavBar.defaultProps = {
                    color: "white",
                };
                return SensuNavBar;
            }(react_1.default.PureComponent));
            exports_1("SensuNavBar", SensuNavBar);
        }
    };
});
//# sourceMappingURL=sensu_navbar.js.map