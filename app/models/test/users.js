module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    // 我擦
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 用户昵称
    username: {
      type: DataTypes.STRING, // 类型
      allowNull: false,         // 是否必填 false 不能为空
    },
    //  密码
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // 性别 0是宅男 1是腐女
    sex: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    user_state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 用户地址
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 年龄
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // 生日
    birthday: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 电话
    tel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // 个性签名
    sign: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
}