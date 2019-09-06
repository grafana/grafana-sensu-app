/*

 */
import { getResponseForTarget } from './utils';
import { getClientsWithFilter } from './client_filters';

/**
 * [convertClientsToDataPoints description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
function convertClientsToDataPoints(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);

  // the result has no "datapoints", need to create it based on the check data
  // when we have a checkname and an clientName, the response is different, the
  // data is not an array, but contains the same information, recreate and push
  if (response.data.length === undefined) {
    const singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }
  switch (aTarget.clientQueryMode) {
    case 'list':
      const filterData = [];
      let arrClientNames = [];
      if (aTarget.filters !== undefined && aTarget.filters.length > 0) {
        arrClientNames = getClientsWithFilter(aTarget, response);
        // iterate over the data and store the matching clients in the new filteredData
        for (let i = 0; i < response.data.length; i++) {
          // push matching client names
          if (arrClientNames.indexOf(response.data[i].name) >= 0) {
            filterData.push(response.data[i]);
          }
        }
        // now replace data with filtered data
        response.data = filterData;
      }
      for (let i = 0; i < response.data.length; i++) {
        const data = response.data[i];
        const datapoints = [];
        if (data.timestamp !== undefined) {
          datapoints[0] = [1, data.timestamp * 1000];
        }
        data.datapoints = datapoints;
        // set the target
        data.target = data.name;
      }
      break;
    case 'count':
      if (response.data.length > 0) {
        const data = response.data[0];
        const datapoints = [];
        let clientCount = 0;
        let arrClientNames = [];
        if (aTarget.filters !== undefined && aTarget.filters.length > 0) {
          arrClientNames = getClientsWithFilter(aTarget, response);
          clientCount = arrClientNames.length;
        } else {
          clientCount = response.data.length;
        }
        if (data.timestamp !== undefined) {
          datapoints[0] = [clientCount, data.timestamp * 1000];
        }
        data.datapoints = datapoints;
        // set the target
        data.address = undefined;
        data.name = undefined;
        data.socket = undefined;
        data.subscriptions = undefined;
        data.version = undefined;
        data.target = 'ClientCount';
        if (aTarget.aliasReplaced) {
          data.target = aTarget.aliasReplaced;
        }
        response.data = [data];
      }
      break;
  }
  return response;
}

/**
 * [convertClientsToJSON description]
 * @param  {[type]} response [description]
 * @param  {[type]} aTarget  [description]
 * @return {[type]}          [description]
 */
function convertClientsToJSON(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);

  if (response.data.length === undefined) {
    const data = response.data;
    response.data = [];
    response.data.push(data);
  }
  // start with an empty list
  const newData = [];
  for (let i = 0; i < response.data.length; i++) {
    // default to adding the items, filters will set this to false as needed
    let pushItem = true;
    // clone it
    const item = JSON.parse(JSON.stringify(response.data[i]));
    // empty datapoints
    item.datapoints = [];
    // set the type to docs
    item.type = 'docs';
    //item.value = 0;
    // if there"s no address, it is a JIT client
    const address = item.address;
    if (item.address === 'unknown') {
      item.address = 'JIT Client';
    }
    // check filters
    if (aTarget.filters !== undefined) {
      if (aTarget.filters.length !== undefined) {
        for (let j = 0; j < aTarget.filters.length; j++) {
          const aFilter = aTarget.filters[j];
          switch (aFilter.filterType) {
            case 'regex':
              // make sure the regex is valid
              try {
                const flags = aFilter.filterRegexFlags;
                const re = new RegExp(aFilter.filterRegex, flags);
                if (re.test(item.name)) {
                  // push this one
                  //console.log("matched regex");
                  aFilter.filterMessage = 'OK';
                } else {
                  pushItem = false;
                }
              } catch (err) {
                aFilter.filterMessage = 'Invalid Regular Expression';
                //console.log("Invalid Regex Detected!");
                break;
              }
              break;
            case 'field':
              if (item.hasOwnProperty(aFilter.filterFieldName)) {
                const fieldVal = item[aFilter.filterFieldName];
                if (fieldVal !== aFilter.filterFieldValueReplaced) {
                  pushItem = false;
                }
              } else {
                // no field, no push
                pushItem = false;
              }
              break;
          }
        }
      }
    }
    // push into the datapoints
    if (pushItem) {
      //itemData.datapoints.push(itemData);
      const entry = {
        type: 'docs',
        datapoints: [item],
      };
      newData.push(entry);
    }
  }
  response.data = newData;
  return response;
}

