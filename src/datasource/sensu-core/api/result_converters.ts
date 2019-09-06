import { getResponseForTarget } from './utils';

function convertResultsToTable(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);

  // the result has no "datapoints", need to create it based on the check data
  // when we have a checkname and a clientName, the response is different, the
  // data is not an array, but contains the same information, recreate and push
  if (response.data.length === undefined) {
    const singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }
  // this will be collapsed into table format, where the columns are predefined
  // and each row is a response formatted to the columns
  const rowData = [];
  for (let i = 0; i < response.data.length; i++) {
    const rowInfo = response.data[i];
    const aRow = [
      rowInfo.check.issued * 1000,
      rowInfo.client,
      rowInfo.check.name,
      rowInfo.check.status,
      rowInfo.check.issued * 1000,
      rowInfo.check.executed * 1000,
      rowInfo.check.output,
      rowInfo.check.type,
      rowInfo.check.thresholds.warning,
      rowInfo.check.thresholds.critical,
    ];
    // now push into rowData
    rowData.push(aRow);
  }
  // collapse everything into data[0]
  const anEvent = response.data[0];
  const datapoints = [];
  datapoints[0] = [anEvent.check.status, anEvent.check.issued * 1000];
  anEvent.datapoints = datapoints;
  anEvent.type = 'table';
  anEvent.columns = [
    { text: 'Time', type: 'date' },
    { text: 'client' },
    { text: 'check.name' },
    { text: 'check.status' },
    { text: 'check.issued', type: 'date' },
    { text: 'check.executed', type: 'date' },
    { text: 'check.output' },
    { text: 'check.type' },
    { text: 'check.thresholds.warning' },
    { text: 'check.thresholds.critical' },
  ];
  anEvent.rows = rowData;
  // truncate the rest
  response.data = [anEvent];
  //var str = JSON.stringify(response, null, 2);
  //console.log(str);
  return response;
}

/*
Response come back as:
{
"client": "p3-graphite-t1",
"check": {
  "thresholds": {
    "warning": 120,
    "critical": 180
  },
  "name": "keepalive",
  "issued": 1482067284,
  "executed": 1482067284,
  "output": "Keepalive sent from client 3 seconds ago",
  "status": 0,
  "type": "standard"
}
}
 */
function convertResultsToJSON(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);

  for (let i = 0; i < response.data.length; i++) {
    const anEvent = response.data[i];
    const datapoints = [];
    if (anEvent.check.issued !== undefined) {
      const data = {
        timestamp: anEvent.check.issued * 1000,
        message: anEvent.check.name,
        client: anEvent.client,
        check: {
          name: anEvent.check.name,
          issued: anEvent.check.issued * 1000,
          executed: anEvent.check.executed * 1000,
          output: anEvent.check.output,
          status: anEvent.check.status,
          type: anEvent.check.type,
        },
      };
      datapoints.push(data);
      anEvent.datapoints = datapoints;
      delete anEvent.check;
      delete anEvent.client;
      anEvent.type = 'docs';
    }
  }
  //var str = JSON.stringify(response, null, 2);
  //console.log(str);
  return response;
}

/**
 * [convertResultsToDataPoints description]
 * @param  {[type]} response [description]
 * @return {[type]}        [description]
 */
function convertResultsToDataPoints(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);

  // the result has no "datapoints", need to create it based on the check data
  // when we have a checkname and an clientName, the response is different, the
  // data is not an array, but contains the same information, recreate and push
  if (response.data.length === undefined) {
    const singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }
  for (let i = 0; i < response.data.length; i++) {
    const anEvent = response.data[i];
    //var str = JSON.stringify(anEvent, null, 2);
    //console.log(str);
    const datapoints = [];
    if (anEvent.check.issued !== undefined) {
      datapoints[0] = [anEvent.check.status, anEvent.check.issued * 1000];
      // the duration is here...
      // datapoints[0] = [anEvent.check.duration, (anEvent.check.issued * 1000)];
    }
    anEvent.datapoints = datapoints;
    // set the target to be the check name
    if (anEvent.check.name !== undefined) {
      anEvent.target = anEvent.check.name;
    } else {
      anEvent.target = anEvent.check;
    }
  }
  return response;
}

export { convertResultsToTable, convertResultsToDataPoints, convertResultsToJSON };
