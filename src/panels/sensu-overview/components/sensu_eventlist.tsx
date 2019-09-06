import React, { PureComponent } from 'react';
import MaterialTable from 'material-table';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export interface SensuEventListProps {
  maxItems: number;
}

const themeDark = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});
const themeLight = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
});

export class SensuEventList extends PureComponent<SensuEventListProps> {
  props: any;

  data: any;
  columns: any;
  theme: any;

  constructor(props: Readonly<SensuEventListProps>) {
    super(props);
    this.columns = [
      { title: 'Time', field: 'timestamp' },
      { title: 'Source', field: 'source' },
      { title: 'Check', field: 'check_name' },
      { title: 'Silenced', field: 'check_silenced' },
      { title: 'Output', field: 'output' },
      { title: 'Occurences', field: 'occurrences', type: 'numeric' },
      { title: 'Datacenter', field: 'datacenter' },
      { title: 'Issued', field: 'issued' },
      { title: 'Last OK', field: 'last_ok' },
    ];
    this.data = [
      {
        timestamp: '2018-10-28 09:28:17',
        source: 'atenra',
        check_name: 'check_ntp',
        check_silenced: false,
        check_severity: 'critical',
        output: 'CheckNTP UNKNOWN: NTP state unsynced',
        occurrences: 58,
        datacenter: 'Sensu',
        issued: '2018-10-28 09:28:17',
        last_ok: '2018-10-28 09:28:17',
      },
    ];
    this.theme = themeDark;
  }

  static defaultProps: Partial<SensuEventListProps> = {
    maxItems: 30,
  };

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <MaterialTable title="Events" columns={this.columns} data={this.data} />
      </MuiThemeProvider>
    );
  }
}
