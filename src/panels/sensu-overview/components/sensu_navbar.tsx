import React from "react";
import ReactDOM from "react-dom";

// this allows @material-ui/core to be used
import "../../external/babel.min.js";
import * as MUI from "../../external/material-ui.development.js";
// https://github.com/mui-org/material-ui/blob/master/examples/cdn/index.html
import "../../external/material-icons.css!";
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
    </div>
    );
  }
  notrender() {
    return(
      <MUI.Button variant="raised" color="secondary">
        <MUI.Icon className="fa fa-plus-circle" color="primary" />
        Test with font-awesome icon
          </MUI.Button>
    );
  }
}

