System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getResponseForTarget(aTarget, responses) {
        var response = {
            data: []
        };
        for (var i = 0; i < responses.data.length; i++) {
            if (responses.data[i].target === aTarget) {
                response.data = responses.data[i].response.data;
                break;
            }
        }
        return response;
    }
    exports_1("getResponseForTarget", getResponseForTarget);
    function getClientsWithFilter(aTarget, response) {
        var arrClientNames = [];
        for (var i = 0; i < aTarget.filters.length; i++) {
            var aFilter = aTarget.filters[i];
            switch (aFilter.filterType) {
                case "field":
                    for (var j = 0; j < response.data.length; j++) {
                        if (response.data[j].hasOwnProperty(aFilter.filterFieldName)) {
                            var fieldVal = response.data[j][aFilter.filterFieldName];
                            if (fieldVal === aFilter.filterFieldValueReplaced) {
                                if (arrClientNames.indexOf(response.data[j].name) === -1) {
                                    arrClientNames.push(response.data[j].name);
                                }
                            }
                        }
                    }
                    break;
                case "fetch":
                    for (var j = 0; j < response.data.length; j++) {
                        if (aFilter.value === response.data[j].name) {
                            if (arrClientNames.indexOf(response.data[j].name) === -1) {
                                arrClientNames.push(response.data[j].name);
                            }
                        }
                    }
                    break;
                case "regex":
                    try {
                        var flags = aFilter.filterRegexFlags;
                        var re = new RegExp(aFilter.filterRegex, flags);
                        for (var j = 0; j < response.data.length; j++) {
                            if (re.test(response.data[j].name)) {
                                if (arrClientNames.indexOf(response.data[j].name) === -1) {
                                    arrClientNames.push(response.data[j].name);
                                }
                            }
                        }
                    }
                    catch (err) {
                        aFilter.filterMessage = "Invalid Regular Expression";
                    }
                    break;
            }
        }
        return arrClientNames;
    }
    exports_1("getClientsWithFilter", getClientsWithFilter);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=common.js.map