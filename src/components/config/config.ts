import angular from 'angular';

export class SensuConfigCtrl {
  static templateUrl = 'components/config/config.html';
  enabled: boolean;
  appEditCtrl: any;
  appModel: any;

  /** @ngInject */
  constructor($scope, $injector, private $q) {
    this.enabled = false;
    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
  }

  postUpdate() {
    if (!this.appModel.enabled) {
      return this.$q.resolve();
    }
    /* importDashboards is deprecated */
    /*
    return this.appEditCtrl.importDashboards().then(() => {
      this.enabled = true;
      return {
        url: 'plugins/grafana-sensu-app/page/configure',
        message: 'Sensu App enabled!',
      };
    });
    */
    this.enabled = true;
    return {
      url: 'plugins/grafana-sensu-app/page/configure',
      message: 'Sensu App enabled!',
    };
  }
}
