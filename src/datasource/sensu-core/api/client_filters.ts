
function getClientsWithFilter(aTarget, response) {
  const arrClientNames = [];
  for (let i = 0; i < aTarget.filters.length; i++) {
    const aFilter = aTarget.filters[i];
    switch (aFilter.filterType) {
      case "field":
        for (let j = 0; j < response.data.length; j++) {
          if (response.data[j].hasOwnProperty(aFilter.filterFieldName)) {
            const fieldVal = response.data[j][aFilter.filterFieldName];
            if (fieldVal === aFilter.filterFieldValueReplaced) {
              // matched field
              if (arrClientNames.indexOf(response.data[j].name) === -1) {
                arrClientNames.push(response.data[j].name);
              }
            }
          }
        }
        break;
      case "fetch":
        // iterate over all of the data
        for (let j = 0; j < response.data.length; j++) {
          if (aFilter.value === response.data[j].name) {
            // add to list of tracked names
            if (arrClientNames.indexOf(response.data[j].name) === -1) {
              arrClientNames.push(response.data[j].name);
            }
          }
        }
        break;
      case "regex":
        // make sure the regex is valid
        try {
          const flags = aFilter.filterRegexFlags;
          const re = new RegExp(aFilter.filterRegex, flags);
          // iterate over all of the data
          for (let j = 0; j < response.data.length; j++) {
            if (re.test(response.data[j].name)) {
              // add to list of tracked names
              if (arrClientNames.indexOf(response.data[j].name) === -1) {
                arrClientNames.push(response.data[j].name);
              }
            }
          }
        } catch (err) {
          aFilter.filterMessage = "Invalid Regular Expression";
        }
        break;
    }
  }
  return arrClientNames;
}

export {
  getClientsWithFilter
};
