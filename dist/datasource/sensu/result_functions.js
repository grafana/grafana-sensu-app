System.register(["./common"], function (exports_1, context_1) {
    var common_1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getResultURIs(checkNames, clientNames) {
        var uris = [];
        var dimensionURI = "/results";
        var aClientName = null;
        var aCheckName = null;
        var anAggregateName = null;
        if (clientNames.length) {
            for (var i = 0; i < clientNames.length; i++) {
                aClientName = clientNames[i];
                dimensionURI = "/results/" + aClientName;
                uris.push(dimensionURI);
            }
        }
        if ((checkNames.length) && (clientNames.length)) {
            for (var i = 0; i < clientNames.length; i++) {
                aClientName = clientNames[i];
                for (var j = 0; j < checkNames.length; j++) {
                    aCheckName = checkNames[i];
                    dimensionURI = "/results/" + aClientName + "/" + aCheckName;
                    uris.push(dimensionURI);
                }
            }
        }
        if (uris.length === 0) {
            uris.push(dimensionURI);
        }
        return uris;
    }
    exports_1("getResultURIs", getResultURIs);
    function convertResultsToTable(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        if (response.data.length === undefined) {
            var singleData = response.data;
            response.data = [];
            response.data.push(singleData);
        }
        var rowData = [];
        for (var i = 0; i < response.data.length; i++) {
            var rowInfo = response.data[i];
            var aRow = [
                rowInfo.check.issued * 1000,
                rowInfo.client,
                rowInfo.check.name,
                rowInfo.check.status,
                rowInfo.check.issued * 1000,
                rowInfo.check.executed * 1000,
                rowInfo.check.output,
                rowInfo.check.type,
                rowInfo.check.thresholds.warning,
                rowInfo.check.thresholds.critical
            ];
            rowData.push(aRow);
        }
        var anEvent = response.data[0];
        var datapoints = [];
        datapoints[0] = [anEvent.check.status, (anEvent.check.issued * 1000)];
        anEvent.datapoints = datapoints;
        anEvent.type = "table";
        anEvent.columns = [
            { text: "Time", type: "date" },
            { text: "client" },
            { text: "check.name" },
            { text: "check.status" },
            { text: "check.issued", type: "date" },
            { text: "check.executed", type: "date" },
            { text: "check.output" },
            { text: "check.type" },
            { text: "check.thresholds.warning" },
            { text: "check.thresholds.critical" }
        ];
        anEvent.rows = rowData;
        response.data = [anEvent];
        return response;
    }
    exports_1("convertResultsToTable", convertResultsToTable);
    function convertResultsToJSON(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        for (var i = 0; i < response.data.length; i++) {
            var anEvent = response.data[i];
            var datapoints = [];
            if (anEvent.check.issued !== undefined) {
                var data = {
                    timestamp: (anEvent.check.issued * 1000),
                    message: anEvent.check.name,
                    client: anEvent.client,
                    check: {
                        name: anEvent.check.name,
                        issued: (anEvent.check.issued * 1000),
                        executed: (anEvent.check.executed * 1000),
                        output: anEvent.check.output,
                        status: anEvent.check.status,
                        type: anEvent.check.type
                    }
                };
                datapoints.push(data);
                anEvent.datapoints = datapoints;
                delete anEvent.check;
                delete anEvent.client;
                anEvent.type = "docs";
            }
        }
        return response;
    }
    exports_1("convertResultsToJSON", convertResultsToJSON);
    function convertResultsToDataPoints(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        if (response.data.length === undefined) {
            var singleData = response.data;
            response.data = [];
            response.data.push(singleData);
        }
        for (var i = 0; i < response.data.length; i++) {
            var anEvent = response.data[i];
            var datapoints = [];
            if (anEvent.check.issued !== undefined) {
                datapoints[0] = [anEvent.check.status, (anEvent.check.issued * 1000)];
            }
            anEvent.datapoints = datapoints;
            if (anEvent.check.name !== undefined) {
                anEvent.target = anEvent.check.name;
            }
            else {
                anEvent.target = anEvent.check;
            }
        }
        return response;
    }
    exports_1("convertResultsToDataPoints", convertResultsToDataPoints);
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
//# sourceMappingURL=result_functions.js.map