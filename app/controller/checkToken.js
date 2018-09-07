'use strict';

const Controller = require('egg').Controller;

class CheckTokenController extends Controller {
  async index() {
    // const token = req.query.token;
    const { ctx } = this;
    const token = ctx.cookies.get('jwt') || ctx.query.token;

    // console.log('ctx.params.token', ctx.params.token)
    console.log('ctx.query.token', ctx.query.token)

    let result = {
      status: 500, //登录失败
      message: '登录失败',
    };
    console.log(`authtoken`, token)
    let checkToken = await ctx.service.checkToken.index(token);
    if (token === checkToken.token) {
      console.log(`成功`)
      result.status = 200;
      result.username = checkToken.username;
      result.message = '登录成功';
    }
    ctx.body=result;
  }
}

module.exports = CheckTokenController;
