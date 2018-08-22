import React from "react";
import { getBGColor } from "./utils";

import * as SensuOverviewPanel from "../types";
import { SensuMenu } from "./sensu_menu";
import { SensuNavBar} from "./sensu_navbar";

const DEFAULT_COLOR = "rgb(31, 120, 193)";
const BACKGROUND_OPACITY = 0.1;
const LABEL_SIZE_COEF = 0.7;

export interface SensuOverviewProps {
  options: SensuOverviewPanel.PanelOptions;
  size: SensuOverviewPanel.PanelSize;
}

export function SensuOverview(props: SensuOverviewProps) {
  const options = props.options;
  const getColor = "green";
  // <SensuMenu {...props} getColor={getColor} />
  return (
    <div>
      <SensuNavBar {...props}/>
    </div>
  );
}
