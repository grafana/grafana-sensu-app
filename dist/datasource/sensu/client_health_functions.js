System.register(["./common"], function (exports_1, context_1) {
    "use strict";
    var common_1;
    var __moduleName = context_1 && context_1.id;
    function getClientHealthURIs(clientNames) {
        var uris = [];
        if (clientNames.length) {
            for (var i = 0; i < clientNames.length; i++) {
                var aClientName = clientNames[i];
                var resultsURI = "/results/" + aClientName;
                uris.push(resultsURI);
                var eventsURI = "/events/" + aClientName;
                uris.push(eventsURI);
            }
        }
        if (uris.length === 0) {
            uris.push("/results");
            uris.push("/events");
        }
        return uris;
    }
    exports_1("getClientHealthURIs", getClientHealthURIs);
    function convertClientHealthToJSON(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
        var filteredData = [];
        for (var i = 0; i < response.data.length; i++) {
            var anEvent = response.data[i];
            var datapoints = [];
            if (anEvent.check.issued !== undefined) {
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
        response.data = filteredData;
        return response;
    }
    exports_1("convertClientHealthToJSON", convertClientHealthToJSON);
    function convertClientHealthMetricsToJSON(aTarget, responses) {
        var response = common_1.getResponseForTarget(aTarget, responses);
    }
    exports_1("convertClientHealthMetricsToJSON", convertClientHealthMetricsToJSON);
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
//# sourceMappingURL=client_health_functions.js.map