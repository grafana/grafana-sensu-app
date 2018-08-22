import { QueryCtrl } from "app/plugins/sdk";
import "./css/query-editor.css!";
export declare class SensuDatasourceQueryCtrl extends QueryCtrl {
    static templateUrl: string;
    scope: any;
    uiSegmentSrv: any;
    templateSrv: any;
    sourceTypes: any[];
    dimensionTypes: any;
    filterTypes: any;
    aggregateModes: any;
    clientQueryModes: any;
    eventMetricModes: any;
    constructor($scope: any, $injector: any, templateSrv: any, uiSegmentSrv: any);
    removeDimension(dimension: any): void;
    addDimension(): void;
    getDimensionValues(dimension: any): any;
    removeFilter(filter: any): void;
    addFilter(): void;
    getFilterValues(filter: any): any;
    getOptions(): any;
    sourceTypeChanged(): void;
    modeChanged(): void;
    onChangeInternal(): void;
}
