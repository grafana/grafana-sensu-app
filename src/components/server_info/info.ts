import angular from 'angular';

export class SensuServerInfoCtrl {
  server: any;
  pageReady: boolean;
  datasources: any;
  serverDS: any;
  info: [];
  $scope: any;

  static templateUrl = 'components/server_info/partials/server_info.html';

  /** @ngInject */
  constructor($scope, $injector, private backendSrv, private datasourceSrv, private $q, private $location, private alertSrv) {
    this.pageReady = false;
    this.$q = $q;
    this.$scope = $scope;
    document.title = 'Grafana Sensu App - Info';

    this.server = {};

    if (!("server" in $location.search())) {
      alertSrv.set("No Sensu server specified.", "No Sensu server specified in url", 'error');
      return;
    }

    this.getSensuServerInfo($location.search().server);
  }

  /* this is the safest method to load async and then update */
  getSensuServerInfo(id) {
    this.getSensuServer(id)
      .then(serverDS => {
      this.serverDS = serverDS;
      this.serverDS.getServerInfo().then((info) => {
        this.info = info;
        console.log("INFO: " + JSON.stringify(this.info));
        this.pageReady = true;
      });
    });
  }

  async getSensuServer(id: string) {
    return this.backendSrv.get('api/datasources/' + id).then(ds => {
      this.server = ds;
      return this.datasourceSrv.get(ds.name);
    });
  }

}
