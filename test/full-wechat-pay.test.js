'use strict';

const mock = require('egg-mock');

describe('test/full-wechat-pay.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/full-wechat-pay-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, fullWechatPay')
      .expect(200);
  });
});
