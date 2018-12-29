import _ from "lodash";
import * as React from "react";
//import ReactDOM from "react-dom";
import * as ReactDOM from "react-dom";
import {defaults} from "./defaults";
import { MetricsPanelCtrl } from "grafana/app/plugins/sdk";
import SensuOverview from "./components/sensu_overview";
import * as Series from "./ptypes/series";

import {loadPluginCss} from "grafana/app/plugins/sdk";

//loadPluginCss({
//  icons: "../external/material-icons.css"
//});


class SensuOverviewCtrl extends MetricsPanelCtrl {
  static templateUrl = "panels/sensu-overview/partials/template.html";
  dataType = "timeseries";
  series: any[];
  data: Series.SeriesStat[];
  fontSizes: any[];
  templateSrv: any;
  containerId : string;

  /** @ngInject */
  constructor($scope, $injector, templateSrv) {
    super($scope, $injector);
    console.log("defaults before " + JSON.stringify(this.panel.maxDataPoints));
//_.defaults(this.panel, defaults.panelDefaults);
debugger;
    _.defaults(this.panel, defaults.panelDefaults);
    this.templateSrv = templateSrv;
    console.log("defaults after " + JSON.stringify(this.panel.maxDataPoints));
    this.containerId = "container_react_" + this.panel.id;
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("data-error", this.onDataError.bind(this));
    this.events.on("data-snapshot-load", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
  }

  onInitEditMode() {
    this.fontSizes = ["20%", "30%", "50%", "70%", "80%", "100%", "110%", "120%", "150%", "170%", "200%"];
    // determine the path to this plugin
    var partialsPath = "public/plugins/" + this.panel.type + "/partials";
    this.addEditorTab("Options", partialsPath + "/options.html", 2);
    //this.unitFormats = kbn.getUnitFormats();
  }

  onDataReceived(dataList) {
    if (dataList.length > 0 && dataList[0].type === "table") {
      this.dataType = "table";
      if (dataList[0].rows && !dataList[0].rows.length) {
        return this.onDataError("No data");
      }
      //this.setTableColumnToSensibleDefault(dataList[0]);
      //this.data = convertTableDataToMultistat(dataList, this.panel);
    } else {
      //this.dataType = "timeseries";
      //this.data = convertTSDataToMultistat(dataList, this.panel);
      // this.setValues();
      this.data = [];
    }
    this.render();
  }

  onDataError(err) {
    this.onDataReceived([]);
  }

  setTableColumnToSensibleDefault(tableData) {
    const columnNames = {};

    tableData.columns.forEach((column, columnIndex) => {
      columnNames[columnIndex] = column.text;
    });

    //this.tableColumnOptions = columnNames;
    if (
      _.find(tableData.columns, ["text", this.panel.tableColumnValue]) &&
      _.find(tableData.columns, ["text", this.panel.tableColumnLabel])
    ) {
      return;
    }

    if (tableData.columns.length === 1) {
      this.panel.tableColumnValue = tableData.columns[0].text;
    } else {
      const notTimeColumns = _.filter(tableData.columns, col => col.type !== "time");
      this.panel.tableColumnValue = _.last(notTimeColumns).text;
      this.panel.tableColumnLabel = _.first(notTimeColumns).text;
      /*
      const notTimeColumns = _.filter(tableData.columns, col => col.type !== "time");
      this.panel.tableColumnValue = _.last(notTimeColumns).text;
      this.panel.tableColumnLabel = _.first(notTimeColumns).text;
      */
    }
  }

  setValuePrefixAndPostfix(data) {
    data.forEach(seriesStat => {
      if (!seriesStat._valueFormatted) {
        // Backup original value
        seriesStat._valueFormatted = seriesStat.valueFormatted;
      }
      let value = this.panel.prefix ? this.templateSrv.replace(this.panel.prefix, seriesStat.scopedVars) : "";
      value += seriesStat._valueFormatted;
      value += this.panel.postfix ? this.templateSrv.replace(this.panel.postfix, seriesStat.scopedVars) : "";
      seriesStat.valueFormatted = value;
    });
  }


  link(scope, elem, attrs, ctrl) {
    if (!scope) {
      return;
    }
    if (!attrs) {
      return;
    }
    var panelByClass = elem.find(".grafana-sensu-app-overview-panel");
    panelByClass.append("<div style=\"width: 100%; height: 100%;\" id=\"" + ctrl.containerId + "\"></div>");
    var container = panelByClass[0].childNodes[0];

    //const sensuOverviewElem = elem.find(".grafana-sensu-app-overview-panel");
    const sensuOverviewReactElem = React.createElement(SensuOverview);
    const sensuOverviewProps = {
      stats: ctrl.data,
      options: ctrl.panel,
      size: scope.size
    };

    this.events.on("render", function () {
      let container = document.getElementById(ctrl.containerId);
      //console.log("container = " + container);
      //try {
      ReactDOM.unmountComponentAtNode(container);
      //} catch (err) {
      //  console.log("ignoring: " + err.message);
      //}
      render();
      ctrl.renderingCompleted();
    });

    function render() {
      container.style.width = container.parentNode.clientWidth;
      container.style.height = container.parentNode.clientHeight;
      // this creates the chart inside the container
      let chartContainer = document.getElementById(ctrl.containerId);
      let whatever = (
      <div>BAH</div>
      );
const sensuOverviewProps = {
  stats: ctrl.data,
  options: ctrl.panel,
  size: scope.size
};
//const meh = new SensuOverview(sensuOverviewProps);
      const sensuOverviewReactElem = React.createElement(SensuOverview, container);
      ReactDOM.render(
        sensuOverviewReactElem,
        document.getElementById(ctrl.containerId)
      );
    }

/*
    function notrender() {
      if (!ctrl.data) {
        return;
      }

      const width = sensuOverviewElem.width();
      const height = sensuOverviewElem.height();
      scope.size = { w: width, h: height };
      ctrl.setValuePrefixAndPostfix(ctrl.data);
      console.log("calling render");
//      renderSensuOverviewComponent();
debugger;
//      const sensuOverviewReactElem = React.createElement(SensuOverview, sensuOverviewProps);
//const sensuOverviewReactElem = React.createElement(SensuOverview);
//if (typeof sensuOverviewReactElem !== "undefined") {
  console.log("made something...");
  //const dropContentElem = document.createElement("div");
      ReactDOM.render(sensuOverviewReactElem, sensuOverviewElem);

//  ReactDOM.render(sensuOverviewReactElem, sensuOverviewElem[0]);
  console.log("tried to render it");
//}
console.log("called render");
    }
*/
/*
    function renderSensuOverviewComponent() {
      const sensuOverviewProps = {
        stats: ctrl.data,
        options: ctrl.panel,
        size: scope.size,
      };
      debugger;
      //const sensuOverviewReactElem = React.createElement(SensuOverview, sensuOverviewProps);
      const sensuOverviewReactElem = React.createElement(SensuOverview);
      ReactDOM.render(sensuOverviewReactElem, sensuOverviewElem[0]);
    }
*/
    /*
    this.events.on("render", function() {
      render();
      ctrl.renderingCompleted();
    });
    */
    // cleanup when scope is destroyed
    /*
    scope.$on("$destroy", () => {
      ReactDOM.unmountComponentAtNode(sensuOverviewElem[0]);
    });
    */
  }
}

export { SensuOverviewCtrl, SensuOverviewCtrl as PanelCtrl };
