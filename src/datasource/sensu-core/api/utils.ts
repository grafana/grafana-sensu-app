function getResponseForTarget(aTarget, responses) {
  // find a response that matches the target
  const response = {
    data: []
  };
  for (let i = 0; i < responses.data.length; i++) {
    if (responses.data[i].target === aTarget) {
      // this is the response to convert
      response.data = responses.data[i].response.data;
      break;
    }
  }
  return response;
}


export {
  getResponseForTarget
};
