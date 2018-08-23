'use strict';

// had enabled by egg
// exports.static = true;


// {app_root}/config/plugin.js
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};

// 数据库配置
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

// config/plugin.js
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};


// # 黑白名单 {app_root}/config/plugin.js
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.security = {
  enable: true,
  package: 'egg-security',
};