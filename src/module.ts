import { SensuConfigCtrl } from './components/config/config';
import { SensuServersCtrl } from './components/servers/servers';
import { SensuServerInfoCtrl } from './components/server_info/info';
import { loadPluginCss } from 'grafana/app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/grafana-sensu-app/styles/dark.css',
  light: 'plugins/grafana-sensu-app/styles/light.css',
});

export { SensuConfigCtrl as ConfigCtrl, SensuServerInfoCtrl, SensuServersCtrl };
