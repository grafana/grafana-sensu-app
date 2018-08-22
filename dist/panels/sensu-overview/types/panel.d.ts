import * as Series from "./series";
export interface PanelOptions {
    links?: any[];
}
export interface MetricPanelOptions extends PanelOptions {
    datasource?: string;
    maxDataPoints?: number;
    interval?: string;
    targets?: any[];
    cacheTimeout?: string;
}
export declare type NullPointMode = Series.NullPointMode;
