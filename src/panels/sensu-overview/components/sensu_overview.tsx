import {PureComponent} from "react";
import { getBGColor } from "./utils";
import * as React from "react";
import Grid from "@material-ui/core/Grid";

import * as SensuOverviewPanel from "../types";
//import { SensuMenu } from "./sensu_menu";
import {SensuNavBar} from "./sensu_navbar";
import {SensuCard} from "./sensu_card";
import { AlertTabCtrl } from 'grafana/app/features/alerting/alert_tab_ctrl';

const DEFAULT_COLOR = "rgb(31, 120, 193)";
const BACKGROUND_OPACITY = 0.1;
const LABEL_SIZE_COEF = 0.7;

export interface SensuOverviewProps {
  options: SensuOverviewPanel.PanelOptions;
  size: SensuOverviewPanel.PanelSize;
}
//export interface SensuOverviewProps {
//  options : any;
//  size : any;
//}

const gridListStyle = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "inherit",
    height: "auto"
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
};

// export class SensuOverview extends PureComponent { const options =
// props.options; const getColor = "green"; <SensuMenu {...props}
// getColor={getColor} />        <SensuNavBar {...this.props} />

export class SensuOverview extends PureComponent <SensuOverviewProps> {
  props: any;
  constructor(props: Readonly<SensuOverviewProps>) {
    super(props);
  }

  render() {
    return (
      <div>
        <SensuNavBar {...this.props} />
        <Grid container style={gridListStyle.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center">
              {this.props.stats.map(tile => (
                <Grid key={tile.text} item>
                  <SensuCard
                    color={tile.color}
                    icon={tile.icon}
                    titleText={tile.title}
                    primaryText={`Active: ${tile.active}`}
                    secondaryText={`Silenced: ${tile.silenced}`} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

      </div>
    );
  }
}
