declare function getClientsURIs(checkNames: any, clientNames: any): any[];
declare function convertClientsToDataPoints(aTarget: any, responses: any): {
    data: any[];
};
declare function convertClientsToJSON(aTarget: any, responses: any): {
    data: any[];
};
declare function convertClientHistoryToDataPoints(aTarget: any, responses: any): {
    data: any[];
};
declare function convertClientSummaryMetricsToJSON(aTarget: any, responses: any): void;
export { convertClientsToDataPoints, convertClientsToJSON, convertClientHistoryToDataPoints, convertClientSummaryMetricsToJSON, getClientsURIs };
