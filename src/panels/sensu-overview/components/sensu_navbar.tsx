//import React from "react";
import React, {PureComponent} from "react";
import ReactDOM from "react-dom";

// this allows @material-ui/core to be used
//import "../../external/babel.min.js";
// this works by itself import * as MUI from "../../external/material-ui.development.js";
//import * as MUI from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
//import { AppBar, Toolbar, Typography, IconButton, Badge, Grid, Icon } from "@material-ui/core";
// https://github.com/mui-org/material-ui/blob/master/examples/cdn/index.html
//import "../../external/material-icons.css!";
import { SensuCard } from "./sensu_card";

export interface SensuNavBarProps {
  width: number;
  height: number;
  color: string;
}

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};
const styles2 = {
  margin: "6"
};

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
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  }
};

export class SensuNavBar extends PureComponent<SensuNavBarProps> {
  props: any;
  constructor(props) {
    super(props);
  }

  static defaultProps: Partial<SensuNavBarProps> = {
    color: "white",
  };
  // font-awesome
  //<MUI.Icon className="fa fa-plus-circle" color="primary" />
  // material font
  //<MUI.Icon color="inherit">star</MUI.Icon>

  // <MUI.Badge color="primary" badgeContent={4} className={styles2.margin}>
  // <MUI.Button variant="contained">Button</MUI.Button>
  // </MUI.Badge>
  render() {
    const tileData = [
      {
        bgColor: "inherit",
        color: "red",
        text: "placeholder",
        title: "Critical Events",
        icon: "error",
        active: 3,
        silenced: 2,
        total: 5,
        iconColor: "secondary"
      },
      {
        bgColor: "inherit",
        color: "yellow",
        text: "placeholder",
        title: "Warning Events",
        icon: "warning",
        active: 8,
        silenced: 1,
        total: 9,
        iconColor: "inherit"
      },
      {
        bgColor: "inherit",
        color: "grey",
        text: "placeholder",
        title: "Unknown Events",
        icon: "motorcycle",
        active: 30,
        silenced: 2,
        total: 32,
        iconColor: "primary"
      }
  ];
    return (
    <div style={styles.root}>
     <AppBar position="static">
        <Toolbar>
           <Typography style={styles.flex} variant="title" color="inherit">
              Sensu
          </Typography>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <Badge color="primary" badgeContent={6} className={styles2.margin}>
                <Icon color="inherit">star</Icon>
            </Badge>
          </IconButton>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <Badge color="primary" badgeContent={2} className={styles2.margin}>
              <Icon color="inherit">volume_off</Icon>
            </Badge >
          </IconButton>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <Badge color="primary" badgeContent={2} className={styles2.margin}>
                  <Icon color="inherit">access_alarm</Icon>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container style={gridListStyle.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center">
            {tileData.map(tile => (
              <Grid key={tile.text} item>
                <SensuCard
                  color={tile.color}
                  titleText={tile.title}
                  primaryText={`Active: ${tile.active}`}
                  secondaryText={`Silenced: ${tile.silenced}`}/>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
    );
  }
}

