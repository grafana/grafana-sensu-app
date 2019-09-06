import moment from 'moment';
import { convertEventsToEventMetricsJSON } from '../../datasource/sensu-core/api/event_converters';
class OverviewDatasource {
  datasourceSrv: any;
  constructor(datasourceSrv) {
    this.datasourceSrv = datasourceSrv;
  }
  issueSensuQuery(sensuDS, query) {
    return this.datasourceSrv
      .get(sensuDS.name)
      .then(datasource => {
        const metricsQuery = {
          range: {
            from: moment().subtract(5, 'minute'),
            to: moment(),
          },
          targets: query.targets,
          interval: '60s',
        };
        console.log('issuing query');
        return datasource.query(metricsQuery);
      })
      .then(result => {
        if (result && result.data) {
          return result;
        }
        return {};
      });
  }

  getSensuStats(id: number, sensuDS: any) {
    const target = {
      eventMetricMode: 'all_events_count',
      sourceType: 'event_metrics_json', // this specifies what we want to receive back from the datasource
      dimensions: [],
    };
    let sensuStats: any;
    const query = {
      targets: [target],
    };
    return this.issueSensuQuery(sensuDS, query).then(result => {
      const aTarget = result.data[0].target;
      sensuStats = result;
      return sensuStats;
    });
  }
  getSensuClientHealthStats(id: number, sensuDS: any) {
    const target = {
      clientQueryMode: 'count',
      sourceType: 'client_health_json', // this specifies what we want to receive back from the datasource
      dimensions: [],
    };
    let sensuStats: any;
    const query = {
      targets: [target],
    };
    return this.issueSensuQuery(sensuDS, query).then(result => {
      const aTarget = result.data[0].target;
      sensuStats = result;
      return sensuStats;
    });
  }
}

export { OverviewDatasource };
