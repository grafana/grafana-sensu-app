
function getResultURIs(checkNames, clientNames) {
  var uris = [];
  var dimensionURI = "/results";
  var aClientName = null;
  var aCheckName = null;
  var anAggregateName = null;
  if (clientNames.length) {
    for (let i = 0; i < clientNames.length; i++) {
      aClientName = clientNames[i];
      dimensionURI = "/results/" + aClientName;
      uris.push(dimensionURI);
    }
  }
  if ((checkNames.length) && (clientNames.length)) {
    for (let i = 0; i < clientNames.length; i++) {
      aClientName = clientNames[i];
      for (let j = 0; j < checkNames.length; j++) {
        aCheckName = checkNames[i];
        dimensionURI = "/results/" + aClientName + "/" + aCheckName;
        uris.push(dimensionURI);
      }
    }
  }
  if (uris.length === 0) {
    uris.push(dimensionURI);
  }
  return uris;
}

export {
  getResultURIs
};
