'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  /**
   * 退出登录
   * @returns {Promise.<void>}
   */
  async index() {
    const { ctx } = this;
    ctx.cookies.set('jwt', null, {
      // maxAge: Math.floor(Date.now() / 1000) + (60 * 60) * 5,
      domain: '.vquery.com',
      httponly: true,
    });
    if(ctx.session.uersResult){
      const resultToken = await this.app.mysql.update('user', {
        id: ctx.session.uersResult.id, // 找到id
        token: null
      });
    }

    this.ctx.body = {
      message: '退出登录',
      status: 200,
    };
  }
}

module.exports = HomeController;
