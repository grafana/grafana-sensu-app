

function testDatasource(backendSrv: any, url: string, basicAuth: string) {
  console.log("testing sensu datasource");
  return backendSrv.datasourceRequest({
    url: url + "/info",
    headers: {
      "Content-Type": "application/json",
      "Authorization": basicAuth
    },
    method: "GET",
  }).then((response: { status: number; }) => {
    if (response.status === 200) {
      return {
        status: "success",
        message: "Data source is working",
        title: "Success"
      };
    }
    return {
      status: "error",
      message: "Data source is not working",
      title: "Error"
    };
  });
}

export {testDatasource}
