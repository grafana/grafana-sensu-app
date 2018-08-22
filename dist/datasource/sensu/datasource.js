System.register(["angular", "lodash", "app/core/utils/kbn", "./client_functions", "./event_functions", "./aggregate_functions", "./result_functions", "./clienthistory_functions", "./client_health_functions"], function (exports_1, context_1) {
    "use strict";
    var angular_1, lodash_1, kbn_1, client_functions_1, event_functions_1, aggregate_functions_1, result_functions_1, clienthistory_functions_1, client_health_functions_1, SensuDatasource;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (client_functions_1_1) {
                client_functions_1 = client_functions_1_1;
            },
            function (event_functions_1_1) {
                event_functions_1 = event_functions_1_1;
            },
            function (aggregate_functions_1_1) {
                aggregate_functions_1 = aggregate_functions_1_1;
            },
            function (result_functions_1_1) {
                result_functions_1 = result_functions_1_1;
            },
            function (clienthistory_functions_1_1) {
                clienthistory_functions_1 = clienthistory_functions_1_1;
            },
            function (client_health_functions_1_1) {
                client_health_functions_1 = client_health_functions_1_1;
            }
        ],
        execute: function () {
            SensuDatasource = (function () {
                function SensuDatasource(instanceSettings, $q, backendSrv, templateSrv, uiSegmentSrv) {
                    this.type = instanceSettings.type;
                    this.url = instanceSettings.url;
                    this.name = instanceSettings.name;
                    this.basicAuth = instanceSettings.basicAuth;
                    this.withCredentials = instanceSettings.withCredentials;
                    this.q = $q;
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.uiSegmentSrv = uiSegmentSrv;
                }
                SensuDatasource.prototype.metricFindQuery = function (options) {
                    var isClientTags = false;
                    var isClientTagValue = false;
                    var aQuery = "/clients";
                    var tagToValue = "";
                    options = this.templateSrv.replaceWithText(options);
                    if ((options !== undefined) && (options !== "")) {
                        switch (true) {
                            case /clienttags/.test(options):
                                aQuery = "/clients";
                                isClientTags = true;
                                break;
                            case /clienttagvalue/.test(options):
                                aQuery = "/clients";
                                isClientTagValue = true;
                                tagToValue = options.split("tag=")[1];
                                break;
                            default:
                                aQuery = options;
                        }
                        if (!aQuery.startsWith("/", 0)) {
                            aQuery = "/" + aQuery;
                        }
                    }
                    var thisRef = this;
                    return this.backendSrv.datasourceRequest({
                        url: this.url + aQuery,
                        data: options,
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": this.basicAuth
                        }
                    }).then(function (response) {
                        if (isClientTags) {
                            return thisRef.generateClientQueryTags(response);
                        }
                        if (isClientTagValue) {
                            return thisRef.getClientQueryTagValue(response, tagToValue);
                        }
                        return thisRef.mapToClientNameAndVersion(response);
                    });
                };
                SensuDatasource.prototype.generateClientQueryTags = function (response) {
                    var clientQueryTags = [];
                    var allTags = [];
                    var excludedTags = [
                        "name",
                        "socket",
                        "address",
                        "subscriptions",
                        "timestamp",
                        "keepalive",
                        "keepalives",
                        "redact",
                        "version"
                    ];
                    for (var i = 0; i < response.data.length; i++) {
                        var keys = Object.keys(response.data[i]);
                        for (var j = 0; j < keys.length; j++) {
                            var keyName = keys[j];
                            if (excludedTags.indexOf(keyName) === -1) {
                                var tagValue = response.data[i][keyName];
                                var fullKeyName = keyName + "=" + tagValue;
                                if (allTags.indexOf(fullKeyName) < 0) {
                                    allTags.push(fullKeyName);
                                }
                            }
                        }
                    }
                    if (allTags.length > 0) {
                        allTags.sort();
                        for (var i = 0; i < allTags.length; i++) {
                            clientQueryTags.push({
                                text: allTags[i],
                                expandable: true
                            });
                        }
                    }
                    return clientQueryTags;
                };
                SensuDatasource.prototype.getClientQueryTagValue = function (response, tag) {
                    var tagSplit = tag.split("=");
                    var tagToMatch = tagSplit[0];
                    var tagValueToMatch = tagSplit[1];
                    var clientQueryTags = [];
                    var allTagValues = [];
                    for (var i = 0; i < response.data.length; i++) {
                        var keys = Object.keys(response.data[i]);
                        for (var j = 0; j < keys.length; j++) {
                            var keyName = keys[j];
                            if (tagToMatch === keyName) {
                                if (typeof response.data[i][tagToMatch] !== "string") {
                                    for (var z = 0; z < response.data[i][tagToMatch].length; z++) {
                                        if (response.data[i][tagToMatch][z] === tagValueToMatch) {
                                            var tagValue = response.data[i].name;
                                            if (allTagValues.indexOf(tagValue) < 0) {
                                                allTagValues.push(tagValue);
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (response.data[i][tagToMatch] === tagValueToMatch) {
                                        var tagValue = response.data[i].name;
                                        if (allTagValues.indexOf(tagValue) < 0) {
                                            allTagValues.push(tagValue);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (allTagValues.length > 0) {
                        for (var i = 0; i < allTagValues.length; i++) {
                            clientQueryTags.push({
                                text: allTagValues[i]
                            });
                        }
                    }
                    return clientQueryTags;
                };
                SensuDatasource.prototype.mapToClientNameAndVersion = function (result) {
                    return lodash_1.default.map(result.data, function (d) {
                        var x = {
                            text: "",
                            expandable: true
                        };
                        try {
                            x = {
                                text: d.name,
                                expandable: true
                            };
                        }
                        catch (e) {
                            console.log("bad data");
                        }
                        return x;
                    });
                };
                SensuDatasource.prototype.getClientNames = function (dimensions) {
                    var values = [];
                    for (var i = 0; i < dimensions.length; i++) {
                        if (dimensions[i].dimensionType === "clientName") {
                            var aDimension = dimensions[i].value;
                            if (this.templateSrv.getVariableName(aDimension)) {
                                var templateVar = this.templateSrv.replace(aDimension);
                                if (templateVar.length > 0) {
                                    if (templateVar.startsWith("{")) {
                                        templateVar = templateVar.slice(1, -1);
                                        var templateVars = templateVar.split(",");
                                        values.push.apply(values, templateVars);
                                    }
                                    else {
                                        values.push(templateVar);
                                    }
                                }
                            }
                            else {
                                values.push(aDimension);
                            }
                        }
                    }
                    return values;
                };
                SensuDatasource.prototype.getCheckNames = function (dimensions) {
                    var values = [];
                    for (var i = 0; i < dimensions.length; i++) {
                        if (dimensions[i].dimensionType === "checkName") {
                            var aDimension = dimensions[i].value;
                            if (this.templateSrv.getVariableName(aDimension)) {
                                var templateVar = this.templateSrv.replace(aDimension);
                                if (templateVar.length > 0) {
                                    if (templateVar.startsWith("{")) {
                                        templateVar = templateVar.slice(1, -1);
                                        var templateVars = templateVar.split(",");
                                        values.push.apply(values, templateVars);
                                    }
                                    else {
                                        values.push(templateVar);
                                    }
                                }
                            }
                            else {
                                values.push(aDimension);
                            }
                        }
                    }
                    return values;
                };
                SensuDatasource.prototype.getAggregateNames = function (dimensions) {
                    var values = [];
                    for (var i = 0; i < dimensions.length; i++) {
                        if (dimensions[i].dimensionType === "aggregateName") {
                            var aDimension = dimensions[i].value;
                            if (this.templateSrv.getVariableName(aDimension)) {
                                var templateVar = this.templateSrv.replace(aDimension);
                                if (templateVar.length > 0) {
                                    if (templateVar.startsWith("{")) {
                                        templateVar = templateVar.slice(1, -1);
                                        var templateVars = templateVar.split(",");
                                        values.push.apply(values, templateVars);
                                    }
                                    else {
                                        values.push(templateVar);
                                    }
                                }
                            }
                            else {
                                values.push(aDimension);
                            }
                        }
                    }
                    return values;
                };
                SensuDatasource.prototype.replaceFilterValues = function (filters) {
                    for (var i = 0; i < filters.length; i++) {
                        var aFilter = filters[i];
                        switch (aFilter.filterType) {
                            case "field":
                                var aFieldValue = aFilter.filterFieldValue;
                                var templatedValue = this.templateSrv.replace(aFieldValue);
                                aFilter.filterFieldValueReplaced = templatedValue;
                                break;
                        }
                    }
                    return filters;
                };
                SensuDatasource.prototype.getQueryURIByType = function (target) {
                    var uris = [];
                    var dimensionURI = "/events";
                    var clientNames = null;
                    var checkNames = null;
                    var aggregateNames = null;
                    if (target.dimensions !== undefined) {
                        clientNames = this.getClientNames(target.dimensions);
                        checkNames = this.getCheckNames(target.dimensions);
                        aggregateNames = this.getAggregateNames(target.dimensions);
                    }
                    if (target.filters !== undefined) {
                        this.replaceFilterValues(target.filters);
                    }
                    if (target.alias !== undefined) {
                        target.aliasReplaced = this.templateSrv.replace(target.alias);
                    }
                    switch (target.sourceType) {
                        case "aggregates":
                        case "aggregates_json":
                            uris = aggregate_functions_1.getAggregateURIs(target, aggregateNames);
                            break;
                        case "check_subscriptions":
                            break;
                        case "client_health_json":
                            uris = client_health_functions_1.getClientHealthURIs(clientNames);
                            break;
                        case "clients":
                        case "clients_json":
                            uris = client_functions_1.getClientsURIs(checkNames, clientNames);
                            break;
                        case "clienthistory":
                            uris = clienthistory_functions_1.getClientHistoryURIs(clientNames);
                            break;
                        case "event_metrics":
                        case "event_metrics_json":
                        case "events":
                        case "events_json":
                            uris = event_functions_1.getEventsURIs(checkNames, clientNames);
                            break;
                        case "results_json":
                        case "results_table":
                            uris = result_functions_1.getResultURIs(checkNames, clientNames);
                            break;
                        case "sensu_health_json":
                            break;
                        case "silenced_entries_json":
                            break;
                        case "stashes_json":
                            break;
                    }
                    return uris;
                };
                SensuDatasource.prototype.getBuckets = function (responses) {
                    var buckets = {};
                    for (var i = 0; i < responses.data.length; i++) {
                        var refId = responses.data[i].target.refId;
                        if (buckets.hasOwnProperty(refId)) {
                            buckets[refId].push(responses.data[i]);
                        }
                        else {
                            buckets[refId] = [responses.data[i]];
                        }
                    }
                    return buckets;
                };
                SensuDatasource.prototype.processConversions = function (sourceType, aTarget, responses) {
                    var result = { data: [] };
                    switch (sourceType) {
                        case "aggregates":
                            result = aggregate_functions_1.convertAggregatesToDataPoints(aTarget, responses);
                            break;
                        case "aggregates_json":
                            result = aggregate_functions_1.convertAggregatesToJSON(aTarget, responses);
                            return result;
                        case "clients":
                            result = client_functions_1.convertClientsToDataPoints(aTarget, responses);
                            return result;
                        case "clients_json":
                            result = client_functions_1.convertClientsToJSON(aTarget, responses);
                            return result;
                        case "client_health_json":
                            result = client_health_functions_1.convertClientHealthToJSON(aTarget, responses);
                            return result;
                        case "clienthistory":
                            result = client_functions_1.convertClientHistoryToDataPoints(aTarget, responses);
                            break;
                        case "events":
                            result = event_functions_1.convertEventsToDataPoints(aTarget, responses);
                            break;
                        case "events_json":
                            result = event_functions_1.convertEventsToJSON(aTarget, responses);
                            break;
                        case "event_metrics":
                            result = event_functions_1.convertEventsToEventMetrics(aTarget, responses);
                            break;
                        case "event_metrics_json":
                            result = event_functions_1.convertEventsToEventMetricsJSON(aTarget, responses);
                            break;
                        case "results_json":
                            result = result_functions_1.convertResultsToJSON(aTarget, responses);
                            break;
                        case "results_table":
                            result = result_functions_1.convertResultsToTable(aTarget, responses);
                            break;
                        default:
                            console.log("Unknown source type");
                            break;
                    }
                    return result;
                };
                SensuDatasource.prototype.setRawTargets = function (aTarget, result) {
                    for (var i = 0; i < result.data.length; i++) {
                        result.data[i].rawTarget = result.data[i].target;
                    }
                    return result;
                };
                SensuDatasource.prototype.processFilters = function (aTarget, result) {
                    if ((aTarget.filters !== undefined) && (aTarget.filters.length > 0)) {
                        var filterData = [];
                        for (var i = 0; i < aTarget.filters.length; i++) {
                            var aFilter = aTarget.filters[i];
                            for (var j = 0; j < result.data.length; j++) {
                                var aRawTarget = result.data[j].rawTarget;
                                if (aFilter.filterType === aRawTarget) {
                                    if (aTarget.aliasReplaced) {
                                        result.data[j].target = aTarget.aliasReplaced + " " + aRawTarget;
                                    }
                                    filterData.push(result.data[j]);
                                }
                            }
                        }
                        if (filterData.length > 0) {
                            result.data = filterData;
                        }
                    }
                    else {
                        if (aTarget.aliasReplaced) {
                            for (var i = 0; i < result.data.length; i++) {
                                result.data[i].target = aTarget.aliasReplaced;
                            }
                        }
                    }
                    return result;
                };
                SensuDatasource.prototype.parseQueryResult = function (responses) {
                    var allResults = { data: [] };
                    if (!responses || !responses.data) {
                        return allResults;
                    }
                    var buckets = this.getBuckets(responses);
                    var bucketKeys = Object.keys(buckets);
                    for (var i = 0; i < bucketKeys.length; i++) {
                        var aKey = bucketKeys[i];
                        var sourceType = buckets[aKey][0].target.sourceType;
                        var aTarget = buckets[aKey][0].target;
                        var result = this.processConversions(sourceType, aTarget, responses);
                        result = this.setRawTargets(aTarget, result);
                        result = this.processFilters(aTarget, result);
                        for (var i_1 = 0; i_1 < result.data.length; i_1++) {
                            allResults.data.push(result.data[i_1]);
                        }
                    }
                    return allResults;
                };
                SensuDatasource.prototype.getCheckInterval = function (client, checkName) {
                };
                SensuDatasource.prototype.dimensionFindValues = function (target, dimension) {
                    var dimensionURI = "/clients";
                    switch (dimension.dimensionType) {
                        case "clientName":
                            dimensionURI = "/clients";
                            break;
                        case "checkName":
                            dimensionURI = "/checks";
                            break;
                        case "aggregateName":
                            dimensionURI = "/aggregates";
                            break;
                    }
                    return this.backendSrv.datasourceRequest({
                        url: this.url + dimensionURI,
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": this.basicAuth
                        }
                    }).then(this.mapToTextValue);
                };
                SensuDatasource.prototype.mapToTextValue = function (result) {
                    return lodash_1.default.map(result.data, function (d, i) {
                        return {
                            text: d.name,
                            value: d.name
                        };
                    });
                };
                SensuDatasource.prototype.filterFindValues = function (target, filter) {
                    var filterURI = "/clients";
                    switch (filter.filterType) {
                        case "clientName":
                            filterURI = "/clients";
                            break;
                        case "checkName":
                            filterURI = "/checks";
                            break;
                        case "aggregateName":
                            filterURI = "/aggregates";
                            break;
                    }
                    return this.backendSrv.datasourceRequest({
                        url: this.url + filterURI,
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": this.basicAuth
                        }
                    }).then(this.mapToTextValue);
                };
                SensuDatasource.prototype.query = function (options) {
                    var queries = [];
                    var thisRef = this;
                    var singleTarget = null;
                    options.targets.forEach(function (target) {
                        queries.push(target);
                    });
                    var interval = options.interval;
                    if (kbn_1.default.interval_to_ms(interval) < this.minimumInterval) {
                        interval = kbn_1.default.secondsToHms(this.minimumInterval / 1000);
                    }
                    var deferred = this.q.defer();
                    if (queries.length === 0) {
                        deferred.resolve({
                            data: []
                        });
                        return deferred.promise;
                    }
                    var allQueries = this.q.all({
                        first: thisRef.multipleDataQueries(queries),
                    });
                    allQueries.then(function (results) {
                        deferred.resolve(results.first);
                    });
                    return deferred.promise;
                };
                SensuDatasource.prototype.singleDataQuery = function (singleTarget, uriType) {
                    var deferred = this.q.defer();
                    var params = {};
                    var httpOptions = {
                        method: "GET",
                        url: this.url + uriType,
                        params: params,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": this.basicAuth
                        }
                    };
                    this.backendSrv.datasourceRequest(httpOptions)
                        .then(function (response) {
                        var anError = null;
                        if (response.status !== 200) {
                            console.log("error...");
                            anError = new Error("Bad Status: " + response.status);
                            deferred.reject(anError);
                        }
                        if (!response.data) {
                            anError = new Error("No data");
                            deferred.reject(anError);
                        }
                        deferred.resolve({ target: singleTarget, response: response });
                    }, function (response) {
                        console.error("Unable to load data. Response: %o", response.data ? response.data.message : response);
                        var error = new Error("Unable to load data");
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                SensuDatasource.prototype.multiDone = function (responses) {
                    return this.parseQueryResult(responses);
                };
                SensuDatasource.prototype.multipleDataQueries = function (pendingQueries) {
                    var deferred = this.q.defer();
                    var dataCalls = [];
                    var thisRef = this;
                    angular_1.default.forEach(pendingQueries, function (aTarget) {
                        var uriList = thisRef.getQueryURIByType(aTarget);
                        for (var i = 0; i < uriList.length; i++) {
                            dataCalls.push(thisRef.singleDataQuery(aTarget, uriList[i]));
                        }
                    });
                    this.q.all(dataCalls)
                        .then(function (results) {
                        var response = {
                            data: []
                        };
                        angular_1.default.forEach(results, function (result) {
                            response.data.push(result);
                        });
                        deferred.resolve(thisRef.multiDone(response));
                    }, function (errors) {
                        deferred.reject(errors);
                    }, function (updates) {
                        deferred.update(updates);
                    });
                    return deferred.promise;
                };
                SensuDatasource.prototype.testDatasource = function () {
                    return this.backendSrv.datasourceRequest({
                        url: this.url + "/info",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": this.basicAuth
                        },
                        method: "GET",
                    }).then(function (response) {
                        if (response.status === 200) {
                            return {
                                status: "success",
                                message: "Data source is working",
                                title: "Success"
                            };
                        }
                        return {
                            status: "error",
                            message: "Data source is not working",
                            title: "Error"
                        };
                    });
                };
                return SensuDatasource;
            }());
            exports_1("SensuDatasource", SensuDatasource);
        }
    };
});
//# sourceMappingURL=datasource.js.map