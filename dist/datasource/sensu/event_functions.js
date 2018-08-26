System.register(["./common"], function (exports_1, context_1) {
    var common_1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getEventsURIs(checkNames, clientNames) {
        var uris = [];
        var dimensionURI = "/events";
        var aClientName = null;
        var aCheckName = null;
        var anAggregateName = null;
        if (clientNames.length) {
            for (var i = 0; i < clientNames.length; i++) {
                aClientName = clientNames[i];
                dimensionURI = "/events/" + aClientName;
                uris.push(dimensionURI);
            }
        }
        if ((checkNames.length) && (clientNames.length)) {
            for (var i = 0; i < clientNames.length; i++) {
                aClientName = clientNames[i];
                for (var j = 0; j < checkNames.length; j++) {
                    aCheckName = checkNames[i];
                    dimensionURI = "/events/" + aClientName + "/" + aCheckName;
                    uris.push(dimensionURI);
                }
            }
        }
        if (uris.length === 0) {
            uris.push(dimensionURI);
        }
        return uris;
    }
    exports_1("getEventsURIs", getEventsURIs);
    function convertEventsToDataPoints(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        if (response.data.length === undefined) {
            var singleData = response.data;
            response.data = [];
            response.data.push(singleData);
        }
        var filteredData = [];
        for (var i = 0; i < response.data.length; i++) {
            var anEvent = response.data[i];
            var datapoints = [];
            var startingTimestamp = 0;
            if (anEvent.timestamp !== undefined) {
                startingTimestamp = anEvent.timestamp - (60 * anEvent.check.history.length);
            }
            if (anEvent.last_execution !== undefined) {
                startingTimestamp = anEvent.last_execution - (60 * anEvent.history.length);
            }
            for (var y = 0; y < anEvent.check.history.length; y++) {
                datapoints[y] = [anEvent.check.history[y], (startingTimestamp + (60 * y)) * 1000];
            }
            anEvent.datapoints = datapoints;
            anEvent.target = anEvent.client.name;
            anEvent.clientName = anEvent.client.name;
            if (includeEventTarget(aTarget, anEvent)) {
                if (!anEvent.silenced) {
                    filteredData.push(anEvent);
                }
                if (anEvent.silenced && !aTarget.hideSilencedEvents) {
                    filteredData.push(anEvent);
                }
            }
        }
        var newResponse = { data: filteredData };
        return newResponse;
    }
    exports_1("convertEventsToDataPoints", convertEventsToDataPoints);
    function convertEventsToJSON(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        var filteredData = [];
        for (var i = 0; i < response.data.length; i++) {
            var anEvent = response.data[i];
            var datapoints = [];
            if ((anEvent.check.issued !== undefined) && includeEventTarget(aTarget, anEvent)) {
                var clientShortname = anEvent.client.name;
                var parts = anEvent.client.name.split(".");
                if (parts.length > 0) {
                    clientShortname = parts[0];
                }
                anEvent.client.client_short_name = clientShortname;
                var statusText = "UNKNOWN";
                if ((anEvent.check !== undefined) && (anEvent.check.status !== undefined)) {
                    switch (anEvent.check.status) {
                        case 0:
                            statusText = "OK";
                            break;
                        case 1:
                            statusText = "WARNING";
                            break;
                        case 2:
                            statusText = "CRITICAL";
                            break;
                        case 3:
                            statusText = "UNKNOWN";
                            break;
                        default:
                            statusText = "UNKNOWN";
                            break;
                    }
                }
                anEvent.check.status_text = statusText;
                var data = {
                    timestamp: (anEvent.check.issued * 1000),
                    check_name: anEvent.check.name,
                    client: anEvent.client,
                    check: anEvent.check,
                    occurrences: anEvent.occurrences,
                    occurrences_watermark: anEvent.occurrences_watermark,
                    action: anEvent.action,
                    id: anEvent.id,
                    last_state_change: (anEvent.last_state_change * 1000),
                    last_ok: (anEvent.last_ok * 1000),
                    silenced: anEvent.silenced,
                    silenced_by: anEvent.silenced_by
                };
                try {
                    data.check.issued = data.check.issued * 1000;
                    data.check.executed = data.check.executed * 1000;
                }
                catch (err) {
                }
                datapoints.push(data);
                anEvent.datapoints = datapoints;
                delete anEvent.check;
                delete anEvent.client;
                anEvent.type = "docs";
                if (!anEvent.silenced) {
                    filteredData.push(anEvent);
                }
                if (anEvent.silenced && !aTarget.hideSilencedEvents) {
                    filteredData.push(anEvent);
                }
            }
        }
        var newResponse = { data: filteredData };
        return newResponse;
    }
    exports_1("convertEventsToJSON", convertEventsToJSON);
    function convertEventsToEventMetricsJSON(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        var timestamp = 0;
        try {
            timestamp = response.data[0].check.issued * 1000;
        }
        catch (err) {
        }
        var eventMetrics = {
            target: "allEvents",
            timestamp: timestamp,
            numEvents: 0,
            numSilenced: 0,
            numClientsSilenced: 0,
            numChecksSilenced: 0,
            numWarningEvents: 0,
            numWarningEventsSilenced: 0,
            numCriticalEvents: 0,
            numCriticalEventsSilenced: 0,
            numUnknownEvents: 0,
            numUnknownEventsSilenced: 0
        };
        var clientNames = [];
        var checkNames = [];
        for (var i = 0; i < response.data.length; i++) {
            var anEvent = response.data[i];
            if (anEvent.check.issued !== undefined) {
                if ((anEvent.check !== undefined) && (anEvent.check.status !== undefined) && includeEventTarget(aTarget, anEvent)) {
                    eventMetrics.numEvents += 1;
                    switch (anEvent.check.status) {
                        case 1:
                            eventMetrics.numWarningEvents += 1;
                            if (anEvent.silenced) {
                                eventMetrics.numWarningEventsSilenced += 1;
                                eventMetrics.numSilenced += 1;
                            }
                            break;
                        case 2:
                            eventMetrics.numCriticalEvents += 1;
                            if (anEvent.silenced) {
                                eventMetrics.numCriticalEventsSilenced += 1;
                                eventMetrics.numSilenced += 1;
                            }
                            break;
                        default:
                            eventMetrics.numUnknownEvents += 1;
                            if (anEvent.silenced) {
                                eventMetrics.numUnknownEventsSilenced += 1;
                                eventMetrics.numSilenced += 1;
                            }
                            break;
                    }
                }
                if (clientNames.indexOf(anEvent.client.name) < 0) {
                    clientNames.push(anEvent.client.name);
                }
                if (checkNames.indexOf(anEvent.check.name) < 0) {
                    checkNames.push(anEvent.check.name);
                }
                for (var i_1 = 0; i_1 < anEvent.silenced_by.length; i_1++) {
                    if (anEvent.silenced_by[i_1].indexOf("*") >= 0) {
                        eventMetrics.numClientsSilenced += 1;
                    }
                    else {
                        eventMetrics.numChecksSilenced += 1;
                    }
                }
            }
        }
        eventMetrics.numClientsSilenced = clientNames.length;
        eventMetrics.numChecksSilenced = checkNames.length;
        response.data = [{
                target: "allEvents",
                timestamp: timestamp,
                type: "docs",
                datapoints: [eventMetrics]
            }];
        return response;
    }
    exports_1("convertEventsToEventMetricsJSON", convertEventsToEventMetricsJSON);
    function includeEventTarget(target, anEvent) {
        if (target.filters === undefined) {
            return true;
        }
        if (target.filters.length === 0) {
            return true;
        }
        for (var i = 0; i < target.filters.length; i++) {
            var aFilter = target.filters[i];
            switch (aFilter.filterType) {
                case "field":
                    if (anEvent.client.hasOwnProperty(aFilter.filterFieldName)) {
                        var aVal = anEvent.client[aFilter.filterFieldName];
                        if (aVal === aFilter.filterFieldValueReplaced) {
                            return true;
                        }
                    }
                    break;
            }
        }
        return false;
    }
    exports_1("includeEventTarget", includeEventTarget);
    function convertEventsToEventMetrics(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        var newResponse = { data: [] };
        var timestamp = 0;
        try {
            timestamp = response.data[0].check.issued * 1000;
        }
        catch (err) {
        }
        var eventMetrics = {
            target: "allEvents",
            timestamp: timestamp,
            numEvents: 0.0,
            numSilenced: 0.0,
            numClientsSilenced: 0.0,
            numChecksSilenced: 0.0,
            numWarningEvents: 0.0,
            numWarningEventsSilenced: 0.0,
            numCriticalEvents: 0.0,
            numCriticalEventsSilenced: 0.0,
            numUnknownEvents: 0.0,
            numUnknownEventsSilenced: 0.0
        };
        var clientNames = [];
        var checkNames = [];
        for (var i = 0; i < response.data.length; i++) {
            var anEvent = response.data[i];
            if (anEvent.check.issued !== undefined) {
                if ((anEvent.check !== undefined) && (anEvent.check.status !== undefined) && includeEventTarget(aTarget, anEvent)) {
                    eventMetrics.numEvents += 1.0;
                    switch (anEvent.check.status) {
                        case 1:
                            eventMetrics.numWarningEvents += 1.0;
                            if (anEvent.silenced) {
                                eventMetrics.numWarningEventsSilenced += 1.0;
                                eventMetrics.numSilenced += 1.0;
                            }
                            break;
                        case 2:
                            eventMetrics.numCriticalEvents += 1.0;
                            if (anEvent.silenced) {
                                eventMetrics.numCriticalEventsSilenced += 1.0;
                                eventMetrics.numSilenced += 1.0;
                            }
                            break;
                        default:
                            eventMetrics.numUnknownEvents += 1.0;
                            if (anEvent.silenced) {
                                eventMetrics.numUnknownEventsSilenced += 1.0;
                                eventMetrics.numSilenced += 1.0;
                            }
                            break;
                    }
                }
                if (clientNames.indexOf(anEvent.client.name) < 1.0) {
                    clientNames.push(anEvent.client.name);
                }
                if (checkNames.indexOf(anEvent.check.name) < 1.0) {
                    checkNames.push(anEvent.check.name);
                }
                for (var i_2 = 0; i_2 < anEvent.silenced_by.length; i_2++) {
                    if (anEvent.silenced_by[i_2].indexOf("*") >= 0) {
                        eventMetrics.numClientsSilenced += 1.0;
                    }
                    else {
                        eventMetrics.numChecksSilenced += 1.0;
                    }
                }
            }
        }
        var targetName = null;
        if (aTarget.name !== undefined) {
            targetName = aTarget.name;
        }
        if (aTarget.aliasReplaced !== undefined) {
            targetName = aTarget.aliasReplaced;
        }
        newResponse.data = [{
                target: targetName,
                datapoints: [
                    [0.00, timestamp]
                ]
            }];
        switch (aTarget.eventMetricMode) {
            case "all_events_count":
                if (targetName === null) {
                    newResponse.data[0].target = "all_events_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numEvents, timestamp]];
                break;
            case "active_events_count":
                if (targetName === null) {
                    newResponse.data[0].target = "active_events_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numEvents - eventMetrics.numSilenced, timestamp]];
                break;
            case "critical_count":
                if (targetName === null) {
                    newResponse.data[0].target = "critical_events_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numCriticalEvents, timestamp]];
                break;
            case "critical_active_count":
                if (targetName === null) {
                    newResponse.data[0].target = "critical_active_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numCriticalEvents - eventMetrics.numCriticalEventsSilenced, timestamp]];
                break;
            case "critical_silenced_count":
                if (targetName === null) {
                    newResponse.data[0].target = "critical_silenced_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numCriticalEventsSilenced, timestamp]];
                break;
            case "warning_count":
                if (targetName === null) {
                    newResponse.data[0].target = "warning_events_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numWarningEvents, timestamp]];
                break;
            case "warning_active_count":
                if (targetName === null) {
                    newResponse.data[0].target = "warning_active_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numWarningEvents - eventMetrics.numWarningEventsSilenced, timestamp]];
                break;
            case "warning_silenced_count":
                if (targetName === null) {
                    newResponse.data[0].target = "warning_silenced_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numWarningEventsSilenced, timestamp]];
                break;
            case "unknown_count":
                if (targetName === null) {
                    newResponse.data[0].target = "unknown_events_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numUnknownEvents, timestamp]];
                break;
            case "unknown_active_count":
                if (targetName === null) {
                    newResponse.data[0].target = "unknown_active_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numUnknownEvents - eventMetrics.numUnknownEventsSilenced, timestamp]];
                break;
            case "unknown_silenced_count":
                if (targetName === null) {
                    newResponse.data[0].target = "unknown_silenced_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numUnknownEventsSilenced, timestamp]];
                break;
            case "silenced_count":
                if (targetName === null) {
                    newResponse.data[0].target = "silenced_events_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numSilenced, timestamp]];
                break;
            case "clients_silenced_count":
                if (targetName === null) {
                    newResponse.data[0].target = "clients_silenced_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numClientsSilenced, timestamp]];
                break;
            case "checks_silenced_count":
                if (targetName === null) {
                    newResponse.data[0].target = "checks_silenced_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numChecksSilenced, timestamp]];
                break;
            default:
                if (targetName === null) {
                    newResponse.data[0].target = "all_events_count";
                }
                newResponse.data[0].datapoints = [[eventMetrics.numEvents, timestamp]];
                break;
        }
        return newResponse;
    }
    exports_1("convertEventsToEventMetrics", convertEventsToEventMetrics);
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
//# sourceMappingURL=event_functions.js.map