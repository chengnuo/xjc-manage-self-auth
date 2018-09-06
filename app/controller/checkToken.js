'use strict';

const Controller = require('egg').Controller;

class CheckTokenController extends Controller {
  async index() {
    // const token = req.query.token;
    const { ctx } = this;
    const token = ctx.cookies.get('jwt') || '';
    let result = {
      status: 500, //登录失败
      message: '登录失败',
    };
    let checkToken = await ctx.service.checkToken.index(token);
    if (token === checkToken.token) {
      console.log(`成功`)
      result.status = 200;
      result.userId = 'test';
      result.message = '登录成功';
    }
    ctx.body=result;
  }
}

module.exports = CheckTokenController;
