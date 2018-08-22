System.register(["./common"], function (exports_1, context_1) {
    "use strict";
    var common_1;
    var __moduleName = context_1 && context_1.id;
    function getAggregateURIs(target, aggregateNames) {
        var uris = [];
        var dimensionURI = "/aggregates";
        var anAggregateName = null;
        if (aggregateNames.length) {
            for (var i = 0; i < aggregateNames.length; i++) {
                anAggregateName = aggregateNames[i];
                dimensionURI = "/aggregates/" + anAggregateName;
                switch (target.aggregateMode) {
                    case "checks":
                        dimensionURI = "/aggregates/" + anAggregateName + "/checks";
                        break;
                    case "clients":
                        dimensionURI = "/aggregates/" + anAggregateName + "/clients";
                        break;
                    case "list":
                        dimensionURI = "/aggregates/" + anAggregateName;
                        break;
                    case "results_critical":
                        dimensionURI = "/aggregates/" + anAggregateName + "/results/critical";
                        break;
                    case "results_ok":
                        dimensionURI = "/aggregates/" + anAggregateName + "/results/ok";
                        break;
                    case "results_unknown":
                        dimensionURI = "/aggregates/" + anAggregateName + "/results/unknown";
                        break;
                    case "results_warning":
                        dimensionURI = "/aggregates/" + anAggregateName + "/results/warning";
                        break;
                }
                uris.push(dimensionURI);
            }
        }
        if (uris.length === 0) {
            uris.push(dimensionURI);
        }
        return uris;
    }
    exports_1("getAggregateURIs", getAggregateURIs);
    function convertAggregatesToDataPoints(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        if (response.data.length === undefined) {
            var singleData = response.data;
            response.data = [];
            response.data.push(singleData);
        }
        var newData = null;
        for (var i = 0; i < response.data.length; i++) {
            var anAggregate = response.data[i];
            if (anAggregate.checks !== undefined) {
                var checkType = typeof (anAggregate.checks);
                switch (checkType) {
                    case "number":
                        newData = convertEventDataToAggregateModeList(anAggregate, newData);
                        break;
                    case "object":
                        newData = convertEventDataToAggregateModeClient(anAggregate, newData);
                        break;
                }
                continue;
            }
            if (anAggregate.clients !== undefined) {
                newData = convertEventDataToAggregateModeChecks(anAggregate, newData);
                continue;
            }
            if (anAggregate.summary !== undefined) {
                newData = convertEventDataToAggregateModeResults(anAggregate, newData);
                continue;
            }
            var datapoints = [];
            var timestamp = Math.floor(Date.now());
            datapoints[0] = [0, timestamp];
            anAggregate.datapoints = datapoints;
            anAggregate.target = anAggregate.name;
        }
        if (newData !== null) {
            response.data = newData;
        }
        return response;
    }
    exports_1("convertAggregatesToDataPoints", convertAggregatesToDataPoints);
    function convertEventDataToAggregateModeResults(anEvent, dataSet) {
        var timestamp = Math.floor(Date.now());
        if (dataSet === null) {
            dataSet = [];
        }
        for (var i = 0; i < anEvent.summary.length; i++) {
            var aSummary = anEvent.summary[i];
            var checkData = {
                target: anEvent.check,
                clients: aSummary.clients,
                datapoints: [
                    [aSummary.total, timestamp]
                ]
            };
            dataSet.push(checkData);
        }
        return dataSet;
    }
    function convertEventDataToAggregateModeChecks(anEvent, dataSet) {
        var timestamp = Math.floor(Date.now());
        if (dataSet === null) {
            dataSet = [];
        }
        for (var i = 0; i < anEvent.clients.length; i++) {
            var clientName = anEvent.clients[i];
            var checkData = {
                target: anEvent.name,
                datapoints: [
                    [clientName, timestamp]
                ]
            };
            dataSet.push(checkData);
        }
        return dataSet;
    }
    function convertEventDataToAggregateModeClient(anEvent, dataSet) {
        var timestamp = Math.floor(Date.now());
        if (dataSet === null) {
            dataSet = [];
        }
        for (var i = 0; i < anEvent.checks.length; i++) {
            var checkName = anEvent.checks[i];
            var clientData = {
                target: anEvent.name,
                datapoints: [
                    [checkName, timestamp]
                ]
            };
            dataSet.push(clientData);
        }
        return dataSet;
    }
    function convertEventDataToAggregateModeList(anEvent, dataSet) {
        if (dataSet === null) {
            dataSet = [];
        }
        var timestamp = Math.floor(Date.now());
        var item = {
            target: "checks",
            datapoints: [
                [anEvent.checks, timestamp]
            ]
        };
        dataSet.push(item);
        item = {
            target: "clients",
            datapoints: [
                [anEvent.clients, timestamp]
            ]
        };
        dataSet.push(item);
        item = {
            target: "critical",
            datapoints: [
                [anEvent.results.critical, timestamp]
            ]
        };
        dataSet.push(item);
        item = {
            target: "ok",
            datapoints: [
                [anEvent.results.ok, timestamp]
            ]
        };
        dataSet.push(item);
        item = {
            target: "stale",
            datapoints: [
                [anEvent.results.stale, timestamp]
            ]
        };
        dataSet.push(item);
        item = {
            target: "total",
            datapoints: [
                [anEvent.results.total, timestamp]
            ]
        };
        dataSet.push(item);
        item = {
            target: "unknown",
            datapoints: [
                [anEvent.results.unknown, timestamp]
            ]
        };
        dataSet.push(item);
        item = {
            target: "warning",
            datapoints: [
                [anEvent.results.warning, timestamp]
            ]
        };
        dataSet.push(item);
        return dataSet;
    }
    function convertToAggregateModeClientJSON(data, dataSet) {
        var timestamp = Math.floor(Date.now());
        if (dataSet === null) {
            dataSet = [];
        }
        for (var i = 0; i < data.checks.length; i++) {
            var checkName = data.checks[i];
            var clientData = {
                target: data.name,
                datapoints: [
                    [checkName, timestamp]
                ]
            };
            dataSet.push(clientData);
        }
        return dataSet;
    }
    function convertAggregatesToJSON(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        var aggregateName = "ALL";
        if (aTarget.dimensions.length > 0) {
            aggregateName = aTarget.dimensions[0].value;
        }
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            var datapoints = [];
            var data = {
                client: item.name,
                checks: item.checks,
                aggregate_name: aggregateName,
            };
            datapoints.push(data);
            item.datapoints = datapoints;
            item.type = "docs";
        }
        return response;
    }
    exports_1("convertAggregatesToJSON", convertAggregatesToJSON);
    return {
        setters: [
            function (common_1_1) {
                common_1 = common_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=aggregate_functions.js.map