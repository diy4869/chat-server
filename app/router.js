import Router from 'koa-router'
const router = new Router()

import user from './controllers/user'
router
  .post('/user/login',  user.login)
  .post('/user/register',  user.register)
  .post('/user/auth',  user.auth) // 验证用户是否登录
  .post('/user/logout',  user.logout) // 登出

import friend from './controllers/friend'
router
  .post('/friend/search', user.auth, friend.search) // 好友搜索
  .post('/friend/applicationList',user.auth,  friend.find) // 申请列表
  .post('/friend/BeAppliedFor',user.auth,  friend.BeAppliedFor) // 获取谁申请了你
  .post('/friend/verify',user.auth,  friend.verify) // 好友验证
  .post('/friend/getFriendList',user.auth,  friend.getFriendList) // 获取好友列表
  .post('/friend/add',user.auth,  friend.add) // 添加好友
  .post('/friend/update',user.auth,  friend.update) // 验证用户是否登录

  .post('/friend/remove',user.auth,  friend.remove) // 登出

import userInfo from './controllers/userInfo'

router
  .post('/user/userInfo', user.auth, userInfo.userInfo) // 获取用户信息
  
export default router