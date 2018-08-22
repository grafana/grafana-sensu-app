export declare type Datapoint = [number, number];
export declare type Flotpair = [number, number];
export interface SeriesData {
    datapoints: Datapoint[];
    target: string;
}
export declare type DataList = SeriesData[];
export interface SeriesStat {
    alias?: string;
    label?: string;
    value?: number;
    valueRounded?: number;
    valueFormatted?: string;
    flotpairs?: Flotpair[];
    scopedVars?: any;
}
export declare type NullPointMode = "null" | "connected" | "null as zero" | null;
