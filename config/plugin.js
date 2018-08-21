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
