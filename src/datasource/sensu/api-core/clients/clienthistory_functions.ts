
/**
 * [getClientHistoryURIs description]
 * @param  {Array<string>} clientNames [description]
 * @return {Array<string>}             [description]
 */
function getClientHistoryURIs(clientNames: Array<string>): Array<string> {
  var uris: Array<string> = [];
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
