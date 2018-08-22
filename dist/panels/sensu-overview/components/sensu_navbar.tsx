//import "../../external/material-ui.development.js";
//import * as MUI from "../../external/material-ui.production.min.js";
import React from "react";
import ReactDOM from "react-dom";
import "../../external/babel.min.js";
import * as MUI from "../../external/material-ui.production.min.js";
//import Button from "../../external/@material-ui/core/Button/Button.js";
//
const { Button } = window["material-ui"];

// https://github.com/mui-org/material-ui/blob/master/examples/cdn/index.html

export interface SensuNavBarProps {
  width: number;
  height: number;
  color: string;
}

export class SensuNavBar extends React.PureComponent<SensuNavBarProps> {
  props: any;
  //const {Button} = window["material-ui"];
  constructor(props) {
    super(props);
    //this.button = window["material-ui"];
  }

  static defaultProps: Partial<SensuNavBarProps> = {
    color: "white",
  };

  render() {
    debugger;
    //if (MUI) {
    //  let button = MUI[Button]; // .Button;
    //}
    //let z = window["material-ui"];
    //let Button = z.Button;
    // let Button = window["material-ui"].Button;
    return(
        <Button variant="raised" color="primary">
          navbar placeholder
        </Button>
    );
  }
}

