///<reference path="../../node_modules/@types/grafana/app/core/services/backend_srv.d.ts" />
import _ from 'lodash';

import {SensuDatasource} from "../../src/datasource/sensu/datasource";

function TemplateSrvStub(this: any) {
  this.variables = [];
  this.templateSettings = { interpolate: /\[\[([\s\S]+?)\]\]/g };
  this.data = {};
  this.replace = function(text) {
    return _.template(text, this.templateSettings)(this.data);
  };
  this.init = () => {};
  this.getAdhocFilters = () => {
    return [];
  };
  this.fillVariableValuesForUrl = () => {};
  this.updateTemplateData = () => {};
  this.variableExists = () => {
    return false;
  };
  this.variableInitialized = () => {};
  this.highlightVariablesAsHtml = str => {
    return str;
  };
  this.setGrafanaVariable = function(name, value) {
    this.data[name] = value;
  };
}

describe('SensuDataSource', () => {
  describe('when performing testDataSource', () => {
    const instanceSettings = {
      jsonData: {
        defaultProject: 'testproject',
      },
    };
    const templateSrv = new TemplateSrvStub();
    const uiSegmentSrv = {};
    const $q = {};
    describe('and call to sensu-core api succeeds', () => {
        let result: any;
        let uri = "http://localhost:4567";
        let auth = "good";
        let ds: any;

        beforeEach(async () => {
          const backendSrv = {
            async datasourceRequest() {
              return Promise.resolve({ status: 200 });
            },
          };
          ds = new SensuDatasource(instanceSettings, $q, backendSrv, templateSrv, uiSegmentSrv);
          result = await ds.testDatasource();
        });
        it('should return successfully', () => {
          expect(result.status).toBe('success');
        });
      });
      describe('and call to sensu-core api fails', () => {
        let result: any;
        let uri = "http://localhost:4567";
        let auth = "bad";
        let ds: any;

        beforeEach(async () => {
          const backendSrv = {
            async datasourceRequest() {
              return Promise.resolve({ status: 501 });
            },
          };
          ds = new SensuDatasource(instanceSettings, $q, backendSrv, templateSrv, uiSegmentSrv);
          result = await ds.testDatasource();
        });
        it('should return error', () => {
          expect(result.status).toBe('error');
        });
      });
    });
});
