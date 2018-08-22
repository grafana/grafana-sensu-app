import * as SensuOverviewPanel from "./types";

const panelDefaults: SensuOverviewPanel.PanelOptions = {
  links: [],
  datasource: null,
  maxDataPoints: 100,
  interval: null,
  targets: [{}],
};

const defaults = {
  panelDefaults,
};

export default defaults;
