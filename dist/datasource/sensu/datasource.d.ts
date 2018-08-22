export declare class SensuDatasource {
    type: any;
    url: string;
    name: string;
    basicAuth: string;
    withCredentials: any;
    q: any;
    backendSrv: any;
    templateSrv: any;
    uiSegmentSrv: any;
    minimumInterval: any;
    constructor(instanceSettings: any, $q: any, backendSrv: any, templateSrv: any, uiSegmentSrv: any);
    metricFindQuery(options: any): any;
    generateClientQueryTags(response: any): any[];
    getClientQueryTagValue(response: any, tag: any): any[];
    mapToClientNameAndVersion(result: any): any;
    getClientNames(dimensions: any): any[];
    getCheckNames(dimensions: any): any[];
    getAggregateNames(dimensions: any): any[];
    replaceFilterValues(filters: any): any;
    getQueryURIByType(target: any): any[];
    getBuckets(responses: any): {};
    processConversions(sourceType: any, aTarget: any, responses: any): {
        data: any[];
    };
    setRawTargets(aTarget: any, result: any): any;
    processFilters(aTarget: any, result: any): any;
    parseQueryResult(responses: any): {
        data: any[];
    };
    getCheckInterval(client: any, checkName: any): void;
    dimensionFindValues(target: any, dimension: any): any;
    mapToTextValue(result: any): any;
    filterFindValues(target: any, filter: any): any;
    query(options: any): any;
    singleDataQuery(singleTarget: any, uriType: any): any;
    multiDone(responses: any): {
        data: any[];
    };
    multipleDataQueries(pendingQueries: any): any;
    testDatasource(): any;
}
