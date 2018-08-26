System.register(["lodash", "react", "react-dom", "./defaults", "app/plugins/sdk", "./components/sensu_overview"], function (exports_1, context_1) {
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
    var lodash_1, react_1, react_dom_1, defaults_1, sdk_1, sensu_overview_1, SensuOverviewCtrl;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (react_dom_1_1) {
                react_dom_1 = react_dom_1_1;
            },
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (sensu_overview_1_1) {
                sensu_overview_1 = sensu_overview_1_1;
            }
        ],
        execute: function () {
            SensuOverviewCtrl = (function (_super) {
                __extends(SensuOverviewCtrl, _super);
                function SensuOverviewCtrl($scope, $injector, templateSrv) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.dataType = "timeseries";
                    _this.templateSrv = templateSrv;
                    lodash_1.default.defaults(_this.panel, defaults_1.default.panelDefaults);
                    _this.events.on("data-received", _this.onDataReceived.bind(_this));
                    _this.events.on("data-error", _this.onDataError.bind(_this));
                    _this.events.on("data-snapshot-load", _this.onDataReceived.bind(_this));
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    return _this;
                }
                SensuOverviewCtrl.prototype.onInitEditMode = function () {
                    this.fontSizes = ["20%", "30%", "50%", "70%", "80%", "100%", "110%", "120%", "150%", "170%", "200%"];
                    var partialsPath = "public/plugins/" + this.panel.type + "/partials";
                    this.addEditorTab("Options", partialsPath + "/options.html", 2);
                };
                SensuOverviewCtrl.prototype.onDataReceived = function (dataList) {
                    if (dataList.length > 0 && dataList[0].type === "table") {
                        this.dataType = "table";
                        if (dataList[0].rows && !dataList[0].rows.length) {
                            return this.onDataError("No data");
                        }
                    }
                    else {
                        this.data = [];
                    }
                    this.render();
                };
                SensuOverviewCtrl.prototype.onDataError = function (err) {
                    this.onDataReceived([]);
                };
                SensuOverviewCtrl.prototype.setTableColumnToSensibleDefault = function (tableData) {
                    var columnNames = {};
                    tableData.columns.forEach(function (column, columnIndex) {
                        columnNames[columnIndex] = column.text;
                    });
                    if (lodash_1.default.find(tableData.columns, ["text", this.panel.tableColumnValue]) &&
                        lodash_1.default.find(tableData.columns, ["text", this.panel.tableColumnLabel])) {
                        return;
                    }
                    if (tableData.columns.length === 1) {
                        this.panel.tableColumnValue = tableData.columns[0].text;
                    }
                    else {
                        var notTimeColumns = lodash_1.default.filter(tableData.columns, function (col) { return col.type !== "time"; });
                        this.panel.tableColumnValue = lodash_1.default.last(notTimeColumns).text;
                        this.panel.tableColumnLabel = lodash_1.default.first(notTimeColumns).text;
                    }
                };
                SensuOverviewCtrl.prototype.setValuePrefixAndPostfix = function (data) {
                    var _this = this;
                    data.forEach(function (seriesStat) {
                        if (!seriesStat._valueFormatted) {
                            seriesStat._valueFormatted = seriesStat.valueFormatted;
                        }
                        var value = _this.panel.prefix ? _this.templateSrv.replace(_this.panel.prefix, seriesStat.scopedVars) : "";
                        value += seriesStat._valueFormatted;
                        value += _this.panel.postfix ? _this.templateSrv.replace(_this.panel.postfix, seriesStat.scopedVars) : "";
                        seriesStat.valueFormatted = value;
                    });
                };
                SensuOverviewCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    var sensuOverviewElem = elem.find(".grafana-sensu-app-overview-panel");
                    function render() {
                        if (!ctrl.data) {
                            return;
                        }
                        var width = sensuOverviewElem.width();
                        var height = sensuOverviewElem.height();
                        scope.size = { w: width, h: height };
                        ctrl.setValuePrefixAndPostfix(ctrl.data);
                        renderSensuOverviewComponent();
                    }
                    function renderSensuOverviewComponent() {
                        var sensuOverviewProps = {
                            stats: ctrl.data,
                            options: ctrl.panel,
                            size: scope.size,
                        };
                        var sensuOverviewReactElem = react_1.default.createElement(sensu_overview_1.SensuOverview, sensuOverviewProps);
                        react_dom_1.default.render(sensuOverviewReactElem, sensuOverviewElem[0]);
                    }
                    this.events.on("render", function () {
                        render();
                        ctrl.renderingCompleted();
                    });
                    scope.$on("$destroy", function () {
                        react_dom_1.default.unmountComponentAtNode(sensuOverviewElem[0]);
                    });
                };
                SensuOverviewCtrl.templateUrl = "panels/sensu-overview/partials/template.html";
                return SensuOverviewCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("SensuOverviewCtrl", SensuOverviewCtrl);
            exports_1("PanelCtrl", SensuOverviewCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map