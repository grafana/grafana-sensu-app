System.register(["./common"], function (exports_1, context_1) {
    var common_1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getClientsURIs(checkNames, clientNames) {
        var uris = [];
        var dimensionURI = "/clients";
        if (clientNames.length) {
            for (var i = 0; i < clientNames.length; i++) {
                var aClientName = clientNames[i];
                dimensionURI = "/clients/" + aClientName;
                uris.push(dimensionURI);
            }
        }
        if (uris.length === 0) {
            uris.push(dimensionURI);
        }
        uris.push("/events");
        uris.push("/results");
        return uris;
    }
    exports_1("getClientsURIs", getClientsURIs);
    function convertClientsToDataPoints(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        if (response.data.length === undefined) {
            var singleData = response.data;
            response.data = [];
            response.data.push(singleData);
        }
        switch (aTarget.clientQueryMode) {
            case "list":
                var filterData = [];
                var arrClientNames = [];
                if ((aTarget.filters !== undefined) && (aTarget.filters.length > 0)) {
                    arrClientNames = common_1.getClientsWithFilter(aTarget, response);
                    for (var i = 0; i < response.data.length; i++) {
                        if (arrClientNames.indexOf(response.data[i].name) >= 0) {
                            filterData.push(response.data[i]);
                        }
                    }
                    response.data = filterData;
                }
                for (var i = 0; i < response.data.length; i++) {
                    var data = response.data[i];
                    var datapoints = [];
                    if (data.timestamp !== undefined) {
                        datapoints[0] = [1, (data.timestamp * 1000)];
                    }
                    data.datapoints = datapoints;
                    data.target = data.name;
                }
                break;
            case "count":
                if (response.data.length > 0) {
                    var data = response.data[0];
                    var datapoints = [];
                    var clientCount = 0;
                    var arrClientNames_1 = [];
                    if ((aTarget.filters !== undefined) && (aTarget.filters.length > 0)) {
                        arrClientNames_1 = common_1.getClientsWithFilter(aTarget, response);
                        clientCount = arrClientNames_1.length;
                    }
                    else {
                        clientCount = response.data.length;
                    }
                    if (data.timestamp !== undefined) {
                        datapoints[0] = [clientCount, (data.timestamp * 1000)];
                    }
                    data.datapoints = datapoints;
                    data.address = undefined;
                    data.name = undefined;
                    data.socket = undefined;
                    data.subscriptions = undefined;
                    data.version = undefined;
                    data.target = "ClientCount";
                    if (aTarget.aliasReplaced) {
                        data.target = aTarget.aliasReplaced;
                    }
                    response.data = [data];
                }
                break;
        }
        return response;
    }
    exports_1("convertClientsToDataPoints", convertClientsToDataPoints);
    function convertClientsToJSON(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        if (response.data.length === undefined) {
            var data = response.data;
            response.data = [];
            response.data.push(data);
        }
        var newData = [];
        for (var i = 0; i < response.data.length; i++) {
            var pushItem = true;
            var item = JSON.parse(JSON.stringify(response.data[i]));
            item.datapoints = [];
            item.type = "docs";
            var address = item.address;
            if (item.address === "unknown") {
                item.address = "JIT Client";
            }
            if (aTarget.filters !== undefined) {
                if (aTarget.filters.length !== undefined) {
                    for (var j = 0; j < aTarget.filters.length; j++) {
                        var aFilter = aTarget.filters[j];
                        switch (aFilter.filterType) {
                            case "regex":
                                try {
                                    var flags = aFilter.filterRegexFlags;
                                    var re = new RegExp(aFilter.filterRegex, flags);
                                    if (re.test(item.name)) {
                                        aFilter.filterMessage = "OK";
                                    }
                                    else {
                                        pushItem = false;
                                    }
                                }
                                catch (err) {
                                    aFilter.filterMessage = "Invalid Regular Expression";
                                    break;
                                }
                                break;
                            case "field":
                                if (item.hasOwnProperty(aFilter.filterFieldName)) {
                                    var fieldVal = item[aFilter.filterFieldName];
                                    if (fieldVal !== aFilter.filterFieldValueReplaced) {
                                        pushItem = false;
                                    }
                                }
                                else {
                                    pushItem = false;
                                }
                                break;
                        }
                    }
                }
            }
            if (pushItem) {
                var entry = {
                    type: "docs",
                    datapoints: [item]
                };
                newData.push(entry);
            }
        }
        response.data = newData;
        return response;
    }
    exports_1("convertClientsToJSON", convertClientsToJSON);
    function convertClientHistoryToDataPoints(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        for (var i = 0; i < response.data.length; i++) {
            var anEvent = response.data[i];
            var datapoints = [];
            var startingTimestamp = 0;
            if (anEvent.last_execution !== undefined) {
                startingTimestamp = anEvent.last_execution - (60 * anEvent.history.length);
            }
            if (anEvent.history !== undefined) {
                for (var y = 0; y < anEvent.history.length; y++) {
                    datapoints[y] = [anEvent.history[y], (startingTimestamp + (60 * y)) * 1000];
                }
            }
            anEvent.datapoints = datapoints;
            anEvent.target = "unknown";
            if (anEvent.name !== undefined) {
                anEvent.target = anEvent.name;
            }
            if (anEvent.check !== undefined) {
                anEvent.target = anEvent.check;
            }
        }
        return response;
    }
    exports_1("convertClientHistoryToDataPoints", convertClientHistoryToDataPoints);
    function convertClientSummaryMetricsToJSON(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
    }
    exports_1("convertClientSummaryMetricsToJSON", convertClientSummaryMetricsToJSON);
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
//# sourceMappingURL=client_functions.js.map