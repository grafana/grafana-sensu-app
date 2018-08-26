System.register(["app/plugins/sdk", "./css/query-editor.css!"], function (exports_1, context_1) {
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
    var sdk_1, SensuDatasourceQueryCtrl;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            SensuDatasourceQueryCtrl = (function (_super) {
                __extends(SensuDatasourceQueryCtrl, _super);
                function SensuDatasourceQueryCtrl($scope, $injector, templateSrv, uiSegmentSrv) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.scope = $scope;
                    _this.uiSegmentSrv = uiSegmentSrv;
                    _this.templateSrv = templateSrv;
                    _this.sourceTypes = [
                        {
                            text: "Aggregates",
                            value: "aggregates",
                        },
                        {
                            text: "Aggregates as JSON",
                            value: "aggregates_json",
                        },
                        {
                            text: "Check Subscriptions",
                            value: "check_subscriptions",
                        },
                        {
                            text: "Clients",
                            value: "clients",
                        },
                        {
                            text: "Clients as JSON",
                            value: "clients_json",
                        },
                        {
                            text: "Client Health as JSON",
                            value: "client_health_json",
                        },
                        {
                            text: "Client History",
                            value: "client_history",
                        },
                        {
                            text: "Events",
                            value: "events",
                        },
                        {
                            text: "Events as JSON",
                            value: "events_json",
                        },
                        {
                            text: "Event Metrics",
                            value: "event_metrics",
                        },
                        {
                            text: "Event Metrics JSON",
                            value: "event_metrics_json",
                        },
                        {
                            text: "Results as JSON",
                            value: "results_json",
                        },
                        {
                            text: "Results as Table",
                            value: "results_table",
                        },
                        {
                            text: "Sensu Health",
                            value: "sensu_health_json",
                        },
                        {
                            text: "Silenced Entries",
                            value: "silenced_entries_json",
                        },
                        {
                            text: "Stashes",
                            value: "stashes_json",
                        }
                    ];
                    _this.dimensionTypes = {
                        aggregates: [
                            {
                                text: "Aggregate Name",
                                value: "aggregateName",
                            }
                        ],
                        aggregates_json: [
                            {
                                text: "Aggregate Name",
                                value: "aggregateName",
                            }
                        ],
                        check_subscriptions: [
                            {
                                text: "Aggregate Name",
                                value: "aggregateName",
                            },
                            {
                                text: "Check Name",
                                value: "checkName",
                            },
                            {
                                text: "Check Type",
                                value: "checkType",
                            },
                            {
                                text: "Source (JIT Client)",
                                value: "sourceName",
                            }
                        ],
                        clients: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName",
                            }
                        ],
                        client_health_json: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            }
                        ],
                        client_history: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            }
                        ],
                        clients_json: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName",
                            }
                        ],
                        events: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName"
                            }
                        ],
                        events_json: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName"
                            }
                        ],
                        event_metrics: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName"
                            }
                        ],
                        event_metrics_json: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName"
                            }
                        ],
                        results_json: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName",
                            }
                        ],
                        results_table: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName",
                            }
                        ],
                        sensu_health_json: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName",
                            }
                        ],
                        silenced_entries_json: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName",
                            }
                        ],
                        stashes_json: [
                            {
                                text: "Client Name",
                                value: "clientName"
                            },
                            {
                                text: "Check Name",
                                value: "checkName",
                            }
                        ]
                    };
                    _this.filterTypes = {
                        aggregates: [
                            {
                                text: "Number of Checks",
                                value: "checks",
                                type: "value"
                            },
                            {
                                text: "Number of Clients",
                                value: "clients",
                                type: "value"
                            },
                            {
                                text: "State Critical",
                                value: "critical",
                                type: "value"
                            },
                            {
                                text: "State OK",
                                value: "ok",
                                type: "value"
                            },
                            {
                                text: "State Stale",
                                value: "stale",
                                type: "value"
                            },
                            {
                                text: "State Unknown",
                                value: "unknown",
                                type: "value"
                            },
                            {
                                text: "State Warning",
                                value: "warning",
                                type: "value"
                            },
                            {
                                text: "Total Checks",
                                value: "total",
                                type: "value"
                            }
                        ],
                        client_health_json: [
                            {
                                text: "Client Name",
                                value: "fetch"
                            },
                            {
                                text: "Client Name RegEx",
                                value: "regex"
                            }
                        ],
                        clients: [
                            {
                                text: "Client Name",
                                value: "fetch"
                            },
                            {
                                text: "Client Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Field",
                                value: "field"
                            }
                        ],
                        clients_json: [
                            {
                                text: "Client Name",
                                value: "fetch"
                            },
                            {
                                text: "Client Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Field",
                                value: "field"
                            }
                        ],
                        events: [
                            {
                                text: "Client Name",
                                value: "fetch"
                            },
                            {
                                text: "Client Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Check Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Field",
                                value: "field"
                            }
                        ],
                        events_json: [
                            {
                                text: "Client Name",
                                value: "fetch"
                            },
                            {
                                text: "Client Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Check Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Field",
                                value: "field"
                            }
                        ],
                        event_metrics: [
                            {
                                text: "Client Name",
                                value: "fetch"
                            },
                            {
                                text: "Client Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Check Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Field",
                                value: "field"
                            }
                        ],
                        event_metrics_json: [
                            {
                                text: "Client Name",
                                value: "fetch"
                            },
                            {
                                text: "Client Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Check Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Field",
                                value: "field"
                            }
                        ],
                        results_json: [
                            {
                                text: "Client Name",
                                value: "fetch"
                            },
                            {
                                text: "Client Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Check Name RegEx",
                                value: "regex"
                            },
                            {
                                text: "Field",
                                value: "field"
                            }
                        ]
                    };
                    _this.aggregateModes = [
                        {
                            text: "List",
                            value: "list"
                        },
                        {
                            text: "Clients",
                            value: "clients"
                        },
                        {
                            text: "Checks",
                            value: "checks"
                        },
                        {
                            text: "Results Critical",
                            value: "results_critical"
                        },
                        {
                            text: "Results OK",
                            value: "results_ok"
                        },
                        {
                            text: "Results Unknown",
                            value: "results_unknown"
                        },
                        {
                            text: "Results Warning",
                            value: "results_warning"
                        },
                    ];
                    _this.clientQueryModes = [
                        {
                            text: "List",
                            value: "list"
                        },
                        {
                            text: "Count",
                            value: "count"
                        }
                    ];
                    _this.eventMetricModes = [
                        {
                            text: "All Events",
                            value: "all_events_count"
                        },
                        {
                            text: "Active Events",
                            value: "active_events_count"
                        },
                        {
                            text: "Critical Total Count",
                            value: "critical_count"
                        },
                        {
                            text: "Critical Active Count",
                            value: "critical_active_count"
                        },
                        {
                            text: "Critical Silenced Count",
                            value: "critical_silenced_count"
                        },
                        {
                            text: "Warning Total Count",
                            value: "warning_count"
                        },
                        {
                            text: "Warning Silenced Count",
                            value: "warning_silenced_count"
                        },
                        {
                            text: "Warning Active Count",
                            value: "warning_active_count"
                        },
                        {
                            text: "Unknown Total Count",
                            value: "unknown_count"
                        },
                        {
                            text: "Unknown Active Count",
                            value: "unknown_active_count"
                        },
                        {
                            text: "Unknown Silenced Count",
                            value: "unknown_silenced_count"
                        },
                        {
                            text: "Silenced Total Count",
                            value: "silenced_count"
                        },
                        {
                            text: "Clients Silenced Count",
                            value: "clients_silenced_count"
                        },
                        {
                            text: "Checks Silenced Count",
                            value: "checks_silenced_count"
                        }
                    ];
                    _this.target.clientQueryMode = _this.target.clientQueryMode || "count";
                    _this.target.eventMetricMode = _this.target.eventMetricMode || "all_events_count";
                    _this.target.aggregateMode = _this.target.aggregateMode || "list";
                    _this.target.sourceType = _this.target.sourceType || "events";
                    _this.target.dimensions = _this.target.dimensions || [];
                    return _this;
                }
                SensuDatasourceQueryCtrl.prototype.removeDimension = function (dimension) {
                    if (this.target.dimensions) {
                        this.target.dimensions.splice(this.target.dimensions.indexOf(dimension), 1);
                        this.panelCtrl.refresh();
                    }
                };
                SensuDatasourceQueryCtrl.prototype.addDimension = function () {
                    if (!this.target.dimensions) {
                        this.target.dimensions = [];
                    }
                    var dimensionsForSourceType = this.dimensionTypes[this.target.sourceType];
                    var defaultDimensionType = dimensionsForSourceType[0].value;
                    this.target.dimensions.push({
                        name: null,
                        value: null,
                        dimensionType: defaultDimensionType
                    });
                };
                SensuDatasourceQueryCtrl.prototype.getDimensionValues = function (dimension) {
                    if (dimension) {
                        return this.datasource.dimensionFindValues(this.target, dimension)
                            .then(this.uiSegmentSrv.transformToSegments(true));
                    }
                };
                SensuDatasourceQueryCtrl.prototype.removeFilter = function (filter) {
                    if (this.target.filters) {
                        this.target.filters.splice(this.target.filters.indexOf(filter), 1);
                        this.panelCtrl.refresh();
                    }
                };
                SensuDatasourceQueryCtrl.prototype.addFilter = function () {
                    if (!this.target.filters) {
                        this.target.filters = [];
                    }
                    var filtersForSourceType = this.filterTypes[this.target.sourceType];
                    var defaultFilterType = filtersForSourceType[0].type;
                    this.target.filters.push({
                        name: null,
                        value: null,
                        filterType: defaultFilterType
                    });
                };
                SensuDatasourceQueryCtrl.prototype.getFilterValues = function (filter) {
                    if (filter) {
                        return this.datasource.filterFindValues(this.target, filter)
                            .then(this.uiSegmentSrv.transformToSegments(true));
                    }
                };
                SensuDatasourceQueryCtrl.prototype.getOptions = function () {
                    return this.datasource.metricFindQuery(this.target)
                        .then(this.uiSegmentSrv.transformToSegments(true));
                };
                SensuDatasourceQueryCtrl.prototype.sourceTypeChanged = function () {
                    if (this.target.dimensions) {
                        this.target.dimensions = [];
                    }
                    this.onChangeInternal();
                };
                SensuDatasourceQueryCtrl.prototype.modeChanged = function () {
                    this.onChangeInternal();
                };
                SensuDatasourceQueryCtrl.prototype.onChangeInternal = function () {
                    this.panelCtrl.refresh();
                };
                SensuDatasourceQueryCtrl.templateUrl = "datasource/sensu/partials/query.editor.html";
                return SensuDatasourceQueryCtrl;
            }(sdk_1.QueryCtrl));
            exports_1("SensuDatasourceQueryCtrl", SensuDatasourceQueryCtrl);
        }
    };
});
//# sourceMappingURL=query_ctrl.js.map