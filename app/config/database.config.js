export default {
  database: 'test',
  username: 'root',
  password: '',
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,

  define: {
    underscored: false,
    underscoredAll: false,
    freezeTableName: true,
    timestamps: true,
    paranoid: false,
    deletedAt: true
  }
}