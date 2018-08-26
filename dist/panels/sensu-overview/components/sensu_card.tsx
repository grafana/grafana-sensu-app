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
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

export class SensuCard extends React.PureComponent<SensuCardProps> {
  props: any;
  constructor(props) {
    super(props);
  }

  static defaultProps: Partial<SensuCardProps> = {
    color: "green",
  };

  render() {
    const { width, height, color } = this.props;

    const bull = <span style={cardStyles.bullet}>•</span>;
    let containerStyle: React.CSSProperties = {};
    if (color) {
      containerStyle.background = color;
    }
    return (
    <div style={cardStyles.root}>
        <MUI.Card style={containerStyle}>
          <MUI.CardContent>
            <MUI.Typography style={cardStyles.title} color="textSecondary">
              Word of the Day
        </MUI.Typography>
            <MUI.Typography variant="headline" component="h2">
              be
          {bull}
              nev
          {bull}o{bull}
              lent
        </MUI.Typography>
            <MUI.Typography style={cardStyles.pos} color="textSecondary">
              adjective
        </MUI.Typography>
            <MUI.Typography component="p">
              well meaning and kindly.
          <br />
              {"a benevolent smile"}
            </MUI.Typography>
          </MUI.CardContent>
          <MUI.CardActions>
            <MUI.Button size="small">Learn More</MUI.Button>
          </MUI.CardActions>
        </MUI.Card>
    </div>
    );
  }
}
