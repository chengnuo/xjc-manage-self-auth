'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/signIn', controller.signIn.index); // 登录
  router.get('/signOut', controller.signOut.index); // 登出
};
