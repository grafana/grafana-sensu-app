import React, {PureComponent} from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Icon from "@material-ui/core/Icon";
//import { AppBar, Toolbar, Typography, IconButton, Badge, Grid, Icon } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    </div>
    );
  }
}

