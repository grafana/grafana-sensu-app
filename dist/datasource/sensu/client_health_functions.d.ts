declare function getClientHealthURIs(clientNames: any): any[];
declare function convertClientHealthToJSON(aTarget: any, responses: any): {
    data: any[];
};
declare function convertClientHealthMetricsToJSON(aTarget: any, responses: any): void;
export { getClientHealthURIs, convertClientHealthToJSON, convertClientHealthMetricsToJSON };
