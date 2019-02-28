import md5 from 'md5'
// import baseConfig from '../config/base.config.js'
import { user, User, Include, sequelize } from '../models/test'
// import {send, tokenSign, tokenVerify, where, option, fuzzyQuery, pagination, it} from "../service/utils"
import { tokenSign, tokenVerify, send } from "../service";

export default {
  async login(ctx)  {
    const post = ctx.request.body
    console.log(post)
    let result
    try {
      if (!post.user_id && !post.password) {
        return ctx.body = {
          message: '账号和密码不能为空',
          status: 0
        }
      } else {
        post.password = md5(post.password)
        console.log(post)
        result = await User.findOne({
          where: post,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
          }
        })
        console.log(result)
        if (result) {
          const token = tokenSign({ id: result.user_id })
          ctx.cookies.set('token', token)
          return ctx.body = {
            data: result,
            message: '登录成功',
            status: 200
          }
        }
      }
    } catch (err) {
      return ctx.body = {
        message: '登录失败',
        status: 0
      }
    }
    ctx.body = send(null, result, ctx)
  },
  async register(ctx) {
    const post = ctx.request.body
    let result
    try {
      post.password = md5(post.password)
      result = await User.create(post)
    } catch (err) {
      return ctx.body = send(err, null, ctx)
    }
    ctx.body = {
      data: send(null, result, ctx),
      message: '注册成功',
      status: 200
    }
  },
  async auth(ctx, next) {
    const token = ctx.cookies.get('token')
    console.log(token)
    if (token) {
      const { id } = tokenVerify(token)
      console.log(id)
      if (id) {
        ctx.state.user_id = id
        ctx.status = 200
        await next()
        
      }
    }
  },
  async logout(ctx) {
    ctx.cookies.set('token', null)
    ctx.status = 200
  }
}
