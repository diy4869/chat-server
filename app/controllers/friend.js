import md5 from 'md5'
import {user, friend, Include, sequelize, Scopes, op} from '../models/test'
import { createContext } from 'vm';
const {send, tokenSign, tokenVerify, where, option, fuzzyQuery, fuzzyQueryLeft, pagination, it} = Scopes

console.log(Scopes)
export default {
  // 搜索好友
  search:user
    .scope(
      where(['user_id', '@keyword']),
      // fuzzyQuery('@keyword')
    )
    .findAll(),
  // 获取你申请好友的列表
  find: friend
    .scope(
      where(['uid', '@user_id'], ['isAgree =', 0]),    
      Include.create('user'),
      pagination, // 分页
    )
    .findAll(),
  // 获取哪些人申请
  BeAppliedFor: friend
  .scope(
    where(['fid', '@user_id'], ['isAgree !=', 1]),
    Include.create('user'),
    pagination, // 分页
  )
  .findAll(),
  // verify: friend
  //   .scope(
  //     where('fid')
  //   )
  //   .update(),
  // 验证信息
  verify:friend
    .process('post', async function (d) {
      let res
      try {
        switch (~~d.isAgree) {
          case 1:
            res = await friend.rawUpdate('fid')
            return res
            break;
          case 2:
            res = await friend.rawUpdate('fid')
            return res
            break;
          case 3:
            res = await friend.rawUpdate('fid')
            return res
            break;
          default:
            return '无效参数'
            break;
        }
      } catch (err) {
        console.log(err)
        return ctx.body = {
          message: '失败',
          status: 0 
        }
      }
    }),
  // 获取好友列表
  getFriendList: friend
    .scope(
      where(['uid', '@user_id'], ['isAgree =', 1]),
      Include.create('user'),
    )
    .findAll(),
  // 添加好友
  add: friend.create(['uid', '@user_id'], 'fid'),
  update: friend.update(['uid', 'id'], ['fid', 'id']),
  // update: friend.update(['isAgree', 1],['uid', 'id'], ['fid', 'id']),
  remove: friend.destroy(['uid', 'id'])
}