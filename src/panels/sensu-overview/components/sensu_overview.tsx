import {PureComponent} from "react";
import { getBGColor } from "./utils";
import * as React from "react";

//import * as SensuOverviewPanel from "../types";
//import { SensuMenu } from "./sensu_menu";
import { SensuNavBar} from "./sensu_navbar";

const DEFAULT_COLOR = "rgb(31, 120, 193)";
const BACKGROUND_OPACITY = 0.1;
const LABEL_SIZE_COEF = 0.7;

//export interface SensuOverviewProps {
 // options: SensuOverviewPanel.PanelOptions;
 // size: SensuOverviewPanel.PanelSize;
//}
export interface SensuOverviewProps {
  options : any;
  size : any;
}

//export function SensuOverview(props: SensuOverviewProps) {
class SensuOverview extends PureComponent <SensuOverviewProps> {
  props: any;
  constructor(props: Readonly<SensuOverviewProps>) {
    super(props);
  }

//export class SensuOverview extends PureComponent {
  //const options = props.options;
  //const getColor = "green";
  // <SensuMenu {...props} getColor={getColor} />
//        <SensuNavBar {...this.props} />
  render() {
    return (
      <div>
        <SensuNavBar {...this.props} />
      </div>
    );
  }
}

export default SensuOverview;
//export {SensuOverview};
