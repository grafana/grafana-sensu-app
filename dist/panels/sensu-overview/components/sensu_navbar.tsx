import React from "react";
import ReactDOM from "react-dom";

// this allows @material-ui/core to be used
import "../../external/babel.min.js";
import * as MUI from "../../external/material-ui.development.js";
// https://github.com/mui-org/material-ui/blob/master/examples/cdn/index.html
import "../../external/material-icons.css!";
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
  margin: {
    margin: 6,
  }
};

const gridListStyle = {
  root: {
    display: "flex",
    flexWrap: "wrap",
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

export class SensuNavBar extends React.PureComponent<SensuNavBarProps> {
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
     <MUI.AppBar position="static">
        <MUI.Toolbar>
           <MUI.Typography style={styles.flex} variant="title" color="inherit">
              Sensu
          </MUI.Typography>
          <MUI.IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <MUI.Badge color="primary" badgeContent={6} className={styles2.margin}>
                <MUI.Icon color="inherit">star</MUI.Icon>
            </MUI.Badge>
          </MUI.IconButton>
          <MUI.IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <MUI.Badge color="primary" badgeContent={2} className={styles2.margin}>
              < MUI.Icon color="inherit">volume_off</MUI.Icon>
            </MUI.Badge >
          </MUI.IconButton>
          <MUI.IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <MUI.Badge color="primary" badgeContent={2} className={styles2.margin}>
                  <MUI.Icon color="inherit">access_alarm</MUI.Icon>
            </MUI.Badge>
          </MUI.IconButton>
        </MUI.Toolbar>
      </MUI.AppBar>

      <MUI.Grid container style={gridListStyle.root} spacing={16}>
        <MUI.Grid item xs={12}>
          <MUI.Grid container justify="center">
            {tileData.map(tile => (
              <MUI.Grid key={tile.text} item>
                <SensuCard
                  color={tile.color}
                  titleText={tile.title}
                  primaryText={`Active: ${tile.active}`}
                  secondaryText={`Silenced: ${tile.silenced}`}/>
              </MUI.Grid>
            ))}
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Grid>
    </div>
    );
  }
}

