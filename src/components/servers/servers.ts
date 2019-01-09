
import appEvents from "grafana/app/core/app_events";

export class SensuServersCtrl {
  server: any;
  pageReady: boolean;
  datasources: [any];
  servers: any;
  isOrgEditor: boolean;

  static templateUrl = "components/servers/partials/servers.html";

  /** @ngInject */
  constructor($scope, $injector, private backendSrv, private contextSrv, private $location) {
    const self = this;
    this.isOrgEditor = contextSrv.hasRole("Editor") || contextSrv.hasRole("Admin");
    document.title = "Grafana Sensu App";
    this.servers = [];
    this.pageReady = false;
    this.getSensuServers();
  }

  async getSensuServers() {
    const self = this;
    return this.backendSrv.get("/api/datasources")
    .then((result: any) => {
      self.servers = result.filter((o: { type: {}; }) => {
        return o.type === "grafana-sensucore-datasource";
      });
      console.log("servers..." + JSON.stringify(self.servers));
      self.pageReady = true;
    });
  }

  confirmDelete(id: any) {
    this.backendSrv.delete("/api/datasources/" + id).then(() => {
      this.getSensuServers();
    });
  }

  deleteSensuServer(server) {
    appEvents.emit("confirm-modal", {
      title: "Delete",
      text: "Are you sure you want to delete this data source?",
      yesText: "Delete",
      icon: "fa-trash",
      onConfirm: () => {
        this.confirmDelete(server.id);
      }
    });
  }

  /*
    1) POST new datasource
        POST to http://localhost:3000/api/datasources
        {
          "name":"Sensu Core-2",
          "type":"grafana-sensucore-datasource",
          "access":"proxy",
          "isDefault":false
        }
    2) Get the id of the created datasource (will be in response)
        response.datasource.id
    3) Send user to the datasource config page http://localhost:3000/datasources/edit/7
        window.location.href = ds_editor_uri;
        this.$location.url('/datasources/edit/7');

   */
  async addSensuServer() {
    const payload = {
      "name": "SensuAppCore-" + this.servers.length,
      "type": "grafana-sensucore-datasource",
      "access": "proxy",
      "isDefault": false
    };
    const response = await this.backendSrv.post("/api/datasources", payload);
    const instanceId = response.datasource.id;
    this.$location.url('/plugins/grafana-sensu-app/page/sensu-servers');
    window.location.href = '/datasources/edit/' + instanceId;
  }

  serverInfo(server) {
    this.$location.path("plugins/grafana-sensu-app/page/sensu-server-info").search({"server": server.id});
  }
}
