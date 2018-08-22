System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getClientHistoryURIs(clientNames) {
        var uris = [];
        var dimensionURI = "/clients";
        if (clientNames.length) {
            for (var i = 0; i < clientNames.length; i++) {
                var aClientName = clientNames[i];
                dimensionURI = "/clients/" + aClientName + "/history";
                uris.push(dimensionURI);
            }
        }
        if (uris.length === 0) {
            uris.push(dimensionURI);
        }
        return uris;
    }
    exports_1("getClientHistoryURIs", getClientHistoryURIs);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=clienthistory_functions.js.map