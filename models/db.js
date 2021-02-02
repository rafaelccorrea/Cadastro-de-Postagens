const Sequelize = require('Sequelize')

//Conexão com banco de dados Mysql
const sequelize = new Sequelize('posts', 'root', '21052014', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}