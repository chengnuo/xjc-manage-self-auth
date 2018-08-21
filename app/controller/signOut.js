'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = {
      message: '登出',
      status: 200,
    };
  }
}

module.exports = HomeController;
