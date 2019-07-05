/**
 *
 */

/**
 * No fields means it is a match
 * @param  {[type]}  target [description]
 * @return {Boolean}        [description]
 */
function includeEventTarget(target, anEvent) {
  if (target.filters === undefined) {
    return true;
  }
  if (target.filters.length === 0) {
    return true;
  }
  for (let i = 0; i < target.filters.length; i++) {
    const aFilter = target.filters[i];
    switch (aFilter.filterType) {
      case "field":
        // filterFieldName
        // filterFieldValue
        if (anEvent.client.hasOwnProperty(aFilter.filterFieldName)) {
          // matched field, check value
          const aVal = anEvent.client[aFilter.filterFieldName];
          if (aVal === aFilter.filterFieldValueReplaced) {
            return true;
          }
        }
        break;
    }
  }
  return false;
}

export {
  includeEventTarget
};
