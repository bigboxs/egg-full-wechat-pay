# egg-full-wechat-pay

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-full-wechat-pay.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-full-wechat-pay
[travis-image]: https://img.shields.io/travis/eggjs/egg-full-wechat-pay.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-full-wechat-pay
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-full-wechat-pay.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-full-wechat-pay?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-full-wechat-pay.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-full-wechat-pay
[snyk-image]: https://snyk.io/test/npm/egg-full-wechat-pay/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-full-wechat-pay
[download-image]: https://img.shields.io/npm/dm/egg-full-wechat-pay.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-full-wechat-pay

<!--
Description here.
-->

## Install

```bash
$ npm i egg-full-wechat-pay --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.fullWechatPay = {
  enable: true,
  package: 'egg-full-wechat-pay'
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.fullWechatPay = {
  appId: '',
  key: '',
  mchId: '',
  pfx: '',
  appPay: {
    enable: true
  },
  litePay: {
    enable: false
  },
  pubPay: {
    enable: true
  },
  pubQrPay: {
    enable: true
  },
  pubScanPay: {
    enable: true
  },
  wapPay: {
    enable: true
  }
};
```

`enable: false` // 是否实例化该支付业务类 默认 false，true 开启

```
AppPay // APP 支付
LitePay // 小程序支付
PubPay // 公众号支付
PubQrPay // 扫码支付
PubScanPay // 刷卡支付
WapPay // H5 支付
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```
'use strict';

const Controller = require('egg').Controller;

const out_trade_no = '2000124491794131841120';

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
    try {
      // 是否开启沙箱模式
      //await this.ctx.app.pubQrPay.setDebug(true);

      // 统一下单
      const res = await this.ctx.app.pubQrPay.unifiedOrder({
        body: '腾讯充值中心-QQ会员充值',
        out_trade_no,
        total_fee: 1, // 单位：分
        spbill_create_ip: '8.8.8.8',
        notify_url: 'http://test.domain.com/notify',
      });
      console.log('--order --res---success---', res);

      // 查询订单
      // const res1 = await this.ctx.app.pubQrPay.orderQuery({
      //   out_trade_no,
      // });
      // console.log('--order--query--res---success---', res1);


      // 关闭订单
      // const res2 = await this.ctx.app.pubQrPay.closeOrder({
      //   out_trade_no,
      // });
      // console.log('--close--order---res---success---', res2);


      // 查询订单
      // const res3 = await this.ctx.app.pubQrPay.orderQuery({
      //   out_trade_no,
      // });
      // console.log('--order--query-3-res---success---', res3);

    } catch (error) {
      console.log('-----error---', error.stack);
    }
    console.log('----end--->');
    // console.log('-------', JSON.stringify(this.ctx.app.config, 0, 2));
  }

  async wechatNotification() {
    console.log('---wechatPayStateCallBack-----');
    this.ctx.response.body = 'wechatPayStateCallBack';
  }
}

module.exports = HomeController;
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
