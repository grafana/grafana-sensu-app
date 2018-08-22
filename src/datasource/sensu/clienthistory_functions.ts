import { getResponseForTarget } from "./common";

/**
 * [getClientHistoryURIs description]
 * @param  {[type]} clientNames [description]
 * @return {[type]}             [description]
 */
function getClientHistoryURIs(clientNames) {
  var uris = [];
  var dimensionURI = "/clients";
  // look for clientName in dimensions
  if (clientNames.length) {
    for (let i = 0; i < clientNames.length; i++) {
      let aClientName = clientNames[i];
      dimensionURI = "/clients/" + aClientName + "/history";
      uris.push(dimensionURI);
    }
  }
  if (uris.length === 0) {
    uris.push(dimensionURI);
  }
  return uris;
}

export {
  getClientHistoryURIs
};
