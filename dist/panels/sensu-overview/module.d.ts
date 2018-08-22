import { MetricsPanelCtrl } from "app/plugins/sdk";
import * as Series from "./types/series";
declare class SensuOverviewCtrl extends MetricsPanelCtrl {
    static templateUrl: string;
    dataType: string;
    series: any[];
    data: Series.SeriesStat[];
    fontSizes: any[];
    constructor($scope: any, $injector: any, templateSrv: any);
    onInitEditMode(): void;
    onDataReceived(dataList: any): void;
    onDataError(err: any): void;
    setTableColumnToSensibleDefault(tableData: any): void;
    setValuePrefixAndPostfix(data: any): void;
    link(scope: any, elem: any, attrs: any, ctrl: any): void;
}
export { SensuOverviewCtrl, SensuOverviewCtrl as PanelCtrl };
