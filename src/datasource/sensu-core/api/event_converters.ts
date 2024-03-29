/**
 *
 */
import { getResponseForTarget } from './utils';
import { includeEventTarget } from './event_filters';
/**
 * [convertEventsToDataPoints description]
 * @param  {[type]} response [description]
 * @return {[type]}        [description]
 */
function convertEventsToDataPoints(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);

  // convert history to datapoints

  // the result has no "datapoints", need to create it based on the check data

  // when we have a checkname and an clientName, the response is different, the
  // data is not an array, but contains the same information, recreate and push
  if (response.data.length === undefined) {
    const singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }
  const filteredData = [];
  for (let i = 0; i < response.data.length; i++) {
    const anEvent = response.data[i];
    const datapoints = [];
    let startingTimestamp = 0;
    // an event with client param has a timestamp at the toplevel
    if (anEvent.timestamp !== undefined) {
      startingTimestamp = anEvent.timestamp - 60 * anEvent.check.history.length;
    }
    if (anEvent.last_execution !== undefined) {
      startingTimestamp = anEvent.last_execution - 60 * anEvent.history.length;
    }
    // time needs to be in MS, we get EPOCH from Sensu
    for (let y = 0; y < anEvent.check.history.length; y++) {
      datapoints[y] = [anEvent.check.history[y], (startingTimestamp + 60 * y) * 1000];
    }
    anEvent.datapoints = datapoints;
    // set the target to be the check name
    anEvent.target = anEvent.client.name;
    /*
    if (anEvent.check.name !== undefined) {
      anEvent.target = anEvent.check.name;
    } else {
      anEvent.target = anEvent.check;
    }
    */
    anEvent.clientName = anEvent.client.name;
    if (includeEventTarget(aTarget, anEvent)) {
      if (!anEvent.silenced) {
        filteredData.push(anEvent);
      }
      if (anEvent.silenced && !aTarget.hideSilencedEvents) {
        filteredData.push(anEvent);
      }
    }
  }
  const newResponse = { data: filteredData };

  return newResponse;
}

