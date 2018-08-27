import React from "react";
import ReactDOM from "react-dom";

// this allows @material-ui/core to be used
import "../../external/babel.min.js";
import * as MUI from "../../external/material-ui.development.js";
// https://github.com/mui-org/material-ui/blob/master/examples/cdn/index.html
import "../../external/material-icons.css!";
export interface SensuCardProps {
  width: number;
  height: number;
  color: string;
  bgColor: string;
  titleText: string;
  primaryText: string;
  secondaryText: string;
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

const cardStyles = {
  root: {
    flexGrow: 1
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
  },
  primaryText: {
    "text-align": "center",
  },
  secondaryText: {
    marginBottom: 12,
    "text-align": "center",
  }
};

export class SensuCard extends React.PureComponent<SensuCardProps> {
  props: any;
  constructor(props) {
    super(props);
  }

  static defaultProps: Partial<SensuCardProps> = {
    bgColor: "inherit",
    color: "white",
    titleText: "",
    primaryText: "",
    secondaryText: "",
  };

  render() {
    const { width, height, color, bgColor, titleText, primaryText, secondaryText } = this.props;

    let containerStyle: React.CSSProperties = {};
    if (bgColor) {
      containerStyle.background = bgColor;
    }
    if (color) {
      containerStyle.color = color;
    }
    return (
    <div style={cardStyles.root}>
        <MUI.Card style={containerStyle}>
          <MUI.CardContent>
            <MUI.Typography style={cardStyles.title} variant="headline" component="p" color="inherit">
              {titleText}
            </MUI.Typography>
            <MUI.Typography style={cardStyles.primaryText} variant="headline" component="p" color="inherit">
              {primaryText}
            </MUI.Typography>
            <MUI.Typography style={cardStyles.secondaryText} variant="headline" component="p" color="inherit">
              {secondaryText}
            </MUI.Typography>
          </MUI.CardContent>
          <MUI.CardActions>
            <MUI.Button size="small" color="primary">Detail</MUI.Button>
          </MUI.CardActions>
        </MUI.Card>
    </div>
    );
  }
}
