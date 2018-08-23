'use strict';

const statusCode = require('../util/statusCode')

module.exports = () => {
  return async function (ctx, next) {


    const token = ctx.header.authorization;  // 获取jwt

    if(token && token.split(' ')[0]==='Bearer'){
      // # token 查找对比
      const tokenResult = await ctx.app.mysql.get('user', {
        token: token.split(' ')[1],
      });

      if(tokenResult){
        if(tokenResult.token !== token.split(' ')[1]) {
          ctx.body = {
            data: {
              message: 'unauthorized，！token-错误',
              status: 401,
            },
          }
        }else {
          try {
            let payload = await ctx.app.jwt.verify(token.split(' ')[1], ctx.app.config.jwt.secret)  // 解密payload，获取用户名和ID
            ctx.user = {
              name: payload.name,
              id: payload.id
            }
            await next();
          } catch (err) {
            err.status = 401;
            ctx.body = statusCode.ERROR_401('token verify fail');
          }
        }
      }else{
        ctx.status = 401;
        ctx.body = statusCode.ERROR_401('unauthorized，！token--错误');
      }
    }else {
      ctx.status = 401;
      ctx.body = statusCode.ERROR_401('unauthorized，请求需要用户的身份认证！');
    }
  }
};

//
// module.exports = () => {
//   return async function (ctx, next) {
//     try {
//       const token = ctx.header.authorization  // 获取jwt
//
//       console.log('token', token)
//
//       if (token) {
//         console.log('token1', token)
//         let payload
//         try {
//           payload = await ctx.jwt.verify(token.split(' ')[1], secret.sign)  // 解密payload，获取用户名和ID
//           ctx.user = {
//             name: payload.name,
//             id: payload.id
//           }
//         } catch (err) {
//
//           err.status = 401;
//           ctx.body = statusCode.ERROR_401('token verify fail');
//         }
//       }
//       await next()
//     } catch (err) {
//       console.log('token2', token)
//
//       console.log('err', err)
//
//       if (err.status === 401) {
//         ctx.status = 401;
//         ctx.body = statusCode.ERROR_401('unauthorized，请求需要用户的身份认证！');
//       } else {
//
//         err.status = 404;
//         ctx.body = statusCode.ERROR_404('不存在的用户');
//       }
//     }
//   }
// };