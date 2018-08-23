'use strict';

const jwt = require('koa-jwt2')

module.exports = () => {
  return async function (ctx, next) {
    await jwt({secret: ctx.app.config.jwt.secret}).unless({
    // ctx.app.jwt({secret: ctx.app.config.jwt.secret}).unless({
      path: [
        /^\/api\/v1\/user/,
        /^\/api\/v1\/user\/login/,
        /^\/signIn/,
      ]
      //数组中的路径不需要通过jwt验证
    })
  }
};