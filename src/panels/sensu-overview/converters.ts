function convertStatsToPanelStats(result) {
  const converted = [];
  const stats = result.data[0].datapoints[0];
  console.log("convertStatsToPanelStats.stats:" + JSON.stringify(stats));
  converted.push({
    bgColor: "inherit",
    color: "red",
    text: "placeholder",
    title: "Critical Events",
    primary_icon: "fire",
    active: stats.numCriticalEvents - stats.numCriticalEventsSilenced,
    silenced: stats.numCriticalEventsSilenced,
    total: (stats.numCriticalEvents + stats.numCriticalEventsSilenced),
    iconColor: "secondary"
  });
  converted.push({
    bgColor: "inherit",
    color: "yellow",
    text: "placeholder",
    title: "Warning Events",
    primary_icon: "flag",
    active: stats.numWarningEvents - stats.numWarningEventsSilenced,
    silenced: stats.numWarningEventsSilenced,
    total: stats.numWarningEvents + stats.numWarningEventsSilenced,
    iconColor: "inherit"
  });
  converted.push({
    bgColor: "inherit",
    color: "grey",
    text: "placeholder",
    title: "Unknown Events",
    primary_icon: "question-circle",
    active: stats.numUnknownEvents - stats.numUnknownEventsSilenced,
    silenced: stats.numUnknownEventsSilenced,
    total: stats.numUnknownEvents + stats.numUnknownEventsSilenced,
    iconColor: "primary"
  });
  return converted;
}

function convertClientHealthStatsToPanelStats(result) {
  const converted = [];
  const stats = result.data[0].datapoints[0];
  console.log("convertClientHealthToPanelStats.stats:" + JSON.stringify(stats));
  converted.push({
    bgColor: "inherit",
    color: "green",
    text: "placeholder",
    title: "OK Clients",
    primary_icon: "thumbs-up",
    active: 0,
    silenced: 0,
    total: 0,
    iconColor: "secondary"
  });
  converted.push({
    bgColor: "inherit",
    color: "red",
    text: "placeholder",
    title: "Critical Clients",
    primary_icon: "fire",
    active: 0,
    silenced: 0,
    total: 0,
    iconColor: "secondary"
  });
  converted.push({
    bgColor: "inherit",
    color: "yellow",
    text: "placeholder",
    title: "Warning Clients",
    primary_icon: "flag",
    active: 0,
    silenced: 0,
    total: 0,
    iconColor: "inherit"
  });
  converted.push({
    bgColor: "inherit",
    color: "grey",
    text: "placeholder",
    title: "Unknown Clients",
    primary_icon: "question-circle",
    active: 0,
    silenced: 0,
    total: 0,
    iconColor: "primary"
  });
  return converted;
}

export {
  convertStatsToPanelStats,
  convertClientHealthStatsToPanelStats
};
