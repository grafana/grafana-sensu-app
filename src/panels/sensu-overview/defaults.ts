import * as SensuOverviewPanel from "./types";

const panelDefaults: SensuOverviewPanel.PanelOptions = {
  links: [],
  datasource: null,
  maxDataPoints: 1000,
  interval: null,
  targets: [{}],
};

const defaults = {
  panelDefaults,
};

export {defaults};
