declare function getResultURIs(checkNames: any, clientNames: any): any[];
declare function convertResultsToTable(aTarget: any, responses: any): {
    data: any[];
};
declare function convertResultsToJSON(aTarget: any, responses: any): {
    data: any[];
};
declare function convertResultsToDataPoints(aTarget: any, responses: any): {
    data: any[];
};
export { getResultURIs, convertResultsToTable, convertResultsToDataPoints, convertResultsToJSON };
