import React from "react";
export interface SensuMenuProps {
    width: number;
    height: number;
    label: string;
    value: string;
    color?: string;
    colorValue?: boolean;
    colorBackground?: boolean;
    fontSize?: number;
    labelFontSize?: number;
}
export declare class SensuMenu extends React.PureComponent<SensuMenuProps> {
    props: any;
    constructor(props: any);
    static defaultProps: Partial<SensuMenuProps>;
    render(): JSX.Element;
}
