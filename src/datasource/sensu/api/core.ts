
import {testDatasource as testCoreDatasource} from "../api-core/core";

function testDatasource(backendSrv: any, url: string, basicAuth: string, sensuType: string) {
  switch (sensuType) {
    case "core":
      return testCoreDatasource(backendSrv, url, basicAuth);
    default:
      return testCoreDatasource(backendSrv, url, basicAuth);
  }
}

export {testDatasource}
