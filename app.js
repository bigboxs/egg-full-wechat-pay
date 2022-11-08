'use strict';


const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const upperFirst = require('upper-case-first');
const paySDK = require('wechatpay-private-sdk');

const PAY_CLASS_NAMES = [
  'AppPay', // APP 支付
  'LitePay', // 小程序支付
  'PubPay', // 公众号支付
  'PubQrPay', // 扫码支付
  'PubScanPay', // 刷卡支付
  'WapPay', // H5 支付
];

module.exports = app => {
  app.beforeStart(async () => {
    let { fullWechatPay } = app.config;
    if (fullWechatPay) {
      const { appId, key, mchId, methods, pfx } = fullWechatPay;
      if (!appId || !key || !mchId || !methods || !pfx) {
        console.log(`WechatPay params incomplete`);
        return;
      }
      if (!_.isArray(methods)) {
        console.log(`WechatPay params methods must be array `);
        return;
      }
      const payClassNamesSet = new Set(PAY_CLASS_NAMES);
      fullWechatPay.pfx = fs.readFileSync(path.resolve(__dirname, pfx));
      try {
        methods.map((key) => {
          const className = upperFirst.upperCaseFirst(key);
          if (payClassNamesSet.has(className)) {
            app[key] = new paySDK[className](_.pick(fullWechatPay, ['appId', 'key', 'mchId', 'pfx']));
          }
        });
      } catch (error) {
        console.log(`WechatPay init ${className} fail. params is ${JSON.stringify(fullWechatPay)}`);
      }
    } else {
      console.log(`WechatPay does not exist`);
    }
  });
};
