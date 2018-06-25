import Sequelize from 'sequelize'

const config = {
    database: 'nodejs', // 使用哪个数据库
    username: 'root', // 用户名
    password: 'kxb13651478554', // 口令
    host: '127.0.0.1', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功！');
  })
  .catch(err => {
    console.error('数据库连接失败:', err);
  });

export default sequelize;
