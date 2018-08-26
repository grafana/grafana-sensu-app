System.register(["react", "../../external/babel.min.js", "../../external/material-ui.development.js", "../../external/material-icons.css!", "./sensu_card"], function (exports_1, context_1) {
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
    var react_1, MUI, sensu_card_1, styles, styles2, SensuNavBar;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (_1) {
            },
            function (MUI_1) {
                MUI = MUI_1;
            },
            function (_2) {
            },
            function (sensu_card_1_1) {
                sensu_card_1 = sensu_card_1_1;
            }
        ],
        execute: function () {
            styles = {
                root: {
                    flexGrow: 1
                },
                flex: {
                    flexGrow: 1
                },
                menuButton: {
                    marginLeft: -12,
                    marginRight: 20
                }
            };
            styles2 = {
                margin: {
                    margin: 6,
                }
            };
            SensuNavBar = (function (_super) {
                __extends(SensuNavBar, _super);
                function SensuNavBar(props) {
                    return _super.call(this, props) || this;
                }
                SensuNavBar.prototype.render = function () {
                    return (react_1.default.createElement("div", { style: styles.root },
                        react_1.default.createElement(MUI.AppBar, { position: "static" },
                            react_1.default.createElement(MUI.Toolbar, null,
                                react_1.default.createElement(MUI.Typography, { style: styles.flex, variant: "title", color: "inherit" }, "Sensu"),
                                react_1.default.createElement(MUI.IconButton, { style: styles.menuButton, color: "inherit", "aria-label": "Menu" },
                                    react_1.default.createElement(MUI.Badge, { color: "primary", badgeContent: 6, className: styles2.margin },
                                        react_1.default.createElement(MUI.Icon, { color: "inherit" }, "star"))),
                                react_1.default.createElement(MUI.IconButton, { style: styles.menuButton, color: "inherit", "aria-label": "Menu" },
                                    react_1.default.createElement(MUI.Badge, { color: "primary", badgeContent: 2, className: styles2.margin },
                                        react_1.default.createElement(MUI.Icon, { color: "inherit" }, "volume_off"))),
                                react_1.default.createElement(MUI.IconButton, { style: styles.menuButton, color: "inherit", "aria-label": "Menu" },
                                    react_1.default.createElement(MUI.Badge, { color: "primary", badgeContent: 2, className: styles2.margin },
                                        react_1.default.createElement(MUI.Icon, { color: "inherit" }, "access_alarm"))))),
                        react_1.default.createElement(sensu_card_1.SensuCard, { color: "red" }),
                        react_1.default.createElement(sensu_card_1.SensuCard, { color: "yellow" })));
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