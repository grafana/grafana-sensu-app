///<reference path="../../../../node_modules/@types/grafana/app/core/services/backend_srv.d.ts" />

/**
 * Tests for Datasource
 */
import {testDatasource} from "./core";

describe('when performing testDataSource', () => {
    describe('and call to sensu-core api succeeds', () => {
      let result: any;
      let uri = "http://localhost:4567";
      let auth = "good";

      beforeEach(async () => {
        const backendSrv = {
          async datasourceRequest() {
            return Promise.resolve({ status: 200 });
          },
        };
        result = await testDatasource(backendSrv, uri, auth);
      });
      it('should return successfully', () => {
        expect(result.status).toBe('success');
      });
    });
    describe('and call to sensu-core api fails', () => {
      let result: any;
      let uri = "http://localhost:4567";
      let auth = "bad";

      beforeEach(async () => {
        const backendSrv = {
          async datasourceRequest() {
            return Promise.resolve({ status: 501 });
          },
        };
        result = await testDatasource(backendSrv, uri, auth);
      });
      it('should return error', () => {
        expect(result.status).toBe('error');
      });
    });
  });