/**
 * [convertClientHistoryToDataPoints description]
 * @param  {[type]} response [description]
 * @return {[type]}        [description]
 */
function convertClientHistoryToDataPoints(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);

  // the result has no "datapoints", need to create it based on the check data
  // when we have a checkname and an clientName, the response is different, the
  // data is not an array, but contains the same information, recreate and push
  //if (response.data.length === undefined) {
  //  var singleData = response.data;
  //  response.data = [];
  //  response.data.push(singleData);
  //}
  for (let i = 0; i < response.data.length; i++) {
    const anEvent = response.data[i];
    const datapoints = [];
    let startingTimestamp = 0;
    if (anEvent.last_execution !== undefined) {
      startingTimestamp = anEvent.last_execution - 60 * anEvent.history.length;
    }
    // time needs to be in MS, we get EPOCH from Sensu
    if (anEvent.history !== undefined) {
      for (let y = 0; y < anEvent.history.length; y++) {
        datapoints[y] = [anEvent.history[y], (startingTimestamp + 60 * y) * 1000];
      }
    }
    anEvent.datapoints = datapoints;
    // set the target to be the check name
    anEvent.target = 'unknown';
    if (anEvent.name !== undefined) {
      anEvent.target = anEvent.name;
    }
    if (anEvent.check !== undefined) {
      anEvent.target = anEvent.check;
    }
  }
  return response;
}

/**
 * Returns JSON with the following:
 *    #Checks
 *    #Checks silenced
 *    #Checks OK
 *    #Checks warning
 *    #Checks Critical
 *    #Clients
 *    #Clients silenced
 *    #Clients OK
 *    #Clients warning
 *    #Clients Critical
 * @param  {[type]} responses [description]
 * @return {[type]}           [description]
 */
function convertClientSummaryMetricsToJSON(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);
}

/*
  Client Health

  Health is determined by taking the worst of the non-silenced results for a client

  The "unknown" state can optionally be used as the worst state
  Specifically:
    /results/:client
        status field is inspected for:
        0 = OK
        1 = WARNING
        2 = CRITICAL
        3 = UNKNOWN
    /events/:client
        status field is inspected

 */

/**
 * [convertClientHealthToJSON description]
 * @param  {[type]} target   [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
function convertClientHealthToJSON(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);

  const filteredData = [];
  for (let i = 0; i < response.data.length; i++) {
    const anEvent = response.data[i];
    const datapoints = [];
    //console.log(JSON.stringify(anEvent));
    if (anEvent.check.issued !== undefined) {
      const data = {
        timestamp: anEvent.check.issued * 1000,
        check_name: anEvent.check.name,
        client: anEvent.client,
        check: anEvent.check,
        occurrences: anEvent.occurrences,
        occurrences_watermark: anEvent.occurrences_watermark,
        action: anEvent.action,
        id: anEvent.id,
        last_state_change: anEvent.last_state_change * 1000,
        last_ok: anEvent.last_ok * 1000,
        silenced: anEvent.silenced,
        silenced_by: anEvent.silenced_by,
      };
      try {
        data.check.issued = data.check.issued * 1000;
        data.check.executed = data.check.executed * 1000;
      } catch (err) {
        // do nothing
      }
      datapoints.push(data);
      anEvent.datapoints = datapoints;
      delete anEvent.check;
      delete anEvent.client;
      anEvent.type = 'docs';
      if (!anEvent.silenced) {
        filteredData.push(anEvent);
      }
      if (anEvent.silenced && !aTarget.hideSilencedEvents) {
        filteredData.push(anEvent);
      }
    }
  }
  response.data = filteredData;
  //var str = JSON.stringify(response, null, 2);
  //console.log(str);
  return response;
}

// TODO
//  This needs to return health of individual clients
function convertClientHealthMetricsToJSON(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);
}

export {
  convertClientsToDataPoints,
  convertClientsToJSON,
  convertClientHistoryToDataPoints,
  convertClientSummaryMetricsToJSON,
  convertClientHealthToJSON,
  convertClientHealthMetricsToJSON,
};
