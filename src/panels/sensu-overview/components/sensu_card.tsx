
import {PureComponent} from "react";
import { getBGColor } from "./utils";
import * as React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faFire} from "@fortawesome/free-solid-svg-icons/faFire";
import {faFlag} from "@fortawesome/free-solid-svg-icons/faFlag";
import {faIgloo} from "@fortawesome/free-solid-svg-icons/faIgloo";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import {faBellSlash} from "@fortawesome/free-solid-svg-icons/faBellSlash";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
// @fortawesome/free-regular-svg-icons


import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

export interface SensuCardProps {
  width: number;
  height: number;
  color: string;
  bgColor: string;
  titleText: string;
  primaryText: string;
  secondaryText: string;
  primary_icon: any;
  secondary_icon: any;
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

const cardStyles = {
  root: {
    flexGrow: 1
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
  },
  primaryText: {
    marginBottom : 12,
    "text-align" : "center",
  },
  secondaryText: {
    marginBottom: 12,
    "text-align": "center",
  }
};

export class SensuCard extends PureComponent<SensuCardProps> {
  props: any;
  constructor(props) {
    super(props);
    library.add(faBellSlash);
    library.add(faFire);
    library.add(faFlag);
    library.add(faIgloo);
    library.add(faThumbsUp);
    library.add(faQuestionCircle);
  }

  static defaultProps: Partial<SensuCardProps> = {
    bgColor: "inherit",
    color: "white",
    titleText: "",
    primaryText: "",
    secondaryText: "",
    primary_icon: "question-circle",
    secondary_icon: "bell-slash"
  };

  render() {
    const { width, height, color, bgColor, titleText, primaryText, secondaryText, primary_icon, secondary_icon } = this.props;
    const containerStyle: React.CSSProperties = {};
    //const altIcon = faFire;
    if (bgColor) {
      containerStyle.background = bgColor;
    }
    if (color) {
      containerStyle.color = color;
    }
    // <FontAwesomeIcon icon={faCoffee} />
    // <FontAwesomeIcon icon={faFire}/>
    // <Icon color="inherit">{icon}</Icon>
    return (
    <div style={cardStyles.root}>
        <Card style={containerStyle}>
          <CardContent>
            <Typography style={cardStyles.title} variant="h1" component="p" color="inherit">
              {titleText}
            </Typography>
            <Typography style={cardStyles.primaryText} variant="body1" component="p" color="inherit">
              <FontAwesomeIcon icon={primary_icon}/> {primaryText}
            </Typography>
            <Typography style={cardStyles.secondaryText} variant="body2" component="p" color="inherit">
            <FontAwesomeIcon icon={secondary_icon}/> {secondaryText}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">Detail</Button>
          </CardActions>
        </Card>
    </div>
    );
  }
}
