import angular from 'angular';

import _ from "lodash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {defaults} from "./defaults";
import {MetricsPanelCtrl} from "grafana/app/plugins/sdk";
import {SensuOverview} from "./components/sensu_overview";
import * as Series from "./panel_types/series";
import {OverviewDatasource} from "./overview_datasource";
import {loadPluginCss} from "grafana/app/plugins/sdk";
import {convertStatsToPanelStats, convertClientHealthStatsToPanelStats} from "./converters";

loadPluginCss({
  dark : "plugins/grafana-sensu-app/panels/external/material-icons.css",
  light : "plugins/grafana-sensu-app/panels/external/material-icons.css"
});

class SensuOverviewCtrl extends MetricsPanelCtrl {
  static templateUrl = "panels/sensu-overview/partials/template.html";
  dataType = "timeseries";
  series: any[];
  data: Series.SeriesStat[];
  eventData: any;
  clientData: any;
  fontSizes: any[];
  templateSrv: any;
  containerId: string;
  backendSrv: any;
  servers: any;
  panelReady = false;
  haveEventStats = false;
  haveClientStats = false;
  datasourceSrv: any;
  overviewDatasource: OverviewDatasource;
  sensuDS: any;
  cluster: any;
  alertSrv: any;

  /** @ngInject */
  constructor($scope, $injector, backendSrv, datasourceSrv, alertSrv, templateSrv) {
    super($scope, $injector);
    _.defaults(this.panel, defaults.panelDefaults);
    this.templateSrv = templateSrv;
    this.backendSrv = backendSrv;
    this.datasourceSrv = datasourceSrv;
    this.alertSrv = alertSrv;
    this.overviewDatasource = new OverviewDatasource(datasourceSrv);
    this.containerId = "container_react_" + this.panel.id;
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("data-error", this.onDataError.bind(this));
    this.events.on("data-snapshot-load", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    this.cluster = {};
    this.sensuDS = {};
    this.loadSensuData();
  }

  loadDatasource(id) {
    return this.backendSrv.get('/api/datasources')
      .then(result => {
        return _.filter(result, {"type": "grafana-sensucore-datasource"})[0];
      })
      .then( (ds) => {
        if (ds == null) {
          this.alertSrv.set("Failed to connect", "Could not connect to the specified sensu server.", 'error');
          throw new Error("Failed to connect to " + id);
        }
        this.cluster = ds;
        return this.datasourceSrv.get(ds.name);
      }).then(sensuDS => {
        this.sensuDS = sensuDS;
        return sensuDS;
      });
  }

  /*
  async loadSensuServers() {
    const serverId = 2;
    await this.loadDatasource(serverId);
    const sensuStats = await this.overviewDatasource.getSensuStats(serverId, this.sensuDS);
    debugger;
    this.eventData = this.convertStatsToPanelStats(sensuStats);
    //console.log("converted to eventData:" + JSON.stringify(this.eventData));
    if (this.eventData) {
      this.panelReady = true;
    }
  }
  */

  checkRender() {
    console.log("have events: " + this.haveEventStats);
    console.log("have clients: " + this.haveClientStats);
    if ((this.haveEventStats) && (this.haveClientStats)) {
      this.panelReady = true;
      // call render() once the data loads
      this.render();
    }
  }

  /* fetches all instances of datasource */
  async getSensuServers() {
    const self = this;
    return this.backendSrv.get("/api/datasources")
    .then((result: any) => {
      self.servers = result.filter((o: { type: {}; }) => {
        return o.type === "grafana-sensucore-datasource";
      });
      console.log("servers..." + JSON.stringify(self.servers));
    });
  }

  loadSensuData() {
    const serverId = 2;
    this.haveEventStats = false;
    this.haveClientStats = false;
    this.loadDatasource(serverId).then(() => {
      // load events, client health
      this.overviewDatasource.getSensuStats(serverId, this.sensuDS).then((eventStats) => {
        this.eventData = convertStatsToPanelStats(eventStats);
        if (this.eventData) {
          this.haveEventStats = true;
          this.checkRender();
        }
        this.overviewDatasource.getSensuClientHealthStats(serverId, this.sensuDS).then((clientHealthStats) => {
          this.clientData = convertClientHealthStatsToPanelStats(clientHealthStats);
          if (this.clientData) {
            this.haveClientStats = true;
            this.checkRender();
          }
        });
      });
    });
  }


  /*
  loadSensuEvents(serverId: number) {
      const serverId = 2;
      this.loadDatasource(serverId).then(() => {
        return this.overviewDatasource.getSensuStats(serverId, this.sensuDS);
      }).then(sensuStats => {
        this.eventData = this.convertStatsToPanelStats(sensuStats);
        console.log("converted to eventData:" + JSON.stringify(this.eventData));
        if (this.eventData) {
          this.panelReady = true;
          // have to call render() once the data loads
          this.render();
        }
      });
  }
  */

  /*
  ORIGINAL WORKING
  loadSensuServers() {
    const serverId = 2;
    this.loadDatasource(serverId).then(() => {
      return this.overviewDatasource.getSensuStats(serverId, this.sensuDS);
    }).then(sensuStats => {
      this.eventData = this.convertStatsToPanelStats(sensuStats);
      console.log("converted to eventData:" + JSON.stringify(this.eventData));
      if (this.eventData) {
        this.panelReady = true;
        // have to call render() once the data loads
        this.render();
      }
    });
  }
  */
  /*
  need to convert the event data into the form needed by the react panel
  sensustats:{"sensuStats":{"data":[
    {
      "target":"allEvents","timestamp":1546633115000,"type":"docs",
      "datapoints":[
        {
          "target":"allEvents","timestamp":1546633115000,
          "numEvents":19,
          "numSilenced":1,
          "numClientsSilenced":9,
          "numChecksSilenced":10,
          "numWarningEvents":4,
          "numWarningEventsSilenced":1,
          "numCriticalEvents":14,
          "numCriticalEventsSilenced":0,
          "numUnknownEvents":1,
          "numUnknownEventsSilenced":0
        }
      ],"rawTarget":"allEvents"}]}}
  */

  /*
  async OLDloadSensuServers() {
    await this.backendSrv.get("/api/datasources")
      .then(async (result: any) => {
        this.servers = result.filter((o: { type: {}; }) => {
          return o.type === "grafana-sensucore-datasource";
        });
        console.log("servers..." + JSON.stringify(this.servers));
        this.eventData = await this.OLDgetSensuServerEvents(this.servers[0]);
        console.log("eventdata fake..." + JSON.stringify(this.eventData));
        this.panelReady = true;
      });
  }

*/
  onInitEditMode() {
    this.fontSizes = ["20%", "30%", "50%", "70%", "80%", "100%", "110%", "120%", "150%", "170%", "200%"];
    // determine the path to this plugin
    const partialsPath = "public/plugins/" + this.panel.type + "/partials";
    this.addEditorTab("Options", partialsPath + "/options.html", 2);
    //this.unitFormats = kbn.getUnitFormats();
  }

  async onDataReceived(dataList: any) {
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
    //debugger;
    //this.eventData = await this.getSensuServerEvents(this.cluster);

    this.render();
  }

  onDataError(err: any) {
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


  link(scope: any, elem: any, attrs: any, ctrl: any) {
    if (!scope) {
      return;
    }
    if (!attrs) {
      return;
    }
    const panelByClass = elem.find(".grafana-sensu-app-overview-panel");
    panelByClass.append("<div style=\"width: 100%; height: 100%;\" id=\"" + ctrl.containerId + "\"></div>");
    const container = panelByClass[0].childNodes[0];

    // bind render event
    this.events.on("render", () => {
      const container = document.getElementById(ctrl.containerId);
      ReactDOM.unmountComponentAtNode(container);
      render();
      ctrl.renderingCompleted();
    });

    /**
     * render
     */
    function render() {
      //container.style.width = container.parentNode.clientWidth;
      //container.style.height = container.parentNode.clientHeight;
      // scope.size = { w: width, h: height };
      const sensuOverviewProps = {
        stats: ctrl.eventData,
        clientHealthStats: ctrl.clientData,
        options: ctrl.panel,
        size: scope.size
      };
      const sensuOverviewReactElem = React.createElement(SensuOverview, sensuOverviewProps);
      ReactDOM.render(
        sensuOverviewReactElem,
        document.getElementById(ctrl.containerId)
      );
    }

    /*
     * cleanup when scope is destroyed
     */
    scope.$on("$destroy", () => {
      ReactDOM.unmountComponentAtNode(container[0]);
    });
  }
}

export { SensuOverviewCtrl, SensuOverviewCtrl as PanelCtrl };
