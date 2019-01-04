///<reference path="../../../../node_modules/@types/grafana/app/core/services/backend_srv.d.ts" />
import _ from 'lodash';

import {SensuCoreDatasource} from "../../../../src/datasource/sensu-core/datasource";

function TemplateSrvStub(this: any) {
  this.variables = [];
  this.templateSettings = { interpolate: /\[\[([\s\S]+?)\]\]/g };
  this.data = {};
  this.replace = function(text: any) {
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
  this.setGrafanaVariable = function(name: any, value: any) {
    this.data[name] = value;
  };
}

describe('SensuCoreDatasource', () => {
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
        let ds: any;

        beforeEach(async () => {
          const backendSrv = {
            async datasourceRequest() {
              return Promise.resolve({ status: 200 });
            },
          };
          ds = new SensuCoreDatasource(instanceSettings, $q, backendSrv, templateSrv, uiSegmentSrv);
          result = await ds.testDatasource();
        });
        it('should return successfully', () => {
          expect(result.status).toBe('success');
        });
      });
      describe('and call to sensu-core api fails', () => {
        let result: any;
        let ds: any;

        beforeEach(async () => {
          const backendSrv = {
            async datasourceRequest() {
              return Promise.resolve({ status: 501 });
            },
          };
          ds = new SensuCoreDatasource(instanceSettings, $q, backendSrv, templateSrv, uiSegmentSrv);
          result = await ds.testDatasource();
        });
        it('should return error', () => {
          expect(result.status).toBe('error');
        });
      });
    });
});
