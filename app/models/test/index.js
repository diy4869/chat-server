import Sequelize from 'sequelize'
import config from '../../config/database.config'
// import Handle from '../../service/handle.es'
import Handle from 'handle.js'
import Mock from 'mockjs'
import {send} from "../../service";

export const sequelize = new Sequelize(config)
export const op = Sequelize.Op

// Handle.js 二次封装

function H (model) {
  return new Handle(model, {
    // before 钩子在数据库操作之前执行
    before (d, ctx) {
      
      console.log(ctx.request.body)
      d = ctx.request.body
      console.log(d)
      return d
    },
    // after 钩子在数据库操作之后执行
    after (result, ctx, next) {
      return result
    },
    // // data 钩子可以在返回数据到前端之前和捕获异常之后做一些处理
    // data (err, result, ctx, next) {
    //   console.log(err)
    //   console.log(result)
    //   console.log(ctx)
    // },
    data: send,
    mock: Mock
  })
}
// 判断数据库是否连接成功
sequelize.authenticate().then(() => {
  console.log('已连接')
}).catch(err => {
  throw '连接失败：' + err
})

export const Include = Handle.Include
export const Scopes = Handle.Scopes
console.log(Handle)


// 用户表
export const User = sequelize.import(__dirname + '/users')
// 好友和申请好友列表
export const Friend = sequelize.import(__dirname + '/friends')



export const user = H(User)
export const friend = H(Friend)


// 关联表查询
User.hasMany(Friend, {foreignKey: 'fid'})
Friend.belongsTo(User, {foreignKey: 'fid'})

// User.hasMany(Friend, {foreignKey: 'uid'})
// Friend.belongsTo(User, {foreignKey: 'uid'})

Include
  .add('user', function () {
    return {
      model: User,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }
  })
  .add('friend', function () {
    return {
      model: Friend,
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      }
    }
  })

// User.sync({alter: true})
// Friend.sync({alter: true})

// sequelize.sync({alter: true})

