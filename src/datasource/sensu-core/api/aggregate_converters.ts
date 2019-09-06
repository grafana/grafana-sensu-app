/**
 *
 */
import { getResponseForTarget } from './utils';

/**
 * [convertAggregatesToDataPoints description]
 * @param  {[type]} response [description]
 * @return {[type]}        [description]
 */
function convertAggregatesToDataPoints(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);
  // the result has no "datapoints", need to create it based on the check data

  // when we have a checkname and an clientName, the response is different, the
  // data is not an array, but contains the same information, recreate and push
  if (response.data.length === undefined) {
    const singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }
  // storage for new data series constructed by aggregate responses
  let newData = null;
  for (let i = 0; i < response.data.length; i++) {
    const anAggregate = response.data[i];
    // checks is defined when the aggregate mode is either "Clients" or "List"
    if (anAggregate.checks !== undefined) {
      // create a new block of datapoints for each aggregate result json entry
      //
      const checkType = typeof anAggregate.checks;
      switch (checkType) {
        case 'number':
          // checksType is a number, which is an aggregate list response
          newData = convertEventDataToAggregateModeList(anAggregate, newData);
          break;
        case 'object':
          // checkType is an object, which is an aggregate clients response
          newData = convertEventDataToAggregateModeClient(anAggregate, newData);
          break;
      }
      continue;
    }
    // clients is defined when the aggregate mode is "Checks"
    if (anAggregate.clients !== undefined) {
      newData = convertEventDataToAggregateModeChecks(anAggregate, newData);
      continue;
    }
    // summary is defined when the aggregate mode is "Results OK/WARNING/CRITICAL/UNKNOWN"
    if (anAggregate.summary !== undefined) {
      newData = convertEventDataToAggregateModeResults(anAggregate, newData);
      continue;
    }

    // this is a simple aggregate response (no mode)
    const datapoints = [];
    // timestamp is the query now (just use now)
    const timestamp = Math.floor(Date.now());
    datapoints[0] = [0, timestamp];
    anAggregate.datapoints = datapoints;
    // set the target to be the name of the aggregate
    anAggregate.target = anAggregate.name;
  }
  if (newData !== null) {
    // overwrite the old data field with the new expanded set
    response.data = newData;
  }
  return response;
}

function convertEventDataToAggregateModeResults(anEvent, dataSet) {
  const timestamp = Math.floor(Date.now());
  if (dataSet === null) {
    // initialize empty array
    dataSet = [];
  }
  // iterate over the checks
  for (let i = 0; i < anEvent.summary.length; i++) {
    const aSummary = anEvent.summary[i];
    const checkData = {
      target: anEvent.check,
      clients: aSummary.clients,
      datapoints: [[aSummary.total, timestamp]],
    };
    dataSet.push(checkData);
  }
  return dataSet;
}
// An aggregate checks result has the format
// {
//    clients: [
//      clientName
//    ],
//    name: checkName
// }
function convertEventDataToAggregateModeChecks(anEvent, dataSet) {
  const timestamp = Math.floor(Date.now());
  if (dataSet === null) {
    // initialize empty array
    dataSet = [];
  }
  // iterate over the checks
  for (let i = 0; i < anEvent.clients.length; i++) {
    const clientName = anEvent.clients[i];
    const checkData = {
      target: anEvent.name,
      datapoints: [[clientName, timestamp]],
    };
    dataSet.push(checkData);
  }
  return dataSet;
}

// An aggregate clients result has the format
// {
//    checks: [
//      checkName
//    ],
//    name: clientName
// }
function convertEventDataToAggregateModeClient(anEvent, dataSet) {
  const timestamp = Math.floor(Date.now());
  if (dataSet === null) {
    // initialize empty array
    dataSet = [];
  }
  // iterate over the checks
  for (let i = 0; i < anEvent.checks.length; i++) {
    const checkName = anEvent.checks[i];
    const clientData = {
      target: anEvent.name,
      datapoints: [[checkName, timestamp]],
    };
    dataSet.push(clientData);
  }
  return dataSet;
}
// An aggregate list result has the format
// {
//   checks: int,
//   clients: int,
//   results: {
//    critical: int,
//    ok: int,
//    stale: int,
//    total: int,
//    unknown: int,
//    warning: int
//   }
// }
function convertEventDataToAggregateModeList(anEvent, dataSet) {
  if (dataSet === null) {
    // initialize empty array
    dataSet = [];
  }
  const timestamp = Math.floor(Date.now());
  let item = {
    target: 'checks',
    datapoints: [[anEvent.checks, timestamp]],
  };
  dataSet.push(item);
  item = {
    target: 'clients',
    datapoints: [[anEvent.clients, timestamp]],
  };
  dataSet.push(item);
  item = {
    target: 'critical',
    datapoints: [[anEvent.results.critical, timestamp]],
  };
  dataSet.push(item);
  item = {
    target: 'ok',
    datapoints: [[anEvent.results.ok, timestamp]],
  };
  dataSet.push(item);
  item = {
    target: 'stale',
    datapoints: [[anEvent.results.stale, timestamp]],
  };
  dataSet.push(item);
  item = {
    target: 'total',
    datapoints: [[anEvent.results.total, timestamp]],
  };
  dataSet.push(item);
  item = {
    target: 'unknown',
    datapoints: [[anEvent.results.unknown, timestamp]],
  };
  dataSet.push(item);
  item = {
    target: 'warning',
    datapoints: [[anEvent.results.warning, timestamp]],
  };
  dataSet.push(item);

  return dataSet;
}

function convertToAggregateModeClientJSON(data, dataSet) {
  const timestamp = Math.floor(Date.now());
  if (dataSet === null) {
    // initialize empty array
    dataSet = [];
  }
  // iterate over the checks
  for (let i = 0; i < data.checks.length; i++) {
    const checkName = data.checks[i];
    const clientData = {
      target: data.name,
      datapoints: [[checkName, timestamp]],
    };
    dataSet.push(clientData);
  }
  return dataSet;
}

/**
 * [convertAggregatesToJSON description]
 * @param  {[type]} response [description]
 * @param  {[type]} aTarget  [description]
 * @return {[type]}          [description]
 */
function convertAggregatesToJSON(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);
  let aggregateName = 'ALL';
  if (aTarget.dimensions.length > 0) {
    aggregateName = aTarget.dimensions[0].value;
  }
  for (let i = 0; i < response.data.length; i++) {
    const item = response.data[i];
    const datapoints = [];
    const data = {
      client: item.name,
      checks: item.checks,
      aggregate_name: aggregateName,
    };
    datapoints.push(data);
    item.datapoints = datapoints;
    item.type = 'docs';
  }
  return response;
}

export {
  convertAggregatesToDataPoints,
  convertEventDataToAggregateModeResults,
  convertEventDataToAggregateModeChecks,
  convertEventDataToAggregateModeClient,
  convertEventDataToAggregateModeList,
  convertToAggregateModeClientJSON,
  convertAggregatesToJSON,
};
