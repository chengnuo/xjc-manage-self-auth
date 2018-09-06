const Service = require('egg').Service;

class CheckTokenService extends Service {
  async index(token) {

    const { ctx } = this;
    const tokenResult = await ctx.app.mysql.get('user', {
      token: token,
    });

    return tokenResult;

  }
}

module.exports = CheckTokenService;
