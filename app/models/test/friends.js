module.exports = (sequelize, DataTypes) => {
  return sequelize.define('friends', {
    // 你是怎么做到的，用户表  user_id 这又 id 的
    id: {
      type: DataTypes.INTEGER,  
      primaryKey: true,     // 主键
      autoIncrement: true   // 自增加
    },
    // 用户账号 唯一 用来查找用户
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // 验证信息
    verify_message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    /*
      是否同意
        0 待审核
        1 同意
        2 忽略
        3 拒绝
    */
     isAgree: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  })
}