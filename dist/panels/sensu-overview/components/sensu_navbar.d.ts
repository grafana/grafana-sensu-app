import React from "react";
export interface SensuNavBarProps {
    width: number;
    height: number;
    color: string;
}
export declare class SensuNavBar extends React.PureComponent<SensuNavBarProps> {
    props: any;
    constructor(props: any);
    static defaultProps: Partial<SensuNavBarProps>;
    render(): JSX.Element;
}
