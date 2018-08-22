declare function getEventsURIs(checkNames: any, clientNames: any): any[];
declare function convertEventsToDataPoints(aTarget: any, responses: any): {
    data: any[];
};
declare function convertEventsToJSON(aTarget: any, responses: any): {
    data: any[];
};
declare function convertEventsToEventMetricsJSON(aTarget: any, responses: any): {
    data: any[];
};
declare function includeEventTarget(target: any, anEvent: any): boolean;
declare function convertEventsToEventMetrics(aTarget: any, responses: any): {
    data: any[];
};
export { convertEventsToJSON, convertEventsToDataPoints, convertEventsToEventMetrics, convertEventsToEventMetricsJSON, getEventsURIs, includeEventTarget };