function convertEventsToJSON(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);
  // do not allow modification of response
  //var newResponse = {};

  const filteredData = [];
  for (let i = 0; i < response.data.length; i++) {
    const anEvent = response.data[i];
    const datapoints = [];
    //console.log(JSON.stringify(anEvent));
    if (anEvent.check.issued !== undefined && includeEventTarget(aTarget, anEvent)) {
      let clientShortname = anEvent.client.name;
      // try to split on dot notation, take the first item
      const parts = anEvent.client.name.split('.');
      if (parts.length > 0) {
        clientShortname = parts[0];
      }
      anEvent.client.client_short_name = clientShortname;
      // now create text-based version of status
      let statusText = 'UNKNOWN';
      if (anEvent.check !== undefined && anEvent.check.status !== undefined) {
        switch (anEvent.check.status) {
          case 0:
            statusText = 'OK';
            break;
          case 1:
            statusText = 'WARNING';
            break;
          case 2:
            statusText = 'CRITICAL';
            break;
          case 3:
            statusText = 'UNKNOWN';
            break;
          default:
            statusText = 'UNKNOWN';
            break;
        }
      }
      anEvent.check.status_text = statusText;
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
  const newResponse = { data: filteredData };

  //var str = JSON.stringify(newResponse, null, 2);
  //console.log(str);
  return newResponse;
}

/**
 * The takes /events output from Sensu and returns the following:
 * Count of WARNING, and Number Silenced
 * Count of CRITICAL, and number silenced
 * Count of UNKNOWN, and number silenced
 * Count of all Events
 * Count of all Events not Silenced
 * Count of all Silenced Events
 * Count of Clients Silenced
 * Count of Checks Silenced
 *
 * Filters are also applied
 *
 * @param  {[type]} target   [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
function convertEventsToEventMetricsJSON(aTarget, responses) {
  const response = getResponseForTarget(aTarget, responses);
  // timestamp is taken from first item in response
  let timestamp = 0;
  try {
    timestamp = response.data[0].check.issued * 1000;
  } catch (err) {
    // do nothing
  }
  const eventMetrics = {
    target: 'allEvents',
    timestamp: timestamp,
    numEvents: 0,
    numSilenced: 0,
    numClientsSilenced: 0,
    numChecksSilenced: 0,
    numWarningEvents: 0,
    numWarningEventsSilenced: 0,
    numCriticalEvents: 0,
    numCriticalEventsSilenced: 0,
    numUnknownEvents: 0,
    numUnknownEventsSilenced: 0,
  };
  const clientNames = [];
  const checkNames = [];
  for (let i = 0; i < response.data.length; i++) {
    const anEvent = response.data[i];
    if (anEvent.check.issued !== undefined) {
      if (anEvent.check !== undefined && anEvent.check.status !== undefined && includeEventTarget(aTarget, anEvent)) {
        eventMetrics.numEvents += 1;
        switch (anEvent.check.status) {
          case 1:
            eventMetrics.numWarningEvents += 1;
            if (anEvent.silenced) {
              eventMetrics.numWarningEventsSilenced += 1;
              eventMetrics.numSilenced += 1;
            }
            break;
          case 2:
            eventMetrics.numCriticalEvents += 1;
            if (anEvent.silenced) {
              eventMetrics.numCriticalEventsSilenced += 1;
              eventMetrics.numSilenced += 1;
            }
            break;
          default:
            eventMetrics.numUnknownEvents += 1;
            if (anEvent.silenced) {
              eventMetrics.numUnknownEventsSilenced += 1;
              eventMetrics.numSilenced += 1;
            }
            break;
        }
      }
      // store the client names to count later
      if (clientNames.indexOf(anEvent.client.name) < 0) {
        clientNames.push(anEvent.client.name);
      }
      // store the check names to count later
      if (checkNames.indexOf(anEvent.check.name) < 0) {
        checkNames.push(anEvent.check.name);
      }
      // inspect silenced_by for clientname:*, wich means the client is silenced
      for (let i = 0; i < anEvent.silenced_by.length; i++) {
        if (anEvent.silenced_by[i].indexOf('*') >= 0) {
          eventMetrics.numClientsSilenced += 1;
        } else {
          eventMetrics.numChecksSilenced += 1;
        }
      }
    }
  }
  eventMetrics.numClientsSilenced = clientNames.length;
  eventMetrics.numChecksSilenced = checkNames.length;
  response.data = [
    {
      target: 'allEvents',
      timestamp: timestamp,
      type: 'docs',
      datapoints: [eventMetrics],
    },
  ];
  //var str = JSON.stringify(response, null, 2);
  //console.log(str);
  //var x = response.data[0].datapoints[0][1];
  //console.log("X = " + x);
  return response;
}

/**
 * [convertEventsToEventMetrics description]
 * @param  {[type]} aTarget   [description]
 * @param  {[type]} responses [description]
 * @return {[type]}           [description]
 */
function convertEventsToEventMetrics(aTarget, responses) {
  // find a response that matches the target
  const response = getResponseForTarget(aTarget, responses);
  const newResponse = { data: [] };
  // timestamp is taken from first item in response
  let timestamp = 0;
  try {
    timestamp = response.data[0].check.issued * 1000;
  } catch (err) {
    // do nothing
  }
  const eventMetrics = {
    target: 'allEvents',
    timestamp: timestamp,
    numEvents: 0.0,
    numSilenced: 0.0,
    numClientsSilenced: 0.0,
    numChecksSilenced: 0.0,
    numWarningEvents: 0.0,
    numWarningEventsSilenced: 0.0,
    numCriticalEvents: 0.0,
    numCriticalEventsSilenced: 0.0,
    numUnknownEvents: 0.0,
    numUnknownEventsSilenced: 0.0,
  };
  const clientNames = [];
  const checkNames = [];
  for (let i = 0; i < response.data.length; i++) {
    const anEvent = response.data[i];
    if (anEvent.check.issued !== undefined) {
      if (anEvent.check !== undefined && anEvent.check.status !== undefined && includeEventTarget(aTarget, anEvent)) {
        eventMetrics.numEvents += 1.0;
        switch (anEvent.check.status) {
          case 1:
            eventMetrics.numWarningEvents += 1.0;
            if (anEvent.silenced) {
              eventMetrics.numWarningEventsSilenced += 1.0;
              eventMetrics.numSilenced += 1.0;
            }
            break;
          case 2:
            eventMetrics.numCriticalEvents += 1.0;
            if (anEvent.silenced) {
              eventMetrics.numCriticalEventsSilenced += 1.0;
              eventMetrics.numSilenced += 1.0;
            }
            break;
          default:
            eventMetrics.numUnknownEvents += 1.0;
            if (anEvent.silenced) {
              eventMetrics.numUnknownEventsSilenced += 1.0;
              eventMetrics.numSilenced += 1.0;
            }
            break;
        }
      }
      // store the client names to count later
      if (clientNames.indexOf(anEvent.client.name) < 1.0) {
        clientNames.push(anEvent.client.name);
      }
      // store the check names to count later
      if (checkNames.indexOf(anEvent.check.name) < 1.0) {
        checkNames.push(anEvent.check.name);
      }
      // inspect silenced_by for clientname:*, wich means the client is silenced
      for (let i = 0; i < anEvent.silenced_by.length; i++) {
        if (anEvent.silenced_by[i].indexOf('*') >= 0) {
          eventMetrics.numClientsSilenced += 1.0;
        } else {
          eventMetrics.numChecksSilenced += 1.0;
        }
      }
    }
  }

  let targetName = null;
  if (aTarget.name !== undefined) {
    targetName = aTarget.name;
  }
  if (aTarget.aliasReplaced !== undefined) {
    targetName = aTarget.aliasReplaced;
  }
  newResponse.data = [
    {
      target: targetName,
      datapoints: [[0.0, timestamp]],
    },
  ];
  switch (aTarget.eventMetricMode) {
    case 'all_events_count':
      if (targetName === null) {
        newResponse.data[0].target = 'all_events_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numEvents, timestamp]];
      break;
    case 'active_events_count':
      if (targetName === null) {
        newResponse.data[0].target = 'active_events_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numEvents - eventMetrics.numSilenced, timestamp]];
      break;
    case 'critical_count':
      if (targetName === null) {
        newResponse.data[0].target = 'critical_events_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numCriticalEvents, timestamp]];
      break;
    case 'critical_active_count':
      if (targetName === null) {
        newResponse.data[0].target = 'critical_active_count';
      }
      newResponse.data[0].datapoints = [
        [eventMetrics.numCriticalEvents - eventMetrics.numCriticalEventsSilenced, timestamp],
      ];
      break;
    case 'critical_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'critical_silenced_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numCriticalEventsSilenced, timestamp]];
      break;
    case 'warning_count':
      if (targetName === null) {
        newResponse.data[0].target = 'warning_events_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numWarningEvents, timestamp]];
      break;
    case 'warning_active_count':
      if (targetName === null) {
        newResponse.data[0].target = 'warning_active_count';
      }
      newResponse.data[0].datapoints = [
        [eventMetrics.numWarningEvents - eventMetrics.numWarningEventsSilenced, timestamp],
      ];
      break;
    case 'warning_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'warning_silenced_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numWarningEventsSilenced, timestamp]];
      break;
    case 'unknown_count':
      if (targetName === null) {
        newResponse.data[0].target = 'unknown_events_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numUnknownEvents, timestamp]];
      break;
    case 'unknown_active_count':
      if (targetName === null) {
        newResponse.data[0].target = 'unknown_active_count';
      }
      newResponse.data[0].datapoints = [
        [eventMetrics.numUnknownEvents - eventMetrics.numUnknownEventsSilenced, timestamp],
      ];
      break;
    case 'unknown_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'unknown_silenced_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numUnknownEventsSilenced, timestamp]];
      break;
    case 'silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'silenced_events_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numSilenced, timestamp]];
      break;
    case 'clients_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'clients_silenced_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numClientsSilenced, timestamp]];
      break;
    case 'checks_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'checks_silenced_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numChecksSilenced, timestamp]];
      break;
    default:
      if (targetName === null) {
        newResponse.data[0].target = 'all_events_count';
      }
      newResponse.data[0].datapoints = [[eventMetrics.numEvents, timestamp]];
      break;
  }
  //var str = JSON.stringify(newResponse, null, 2);
  //console.log(str);
  return newResponse;
}

export { convertEventsToJSON, convertEventsToDataPoints, convertEventsToEventMetrics, convertEventsToEventMetricsJSON };
