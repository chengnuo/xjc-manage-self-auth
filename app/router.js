'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const authToken = app.middleware.auth();

  router.get('/', controller.home.index);
  router.get('/redirectUrl', controller.redirectUrl.index);
  router.get('/signIn', controller.signIn.html); // 登录
  router.post('/signIn', controller.signIn.signIn); // 登录
  router.get('/signOut', controller.signOut.index); // 登出
};
