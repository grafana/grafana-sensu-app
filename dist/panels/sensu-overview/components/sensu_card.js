System.register(["react", "../../external/babel.min.js", "../../external/material-ui.development.js", "../../external/material-icons.css!"], function (exports_1, context_1) {
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
    var react_1, MUI, styles, styles2, cardStyles, SensuCard;
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
            cardStyles = {
                root: {
                    flexGrow: 1
                },
                card: {
                    minWidth: 275
                },
                bullet: {
                    display: "inline-block",
                    margin: "0 2px",
                    transform: "scale(0.8)"
                },
                title: {
                    marginBottom: 16,
                    fontSize: 14
                },
                pos: {
                    marginBottom: 12
                }
            };
            SensuCard = (function (_super) {
                __extends(SensuCard, _super);
                function SensuCard(props) {
                    return _super.call(this, props) || this;
                }
                SensuCard.prototype.render = function () {
                    var _a = this.props, width = _a.width, height = _a.height, color = _a.color;
                    var bull = react_1.default.createElement("span", { style: cardStyles.bullet }, "\u2022");
                    var containerStyle = {};
                    if (color) {
                        containerStyle.background = color;
                    }
                    return (react_1.default.createElement("div", { style: cardStyles.root },
                        react_1.default.createElement(MUI.Card, { style: containerStyle },
                            react_1.default.createElement(MUI.CardContent, null,
                                react_1.default.createElement(MUI.Typography, { style: cardStyles.title, color: "textSecondary" }, "Word of the Day"),
                                react_1.default.createElement(MUI.Typography, { variant: "headline", component: "h2" },
                                    "be",
                                    bull,
                                    "nev",
                                    bull,
                                    "o",
                                    bull,
                                    "lent"),
                                react_1.default.createElement(MUI.Typography, { style: cardStyles.pos, color: "textSecondary" }, "adjective"),
                                react_1.default.createElement(MUI.Typography, { component: "p" },
                                    "well meaning and kindly.",
                                    react_1.default.createElement("br", null),
                                    "a benevolent smile")),
                            react_1.default.createElement(MUI.CardActions, null,
                                react_1.default.createElement(MUI.Button, { size: "small" }, "Learn More")))));
                };
                SensuCard.defaultProps = {
                    color: "green",
                };
                return SensuCard;
            }(react_1.default.PureComponent));
            exports_1("SensuCard", SensuCard);
        }
    };
});
//# sourceMappingURL=sensu_card.js.map