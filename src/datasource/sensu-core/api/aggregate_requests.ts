/**
 *
 */

function getAggregateURIs(target, aggregateNames) {
  // https://sensuapp.org/docs/0.28/api/aggregates-api.html
  const uris = [];
  let dimensionURI = "/aggregates";
  let anAggregateName = null;
  // name, name/clients, name/checks, name/results/severity
  if (aggregateNames.length) {
    for (let i = 0; i < aggregateNames.length; i++) {
      anAggregateName = aggregateNames[i];
      dimensionURI = "/aggregates/" + anAggregateName;
      switch (target.aggregateMode) {
        case "checks":
          dimensionURI = "/aggregates/" + anAggregateName + "/checks";
          break;
        case "clients":
          dimensionURI = "/aggregates/" + anAggregateName + "/clients";
          break;
        case "list":
          dimensionURI = "/aggregates/" + anAggregateName;
          break;
        case "results_critical":
          dimensionURI = "/aggregates/" + anAggregateName + "/results/critical";
          break;
        case "results_ok":
          dimensionURI = "/aggregates/" + anAggregateName + "/results/ok";
          break;
        case "results_unknown":
          dimensionURI = "/aggregates/" + anAggregateName + "/results/unknown";
          break;
        case "results_warning":
          dimensionURI = "/aggregates/" + anAggregateName + "/results/warning";
          break;
      }
      uris.push(dimensionURI);
    }
  }
  if (uris.length === 0) {
    uris.push(dimensionURI);
  }
  return uris;
}

export {
  getAggregateURIs
};
