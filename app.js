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
    const { fullWechatPay } = app.config || {};
    const payClassNamesSet = new Set(PAY_CLASS_NAMES);
    if (fullWechatPay.pfx && typeof fullWechatPay.pfx === 'string') {
      fullWechatPay.pfx = fs.readFileSync(path.resolve(__dirname, fullWechatPay.pfx));
    }
    if (fullWechatPay.appId && fullWechatPay.key && fullWechatPay.mchId) {
      Object.keys(fullWechatPay).filter(key => ![ 'appId', 'key', 'mchId', 'pfx' ].includes(key)).map(key => {
        const className = upperFirst.upperCaseFirst(key);
        if (payClassNamesSet.has(className) && fullWechatPay[key] && typeof fullWechatPay[key] === 'object' && fullWechatPay[key].enable) {
          try {
            app[key] = new paySDK[className](_.pick(fullWechatPay, [ 'appId', 'key', 'mchId', 'pfx' ]));
          } catch (error) {
            console.log(`fullWechatPay init ${className} fail. params is ${JSON.stringify(fullWechatPay)}`);
          }
        }
      });
    }
  });
};
