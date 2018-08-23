'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534821215413_8532';

  // add your config here
  config.middleware = [
    // 'unless', // 过滤，eggjs不知道怎么写
    // 'auth', // 权限
  ];

  // http://www.cmd5.com/ 管理自己
  // jwt 密钥
  config.jwt = {
    secret: "be52fe8111dd847e",
  };

  // 单数据库信息配置
  config.mysql = {
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'x-myself',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // token 去掉csrf验证
  config.security = {
    csrf: {
      enable:false,
      // ignoreJSON: true,
    },
    // 白名单
    domainWhiteList: [ 'http://auth.vquery.com:7001', 'http://a.vquery.com:7001' ],
    // withCredentials: true,
    // domainWhiteList:['.vquery.com'],  // security whitelist, starts with '.'
  }

  // # 黑白名单 {app_root}/config/config.default.js
  config.cors = {
    // 'origin': 'http://auth.vquery.com:7001',
    'allowMethods': 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    'credentials': true,
    // 'allowHeaders': 'Origin, X-Requested-With, Content-Type, Accept',
    // 'withCredentials': true,
  };


  return config;
};
