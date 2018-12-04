import md5 from 'md5'
import {user, friend, Include, sequelize, Scopes, op} from '../models/test'
import { createContext } from 'vm';
const {send, tokenSign, tokenVerify, where, option, fuzzyQuery, fuzzyQueryLeft, pagination, it} = Scopes

export default {
  // 获取用户信息
  userInfo: user
  .scope(
    where('user_id')
  )
  .findOne()
}