'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');



class HomeController extends Controller {
  /**
   * 查看页面
   * @returns {Promise.<void>}
   */
  async html() {
    // this.ctx.body = {
    //   message: '登录',
    //   status: 200,
    // };

    const { ctx } = this;
    let token = ctx.cookies.get('jwt');



    if(token){
      let redirectUrl = ctx.query.redirectUrl;
      if (redirectUrl) {
        // ctx.redirect(`http://${redirectUrl}`);
        ctx.redirect(`${redirectUrl}/signIn`);
      } else {
        await ctx.render('home.html');
      }
    }else {
      await ctx.render('signIn.html');
    }
  }


  /**
   * 登录
   * @returns {Promise.<void>}
   */
  async signIn() {
    const { ctx } = this;
    // 设置token
    // this.ctx.set('x-access-token', this.ctx.app.config.token);

    // # 获取用户信息
    const user = await this.app.mysql.get('user', {
      username: ctx.request.body.username,
      // password: ctx.request.body.password,
    });

    if(user){
      if(ctx.request.body.password === user.password){
        // # 用户名和密码进行查找
        const uersResult = await this.app.mysql.get('user', {
          username: ctx.request.body.username,
          password: user.password,
        });
        // # 生成token
        const dayUnix = moment(new Date().getTime()).unix();
        const token = this.app.jwt.sign({
            'id': uersResult.id,
            'iat': dayUnix,
            'exp': Math.floor(Date.now() / 1000) + (60 * 60) * 5, // 5个小时
          }, this.app.config.jwt.secret,
        );
        // # 存入数据库
        const resultToken = await this.app.mysql.update('user', {
          id: uersResult.id,
          token,
        });
        // # 判断是否录入成功
        if(resultToken.affectedRows===1){
          ctx.cookies.set('jwt', `${token}`,{
            maxAge: Math.floor(Date.now() / 1000) + (60 * 60) * 5,
            domain: '.vquery.com',
            httponly: true,
          });
          ctx.session.uersResult = uersResult; // 缓存用户信息
          ctx.body = {
            message: `登录成功`,
            status: 200,
            token,
          };
        }
      }else{
        ctx.body = {
          message: `密码错误`,
          status: 412,
        };
      }
    }else{
      ctx.body = {
        message: `用户不存在`,
        status: 403,
      };
    }
  }

}

module.exports = HomeController;
