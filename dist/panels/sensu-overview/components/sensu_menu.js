System.register(["react", "./utils"], function (exports_1, context_1) {
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
    var react_1, utils_1, DEFAULT_COLOR, BACKGROUND_OPACITY, LABEL_SIZE_COEF, SensuMenu;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            DEFAULT_COLOR = "rgb(31, 120, 193)";
            BACKGROUND_OPACITY = 0.1;
            LABEL_SIZE_COEF = 0.7;
            SensuMenu = (function (_super) {
                __extends(SensuMenu, _super);
                function SensuMenu(props) {
                    return _super.call(this, props) || this;
                }
                SensuMenu.prototype.render = function () {
                    var _a = this.props, width = _a.width, height = _a.height, label = _a.label, value = _a.value, colorBackground = _a.colorBackground, colorValue = _a.colorValue;
                    var valueColor = this.props.color;
                    var bgColor = utils_1.getBGColor(valueColor, BACKGROUND_OPACITY);
                    var containerStyle = {};
                    containerStyle.height = height;
                    containerStyle.width = width;
                    if (colorBackground) {
                        containerStyle.background = bgColor;
                    }
                    var labelFontSize = Math.floor((this.props.labelFontSize || this.props.fontSize) * LABEL_SIZE_COEF);
                    var valueFontSize = this.props.fontSize;
                    var labelStyle = {
                        fontSize: labelFontSize,
                    };
                    var labelContainerStyle = {
                        lineHeight: labelFontSize + "px",
                    };
                    var valueStyle = {
                        fontSize: valueFontSize + "px",
                    };
                    if (colorValue) {
                        valueStyle.color = valueColor;
                    }
                    var valueContainerStyle = {
                        fontSize: valueFontSize + "px",
                    };
                    return (react_1.default.createElement("div", { className: "multistat-single", style: containerStyle },
                        react_1.default.createElement("div", { className: "multistat-label-container", style: labelContainerStyle },
                            react_1.default.createElement("span", { className: "multistat-label", style: labelStyle },
                                label,
                                " what")),
                        react_1.default.createElement("div", { className: "multistat-value-container", style: valueContainerStyle },
                            react_1.default.createElement("span", { className: "singlestat-panel-value multistat-value", style: valueStyle }, value))));
                };
                SensuMenu.defaultProps = {
                    color: "white",
                };
                return SensuMenu;
            }(react_1.default.PureComponent));
            exports_1("SensuMenu", SensuMenu);
        }
    };
});
//# sourceMappingURL=sensu_menu.js.map